import { useState } from 'react';
import { X } from 'lucide-react';
import { db } from '../data/db';

const TaskModal = ({ isOpen, onClose, onSave, projectId }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    priorite: 'medium',
    user_id: '',
    status: 'todo' // Par défaut selon ton SQL
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // On ajoute l'ID du projet dynamiquement
    onSave({ ...formData, projet_id: parseInt(projectId), id: Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Nouvelle Tâche</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Titre de la tâche</label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
              placeholder="Ex: Finir le design"
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all h-24 resize-none"
              placeholder="Détails du travail à effectuer..."
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Priorité</label>
              <select 
                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none bg-white"
                value={formData.priorite}
                onChange={(e) => setFormData({...formData, priorite: e.target.value})}
              >
                <option value="low">Faible</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Assigner à</label>
              <select 
                className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none bg-white"
                onChange={(e) => setFormData({...formData, user_id: e.target.value})}
              >
                <option value="">Non assigné</option>
                {db.users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              Créer la tâche
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;