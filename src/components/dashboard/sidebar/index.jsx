import { ChartColumnBigIcon, LogOut, Users, Search, Trello } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import logo from '@/assets/icon.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const navLinks = [
    { title: 'Projets', path: '/dashboard/projets', icon: Trello },
    { title: 'Stats', path: '/dashboard/stats', icon: ChartColumnBigIcon },
    { title: 'Search', path: '/dashboard/search', icon: Search },
    { title: 'Membres', path: '/dashboard/membres', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* --- DESKTOP SIDEBAR (Verticale) --- */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 flex-col bg-white border-r border-gray-200 z-50">
        <div className="flex items-center h-16 px-5 border-b border-gray-50">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="Rudix" className="h-8 w-8" />
            <span className="text-2xl font-bold text-gray-900">Rudix</span>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-between p-3">
          <nav className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link key={link.title} to={link.path}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'bg-white shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.25),-0.5px_-0.5px_1px_rgba(0,0,0,0.25)]' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Icon size={22} className={isActive ? 'text-[#633BBC]' : 'group-hover:text-gray-900'} />
                  <span className="text-sm font-medium">{link.title}</span>
                </Link>
              );
            })}
          </nav>
          <button onClick={handleLogout} className="group flex cursor-pointer items-center gap-3 px-3 py-3 rounded-xl bg-gray-100 hover:bg-black hover:text-white transition-all">
            <LogOut size={22} />
            <span className="text-sm font-semibold">Se déconnecter</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE BOTTOM NAV (Horizontale) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex items-center justify-around px-2 z-50">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          const Icon = link.icon;
          return (
            <Link key={link.title} to={link.path} className="flex flex-col items-center justify-center gap-1 w-full h-full">
              <Icon size={20} className={isActive ? 'text-[#633BBC]' : 'text-gray-500'} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-[#633BBC]' : 'text-gray-500'}`}>
                {link.title}
              </span>
            </Link>
          );
        })}
        {/* Bouton Logout simplifié sur mobile */}
        <button onClick={handleLogout} className="flex flex-col items-center justify-center gap-1 w-full h-full text-gray-500">
          <LogOut size={20} />
          <span className="text-[10px] font-medium">Quitter</span>
        </button>
      </nav>
    </>
  );
};

export default Sidebar;