import api from './api';

export const fetchComments = async (taskId) => {
  const response = await api.get(`/taches/${taskId}/commentaires`);
  return response.data;
};

export const addComment = async (taskId, content) => {
  const response = await api.post(`/taches/${taskId}/commentaires`, { contenu: content });
  return response.data;
};

export const deleteComment = async (commentId) => {
  const response = await api.delete(`/commentaires/${commentId}`);
  return response.data;
};
