import api from "./axios";

//Récupère tous les projets
export const getProjects = () => {
  return api.get("/api/groupe-5/projets");
}

export const createProject = (data) => {
  return api.post("/api/groupe-5/projets", data);
}