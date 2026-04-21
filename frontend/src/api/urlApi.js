import { fetchWithAuth } from "../utils/fetchWithAuth";

const BASE_URL = "http://localhost:8000/api/v1";

export const urlApi = {
  createUrl: async (originalUrl) => {
    return fetchWithAuth(`${BASE_URL}/urls`, {
      method: "POST",
      body: JSON.stringify({ originalUrl }),
    });
  },

  getUserUrls: async () => {
    return fetchWithAuth(`${BASE_URL}/urls`);
  },

  deleteUrl: async (urlId) => {
    return fetchWithAuth(`${BASE_URL}/urls/${urlId}`, {
      method: "DELETE",
    });
  },
};