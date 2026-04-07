import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/history.scss";

export default function History() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/matches")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const goToRecap = (apiMatch) => {
    const recapMatch = {
      teamA: apiMatch.teamA.map((name) => ({
        name,
        goals: apiMatch.goals
          .filter((g) => g.team === "A" && g.player === name)
          .map((g) => ({ minute: g.minute })),
      })),
      teamB: apiMatch.teamB.map((name) => ({
        name,
        goals: apiMatch.goals
          .filter((g) => g.team === "B" && g.player === name)
          .map((g) => ({ minute: g.minute })),
      })),
    };
    const [m, s] = apiMatch.duration.split(":").map(Number);
    const time = m * 60 + s;
    navigate("/recap", { state: { match: recapMatch, history: [], time } });
  };

  return (
    <div className="history-page">
      <h1>Historique des matchs</h1>
      {loading && <p className="history-loading">Chargement...</p>}
      {!loading && matches.length === 0 && (
        <p className="history-empty">Aucun match enregistré.</p>
      )}
      <div className="history-list">
        {matches.map((m) => (
          <div key={m._id} className="history-card">
            <div className="history-card-date">
              {new Date(m.date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="history-card-score">
              <span className="score-a">{m.scoreA}</span>
              <span> - </span>
              <span className="score-b">{m.scoreB}</span>
            </div>
            <div className="history-card-teams">
              <span className="team-a">{m.teamA.join(", ")}</span>
              <span className="vs">vs</span>
              <span className="team-b">{m.teamB.join(", ")}</span>
            </div>
            <button className="details-button" onClick={() => goToRecap(m)}>
              Voir détails
            </button>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate("/")}>
        Retour à l'accueil
      </button>
    </div>
  );
}
