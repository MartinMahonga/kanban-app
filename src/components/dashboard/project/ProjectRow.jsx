import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Folder, Pencil, Trash2 } from "lucide-react";
import { formatRelativeDate } from '@/utils/dateFormatter';

export const ProjectRow = ({ project, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Fermer le menu si on clique ailleurs sur la page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-all mb-2 relative">
      <div className="flex items-center gap-4 flex-1">
        <div className="p-2 self-start bg-[#633BBC]/10 rounded-lg text-[#633BBC]">
          <Folder size={20} />
        </div>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#633BBC] hover:underline cursor-pointer">
            {project.nom}
          </span>
          <span className="text-sm text-gray-500 line-clamp-1">
            {project.description}
          </span>
        </div>
      </div>

      {/* Statut */}
      <div className="hidden md:flex flex-1 justify-center">
        <span className="px-2 py-1 text-[11px] font-medium bg-[#633BBC]/10 text-[#633BBC] border border-[#633BBC]/20 rounded-md">
          {project.status || "14%"}
        </span>
      </div>

      {/* Membres */}
      <div className="hidden md:flex flex-1 justify-center items-center gap-2">
        <span className="text-sm text-gray-400">{project.membre || "0"} membres</span>
      </div>

      {/* Date */}
      <div className="hidden lg:flex flex-1 justify-center text-sm text-gray-500">
        {formatRelativeDate(project.created_at)}
      </div>

      {/* Menu Actions */}
      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className={`p-2 rounded-lg transition-colors cursor-pointer ${showMenu ? 'bg-gray-100 text-[#633BBC]' : 'text-gray-500 hover:text-[#633BBC] hover:bg-gray-50'}`}
        >
          <MoreHorizontal size={18} />
        </button>

        {/* Le Dropdown */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-[100] py-2 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => { onEdit(project); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Pencil size={14} className="text-[#633BBC]" />
              Modifier le projet
            </button>
            
            <div className="h-[1px] bg-gray-50 my-1" />
            
            <button 
              onClick={() => { onDelete(project.id); setShowMenu(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm cursor-pointer text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={14} />
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};