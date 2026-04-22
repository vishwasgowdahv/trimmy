import { fetchWithAuth } from "../utils/fetchWithAuth";

const BASE_URL = "http://localhost:8000/api/v1";

export const authApi = {
  login: async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);
    return data; // { accessToken, refreshToken }
  },

  register: async (userData) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data?.message);
    } else {
      return data;
    }
  },

  verifyEmail: async (token) => {
    const res = await fetch(`${BASE_URL}/auth/verify-email?token=${token}`);

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);
    return data;
  },

  forgotPassword: async (email) => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);
    return data;
  },

  resetPassword: async (token, password) => {
    const res = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);
    return data;
  },

  refreshToken: async (refreshToken) => {
    const res = await fetch(`${BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message);
    return data;
  },

  getUser: async () => {
    const res = await fetchWithAuth(`${BASE_URL}/auth/me`);
    if (!res.success) {
      throw new Error(res?.message);
    } else {
      return res;
    }
  },
};
