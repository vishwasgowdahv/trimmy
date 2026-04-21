import { analyticsApi } from "../api/analyticsApi";

export const analyticsService = {
  getAnalytics: async (urlId) => {
    const data = await analyticsApi.getAnalytics(urlId);

    return data;
  },
};
