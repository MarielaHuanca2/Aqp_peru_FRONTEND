import React, { useState } from "react";
import { Container, Table, Button, Alert, Form, Row, Col, Spinner } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";
import { enviarCorreoPedido } from "../services/emailService";

const Carrito = () => {
  const { carrito, quitarDelCarrito, vaciarCarrito } = useCarrito();
  const [form, setForm] = useState({ para: "", cliente: "" });
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEnviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje(null);
    const pedidoId = `PED${Date.now()}`;
    const urlDetalle = `${window.location.origin}/carrito`;
    const items = carrito.map((item) => ({
      nombre: item.producto,
      cantidad: item.cantidad,
      precio: item.precio
    }));
    try {
      await enviarCorreoPedido({
        para: form.para,
        cliente: form.cliente,
        pedidoId,
        total,
        urlDetalle,
        items
      });
      setMensaje({ tipo: "success", texto: "¡Correo enviado correctamente!" });
      vaciarCarrito();
      setForm({ para: "", cliente: "" });
    } catch (err) {
      setMensaje({ tipo: "danger", texto: "Error al enviar el correo. Verifica los datos." });
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
                  <td>{item.moneda?.simboloMoneda || 'S/'} {item.precio?.toFixed(2)}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.moneda?.simboloMoneda || 'S/'} {(item.precio * item.cantidad).toFixed(2)}</td>
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
            <h4>Total: {carrito[0]?.moneda?.simboloMoneda || 'S/'} {total.toFixed(2)}</h4>
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
                  <Form.Label>Nombre del cliente</Form.Label>
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
            <Button type="submit" variant="primary" disabled={enviando}>
              {enviando ? <Spinner animation="border" size="sm" /> : "Confirmar pedido y enviar correo"}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};
export default Carrito;
