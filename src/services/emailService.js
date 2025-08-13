import apiClient from "./authService";

export function enviarCorreoPedido({ para, cliente, pedidoId, total, urlDetalle, items }) {
  const payload = { para, cliente, pedidoId, total, urlDetalle, items };
  console.log("Enviando JSON a la API:", payload);
  return apiClient.post("/email/enviar-html", payload);
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
  return apiClient.post("/email/notificar-empresa", payload);
}

export function crearPedido(pedidoData) {
  return apiClient.post("/pedidos", pedidoData);
}
