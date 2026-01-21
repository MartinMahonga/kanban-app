import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import ProjectActions from "./ProjectActions";

export default function ProjectCard({ project, onEdit, onDelete }) {
  // Use real data or fallback to 0
  const progress = typeof project.progress === "number" ? project.progress : 0;
  const memberCount = project.memberCount || 0; // Using mock or real if available

  const formattedDate = project.created_at
    ? formatDistanceToNow(new Date(project.created_at), {
        addSuffix: true,
        locale: fr,
      })
    : "Récemment";

  return (
    <div className="group relative bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200 h-full flex flex-col">
      {/* Link wrapper for the card body */}

      <div className="relative z-10 p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="h-10 w-10 rounded bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors font-semibold">
            {project.nom.charAt(0).toUpperCase()}
          </div>

          <ProjectActions
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project)}
          />
        </div>

        <div className="mb-6 flex-1">
          <Link to={`/dashboard/project/${project.id}`}>
            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors pointer-events-none">
              {project.nom}
            </h3>
          </Link>
          <p className="text-sm text-slate-500 line-clamp-2 pointer-events-none">
            {project.description || "No description provided."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Progress</span>
            <span className="text-slate-700 font-bold">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            <span>{memberCount} membres</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
