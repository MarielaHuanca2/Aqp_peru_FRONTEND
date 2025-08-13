import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Obtener el tipo de cambio desde la API
export const obtenerTipoCambio = () => {
  return axios.get(`${API_BASE_URL}/tipocambio/1`);
};

// Actualizar el tipo de cambio en la API (PUT)
export const actualizarTipoCambio = (tipoCambio, id = 1) => {
  return axios.put(`${API_BASE_URL}/tipocambio/${id}`, { valor: tipoCambio });
};

// Función para convertir precio de USD a PEN
export const convertirPrecio = (precioUSD, tipoCambio) => {
  return precioUSD * tipoCambio;
};

// Función para formatear el precio en soles
export const formatearPrecioSoles = (precioUSD, tipoCambio) => {
  const precioSoles = convertirPrecio(precioUSD, tipoCambio);
  return `S/ ${precioSoles.toFixed(2)}`;
};
