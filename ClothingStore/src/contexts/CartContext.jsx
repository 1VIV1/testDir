import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const refreshCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const getItemQuantity = (productId) => {
    const item = cart.find((c) => c.productId === productId);
    return item ? item.quantity : 0;
  };

  const addToCartCtx = async (productId) => {
    try {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId);
        if (existing) {
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return prev;
      });

      await api.post(`/cart/add?productId=${productId}&quantity=1`);
      refreshCart();
    } catch (e) {
      alert("Ошибка добавления (возможно нет на складе)");
      refreshCart();
    }
  };

  const removeFromCartCtx = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      setCart((prev) => prev.filter((item) => item.productId !== productId));
    } catch (e) {
      console.error(e);
    }
  };

  const decreaseInCartCtx = async (productId) => {
    try {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId);

        if (existing.quantity > 1) {
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
        } else {
          return prev.filter((item) => item.productId !== productId);
        }
      });
      await api.post(`/cart/decrease?productId=${productId}&quantity=1`);
      refreshCart();
    } catch (e) {
      console.error(e);
      alert("Ошибка при обновлении корзины");
      refreshCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getItemQuantity,
        addToCartCtx,
        removeFromCartCtx,
        decreaseInCartCtx,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
