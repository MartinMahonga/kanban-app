import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, error, notification, clearError, clearNotification, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => clearNotification(), 3000);
      return () => clearTimeout(t);
    }
  }, [notification, clearNotification]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => clearError(), 5000);
      return () => clearTimeout(t);
    }
  }, [error, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Se connecter</h1>
      {error && (
        <div className="text-red-600 mb-2">
          {error.message || String(error)}
          {error.fields && (
            <ul className="mt-2 list-disc pl-6">
              {Object.entries(error.fields).map(([field, messages]) => (
                <li key={field}>
                  <strong>{field}:</strong> {Array.isArray(messages) ? messages.join(", ") : String(messages)}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {notification && <div className="text-green-600 mb-2">{notification}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
