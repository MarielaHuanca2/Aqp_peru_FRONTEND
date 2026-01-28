import React, { createContext, useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

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

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}
    >
      {children}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </CarritoContext.Provider>
  );
}


