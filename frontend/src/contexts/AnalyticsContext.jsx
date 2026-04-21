import { createContext, useState } from "react";
import { analyticsService } from "../services/analyticsService";

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ children }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (urlId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyticsService.getAnalytics(urlId);
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{ analytics, loading, error, fetchAnalytics }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export default AnalyticsContext;
