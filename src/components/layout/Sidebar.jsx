import { Link, useLocation } from "react-router-dom";
import {
  Trello,
  Users,
  LogOut,
  ChartColumnBigIcon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";
import logo from '../../assets/icon.png';

const NavItem = ({ to, icon: Icon, children, onClick, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      title={isCollapsed ? children : undefined}
      className={cn(
        "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive
          ? "bg-purple-100 text-purple-600"
          : "text-slate-600 hover:bg-purple-100 hover:text-purple-600",
        isCollapsed && "justify-center px-2",
      )}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      {!isCollapsed && <span>{children}</span>}
    </Link>
  );
};

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  toggleCollapse,
}) {
  const { user, logout } = useAuth();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-slate-50 border-r border-slate-200 md:flex flex-col transition-all duration-100 ease-in-out md:static md:h-scree4n hidden",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div
        className={cn(
          "p-4 border-b border-slate-100 flex items-center",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <img src={logo} alt="Rudix" className="h-8 w-8" />
          {!isCollapsed && (
            <span className="text-2xl font-bold text-gray-900">Rudix</span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 overflow-x-hidden">
        <NavItem
          to="/dashboard"
          icon={Trello}
          onClick={onClose}
          isCollapsed={isCollapsed}
        >
          Projects
        </NavItem>
        <NavItem
          to="/dashboard/stats"
          icon={ChartColumnBigIcon}
          onClick={onClose}
          isCollapsed={isCollapsed}
        >
          Rapport
        </NavItem>
        <NavItem
          to="/dashboard/team"
          icon={Users}
          onClick={onClose}
          isCollapsed={isCollapsed}
        >
          Team
        </NavItem>
      </div>

      {/* Collapse Toggle (Desktop only) */}
      <button
        onClick={toggleCollapse}
        className="hidden md:flex absolute -right-3 top-12 bg-white border border-slate-200 rounded-full p-1 shadow-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors z-50"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      <div className="p-4 border-t border-slate-200">
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            isCollapsed ? "justify-center px-0" : "px-2",
          )}
        >
          <div className="h-8 w-8 rounded-full bg-slate-300 flex-shrink-0 flex items-center justify-center text-slate-600 font-medium text-xs">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
        <button
          onClick={logout}
          title={isCollapsed ? "Log out" : undefined}
          className={cn(
            "group flex cursor-pointer items-center gap-3 px-3 py-3 rounded-xl bg-[#fff5f5] hover:bg-[#e53e3e] text-[#e53e3e] hover:text-[#fff5f5] transition-all",
            isCollapsed ? "justify-center w-full py-2" : "px-2 py-1.5 w-full",
          )}
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          {!isCollapsed && "Log out"}
        </button>
      </div>
    </aside>
  );
}
