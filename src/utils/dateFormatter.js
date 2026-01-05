import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Transforme une date en texte relatif (ex: "il y a 2 jours")
 * @param {string | Date} date 
 */
export const formatRelativeDate = (date) => {
  if (!date) return "Date inconnue";
  
  return formatDistanceToNow(new Date(date), { 
    addSuffix: true, // Ajoute "il y a" ou "dans"
    locale: fr       // Force le français
  });
};