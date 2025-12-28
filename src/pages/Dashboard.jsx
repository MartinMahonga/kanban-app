import { useProjects } from "../hooks/useProject";
import Layout from "../layout";
import { ProjectSkeleton, EmptyState, Button } from "@/components/ui";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { projects, isLoading, isError } = useProjects();

  // Gestion des erreurs
  if (isError) return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <p className="text-red-500 font-bold">Erreur lors de la récupération des projets.</p>
        <Button variant="secondary" onClick={() => window.location.reload()}>Réessayer</Button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Bouton "Create Project" */}
        {!isLoading && projects?.data?.length === 0 && (
          <div className="
            /* Sur Mobile : Fixé en bas à droite */
            fixed bottom-24 right-4 z-50 
            
            /* Sur Desktop (md) : Revient dans le flux normal */
            md:relative md:bottom-0 md:right-0 md:flex md:justify-end md:mb-10 md:z-auto
          ">
            <Button
              variant="primary"
            >
              <Plus
                className="w-8 h-8 md:w-[22px] md:h-[22px]" 
              />
              <span className="hidden md:inline">Create project</span>
            </Button>
          </div>
        )}

        {/* Affichage conditionnel */}
        <div className="mt-0">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProjectSkeleton /> <ProjectSkeleton /> <ProjectSkeleton />
            </div>
          ) : projects?.data?.length === 0 ? (
            <EmptyState />
          ) : (
            <div>
              <div className="flex justify-end mb-10">
                <div className="
                  /* Sur Mobile : Fixé en bas à droite */
                  fixed bottom-24 right-4 z-50 
                  
                  /* Sur Desktop (md) : Revient dans le flux normal */
                  md:relative md:bottom-0 md:right-0 md:flex md:justify-end md:mb-10 md:z-auto
                ">
                  <Button
                    variant="primary"
                  >
                    <Plus
                      className="w-8 h-8 md:w-[22px] md:h-[22px]" 
                    />
                    <span className="hidden md:inline">Create project</span>
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/** Affichage des projets */}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;