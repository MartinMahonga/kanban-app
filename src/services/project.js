import api from './api';

export const fetchProjects = async () => {
  const response = await api.get('/projets');
  return response.data;
};

export const createProject = async (name, description) => {
  const response = await api.post('/projets', { nom: name, description });
  return response.data;
};

export const fetchProject = async (id) => {
    const response = await api.get(`/projets/${id}`); 
    return response.data;
};

export const updateProject = async (id, data) => {
    // data: { nom, description }
    const response = await api.put(`/projets/${id}`, data);
    return response.data;
};

export const deleteProject = async (id) => {
    const response = await api.delete(`/projets/${id}`);
    return response.data;
};

export const addProjectMember = async (projectId, userId) => {
    const response = await api.post(`/projets/${projectId}/membres`, { user_id: userId });
    return response.data;
};
