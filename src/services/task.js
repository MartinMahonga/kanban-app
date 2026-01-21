import api from './api';

export const fetchTasks = async (projectId) => {
  const response = await api.get(`/projets/${projectId}/taches`);
  return response.data;
};

export const createTask = async (projectId, data) => {
  // data: { titre, description, status, priorite, user_id (optional), deadline (optional) }
  const response = await api.post(`/projets/${projectId}/taches`, data);
  return response.data;
};

export const updateTaskStatus = async (projectId, taskId, status) => {
  // Using the specific endpoint provided by user
  const response = await api.put(`/taches/${taskId}/status`, { status });
  return response.data;
};

export const assignTask = async (taskId, userIds) => {
    // userIds: [id1, id2, ...]
    const response = await api.post(`/taches/${taskId}/assign`, { user_ids: userIds });
    return response.data;
};

export const updateTask = async (projectId, taskId, data) => {
    // data: { titre, description, priorite, status, deadline }
    // Using simple endpoint for general updates (including priority and deadline)
    const response = await api.put(`/taches/${taskId}`, data);
    return response.data;
};
