import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useProjects } from "../hooks/useProject";

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { projects, isLoading, isError } = useProjects();

  console.log(projects.data)

  if(isLoading) {
    return <p>Chargement...</p>
  }

  if(isError) {
    return <p>Error</p>
  }

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

      <section>
        {
          projects.data.map((project) => (
            <div key={project.id}>
              <h1>{project.nom}</h1>
              <p>{project.description}</p>
              <div>
                {
                  project.taches.length === 0 ? <p>Aucune tache pour ce project</p> : 
                  <ul>
                    {project.taches.map((tache) => (
                      <li key={tache}>{tache}</li>
                    ))}
                  </ul>
                }
              </div>
            </div>
          ))
        }
      </section>
    </div>
  );
};

export default Dashboard;