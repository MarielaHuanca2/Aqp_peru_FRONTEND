import React, { createContext, useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarritoContext = createContext();
const CARRITO_STORAGE_KEY = "carritoCompras";

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  // Inicializar carrito desde localStorage
  const [carrito, setCarrito] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem(CARRITO_STORAGE_KEY);
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      console.error("Error al cargar carrito desde localStorage:", error);
      return [];
    }
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar carrito en localStorage:", error);
    }
  }, [carrito]);

  const actualizarCantidad = (idProducto, cantidadSolicitada) => {
    if (!Number.isFinite(cantidadSolicitada) || cantidadSolicitada < 1) {
      return;
    }

    setCarrito((prev) =>
      prev.map((item) => {
        if (item.idProducto !== idProducto) {
          return item;
        }

        if (item.stock && cantidadSolicitada > item.stock) {
          toast.error("No puedes solicitar más unidades que las disponibles en stock.");
          return item;
        }

        if (item.cantidad === cantidadSolicitada) {
          return item;
        }

        return { ...item, cantidad: cantidadSolicitada };
      })
    );
  };

  const agregarAlCarrito = (producto, cantidad = 1) => {
    let alertaMostrada = false;

    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.idProducto === producto.idProducto
      );

      // 🟢 PRODUCTO EXISTENTE
      if (existe) {
        const nuevaCantidad = existe.cantidad + cantidad;

        if (nuevaCantidad > producto.stock) {
          toast.error(
            "No puedes agregar más productos de los disponibles en stock."
          );
          return prev;
        }

        if (!alertaMostrada) {
          toast.success("Producto agregado al carrito");
          alertaMostrada = true;
        }

        return prev.map((item) =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: nuevaCantidad }
            : item
        );
      }

      // 🟢 PRODUCTO NUEVO
      if (cantidad > producto.stock) {
        toast.error(
          "No puedes agregar más productos de los disponibles en stock."
        );
        return prev;
      }

      const precioUSD = producto.precioUSD ?? producto.precio ?? 0;
      const precioUsdNumber =
        typeof precioUSD === "string"
          ? parseFloat(precioUSD) || 0
          : precioUSD;

      if (!alertaMostrada) {
        toast.success("Producto agregado al carrito");
        alertaMostrada = true;
      }

      return [
        ...prev,
        { ...producto, precioUSD: precioUsdNumber, cantidad },
      ];
    });
  };

  const quitarDelCarrito = (idProducto) => {
    setCarrito((prev) =>
      prev.filter((item) => item.idProducto !== idProducto)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    try {
      localStorage.removeItem(CARRITO_STORAGE_KEY);
    } catch (error) {
      console.error("Error al limpiar carrito en localStorage:", error);
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        vaciarCarrito,
        actualizarCantidad,
      }}
    >
      {children}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </CarritoContext.Provider>
  );
}


