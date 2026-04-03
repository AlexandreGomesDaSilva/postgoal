import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/setup.scss";

export default function Setup() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState({
    teamA: ["", "", "", "", ""],
    teamB: ["", "", "", "", ""],
  });

  const handleChange = (team, index, value) => {
    setPlayers((prev) => {
      const updatedTeam = [...prev[team]];
      updatedTeam[index] = value;
      return { ...prev, [team]: updatedTeam };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    navigate("/match", { state: { players } });
  };

  return (
    <div className="setup-page">
      <h1>Nouveau match</h1>
      <div className="players">
        <form onSubmit={onSubmit}>
          <div className="teamA">
            {players.teamA.map((player, index) => (
              <input
                key={index}
                type="text"
                placeholder="Nom du joueur"
                value={player}
                onChange={(e) => handleChange("teamA", index, e.target.value)}
              />
            ))}
          </div>
          <div className="vs">VS</div>
          <div className="teamB">
            {players.teamB.map((player, index) => (
              <input
                key={index}
                type="text"
                placeholder="Nom du joueur"
                value={player}
                onChange={(e) => handleChange("teamB", index, e.target.value)}
              />
            ))}
          </div>
          <button type="submit" className="launch-button">Lancer le match</button>
        </form>
      </div>
    </div>
  );
}
