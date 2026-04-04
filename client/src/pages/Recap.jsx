import { useLocation, useNavigate } from "react-router-dom";
import "../styles/recap.scss";

export default function Recap() {
  const location = useLocation();
  const navigate = useNavigate();
  const { match, history, time } = location.state || { match: { teamA: [], teamB: [] }, history: [], time: 0 };

  const scoreA = match.teamA.reduce((total, p) => total + p.goals.length, 0);
  const scoreB = match.teamB.reduce((total, p) => total + p.goals.length, 0);

  const getResult = () => {
    if (scoreA > scoreB) return <>Victoire de l'équipe <span className="score-a">A</span> !</>;
    if (scoreB > scoreA) return <>Victoire de l'équipe <span className="score-b">B</span> !</>;
    return "Match nul !";
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="recap-page">
      <h1>Récap du match</h1>

      <div className="recap-result">{getResult()}</div>

      <div className="recap-duration">
        Durée : {formatTime(time)}
      </div>

      <div className="recap-score">
        <span className="score-a">{scoreA}</span>
        <span> - </span>
        <span className="score-b">{scoreB}</span>
      </div>

      <div className="recap-teams">
        <div className="recap-team recap-team-a">
          <h2>Équipe A</h2>
          {match.teamA.filter((p) => p.goals.length > 0).map((player, index) => (
            <div key={index} className="recap-player">
              <span>{player.name}</span>
              <div className="recap-goals">
                {player.goals.map((goal, i) => (
                  <span key={i}>{goal.minute}'</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="recap-team recap-team-b">
          <h2>Équipe B</h2>
          {match.teamB.filter((p) => p.goals.length > 0).map((player, index) => (
            <div key={index} className="recap-player">
              <span>{player.name}</span>
              <div className="recap-goals">
                {player.goals.map((goal, i) => (
                  <span key={i}>{goal.minute}'</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="home-button" onClick={() => navigate("/")}>
        Retour à l'accueil
      </button>
    </div>
  );
}
