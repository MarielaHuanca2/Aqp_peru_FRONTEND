import axios from "axios";

export function enviarCorreoPedido({ para, cliente, pedidoId, total, urlDetalle, items }) {
  const payload = { para, cliente, pedidoId, total, urlDetalle, items };
  console.log("Enviando JSON a la API:", payload);
  return axios.post("http://localhost:8080/api/email/enviar-html", payload);
}
