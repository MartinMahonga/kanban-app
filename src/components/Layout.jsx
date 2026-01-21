import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, BarChart3, Search, Users, LogOut, Folder, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { to: "/projets", icon: <LayoutGrid size={20}/>, label: "Projets" },
    { to: "/stats", icon: <BarChart3 size={20}/>, label: "Stats" },
    { to: "/search", icon: <Search size={20}/>, label: "Recherche" },
    { to: "/membres", icon: <Users size={20}/>, label: "Membres" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex w-64 border-r border-gray-100 bg-white flex-col p-6">
        <Logo />
        <nav className="mt-10 space-y-1 flex-1">
          {navigation.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      {/* MOBILE MENU (OVERLAY) */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        <aside className={`absolute left-0 top-0 h-full w-72 bg-white p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center mb-10">
            <Logo />
            <button onClick={() => setIsOpen(false)}><X /></button>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <NavItem key={item.to} {...item} onClick={() => setIsOpen(false)} />
            ))}
          </nav>
        </aside>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* TOPBAR MOBILE */}
        <header className="lg:hidden h-16 bg-white border-b px-4 flex items-center justify-between">
          <Logo />
          <button onClick={() => setIsOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
};

const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="bg-black p-1.5 rounded-lg shrink-0">
      <Folder className="text-white w-5 h-5" />
    </div>
    <span className="text-xl font-bold tracking-tight">Rudix</span>
  </div>
);

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink to={to} onClick={onClick} className={({ isActive }) => `
    flex items-center gap-3 p-3 rounded-xl transition-all
    ${isActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-500 hover:bg-gray-50'}
  `}>
    {icon} <span>{label}</span>
  </NavLink>
);

export default Layout;