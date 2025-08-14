import React, { useState } from "react";
import { Container, Table, Button, Alert, Form, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useTipoCambio } from "../context/TipoCambioContext";
import { enviarCorreoPedido, notificarEmpresa, crearPedido } from "../services/emailService";
import { authService } from "../services/authService";

const Carrito = () => {
  const { carrito, quitarDelCarrito, vaciarCarrito } = useCarrito();
  const { formatearPrecioSoles, convertirAMonedaSoles } = useTipoCambio();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    para: "", 
    cliente: "", 
    apellidos: "",
    telefono: "", 
    direccion: ""
  });
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  // Normalize: keep totals in base currency (USD) and convert only when formatting/sending
  const totalUsd = carrito.reduce((acc, item) => acc + ((item.precioUSD ?? item.precio ?? 0) * item.cantidad), 0);
  // Cálculo de IGV 18% en USD
  const subtotalSinIgv = totalUsd; // in USD
  const igv = +(subtotalSinIgv * 0.18);
  const totalConIgv = +(subtotalSinIgv + igv); // in USD
  const totalConIgvSoles = convertirAMonedaSoles(totalConIgv); // converted once when needed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    // Verificar sesión: solo usuarios autenticados pueden enviar correos desde la UI
    if (!authService.isAuthenticated()) {
      setMensaje({ tipo: "danger", texto: "Es necesario estar registrado para hacer pedidos." });
      setEnviando(false);
      return;
    }
    setEnviando(true);
    setMensaje(null);
    const pedidoId = `PED${Date.now()}`;
    const urlDetalle = `${window.location.origin}/carrito`;
    const items = carrito.map((item) => ({
      nombre: item.producto,
      cantidad: item.cantidad,
      precio: (item.precioUSD ?? item.precio ?? 0)
    }));
    
    const itemsEmpresa = carrito.map((item) => ({
      nombre: item.producto,
      descripcion: item.descripcion || item.producto,
      sku: item.nroSKU || item.idProducto,
      cantidad: item.cantidad,
      precio: (item.precioUSD ?? item.precio ?? 0).toString(),
      subtotal: (item.cantidad * convertirAMonedaSoles(item.precioUSD ?? item.precio ?? 0)).toString()
    }));

    try {
      // Crear pedido en el backend con el formato correcto
      const detallesPedido = carrito.map((item) => {
        // Extraer el número del ID (ej: "PROD000001" -> "1")
        const idNumerico = item.idProducto.replace(/\D/g, '') || "1";
        return {
          producto: { 
            idProducto: idNumerico 
          },
          cantidad: item.cantidad
        };
      });

      const pedidoData = {
        nombres: form.cliente,
        apellidos: form.apellidos,
        correo: form.para,
        telefono: form.telefono,
        fechaSolicitud: new Date().toISOString(),
        detalles: detallesPedido
      };

      // Console log fácil de leer para el POST del pedido
      console.log("🚀 ===== ENVIANDO PEDIDO AL BACKEND =====");
      console.log("📍 URL: POST /api/pedidos");
      console.log("📦 DATOS DEL PEDIDO:");
      console.log(JSON.stringify(pedidoData, null, 2));
      console.log("============================================");

      // Intentar crear pedido, pero no bloquear el envío de correos si el endpoint requiere auth
      let pedidoCreado = false;
  try {
        await crearPedido(pedidoData);
        pedidoCreado = true;
      } catch (errCreate) {
        console.warn("crearPedido falló:", errCreate.response?.status, errCreate.response?.data || errCreate.message);
      }

      // Enviar correo al cliente (se hace con publicClient en emailService)
      let correoClienteOk = false;
      try {
        await enviarCorreoPedido({
          para: form.para,
          cliente: `${form.cliente} ${form.apellidos}`,
          pedidoId,
          // enviar total en soles al cliente
          total: totalConIgvSoles,
          urlDetalle,
          items
        });
        correoClienteOk = true;
      } catch (errMail) {
        console.error("Error al enviar correo al cliente:", errMail.response?.status, errMail.response?.data || errMail.message);
      }

      // Notificar a la empresa (correo fijo)
      let correoEmpresaOk = false;
      try {
        await notificarEmpresa({
          paraEmpresa: "pelopelo103@gmail.com", // Correo fijo de la empresa
          cliente: `${form.cliente} ${form.apellidos}`,
          correoCliente: form.para,
          telefonoCliente: form.telefono,
          direccionCliente: form.direccion,
          pedidoId,
          // enviar total en soles a la empresa
          total: totalConIgvSoles.toString(), // Convertir a string en soles como requiere la API
          items: itemsEmpresa
        });
        correoEmpresaOk = true;
      } catch (errNotify) {
        console.error("Error al notificar a la empresa:", errNotify.response?.status, errNotify.response?.data || errNotify.message);
      }

      // Mensajes según resultado
      if (pedidoCreado && correoClienteOk && correoEmpresaOk) {
        setMensaje({ tipo: "success", texto: "¡Pedido confirmado! Se creó el pedido y se enviaron los correos al cliente y a la empresa." });
      } else if (!pedidoCreado && (correoClienteOk || correoEmpresaOk)) {
        setMensaje({ tipo: "warning", texto: "No se pudo crear el pedido (401). Los correos se intentaron enviar." });
      } else if (!correoClienteOk && !correoEmpresaOk) {
        setMensaje({ tipo: "danger", texto: "Error: no se pudieron enviar los correos ni crear el pedido. Revisa la consola para más detalles." });
      } else {
        setMensaje({ tipo: "info", texto: "El proceso terminó con advertencias. Revisa la consola para más detalles." });
      }
      vaciarCarrito();
      setForm({ para: "", cliente: "", apellidos: "", telefono: "", direccion: "" });
    } catch (err) {
      console.error("❌ ERROR AL PROCESAR PEDIDO:", err);
      console.error("📄 Respuesta del servidor:", err.response?.data);
      setMensaje({ tipo: "danger", texto: `Error al procesar el pedido: ${err.response?.data?.message || err.message}` });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Mi Carrito de Compras</h2>
      {mensaje && <Alert variant={mensaje.tipo}>{mensaje.texto}</Alert>}
      {carrito.length === 0 ? (
        <Alert variant="info">Tu carrito está vacío.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.idProducto}>
                  <td>{item.producto}</td>
                  <td>{formatearPrecioSoles(item.precio || 0)}</td>
                  <td>{item.cantidad}</td>
                  <td>{formatearPrecioSoles((item.precio || 0) * item.cantidad)}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => quitarDelCarrito(item.idProducto)}>
                      Quitar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
            <Button variant="outline-danger" onClick={vaciarCarrito}>Vaciar carrito</Button>
            <div className="text-end">
              <div>Sin IGV: <strong>S/ {formatearPrecioSoles(subtotalSinIgv)}</strong></div>
              <div>Sin IGV: <strong>{formatearPrecioSoles(subtotalSinIgv)}</strong></div>
              <div>IGV (18%): <strong>{formatearPrecioSoles(igv)}</strong></div>
              <h4 className="mt-1">Total (con IGV): {formatearPrecioSoles(totalConIgv)}</h4>
            </div>
          </div>
          <Form onSubmit={handleEnviar} className="border p-3 rounded bg-light">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPara">
                  <Form.Label>Correo del cliente</Form.Label>
                  <Form.Control
                    type="email"
                    name="para"
                    value={form.para}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCliente">
                  <Form.Label>Nombres del cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="cliente"
                    value={form.cliente}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formApellidos">
                  <Form.Label>Apellidos del cliente</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formTelefono">
                  <Form.Label>Teléfono del cliente</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formDireccion">
                  <Form.Label>Dirección de entrega</Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary" disabled={enviando}>
              {enviando ? <Spinner animation="border" size="sm" /> : "Confirmar pedido y enviar correos"}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};
export default Carrito;
