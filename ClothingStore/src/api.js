import axios from "axios";

const API_URL = "http://localhost:5112/api";

export const api = axios.create({
  baseURL: API_URL,
});

export const fetchProducts = (type, size) =>
  api.get(`/products/report`, { params: { type, size } });

export const addToCart = (productId, quantity = 1) =>
  api.post(`/cart/add?productId=${productId}&quantity=${quantity}`);

export const fetchCart = () => api.get("/cart");

export const removeFromCart = (productId) =>
  api.delete(`/cart/remove/${productId}`);

export const checkout = () => api.post("/checkout");

export const restockProduct = (product) =>
  api.post("/products/restock", product);
