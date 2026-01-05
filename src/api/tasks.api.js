import api from "./axios";

export const getTasks = (projectId) => {
  return api.get(`/api/groupe-5/projets/${projectId}/taches`);
}

export const createTask = (projectId, data) => {
  return api.post(`/api/groupe-5/projets/${projectId}/taches`, data);
} 