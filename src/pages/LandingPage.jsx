import { useEffect, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LandingNav from "../components/layout/LandingNav";
import Footer from "../components/layout/Footer";
import { Testimonials } from "../components/layout/Testimonials";
import video from "../assets/Screencast from 2026-01-21 14-46-23.webm";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
  }, []);

  if (loading) return null;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      {/* Shared Navigation */}
      <LandingNav />

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/50 border border-slate-200 text-xs font-medium text-slate-600 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Available now v1.0
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
          Pilotez vos projets avec
          <br />
          <span className="bg-gradient-to-r from-[#7c3aed] to-[#a855f7] bg-clip-text text-transparent">
            une clarté absolue.
          </span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Centralisez vos tâches, collaborez en temps réel avec votre équipe et
          visualisez vos progrès. Rudix transforme le chaos en une roadmap
          structurée pour que vous puissiez vous concentrer sur l'essentiel
          "livrer".
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={user ? "/dashboard" : "/register"}
            className="h-12 px-8 rounded-full bg-slate-900 text-white font-medium flex items-center gap-2 hover:bg-slate-700 hover:px-10 transition-all duration-300 shadow-lg shadow-slate-200"
          >
            Démarrer gratuitement <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="h-12 px-8 rounded-full bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            Voir la démo
          </button>
        </div>

        {/* Mockup */}
        <div className="w-full max-w-6xl mx-auto mt-16 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-xl bg-gray-900 shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="h-8 bg-gray-800 flex items-center px-4 gap-2 select-none">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <video 
              ref={videoRef}
              className="w-full block bg-gray-900" 
              autoPlay 
              muted 
              loop
            >
              <source src={video} type="video/webm"/>
            </video>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <Testimonials />

      {/* Footer */}
      <Footer />
    </div>
  );
}
