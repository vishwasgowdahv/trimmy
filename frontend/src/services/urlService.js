import { urlApi } from "../api/urlApi";
import { authService } from "./authService";

export const urlService = {
  createUrl: async (originalUrl) => {
    const token = authService.getStoredToken();

    const data = await urlApi.createUrl(originalUrl, token);

    // business logic
    return data;
  },

  getUserUrls: async () => {
    const token = authService.getStoredToken();

    const data = await urlApi.getUserUrls(token);

    return data;
  },
};
