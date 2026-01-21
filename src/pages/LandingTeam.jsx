import LandingNav from "../components/layout/LandingNav";

export default function LandingTeam() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">
      <LandingNav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Rudix - Gestion de Projets Kanban</h1>
        
        <div className="space-y-6 text-lg text-slate-700">
          <p>
            Rudix est une application web moderne de gestion de projets basée sur la méthodologie Kanban. 
            Elle permet aux équipes de collaborer efficacement en organisant les tâches de manière visuelle et intuitive.
          </p>
          
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900">Caractéristiques principales</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Tableaux Kanban personnalisables avec colonnes adaptables</li>
              <li>Création et gestion de cartes de tâches avec descriptions détaillées</li>
              <li>Collaboration en temps réel entre les membres de l'équipe</li>
              <li>Système de priorités et d'étiquettes pour une meilleure organisation</li>
              <li>Suivi de progression des projets et statistiques</li>
              <li>Interface drag-and-drop fluide et responsive</li>
            </ul>
          </div>
          
          <p>
            Rudix est conçu pour améliorer la productivité et la communication au sein des équipes, 
            qu'elles soient petites ou grandes, en centralisant la gestion des projets dans une plateforme unique et accessible.
          </p>
        </div>
      </div>

    </div>
  );
}
