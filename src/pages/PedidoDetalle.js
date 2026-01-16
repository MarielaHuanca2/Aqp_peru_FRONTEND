import React, { useState, useEffect } from "react";
import { Container, Card, Table, Alert, Spinner, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import apiClient from "../services/authService";
import axios from "axios";
import { useTipoCambio } from "../context/TipoCambioContext";

const PedidoDetalle = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  // Hook must be called unconditionally at top-level
  const { tipoCambio: tipoCambioGlobal, convertirAMonedaSoles } = useTipoCambio();

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        setLoading(true);
        // Usar instancia de axios con withCredentials para enviar cookie JWT automáticamente
        const localClient = axios.create({ 
          baseURL: apiClient.defaults.baseURL,
          withCredentials: true // Enviar cookie JWT automáticamente
        });
        const response = await localClient.get(`/pedidos/${id}`);
        setPedido(response.data);
        // record whether we attempted to send a token (cookie-based now)
        setDebugInfo((d) => ({ ...(d || {}), tokenSent: true, method: 'cookie' }));
        setError(null);
      } catch (err) {
        // Capture debug information for the UI
        const debug = {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          headers: err.response?.headers
        };
        setError("Error al cargar el pedido");
        setDebugInfo(debug);
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
        {debugInfo && (
          <div className="mt-3 p-3 bg-light border rounded">
            <h6>Debug info</h6>
            <pre style={{ whiteSpace: 'pre-wrap', maxHeight: 300, overflow: 'auto' }}>
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
        <Link to="/admin/pedidos" className="btn btn-secondary">
          Volver a Pedidos
        </Link>
      </Container>
    );
  }

  // Normalizar campos del pedido para soportar distintos esquemas de respuesta
  const pedidoId = pedido.idPedido ?? pedido.id ?? pedido.id_pedido ?? "-";
  const nombres = pedido.nombresSolicitante ?? pedido.nombres ?? "";
  const apellidos = pedido.apellidosSolicitante ?? pedido.apellidos ?? "";
  const correo = pedido.correoSolicitante ?? pedido.correo ?? pedido.email ?? "";
  const telefono = pedido.telefonoSolicitante ?? pedido.telefono ?? "";
  const fechaRaw = pedido.fechaSolicitud ?? pedido.fechaPedido ?? pedido.fecha ?? null;
  const fechaDisplay = fechaRaw ? new Date(fechaRaw).toLocaleString() : "";
  const estado = pedido.estado ?? pedido.estadoPedido ?? "PENDIENTE";

  const monedaSimbolo = pedido.detalles?.[0]?.producto?.moneda?.simboloMoneda ?? 'S/';

  const calcularTotal = () => {
    return (
      pedido.detalles?.reduce((total, detalle) => {
        const cantidad = Number(detalle.cantidad ?? 0);
        const precio = Number(detalle.producto?.precio ?? 0);
        return total + cantidad * precio;
      }, 0) || 0
    );
  };

  // Tipo de cambio helper: preferir el valor enviado por detalle, si existe
  const convertirConDetalle = (precioUsd, detalle) => {
    const tc = Number(detalle?.tipoCambioValor ?? detalle?.tipoCambio?.valor ?? tipoCambioGlobal ?? 0);
    return precioUsd * tc;
  };

  const calcularTotalSoles = () => {
    return (
      pedido.detalles?.reduce((total, detalle) => {
        const cantidad = Number(detalle.cantidad ?? 0);
        const precio = Number(detalle.producto?.precio ?? 0);
        return total + cantidad * convertirConDetalle(precio, detalle);
      }, 0) || 0
    );
  };

  return (
    <Container className="mt-5">
      <h2>Detalle del Pedido #{pedidoId}</h2>
      
      <Card className="mb-4">
        <Card.Header>
          <h5>Información del Cliente</h5>
        </Card.Header>
        <Card.Body>
          <div className="row">
              <div className="col-md-6">
              <p><strong>Nombre:</strong> {nombres} {apellidos}</p>
              <p><strong>Correo:</strong> {correo}</p>
              <p><strong>Teléfono:</strong> {telefono}</p>
            </div>
            <div className="col-md-6">
              <p><strong>Fecha del Pedido:</strong> {fechaDisplay}</p>
              <p><strong>Estado:</strong> 
                <span className={`badge ms-2 ${estado === 'PENDIENTE' ? 'bg-warning' : 
                  estado === 'PROCESANDO' ? 'bg-info' : 
                  estado === 'COMPLETADO' ? 'bg-success' : 'bg-danger'}`}>
                  {estado}
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
                        {
                          (() => {
                            const precioUsd = Number(detalle.producto?.precio ?? 0);
                            const tc = Number(detalle.tipoCambioValor ?? detalle.tipoCambio?.valor ?? tipoCambioGlobal ?? 0);
                            const precioSoles = precioUsd * tc;
                            return (
                              <td>
                                {detalle.producto.moneda?.simboloMoneda ?? '$'} {precioUsd.toFixed(2)}
                                <div className="text-muted small">S/ {precioSoles.toFixed(2)} (TC {tc.toFixed(4)})</div>
                              </td>
                            );
                          })()
                        }
                        <td>{Number(detalle.cantidad ?? 0)}</td>
                        <td>S/ {(Number(detalle.cantidad ?? 0) * Number(detalle.producto?.precio ?? 0) * (Number(detalle.tipoCambioValor ?? detalle.tipoCambio?.valor ?? tipoCambioGlobal ?? 0))).toFixed(2)}</td>
                      </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No hay productos en este pedido.</Alert>
          )}
        </Card.Body>
        <Card.Footer className="text-end">
          <h5>Total (S/): {calcularTotalSoles().toFixed(2)}</h5>
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
