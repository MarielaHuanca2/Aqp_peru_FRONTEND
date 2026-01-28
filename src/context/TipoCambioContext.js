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
      console.log("Respuesta completa de la API:", response);
      console.log("Data de la respuesta:", response.data);
      
      // Intentar diferentes estructuras de respuesta
      let valorTipoCambio = 3.75;
      if (response.data) {
        if (response.data.valor) {
          valorTipoCambio = response.data.valor;
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          valorTipoCambio = response.data[0].valor;
        } else if (typeof response.data === 'number') {
          valorTipoCambio = response.data;
        }
      }
      
      console.log("Valor del tipo de cambio cargado:", valorTipoCambio);
      setTipoCambio(valorTipoCambio);
    } catch (error) {
      console.error("Error al cargar tipo de cambio:", error);
      // Si hay error, usar valor por defecto
      setTipoCambio(3.75);
    } finally {
      setLoading(false);
    }
  };


  // Actualiza el tipo de cambio en la API y refresca el valor global
  const actualizarTipoCambioGlobal = async (nuevoTipoCambio, id = 1) => {
    try {
      setLoading(true);
      // Actualiza en la API con id
      const response = await import("../services/tipoCambioService").then(m => m.actualizarTipoCambio(nuevoTipoCambio, id));
      console.log("Respuesta de actualización:", response);
      console.log("Data de actualización:", response.data);
      
      // Extraer el valor actualizado de la respuesta
      let valorActualizado = nuevoTipoCambio;
      if (response.data) {
        if (response.data.valor) {
          valorActualizado = response.data.valor;
        } else if (Array.isArray(response.data) && response.data.length > 0) {
          valorActualizado = response.data[0].valor;
        } else if (typeof response.data === 'number') {
          valorActualizado = response.data;
        }
      }
      
      console.log("Valor actualizado del tipo de cambio:", valorActualizado);
      setTipoCambio(valorActualizado);
      return response;
    } catch (error) {
      console.error("Error al actualizar tipo de cambio:", error);
      setTipoCambio(nuevoTipoCambio); // fallback local
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const convertirAMonedaSoles = (precioUSD) => {
    return precioUSD * tipoCambio;
  };

  const formatearPrecioSoles = (precioUSD) => {
    const precioSoles = convertirAMonedaSoles(precioUSD);
    return `S/ ${precioSoles.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  };


  const value = {
    tipoCambio,
    loading,
    cargarTipoCambio,
    actualizarTipoCambioGlobal,
    convertirAMonedaSoles,
    formatearPrecioSoles
  };

  return (
    <TipoCambioContext.Provider value={value}>
      {children}
    </TipoCambioContext.Provider>
  );
};
