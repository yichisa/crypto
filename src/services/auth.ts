import axios from 'axios';

export const login = async (username: string, password: string) => {
  const response = await axios.post('/api/auth/login', { username, password });
  localStorage.setItem('token', response.data.access_token);
};

export const register = async (username: string, password: string) => {
  await axios.post('/api/auth/register', { username, password });
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};
