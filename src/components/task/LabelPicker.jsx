import { useState, useEffect } from 'react';
import { X, Plus, Tag, Loader2 } from 'lucide-react';
import { fetchLabels, createLabel, fetchTaskLabels, assignLabelToTask, removeLabelFromTask } from '../../services/label';
import { useToast } from '../../context/ToastContext';

const predefinedColors = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', 
  '#ec4899', '#14b8a6', '#f97316', '#06b6d4', '#6366f1'
];

export default function LabelPicker({ taskId, onUpdate }) {
  const [allLabels, setAllLabels] = useState([]);
  const [taskLabels, setTaskLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);
  const toast = useToast();

  useEffect(() => {
    loadData();
  }, [taskId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [labels, taskLabelsData] = await Promise.all([
        fetchLabels(),
        fetchTaskLabels(taskId)
      ]);
      setAllLabels(Array.isArray(labels) ? labels : labels.data || []);
      setTaskLabels(Array.isArray(taskLabelsData) ? taskLabelsData : taskLabelsData.data || []);
    } catch (error) {
      console.error('Failed to load labels', error);
      toast.error('Failed to load labels');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLabel = async (e) => {
    e.preventDefault();
    if (!newLabelName.trim()) return;

    try {
      const response = await createLabel(newLabelName, selectedColor);
      const label = response.data || response;
      setAllLabels([...allLabels, label]);
      setNewLabelName('');
      setIsCreating(false);
      toast.success('Label created');
    } catch (error) {
      console.error('Failed to create label', error);
      toast.error('Failed to create label');
    }
  };

  const handleToggleLabel = async (label) => {
    const isAssigned = taskLabels.some(tl => tl.id === label.id);

    try {
      if (isAssigned) {
        await removeLabelFromTask(taskId, label.id);
        setTaskLabels(taskLabels.filter(tl => tl.id !== label.id));
        toast.success('Label removed');
      } else {
        await assignLabelToTask(taskId, label.id);
        setTaskLabels([...taskLabels, label]);
        toast.success('Label added');
      }
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Failed to toggle label', error);
      toast.error('Failed to update label');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-slate-700">Labels</label>
        <button
          type="button"
          onClick={() => setIsCreating(!isCreating)}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          <Plus className="h-3 w-3" />
          Nouveau label
        </button>
      </div>

      {/* Create Label Form */}
      {isCreating && (
        <form onSubmit={handleCreateLabel} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
          <input
            type="text"
            value={newLabelName}
            onChange={(e) => setNewLabelName(e.target.value)}
            placeholder="Label name"
            className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400"
            autoFocus
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600">Color:</span>
            <div className="flex gap-1 flex-wrap">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-slate-900' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md hover:bg-slate-800 transition-colors"
            >
              Créer
            </button>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Labels List */}
      <div className="flex flex-wrap gap-2">
        {allLabels.length === 0 ? (
          <p className="text-sm text-slate-500">Auncun label</p>
        ) : (
          allLabels.map((label) => {
            const isAssigned = taskLabels.some(tl => tl.id === label.id);
            return (
              <button
                key={label.id}
                type="button"
                onClick={() => handleToggleLabel(label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isAssigned
                    ? 'ring-2 ring-offset-1'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: label.couleur || '#64748b',
                  color: '#fff',
                  ringColor: label.couleur
                }}
              >
                <Tag className="h-3 w-3" />
                {label.nom}
                {isAssigned && <X className="h-3 w-3" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
