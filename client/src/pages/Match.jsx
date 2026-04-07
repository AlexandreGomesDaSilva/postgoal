import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/match.scss";

export default function Match() {
  const navigate = useNavigate();
  const location = useLocation();
  const { players } = location.state || { players: { teamA: [], teamB: [] } };

  const [match, setMatch] = useState({
    teamA: players.teamA.map((name) => ({ name, goals: [] })),
    teamB: players.teamB.map((name) => ({ name, goals: [] })),
  });

  const [history, setHistory] = useState([]);

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const addGoal = (team, playerIndex) => {
    const minute = Math.floor(time / 60);
    setMatch((matchLePlusRecent) => {
      const updatedTeam = [...matchLePlusRecent[team]];
      const player = updatedTeam[playerIndex];
      updatedTeam[playerIndex] = {
        ...player,
        goals: [...player.goals, { minute, second: time % 60 }],
      };
      return { ...matchLePlusRecent, [team]: updatedTeam };
    });
    setHistory((prev) => [
      ...prev,
      { team, playerIndex, minute, second: time % 60 },
    ]);
  };

  const undoLastGoal = () => {
    if (history.length === 0) return;

    const lastAction = history.at(-1);

    setMatch((matchLePlusRecent) => {
      const updatedTeam = [...matchLePlusRecent[lastAction.team]];
      const player = updatedTeam[lastAction.playerIndex];
      updatedTeam[lastAction.playerIndex] = {
        ...player,
        goals: player.goals.slice(0, -1),
      };
      return { ...matchLePlusRecent, [lastAction.team]: updatedTeam };
    });

    setHistory((prev) => prev.slice(0, -1));
  };

  const scoreA = match.teamA.reduce((total, p) => total + p.goals.length, 0);
  const scoreB = match.teamB.reduce((total, p) => total + p.goals.length, 0);

  const onSubmit = async () => {
    const payload = {
      duration: formatTime(time),
      teamA: match.teamA.map((p) => p.name),
      teamB: match.teamB.map((p) => p.name),
      scoreA,
      scoreB,
      goals: history.map((action) => ({
        player: match[action.team][action.playerIndex].name,
        team: action.team === "teamA" ? "A" : "B",
        minute: action.minute,
      })),
    };

    await fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    navigate("/recap", { state: { match, history, time } });
  };

  return (
    <div className="match-page">
      <h1>Match en cours</h1>

      <div className="timer">
        <span>{formatTime(time)}</span>
        <div className="timer-buttons">
          <button onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning ? "Pause" : "Démarrer"}
          </button>
          <button onClick={resetTimer}>Réinitialiser</button>
        </div>
      </div>

      <div className="score">
        <span className="score-a">{scoreA}</span>
        <span> - </span>
        <span className="score-b">{scoreB}</span>
      </div>

      <button className="end-button" onClick={onSubmit}>
        Terminer le match
      </button>

      <div className="teams">
        <div className="teamA">
          <h2>Équipe A</h2>
          {match.teamA.map((player, index) => (
            <button key={index} onClick={() => addGoal("teamA", index)}>
              {player.name}
            </button>
          ))}
        </div>

        <div className="teamB">
          <h2>Équipe B</h2>
          {match.teamB.map((player, index) => (
            <button key={index} onClick={() => addGoal("teamB", index)}>
              {player.name}
            </button>
          ))}
        </div>
      </div>

      <button className="undo-button" onClick={undoLastGoal}>
        Annuler le dernier but
      </button>

      <div className="feed">
        {history.map((action, index) => {
          const player = match[action.team][action.playerIndex];
          const isTeamA = action.team === "teamA";
          return (
            <div
              key={index}
              className={`feed-entry ${isTeamA ? "feed-a" : "feed-b"}`}
            >
              <span>{action.minute}'</span>
              <span>{player.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
