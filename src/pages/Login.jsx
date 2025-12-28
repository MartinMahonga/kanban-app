import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import pattern from "../assets/pattern.png";

// Sous-composant pour les champs de saisie (Réutilisable)
const InputField = ({ label, type, value, onChange, placeholder, name }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none focus:border-[#633BBC] focus:ring-2 focus:ring-[#633BBC]/20 transition-all shadow-sm"
    />
  </div>
);

const Login = () => {
  const { login, error, notification, clearError, clearNotification, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(error);

  // Redirection si déjà connecté
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  // Gestion automatique des messages (Clean-up)
  useEffect(() => {
    if (notification || error) {
      const timer = setTimeout(() => {
        if (notification) clearNotification();
        if (error) clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, error, clearNotification, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      {/* SECTION GAUCHE : Visuel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#633BBC] relative items-center justify-center overflow-hidden">
        {/* Motifs positionnés stratégiquement */}
        <img src={pattern} alt="" className="absolute -top-20 -left-100 -rotate-135" />
        <img src={pattern} alt="" className="absolute -bottom-100 -right-10 rotate-135" />
        
        <div className="relative z-10 px-16">
          <h1 className="text-white text-6xl font-bold leading-[1.1] max-w-lg tracking-tight">
            Welcome back to the <span className="opacity-80">Rudix family</span>
          </h1>
          <p className="text-purple-100 mt-6 text-lg max-w-sm">
            Connectez-vous pour continuer à gérer vos projets en toute simplicité.
          </p>
        </div>
      </div>

      {/* SECTION DROITE : Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Se connecter</h2>
            <p className="text-gray-500 mt-2">Heureux de vous revoir parmi nous !</p>
          </div>

          {/* Alertes d'erreurs et notifications */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg text-red-700 text-sm animate-in fade-in slide-in-from-top-2">
              {
                error.message === 'Request failed with status code 422' ? <p className="font-bold">Email ou mot de passe incorrect</p> 
                : 
                <>
                  <p className="font-bold">Une erreur est survenue</p>
                  <p>{error.message || String(error)}</p>
                </>
              }
            </div>
          )}

          {notification && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg text-green-700 text-sm font-medium">
              {notification}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField 
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
            />

            <InputField 
              label="Mot de passe"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <div className="pt-2">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white h-12 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-400 shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.25),-0.5px_-0.5px_1px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connexion...
                  </>
                ) : "Se connecter"}
              </button>
            </div>

            <p className="text-center text-gray-600 mt-8">
              Vous n'avez pas de compte ?{" "}
              <Link to="/register" className="font-bold text-[#633BBC] hover:underline">
                Créer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;