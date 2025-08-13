import React, { useState, useEffect } from "react";
import { Container, Card, Table, Alert, Spinner, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import apiClient from "../services/authService";

const PedidoDetalle = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/pedidos/${id}`);
        setPedido(response.data);
        setError(null);
      } catch (err) {
        setError("Error al cargar el pedido");
      } finally {
        setLoading(false);
      }
    };

    obtenerPedido();
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Cargando pedido...</div>
      </Container>
    );
  }

  if (error || !pedido) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error || "Pedido no encontrado"}</Alert>
        <Link to="/admin/pedidos" className="btn btn-secondary">
          Volver a Pedidos
        </Link>
      </Container>
    );
  }

  const calcularTotal = () => {
    return pedido.detalles?.reduce((total, detalle) => 
      total + (detalle.cantidad * detalle.producto.precio), 0
    ) || 0;
  };

  return (
    <Container className="mt-5">
      <h2>Detalle del Pedido #{pedido.id}</h2>
      
      <Card className="mb-4">
        <Card.Header>
          <h5>Información del Cliente</h5>
        </Card.Header>
        <Card.Body>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Nombre:</strong> {pedido.nombresSolicitante} {pedido.apellidosSolicitante}</p>
              <p><strong>Correo:</strong> {pedido.correoSolicitante}</p>
              <p><strong>Teléfono:</strong> {pedido.telefonoSolicitante}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Fecha del Pedido:</strong> {new Date(pedido.fechaPedido).toLocaleString()}</p>
              <p><strong>Estado:</strong> 
                <span className={`badge ms-2 ${pedido.estado === 'PENDIENTE' ? 'bg-warning' : 
                  pedido.estado === 'PROCESANDO' ? 'bg-info' : 
                  pedido.estado === 'COMPLETADO' ? 'bg-success' : 'bg-danger'}`}>
                  {pedido.estado}
                </span>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <h5>Productos del Pedido</h5>
        </Card.Header>
        <Card.Body>
          {pedido.detalles && pedido.detalles.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Precio Unitario</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.detalles.map((detalle, index) => (
                  <tr key={index}>
                    <td>{detalle.producto.producto}</td>
                    <td>{detalle.producto.marca}</td>
                    <td>{detalle.producto.moneda?.simboloMoneda || 'S/'} {detalle.producto.precio?.toFixed(2)}</td>
                    <td>{detalle.cantidad}</td>
                    <td>{detalle.producto.moneda?.simboloMoneda || 'S/'} {(detalle.cantidad * detalle.producto.precio).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No hay productos en este pedido.</Alert>
          )}
        </Card.Body>
        <Card.Footer className="text-end">
          <h5>Total: {pedido.detalles?.[0]?.producto.moneda?.simboloMoneda || 'S/'} {calcularTotal().toFixed(2)}</h5>
        </Card.Footer>
      </Card>

      <div className="d-flex gap-2">
        <Link to="/admin/pedidos" className="btn btn-secondary">
          Volver a Pedidos
        </Link>
        <Link to="/admin" className="btn btn-outline-secondary">
          Panel Admin
        </Link>
      </div>
    </Container>
  );
};

export default PedidoDetalle;
