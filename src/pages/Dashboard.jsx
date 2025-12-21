import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl">Dashboard</h1>
        <div>
          {user && <span className="mr-4">Bonjour, {user.name || user.email}</span>}
          <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;