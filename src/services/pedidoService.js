import apiClient from "./authService";

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
  return apiClient.post("/pedidos", payload);
}

export async function obtenerPedidosPorCorreo(correo) {
  console.log("[pedidoService] GET /pedidos/buscar/correo ->", correo);
  return apiClient.get(`/pedidos/buscar/correo/${correo}`);
}

export default { crearPedido, obtenerPedidosPorCorreo, EJEMPLO_PEDIDO };
