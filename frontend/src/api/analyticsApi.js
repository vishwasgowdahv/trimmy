import { fetchWithAuth } from "../utils/fetchWithAuth";

const BASE_URL = "http://localhost:8000/api/v1";

export const analyticsApi = {
  getAnalytics: async (urlId) => {
    return fetchWithAuth(`${BASE_URL}/analytics/${urlId}`);
  },

  getGeoStats: async (urlId) => {
    return fetchWithAuth(`${BASE_URL}/analytics/${urlId}/geo`);
  },

  getDeviceStats: async (urlId) => {
    return fetchWithAuth(`${BASE_URL}/analytics/${urlId}/devices`);
  },
};