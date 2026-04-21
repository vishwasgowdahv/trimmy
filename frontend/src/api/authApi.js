const BASE_URL = 'http://localhost:8000/api/v1';

export const authApi = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error('Login failed');
    return res.json(); // { accessToken, refreshToken }
  },

  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!res.ok) throw new Error('Register failed');
    return res.json();
  },

  verifyEmail: async (token) => {
    const res = await fetch(`${BASE_URL}/auth/verify-email?token=${token}`);
    if (!res.ok) throw new Error('Verification failed');
    return res.json();
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error('Failed to send reset email');
    return res.json();
  },

  resetPassword: async (token, password) => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    if (!res.ok) throw new Error('Reset failed');
    return res.json();
  },

  refreshToken: async (refreshToken) => {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error('Refresh failed');
    return res.json();
  },
};