import { urlApi } from "../api/urlApi";

export const urlService = {
  createUrl: async (originalUrl) => {
    const data = await urlApi.createUrl(originalUrl);
    return data;
  },

  getUserUrls: async () => {
    const data = await urlApi.getUserUrls();
    return data;
  },

  deleteUrl: async (urlId) => {
    const data = await urlApi.deleteUrl(urlId);
    return data;
  },
};
