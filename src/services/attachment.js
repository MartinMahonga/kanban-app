import api from './api';

export const fetchAttachments = async (taskId) => {
  const response = await api.get(`/taches/${taskId}/pieces-jointes`);
  return response.data;
};

export const uploadAttachment = async (taskId, file) => {
  const formData = new FormData();
  formData.append('fichier', file);
  
  const response = await api.post(`/taches/${taskId}/pieces-jointes`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteAttachment = async (attachmentId) => {
  const response = await api.delete(`/pieces-jointes/${attachmentId}`);
  return response.data;
};

export const getAttachmentUrl = (attachmentId) => {
  // Assuming the API provides a download endpoint
  return `${api.defaults.baseURL}/pieces-jointes/${attachmentId}/download`;
};
