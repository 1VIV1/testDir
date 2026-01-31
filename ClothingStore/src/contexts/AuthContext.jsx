import React, { createContext, useContext, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", null, {
        params: { email, password },
      });
      const userData = { email, role: res.data.role };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (e) {
      return false;
    }
  };

  const register = async (email, password, role) => {
    try {
      const res = await api.post("/auth/register", null, {
        params: { email, password, role },
      });

      const userData = { email, role: res.data.role };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch (e) {
      console.error("Ошибка регистрации:", e.response?.data || e.message);
      return false;
    }
  };

  const logout = () => {
    api.post("/auth/logout");
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
