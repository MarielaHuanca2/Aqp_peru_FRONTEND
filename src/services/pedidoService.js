import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";
const publicClient = axios.create({ baseURL: API_BASE_URL });

// Ejemplo de JSON de pedido (para pruebas)
export const EJEMPLO_PEDIDO = {
  nombres: "Juan",
  apellidos: "Pérez",
  correo: "juan.perez@example.com",
  telefono: "+51999111222",
  detalles: [
    { producto: { idProducto: "PRD0000001" }, cantidad: 1 },
    { producto: { idProducto: "PRD0000002" }, cantidad: 2 }
  ]
};

export async function crearPedido(pedidoData) {
  // Asegurar estructura mínima y agregar fecha si falta
  const payload = {
    nombres: pedidoData.nombres,
    apellidos: pedidoData.apellidos,
    correo: pedidoData.correo,
    telefono: pedidoData.telefono,
    fechaSolicitud: pedidoData.fechaSolicitud ?? new Date().toISOString(),
    detalles: (pedidoData.detalles || []).map(d => ({
      ...d,
      producto: {
        ...(d.producto || {}),
        idProducto: String(d.producto?.idProducto ?? d.producto?.id ?? d.producto)
      }
    }))
  };

  console.log("[pedidoService] POST /pedidos ->", payload);
  return publicClient.post("/pedidos", payload);
}

export default { crearPedido, EJEMPLO_PEDIDO };
