import { useProjects } from "../hooks/useProject";
import Layout from "../layout";

const Dashboard = () => {
  const { projects, isLoading, isError } = useProjects();

  console.log(projects.data)

  if(isLoading) {
    return <p>Chargement...</p>
  }

  if(isError) {
    return <p>Error</p>
  }

  return (
    <Layout>
      <div>
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
    </Layout>
  );
};

export default Dashboard;