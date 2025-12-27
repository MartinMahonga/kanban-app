import { Layout } from "lucide-react";

const Navbar = () => {
  return (
    <header 
      className="fixed top-0 right-0 z-40 md:flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 transition-all
        /* On aligne la largeur et la position sur la Sidebar */
        left-0 md:left-64 hidden"
    >
      {/* SECTION GAUCHE : Fil d'ariane / Titre de page */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-[#633BBC]/10 transition-colors">
          <Layout className="text-gray-500 group-hover:text-[#633BBC]" size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium leading-none uppercase tracking-wider">Workspace</span>
          <span className="font-bold text-gray-900 md:text-lg text-sm">Projets</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;