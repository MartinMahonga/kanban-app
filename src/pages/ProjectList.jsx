import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  LayoutGrid,
  List as ListIcon,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Modal from "../components/ui/Modal";
import ProjectListItem from "../components/projects/ProjectListItem";
import ProjectCard from "../components/projects/ProjectCard";
import EmptyState from "../components/projects/EmptyState";
import { Skeleton } from "../components/ui/Skeleton";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project";
import { fetchTasks } from "../services/task";
import { cn } from "../lib/utils";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Form state
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ...

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await fetchProjects();
      const loadedProjects = Array.isArray(data) ? data : data.data || [];

      // Calculate progress for each project
      const projectsWithStats = await Promise.all(
        loadedProjects.map(async (project) => {
          try {
            const tasksData = await fetchTasks(project.id);
            const tasks = Array.isArray(tasksData)
              ? tasksData
              : tasksData.data || tasksData.tasks || [];

            const total = tasks.length;
            const completed = tasks.filter(
              (t) => t.status === "done" || t.status === "DONE",
            ).length;
            const progress =
              total === 0 ? 0 : Math.round((completed / total) * 100);

            return {
              ...project,
              progress,
              taskCount: total,
              completedCount: completed,
            };
          } catch (e) {
            console.error(`Failed to load stats for project ${project.id}`, e);
            return { ...project, progress: 0, taskCount: 0, completedCount: 0 };
          }
        }),
      );

      setProjects(projectsWithStats);
    } catch (error) {
      console.error("Failed to load projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setProjectName("");
    setProjectDesc("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setProjectName(project.nom);
    setProjectDesc(project.description || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingProject) {
        await updateProject(editingProject.id, {
          nom: projectName,
          description: projectDesc,
        });
      } else {
        await createProject(projectName, projectDesc);
      }
      setIsModalOpen(false);
      setProjectName("");
      setProjectDesc("");
      setEditingProject(null);
      loadProjects();
    } catch (error) {
      console.error("Failed to save project", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;

    setIsSubmitting(true);
    try {
      await deleteProject(projectToDelete.id);
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
      loadProjects();
    } catch (error) {
      console.error("Failed to delete project", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 flex-1">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-24" />
          </div>
          <Skeleton className="h-10 w-40" />
        </div>

        {/* List Skeleton */}
        <div className="bg-white rounded-t-xl border border-b-0 border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center px-4 py-3 bg-slate-50/50 border-b border-slate-100">
            <Skeleton className="h-4 w-24 mr-auto" />
            <Skeleton className="h-4 w-32 ml-4" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="px-4 py-4 border-b border-slate-100 flex items-center gap-4"
            >
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show specialised empty state if no projects at all
  if (projects.length === 0) {
    return (
      <>
        <EmptyState onCreateProject={handleOpenCreate} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Créer un projet"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Nom du projet
              </label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="ex: Website Redesign"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="Brève description du projet..."
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Créer le projet
              </Button>
            </div>
          </form>
        </Modal>
      </>
    );
  }

  return (
    <div>
      {/* Header / Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher un projet..."
              className="pl-10 bg-slate-50 border-slate-100 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* View Toggles */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "list"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <ListIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-1.5 rounded-md transition-all",
                viewMode === "grid"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="bg-purple-600 hover:bg-purple-700 text-white md:flex hidden"
        >
          <Plus className="h-4 w-4 mr-2" />
          <span className="font-medium">Créer un projet</span>
        </Button>
      </div>

      {viewMode === "list" ? (
        /* List View */
        <div className="bg-white rounded-t-xl border border-b-0 border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center px-4 py-3 bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <div className="flex-1">Projet</div>
            <div className="md:w-32 w-16 md:block hidden">Progression</div>
            <div className="md:w-32 md:block hidden">Membre</div>
            <div className="md:w-40 md:block hidden">Date de création</div>
            <div className="md:w-10"></div>
          </div>

          <div>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  onEdit={handleOpenEdit}
                  onDelete={handleDeleteClick}
                />
              ))
            ) : (
              <div className="py-12 text-center text-slate-500">
                Aucun projet trouvé pour "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleOpenEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              Aucun projet trouvé pour "{searchQuery}"
            </div>
          )}
        </div>
      )}

      {/* Edit/Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? "Modifier le projet" : "Créer un projet"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Nom du projet
            </label>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="ex: Website Redesign"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              value={projectDesc}
              onChange={(e) => setProjectDesc(e.target.value)}
              placeholder="Brève description du projet..."
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              {editingProject ? "Mettre à jour" : "Créer le projet"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Supprimer le projet"
      >
        <div className="space-y-4">
          <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold">Êtes-vous absolument sûr ?</p>
              <p>
                Cette action est irréversible. Toutes les tâches associées à ce
                projet seront également supprimées.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Annuler
            </Button>
            <Button
              isLoading={isSubmitting}
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Oui, supprimer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
