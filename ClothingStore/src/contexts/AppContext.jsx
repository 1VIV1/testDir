import { createContext, useContext, useState, useEffect } from "react";
import { api } from "./api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [cart, setCart] = useState({});

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", null, {
        params: { email, password },
      });
      const userData = { email, role: res.data.role };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateCart = (productId, delta) => {
    setCart((prev) => {
      const newQty = (prev[productId] || 0) + delta;
      if (newQty <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newQty };
    });
  };

  return (
    <AppContext.Provider
      value={{ user, login, logout, setUser, cart, updateCart }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
