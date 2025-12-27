import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'
import '@/index.css'
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if(!isAuthenticated) {
    return <Navigate to="/register" replace />
  }

  return children;
}

function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Navigate to="/dashboard/projets"/> 
            : <Home/>
          }
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? <Navigate to="/dashboard/projets"/> 
            : <Register/>
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard/projets"/> : <Login />
          }
        />
        <Route
          path='/dashboard/projets'
          element={
            <ProtectedRoute>
              <Dashboard/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default AppRouter
