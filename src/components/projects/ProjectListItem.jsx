import { Link } from "react-router-dom";
import { Folder, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import ProjectActions from "./ProjectActions";

export default function ProjectListItem({ project, onEdit, onDelete }) {
  const progress = typeof project.progress === "number" ? project.progress : 0;
  const memberCount = project.memberCount || 0;

  const formattedDate = project.created_at
    ? formatDistanceToNow(new Date(project.created_at), {
        addSuffix: true,
        locale: fr,
      })
    : "Récemment";

  return (
    <div className="group flex items-center py-4 px-4 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0 relative">
      {/* Project info column */}
      <div className="flex-1 min-w-0 pr-6 flex items-center gap-4">
        <div className="h-10 w-10 text-purple-600 bg-purple-50 rounded-lg flex items-center justify-center shrink-0">
          <Folder className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <Link
            to={`/dashboard/project/${project.id}`}
            className="block text-sm font-semibold text-slate-900 hover:text-purple-600 truncate transition-colors"
          >
            {project.nom}
          </Link>
          <p className="text-xs text-slate-500 truncate max-w-[300px]">
            {project.description || "Développement site web"}
          </p>
        </div>
      </div>

      {/* Progress column */}
      <div className="w-32 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-md md:block hidden">
            {progress}%
          </div>
        </div>
      </div>

      {/* Members column */}
      <div className="w-32 shrink-0 text-sm text-slate-500 md:block hidden">
        {memberCount} membres
      </div>

      {/* Date column */}
      <div className="w-40 shrink-0 text-sm text-slate-500 flex items-center gap-1 md:block hidden">
        {formattedDate}
      </div>

      {/* Actions column */}
      <div className="w-10 shrink-0 text-right">
        <ProjectActions
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project)}
        />
      </div>
    </div>
  );
}
