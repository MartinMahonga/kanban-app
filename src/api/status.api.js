import api from "./axios";

export const changeStatus = (taskId, status) => {
  return api.put(`/api/groupe-5/taches/${taskId}/status`, status)
}