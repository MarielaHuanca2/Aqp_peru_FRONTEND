import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.idProducto === producto.idProducto);
      if (existe) {
        return prev.map((item) =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
  // Normalize price: store a canonical precioUSD field (coerce to Number)
  const precioUSD = producto.precioUSD ?? producto.precio ?? 0;
  const precioUsdNumber = typeof precioUSD === 'string' ? parseFloat(precioUSD) || 0 : precioUSD;
  return [...prev, { ...producto, precioUSD: precioUsdNumber, cantidad }];
      }
    });
  };

  const quitarDelCarrito = (idProducto) => {
    setCarrito((prev) => prev.filter((item) => item.idProducto !== idProducto));
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}
