import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
      if (user) {
          localStorage.setItem('user', JSON.stringify(user));
      } else {
          localStorage.removeItem('user');
      }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);

      const accessToken = data.access_token || data.token;
      setToken(accessToken);
      setUser(data.user); 
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    setLoading(true);
    try {
      const data = await authService.register(name, email, password, passwordConfirmation);
      const accessToken = data.access_token || data.token;
      setToken(accessToken);
      setUser(data.user);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
