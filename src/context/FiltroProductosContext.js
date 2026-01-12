import { createContext, useContext, useState } from "react";

const FiltroProductosContext = createContext();

export const FiltroProductosProvider = ({ children }) => {
  const [filtros, setFiltros] = useState({
    texto: "",
    marca: "",
    categoria: "",
    subCategoria: "",
    condicion: "",
    precioMin: "",
    precioMax: ""
  });

  return (
    <FiltroProductosContext.Provider value={{ filtros, setFiltros }}>
      {children}
    </FiltroProductosContext.Provider>
  );
};

export const useFiltroProductos = () => useContext(FiltroProductosContext);
export default FiltroProductosContext;