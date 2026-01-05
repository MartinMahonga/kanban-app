import { useLocation } from "react-router-dom";
import { Layout as LayoutIcon, ChevronRight } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  // Dictionnaire des titres selon le chemin (path)
  const getPageTitle = (pathname) => {
    if (pathname.includes("/projets")) return "Projets";
    if (pathname.includes("/stats")) return "Statistiques";
    if (pathname.includes("/kanban")) return "Tableau Kanban";
    if (pathname.includes("/settings")) return "Paramètres";
    return "Dashboard";
  };

  return (
    <header 
      className="fixed top-0 right-0 z-40 hidden md:flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 left-64"
    >
      <div className="flex items-center gap-3 group">
        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-[#633BBC]/10 transition-colors">
          <LayoutIcon className="text-gray-500 group-hover:text-[#633BBC]" size={20} />
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-bold leading-none uppercase tracking-widest mb-1">
            Workspace
          </span>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-800 text-lg">
              {getPageTitle(location.pathname)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-[#633BBC] text-white flex items-center justify-center text-xs font-bold">
            JD
        </div>
      </div>
    </header>
  );
}

export default Navbar;