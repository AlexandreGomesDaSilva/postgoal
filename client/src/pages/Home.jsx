import { useNavigate } from "react-router-dom";
import "../styles/home.scss";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>PostGoal</h1>
      <div className="home-buttons">
        <button onClick={() => navigate("/setup")}>Nouveau match</button>
        <button onClick={() => navigate("/history")}>Voir l'historique des matchs</button>
      </div>
    </div>
  );
}
