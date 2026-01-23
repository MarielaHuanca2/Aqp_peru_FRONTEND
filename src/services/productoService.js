import apiClient from "./authService";

const PRODUCTOS_URL = "/productos";
const OFERTAS_URL = "/productos-ofertas";

export const obtenerProductos = () => apiClient.get(PRODUCTOS_URL);

// Ofertas endpoints
export const crearProductosOfertas = (productos) => apiClient.post(OFERTAS_URL, productos);
export const importarCsvOfertas = (formData) => apiClient.post(`${OFERTAS_URL}/importar-csv`, formData, {
	headers: { 'Content-Type': 'multipart/form-data' }
});

export const obtenerOfertas = () => apiClient.get(OFERTAS_URL, { skipAuthRedirect: true });

// Toggle oferta status for a product
export const toggleOfertaProducto = (id, esOferta) => apiClient.patch(`${PRODUCTOS_URL}/${id}/oferta`, { esOferta });

// CRUD para una oferta individual
export const obtenerOferta = (id) => apiClient.get(`${OFERTAS_URL}/${id}`);
export const crearOferta = (oferta) => apiClient.post(OFERTAS_URL, oferta);
export const actualizarOferta = (id, oferta) => apiClient.put(`${OFERTAS_URL}/${id}`, oferta);
export const eliminarOferta = (id) => apiClient.delete(`${OFERTAS_URL}/${id}`);