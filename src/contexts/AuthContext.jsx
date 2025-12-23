import { createContext } from "react";
import { login as loginApi, register as registerApi } from "@/api/auth.api";
import { useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const parseApiError = (err) => {
    const res = err?.res?.data;
    if (!res) {
      return { message: err.message || "Erreur inconnue" };
    }

    // Laravel-style validation: { errors: { field: [msg, ...] } }
    if (res.errors && typeof res.errors === "object") {
      return { message: res.message || "Erreur de validation", fields: res.errors };
    }

    // Generic API res with message
    if (res.message) {
      return { message: res.message, data: res };
    }

    // If res is a plain string or other shape
    if (typeof res === "string") {
      return { message: res };
    }

    return { message: JSON.stringify(res) };
  };

  // Connexion
  const login = async (email, password) => {
    setError(null);
    setNotification(null);

    try {
      const reponse = await loginApi({ email, password });
      const { token, user } = reponse.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      setNotification("Connexion réussie");
      return { success: true };

    } catch (err) {

      const parsed = parseApiError(err);
      setError(parsed);
      return { success: false, error: parsed };
    }
  };

  // Inscription
  const register = async (name, email, password, password_confirmation) => {
    setError(null);
    setNotification(null);

    try {
      const res = await registerApi({ name, email, password, password_confirmation });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      setNotification("Compte créé avec succès");
      return { success: true };

    } catch (err) {

      const parsed = parseApiError(err);
      setError(parsed);
      return { success: false, error: parsed };
    }
  };

  // Déconnexion
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

    setNotification("Vous vous êtes déconnecté");
  };

  const clearError = () => setError(null);
  const clearNotification = () => setNotification(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        error,
        notification,
        clearError,
        clearNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };