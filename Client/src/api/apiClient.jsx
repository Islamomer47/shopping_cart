import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Your backend API URL
  withCredentials: true, // To send cookies with requests
});

// Authentication API Calls
export const loginUser = (credentials) =>
  apiClient.post("/auth/login", credentials);

export const registerUser = (userData) =>
  apiClient.post("/auth/register", userData);

// Product Management API Calls
export const fetchProducts = () => apiClient.get("/products/get-all-product"); // Get all products

export const fetchProductById = (productId) =>
  apiClient.get(`/products/get-product-byId/${productId}`); // Get product by ID

export const addProduct = (productData) =>
  apiClient.post("/products/add-product", productData); // Add new product

export const updateProduct = (productId, productData) =>
  apiClient.put(`/products/update/${productId}`, productData); // Update existing product

export const deleteProduct = (productId) =>
  apiClient.delete(`/products/delete/${productId}`); // Delete product by ID

export default apiClient;
