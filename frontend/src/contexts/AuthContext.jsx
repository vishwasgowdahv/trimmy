import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated(),
  );
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize auth on app load — just check if a token exists in localStorage.
  // Token refresh happens lazily when an API call returns 401.
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    setInitializing(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      setIsAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await authService.register(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.getUser();
      setUser(data.data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        initializing,
        loading,
        error,
        login,
        register,
        logout,
        getUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
