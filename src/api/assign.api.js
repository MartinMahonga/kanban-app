import api from "./axios";

export const assignTask = (userId, taskId) => {
  return api.post(`/api/groupe-5/taches/${taskId}/assign`, userId)
}