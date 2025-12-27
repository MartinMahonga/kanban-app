import { Github, Youtube, Twitter } from 'lucide-react';
import logo from '@/assets/icon.png';

// On centralise les données pour un code plus lisible et facile à maintenir
const footerLinks = {
  liensUtiles: [
    { name: "Accueil", href: "/" },
    { name: "Features", href: "/" },
    { name: "A propos", href: "/" },
  ],
  support: [
    { name: "Team", href: "/" },
    { name: "Repository", href: "/" },
    { name: "Contact", href: "/" },
  ]
};

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* COLONNE 1 : LOGO & RESEAUX */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center text-2xl font-bold gap-2 mb-6">
              <img src={logo} alt="Rudix logo" className="h-8 w-auto" />
              <span>Rudix</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              La plateforme de gestion de projet conçue pour la clarté et l'efficacité des équipes modernes.
            </p>
            <div className="flex items-center gap-5">
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Youtube} href="#" />
              <SocialIcon Icon={Github} href="#" />
            </div>
          </div>

          {/* COLONNE 2 : LIENS UTILES */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 uppercase text-xs tracking-wider">Liens utiles</h3>
            <ul className="space-y-4">
              {footerLinks.liensUtiles.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-[#633BBC] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE 3 : SUPPORT */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-6 uppercase text-xs tracking-wider">Support</h3>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-[#633BBC] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COPYRIGHT BASE */}
        <div className="mt-4 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm italic">
            © {new Date().getFullYear()} Rudix, LLC. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:underline">Confidentialité</a>
            <a href="#" className="hover:underline">Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Petit composant interne pour les icônes sociales (évite de répéter les classes)
const SocialIcon = ({ Icon, href }) => (
  <a 
    href={href} 
    className="group p-2 bg-gray-50 rounded-lg hover:bg-[#633BBC]/10 transition-all duration-300"
  >
    <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#633BBC] transition-colors" />
  </a>
);

export default Footer;