import api from "./axios";

export const getTasks = () => {
  return api.get("/api/groupe-5/projets/1/taches");
}

export const createTask = (data) => {
  return api.post("/api/groupe-5/projets/1/taches", data);
} 