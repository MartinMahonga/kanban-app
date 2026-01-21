import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password, password_confirmation) => {
  const response = await api.post('/auth/register', { 
    name, 
    email, 
    password, 
    password_confirmation 
  });
  return response.data;
};

export const logout = async () => {
  // If the API has a logout endpoint, call it here.
  // api.post('/auth/logout');
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
    // If there is a /me endpoint, use it.
    // For now we might rely on stored user data or fetched from login response.
    // Assuming we might need to fetch profile if token persists but page reloads.
    // return api.get('/auth/me');
};
