import { Button } from "../ui/Button";
import { Plus, Boxes } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function EmptyState({ onCreateProject }) {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Bonjour {user?.name?.split(" ")[0] || "Guest"}
        </h2>
        <p className="text-slate-500 mt-2">Prêt à organiser vos tâches ?</p>
      </div>

      <div className="bg-white p-12 mb-8 relative overflow-hidden transition-all duration-300">
        <div className="relative z-10 flex flex-col items-center">
          <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Boxes size={56} className="text-slate-900" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Pas de projets
          </h3>
          <p className="text-sm text-slate-500 text-center max-w-[200px]">
            Créez votre premier projet pour commencer à collaborer.
          </p>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute -right-12 -bottom-12 h-32 w-32 bg-slate-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500" />
      </div>

      <Button
        size="lg"
        onClick={onCreateProject}
        className="bg-purple-600 hover:bg-purple-700 rounded-full text-white px-8 h-12 shadow-purple-100 hover:shadow-xl hover:-translate-y-0.5 transition-all"
      >
        <Plus className="mr-2 h-4 w-4" />
        <span className="font-medium">Nouveau projet</span>
      </Button>
    </div>
  );
}
