import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import pattern from "../assets/pattern.png";

// Sous-composant pour uniformiser les champs
const InputField = ({ label, type, name, value, onChange, placeholder, error }) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-sm font-semibold text-gray-700 ml-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full h-12 px-4 rounded-xl border outline-none transition-all shadow-sm
        ${error ? 'border-red-500 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-[#633BBC] focus:ring-2 focus:ring-[#633BBC]/20'}`}
    />
    {error && <p className="text-xs text-red-600 ml-1 font-medium">{error}</p>}
  </div>
);

const Register = () => {
  const { register, error, notification, clearError, clearNotification, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [localErrors, setLocalErrors] = useState({});

  // Redirection si déjà authentifié
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, navigate]);

  // Nettoyage automatique des alertes
  useEffect(() => {
    if (notification || error) {
      const t = setTimeout(() => {
        if (notification) clearNotification();
        if (error) clearError();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [notification, error, clearNotification, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur locale quand l'utilisateur tape
    if (localErrors[name]) setLocalErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.length < 2) errs.name = "Nom requis (min. 2 caractères)";
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) errs.email = "Email invalide";
    if (formData.password.length < 8) errs.password = "Minimum 8 caractères";
    if (formData.password !== formData.password_confirmation) errs.password_confirmation = "Les mots de passe ne correspondent pas";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setLocalErrors(v);
      return;
    }

    setLoading(true);
    const res = await register(formData.name, formData.email, formData.password, formData.password_confirmation);
    setLoading(false);

    if (res?.success) navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      
      {/* SECTION GAUCHE : Visuel (Identique à Login pour la cohérence) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#633BBC] relative items-center justify-center overflow-hidden">
        {/* Motifs positionnés stratégiquement */}
        <img src={pattern} alt="" className="absolute -top-20 -left-100 -rotate-135" />
        <img src={pattern} alt="" className="absolute -bottom-100 -right-10 rotate-135" />
        
        <div className="relative z-10 px-16">
          <h1 className="text-white text-6xl font-bold leading-[1.1] max-w-lg tracking-tight">
            Welcome to the <br/> <span className="opacity-80">Rudix family</span>
          </h1>
          <p className="text-purple-100 mt-6 text-lg max-w-sm italic">
            Rejoignez-nous pour organiser vos projets plus efficacement dès aujourd'hui.
          </p>
        </div>
      </div>

      {/* SECTION DROITE : Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-900">S'inscrire</h2>
            <p className="text-gray-500 mt-2">Créez votre compte en quelques secondes.</p>
          </div>

          {/* Alertes Globales */}
          {(error || notification) && (
            <div className={`mb-6 p-4 border-l-4 rounded-r-lg text-sm animate-in fade-in slide-in-from-top-2 
              ${error ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
              {error ? (error.message || "Une erreur est survenue") : notification}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField 
              label="Nom"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Votre nom complet"
              error={localErrors.name}
            />

            <InputField 
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              error={localErrors.email}
            />

            <InputField 
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={localErrors.password}
            />

            <InputField 
              label="Confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirmez votre mot de passe"
              error={localErrors.password_confirmation}
            />

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-black text-white h-12 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-400 shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.25),-0.5px_-0.5px_1px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2"
              >
                {loading ? "Création du compte..." : "Créer mon compte"}
              </button>
            </div>

            <p className="text-center text-gray-600 mt-6">
              Déjà un compte ?{" "}
              <Link to="/login" className="font-bold text-[#633BBC] hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;