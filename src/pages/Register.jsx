import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { register, error, notification, clearError, clearNotification, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [localErrors, setLocalErrors] = useState(null);

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

  const validate = () => {
    const errs = {};
    if (!name || name.trim().length < 2) errs.name = "Le nom est requis (2 caractères minimum)";
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errs.email = "Email invalide";
    if (!password || password.length < 8) errs.password = "Le mot de passe doit contenir au moins 8 caractères";
    return Object.keys(errs).length ? errs : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalErrors(null);
    const v = validate();
    if (v) {
      setLocalErrors(v);
      return;
    }

    setLoading(true);
    const res = await register(name, email, password, password_confirmation);
    setLoading(false);

    if (res?.success) {
      navigate("/dashboard", { replace: true });
    } else {
      // API errors shown via `error` in context
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">S'inscrire</h1>

      {notification && <div className="text-green-600 mb-2">{notification}</div>}

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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>
            Nom
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="ml-2"
            />
          </label>
          {localErrors?.name && <div className="text-red-600">{localErrors.name}</div>}
        </div>

        <div>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-2"
            />
          </label>
          {localErrors?.email && <div className="text-red-600">{localErrors.email}</div>}
        </div>

        <div>
          <label>
            Mot de passe
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-2"
            />
          </label>
          {localErrors?.password && <div className="text-red-600">{localErrors.password}</div>}
        </div>
        
        <div>
          <label>
            ConfirmationMot de passe
            <input
              type="password"
              name="password_confirmation"
              value={password_confirmation}
              onChange={(e) => setPassword_confirmation(e.target.value)}
              className="ml-2"
            />
          </label>
          {localErrors?.password && <div className="text-red-600">{localErrors.password}</div>}
        </div>

        <button type="submit" disabled={loading} className="px-3 py-1 bg-blue-600 text-white rounded">
          {loading ? "Création..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};
