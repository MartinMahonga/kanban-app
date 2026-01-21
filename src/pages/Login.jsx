import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useToast } from "../context/ToastContext";
import pattern from "../assets/pattern.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* SECTION GAUCHE : Visuel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#633BBC] relative items-center justify-center overflow-hidden">
        {/* Motifs positionnés stratégiquement */}
        <img
          src={pattern}
          alt=""
          className="absolute -top-20 -left-100 -rotate-135"
        />
        <img
          src={pattern}
          alt=""
          className="absolute -bottom-100 -right-10 rotate-135"
        />

        <div className="relative z-10 px-16">
          <h1 className="text-white text-6xl font-bold leading-[1.1] max-w-lg tracking-tight">
            Welcome back to the <span className="opacity-80">Rudix family</span>
          </h1>
          <p className="text-purple-100 mt-6 text-lg max-w-sm">
            Connectez-vous pour continuer à gérer vos projets en toute
            simplicité.
          </p>
        </div>
      </div>

      {/* SECTION DROITE : Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-2xl font-bold text-slate-900">Se connecter</h1>
            <p className="text-slate-500 mt-2">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="Email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Mot de passe"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full bg-black text-white h-12 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-400 shadow-[0.5px_0.5px_1px_rgba(0,0,0,0.25),-0.5px_-0.5px_1px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2" isLoading={loading}>
              Se connecter
            </Button>

            <p className="text-center text-sm text-slate-500 mt-4">
              Vous n'avez pas de compte ?{" "}
              <Link
                to="/register"
                className="font-bold text-[#633BBC] hover:underline"
              >
                Créer un compte
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
