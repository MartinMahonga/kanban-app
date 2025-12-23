import api from "./axios";

export const changeStatus = (status) => {
  return api.put("/api/groupe-5/taches/1/status", status)
}