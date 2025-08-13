import apiClient from "./authService";

const PRODUCTOS_URL = "/productos";

export const obtenerProductos = () => apiClient.get(PRODUCTOS_URL);