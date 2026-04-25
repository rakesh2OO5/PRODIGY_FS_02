import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem("ems_admin");
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("ems_token"));
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateSession = async () => {
      if (!token) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setAdmin(data.admin);
      } catch (error) {
        localStorage.removeItem("ems_token");
        localStorage.removeItem("ems_admin");
        setToken(null);
        setAdmin(null);
      } finally {
        setAuthLoading(false);
      }
    };

    validateSession();
  }, [token]);

  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    localStorage.setItem("ems_token", data.token);
    localStorage.setItem("ems_admin", JSON.stringify(data.admin));
    setToken(data.token);
    setAdmin(data.admin);
    navigate("/employees");
  };

  const logout = () => {
    localStorage.removeItem("ems_token");
    localStorage.removeItem("ems_admin");
    setToken(null);
    setAdmin(null);
    navigate("/login");
  };

  const value = {
    admin,
    token,
    authLoading,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
