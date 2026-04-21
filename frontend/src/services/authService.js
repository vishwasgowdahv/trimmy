import { authApi } from '../api/authApi';

export const authService = {
  login: async (email, password) => {
    const data = await authApi.login(email, password);

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  },

  register: async (userData) => {
    return await authApi.register(userData);
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  verifyEmail: async (token) => {
    return await authApi.verifyEmail(token);
  },

  forgotPassword: async (email) => {
    return await authApi.forgotPassword(email);
  },

  resetPassword: async (token, password) => {
    return await authApi.resetPassword(token, password);
  },

  refreshAccessToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) throw new Error('No refresh token');

    const data = await authApi.refreshToken(refreshToken);

    localStorage.setItem('accessToken', data.accessToken);

    return data.accessToken;
  },

  getAccessToken: () => localStorage.getItem('accessToken'),

  isAuthenticated: () => !!localStorage.getItem('accessToken'),
};