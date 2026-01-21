import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Trello, ChartColumnBig, User, Users, Plus } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import Modal from "../ui/Modal";
import { createProject, updateProject } from "../../services/project";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

const MobileNavbar = () => {
  const { logout } = useAuth();
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form state
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setProjectName("");
    setProjectDesc("");
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
    } catch (error) {
      console.error("Failed to save project", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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
              placeholder="Brève description de votre projet..."
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
      <div className="lg:hidden fixed bottom-6 left-0 right-0 px-6 z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-100 h-20 rounded-[32px] shadow-2xl shadow-indigo-100 flex items-center justify-around relative px-2">
          {/* Home */}
          <NavItem to="/dashboard" icon={<Trello size={16} />} label="Home" />

          {/* Search */}
          <NavItem
            to="/dashboard/team"
            icon={<Users size={16} />}
            label="Equipe"
          />

          {/* Central Button (Scanner/Action) */}
          <div className="relative -top-8">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <button
                onClick={handleOpenCreate}
                className="bg-purple-600 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-200 active:scale-90 transition-transform"
              >
                <Plus size={24} />
              </button>
            </div>
          </div>

          {/* History */}
          <NavItem
            to="/dashboard/stats"
            icon={<ChartColumnBig size={16} />}
            label="Analytics"
          />

          {/* Logout */}
          <button
            onClick={logout}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors text-slate-600",
            )}
          >
            <LogOut className="h-4 w-4" />
            <span className="text-[12px]">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, children, onClick, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      title={isCollapsed ? children : undefined}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors",
        isActive ? "text-purple-600" : "text-slate-600",
        isCollapsed && "justify-center px-2",
      )}
    >
      <div
        className={({ isActive }) => (isActive ? "animate-bounce-short" : "")}
      >
        {icon}
      </div>
      <span className="text-[12px] tracking-tighter">{label}</span>
    </Link>
  );
};

export default MobileNavbar;
