import axios from "axios";
import { API_BASE_URL } from "../constants/apiEndpoints";

// Public client without auth interceptors for endpoints that must be callable anonymously
const publicClient = axios.create({ baseURL: API_BASE_URL });

export function enviarCorreoPedido({ para, cliente, pedidoId, total, urlDetalle, items }) {
  const payload = { para, cliente, pedidoId, total, urlDetalle, items };
  console.log("Enviando JSON a la API:", payload);
  return publicClient.post("/email/enviar-html", payload);
}

export function notificarEmpresa({ 
  paraEmpresa, 
  cliente, 
  correoCliente, 
  telefonoCliente, 
  direccionCliente, 
  pedidoId, 
  total, 
  items 
}) {
  const payload = {
    paraEmpresa,
    cliente,
    correoCliente,
    telefonoCliente,
    direccionCliente,
    pedidoId,
    total: total.toString(),
    items: items.map(item => ({
      nombre: item.nombre,
      descripcion: item.descripcion || item.nombre,
      sku: item.sku || item.nroSKU || "N/A",
      cantidad: item.cantidad,
      precio: item.precio.toString(),
      subtotal: (item.cantidad * item.precio).toString()
    }))
  };
  
  console.log("Notificando a la empresa:", payload);
  return publicClient.post("/email/notificar-empresa", payload);
}

export function crearPedido(pedidoData) {
  // Crear pedido en endpoint público usando publicClient
  return publicClient.post("/pedidos", pedidoData);
}
