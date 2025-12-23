import api from "./axios";

// Connexion
export const login = (data) => {
  return api.post(`/api/groupe-5/auth/login`, data);
};

// Inscription
export const register = (data) => {
  return api.post(`/api/groupe-5/auth/register`, data);
};