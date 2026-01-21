import api from './api';

export const fetchLabels = async () => {
  const response = await api.get('/labels');
  return response.data;
};

export const createLabel = async (name, color) => {
  const response = await api.post('/labels', { nom: name, couleur: color });
  return response.data;
};

export const assignLabelToTask = async (taskId, labelId) => {
  const response = await api.post(`/taches/${taskId}/labels`, { label_id: labelId });
  return response.data;
};

export const removeLabelFromTask = async (taskId, labelId) => {
  const response = await api.delete(`/taches/${taskId}/labels/${labelId}`);
  return response.data;
};

export const fetchTaskLabels = async (taskId) => {
  const response = await api.get(`/taches/${taskId}/labels`);
  return response.data;
};
