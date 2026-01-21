import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./components/layout/DashboardLayout";
import ProjectList from "./pages/ProjectList";
import BoardPage from "./pages/BoardPage";
import Stats from "./pages/Stats";
import Team from "./pages/Team";
import LandingPage from "./pages/LandingPage";
import LandingTeam from "./pages/LandingTeam";
import NotFound from "./pages/NotFound";

// Protected Route Component
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("token");

  if (loading) return null; // Or a spinner

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<LandingTeam />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<ProjectList />} />
                <Route path="project/:id" element={<BoardPage />} />
                <Route path="stats" element={<Stats />} />
                <Route path="team" element={<Team />} />
              </Route>
            </Route>

            {/* Legacy Redirects */}
            <Route
              path="/project/:id"
              element={<Navigate to="/dashboard/project/:id" replace />}
            />

            {/* 404 - Not Found - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
