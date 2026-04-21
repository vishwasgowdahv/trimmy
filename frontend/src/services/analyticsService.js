import { analyticsApi } from '../api/analyticsApi';
import { authService } from './authService';

export const analyticsService = {
  getAnalytics: async (urlId) => {
    const token = authService.getStoredToken();

    const data = await analyticsApi.getAnalytics(urlId, token);

    return data;
  },
};