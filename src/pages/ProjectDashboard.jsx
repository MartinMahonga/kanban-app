import { ProjectRow } from "../components/dashboard/project/ProjectRow";
import { useProjects } from "../hooks/useProject";
import Layout from "@/layout";
import {
  ProjectSkeleton,
  EmptyState,
  Button,
  Modal,
  Input,
  Textarea,
} from "@/components/ui";
import { Plus, FolderPlus } from "lucide-react";
import { useState } from "react";

const ProjectDashboard = () => {
  const { projects, isLoading, isError } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Gestion des erreurs
  if (isError)
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <p className="text-red-500 font-bold">
            Erreur lors de la récupération des projets.
          </p>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Réessayer
          </Button>
        </div>
      </Layout>
    );

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      // Appel API ici
      console.log("Suppression du projet", id);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Bouton "Create Project" */}
        {!isLoading && projects?.data?.length === 0 && (
          <div
            className="
            /* Sur Mobile : Fixé en bas à droite */
            fixed bottom-24 right-4 z-50 
            
            /* Sur Desktop (md) : Revient dans le flux normal */
            md:relative md:bottom-0 md:right-0 md:flex md:justify-end md:mb-10 md:z-auto
          "
          >
            <Button variant="action" onClick={() => setIsModalOpen(true)}>
              <Plus className="w-8 h-8 md:w-[22px] md:h-[22px]" />
              <span className="hidden md:inline">Créer un project</span>
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
              <div className="flex justify-end mb-4">
                <div
                  className="
                  /* Sur Mobile : Fixé en bas à droite */
                  fixed bottom-24 right-4 z-50 
                  
                  /* Sur Desktop (md) : Revient dans le flux normal */
                  md:relative md:bottom-0 md:right-0 md:flex md:justify-end md:mb-10 md:z-auto
                "
                >
                  <Button variant="action" onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-8 h-8 md:w-[22px] md:h-[22px]" />
                    <span className="hidden md:inline">Créer un project</span>
                  </Button>
                </div>
              </div>
              <div>
                {/** Affichage des projets */}
                {/* Table Header */}
                <div className="md:grid grid-cols-[1fr_1fr_1fr_1fr_40px] px-4 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider hidden">
                  <span>Projet</span>
                  <span className="text-center">Progression</span>
                  <span className="text-center">Membre</span>
                  <span className="text-center">Date de création</span>
                  <span></span>
                </div>
                <div className="space-y-1">
                  {projects.data.map((p) => (
                    <ProjectRow
                      key={p.id}
                      project={p}
                      onEdit={(p) => console.log("Editer", p)}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal de création de projet */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          hidden={true}
          title={
            <div className="flex items-center font-medium text-xl gap-2">
              <FolderPlus size={24} />
              <h1>Créer un nouveau projet</h1>
            </div>
          }
        >
          {/* Todo ajouter la fonction pour soumettre le formulaire en utilisant un onSubmit */}
          <form action="">
            <Input label="Nom" name="nom" placeholder="Nom de votre projet" />
            <Textarea
              label="Description"
              name="description"
              placeholder="décrivez votre projet"
            />
            <div className="flex mt-4 gap-2 justify-end">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Annuler
              </Button>
              <Button variant="action" type="submit">Créer le projet</Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
};

export default ProjectDashboard;
