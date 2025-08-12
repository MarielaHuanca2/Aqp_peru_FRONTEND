import axios from "axios";

export function enviarCorreoPedido({ para, cliente, pedidoId, total, urlDetalle, items }) {
  const payload = { para, cliente, pedidoId, total, urlDetalle, items };
  console.log("Enviando JSON a la API:", payload);
  return axios.post("http://localhost:8080/api/email/enviar-html", payload);
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
  return axios.post("http://localhost:8080/api/email/notificar-empresa", payload);
}
