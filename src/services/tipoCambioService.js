import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const TIPO_CAMBIO_KEY = "tipoCambio";

// Obtener el tipo de cambio desde localStorage o valor por defecto
export const obtenerTipoCambio = () => {
  return new Promise((resolve) => {
    const tipoCambioGuardado = localStorage.getItem(TIPO_CAMBIO_KEY);
    const valor = tipoCambioGuardado ? parseFloat(tipoCambioGuardado) : 3.75;
    resolve({ data: { valor } });
  });
};

// Actualizar el tipo de cambio en localStorage
export const actualizarTipoCambio = (tipoCambio) => {
  return new Promise((resolve) => {
    localStorage.setItem(TIPO_CAMBIO_KEY, tipoCambio.toString());
    resolve({ data: { valor: tipoCambio } });
  });
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
