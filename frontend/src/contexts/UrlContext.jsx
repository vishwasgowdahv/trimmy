import { createContext, useState } from "react";
import { urlService } from "../services/urlService";

const UrlContext = createContext(null);

export function UrlProvider({ children }) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUrls = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await urlService.getUserUrls();
      console.log(data);
      setUrls(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createUrl = async (originalUrl) => {
    setLoading(true);
    setError(null);
    try {
      const newUrl = await urlService.createUrl(originalUrl);
      setUrls((prev) => [newUrl, ...prev]); // optimistic update
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UrlContext.Provider value={{ urls, loading, error, fetchUrls, createUrl }}>
      {children}
    </UrlContext.Provider>
  );
}

export default UrlContext;
