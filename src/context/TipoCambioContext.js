import React, { createContext, useContext, useState, useEffect } from "react";
import { obtenerTipoCambio } from "../services/tipoCambioService";

const TipoCambioContext = createContext();

export const useTipoCambio = () => {
  const context = useContext(TipoCambioContext);
  if (!context) {
    throw new Error("useTipoCambio debe ser usado dentro de TipoCambioProvider");
  }
  return context;
};

export const TipoCambioProvider = ({ children }) => {
  const [tipoCambio, setTipoCambio] = useState(3.75); // Valor por defecto
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarTipoCambio();
  }, []);

  const cargarTipoCambio = async () => {
    try {
      setLoading(true);
      const response = await obtenerTipoCambio();
      setTipoCambio(response.data.valor || 3.75);
    } catch (error) {
      console.error("Error al cargar tipo de cambio:", error);
      // Si hay error, usar valor por defecto
      setTipoCambio(3.75);
    } finally {
      setLoading(false);
    }
  };

  const actualizarTipoCambioLocal = (nuevoTipoCambio) => {
    setTipoCambio(nuevoTipoCambio);
  };

  const convertirAMonedaSoles = (precioUSD) => {
    return precioUSD * tipoCambio;
  };

  const formatearPrecioSoles = (precioUSD) => {
    const precioSoles = convertirAMonedaSoles(precioUSD);
    return `S/ ${precioSoles.toFixed(2)}`;
  };

  const value = {
    tipoCambio,
    loading,
    cargarTipoCambio,
    actualizarTipoCambioLocal,
    convertirAMonedaSoles,
    formatearPrecioSoles
  };

  return (
    <TipoCambioContext.Provider value={value}>
      {children}
    </TipoCambioContext.Provider>
  );
};
