import api from "./axios";

export const assignTask = (userId) => {
  return api.post("/api/groupe-5/taches/1/assign", userId)
}