import React, { useState, useEffect } from "react";
import { Container, Card, Table, Alert, Spinner, Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import apiClient from "../services/authService";
import axios from "axios";
import { useTipoCambio } from "../context/TipoCambioContext";

const ESTADOS_PEDIDO = [
  { value: 'PENDIENTE', label: 'Pendiente', color: 'warning' },
  { value: 'EN_PROCESO', label: 'En Proceso', color: 'info' },
  { value: 'FINALIZADO', label: 'Finalizado', color: 'success' },
  { value: 'RECHAZADO', label: 'Rechazado', color: 'danger' },
  { value: 'CANCELADO', label: 'Cancelado', color: 'secondary' }
];

const PedidoDetalle = () => {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [actualizandoEstado, setActualizandoEstado] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(null);
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

  // Función para cambiar el estado del pedido
  const cambiarEstadoPedido = async (nuevoEstado) => {
    try {
      setActualizandoEstado(true);
      setMensajeEstado(null);
      
      const localClient = axios.create({ 
        baseURL: apiClient.defaults.baseURL,
        withCredentials: true
      });
      
      await localClient.patch(`/pedidos/${id}/estado`, {
        estadoPedido: nuevoEstado
      });
      
      // Actualizar el estado local del pedido
      setPedido(prev => ({ ...prev, estadoPedido: nuevoEstado }));
      setMensajeEstado({ tipo: 'success', texto: 'Estado actualizado correctamente' });
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setMensajeEstado(null), 3000);
    } catch (err) {
      setMensajeEstado({ 
        tipo: 'danger', 
        texto: err.response?.data?.message || 'Error al actualizar el estado' 
      });
    } finally {
      setActualizandoEstado(false);
    }
  };

  // Helper para obtener el color del badge según el estado
  const obtenerColorEstado = (estado) => {
    const estadoInfo = ESTADOS_PEDIDO.find(e => e.value === estado);
    return estadoInfo?.color || 'secondary';
  };

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

  const monedaSimbolo = pedido.detalles?.[0]?.producto?.moneda?.simboloMoneda ?? '$';

  // Helper para obtener el nombre del producto (soporta productos eliminados)
  const obtenerNombreProducto = (detalle) => {
    if (detalle.producto) {
      return detalle.producto.producto || detalle.producto.nombre || 'Sin nombre';
    }
    return detalle.productoNombre || detalle.nombreProducto || 'Producto no disponible';
  };

  // Helper para obtener la marca del producto
  const obtenerMarcaProducto = (detalle) => {
    if (detalle.producto) {
      return detalle.producto.marca || '-';
    }
    return '-';
  };

  // Helper para obtener el precio del producto
  const obtenerPrecioProducto = (detalle) => {
    if (detalle.producto) {
      return Number(detalle.producto.precio ?? 0);
    }
    return Number(detalle.precioUnitario ?? detalle.precio ?? 0);
  };

  const calcularTotal = () => {
    return (
      pedido.detalles?.reduce((total, detalle) => {
        const cantidad = Number(detalle.cantidad ?? 0);
        const precio = obtenerPrecioProducto(detalle);
        return total + cantidad * precio;
      }, 0) || 0
    );
  };

  const calcularSubtotalUSD = () => {
    return (
      pedido.detalles?.reduce((total, detalle) => {
        const cantidad = Number(detalle.cantidad ?? 0);
        const precio = obtenerPrecioProducto(detalle);
        return total + cantidad * precio;
      }, 0) || 0
    );
  };

  const calcularIGV_USD = () => {
    return calcularSubtotalUSD() * 0.18;
  };

  const calcularTotalConIGV_USD = () => {
    return calcularSubtotalUSD() + calcularIGV_USD();
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
        const precio = obtenerPrecioProducto(detalle);
        return total + cantidad * convertirConDetalle(precio, detalle);
      }, 0) || 0
    );
  };

  const calcularSubtotalSoles = () => {
    return (
      pedido.detalles?.reduce((total, detalle) => {
        const cantidad = Number(detalle.cantidad ?? 0);
        const precio = obtenerPrecioProducto(detalle);
        return total + cantidad * convertirConDetalle(precio, detalle);
      }, 0) || 0
    );
  };

  const calcularIGV_Soles = () => {
    return calcularSubtotalSoles() * 0.18;
  };

  const calcularTotalConIGV_Soles = () => {
    return calcularSubtotalSoles() + calcularIGV_Soles();
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
              <p><strong>Estado actual:</strong> 
                <span className={`badge ms-2 bg-${obtenerColorEstado(estado)}`}>
                  {ESTADOS_PEDIDO.find(e => e.value === estado)?.label || estado}
                </span>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Cambiar Estado del Pedido */}
      <Card className="mb-4">
        <Card.Header>
          <h5>Cambiar Estado del Pedido</h5>
        </Card.Header>
        <Card.Body>
          {mensajeEstado && (
            <Alert variant={mensajeEstado.tipo} dismissible onClose={() => setMensajeEstado(null)}>
              {mensajeEstado.texto}
            </Alert>
          )}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <Form.Group className="d-flex align-items-center gap-2">
              <Form.Label className="mb-0 fw-bold">Nuevo estado:</Form.Label>
              <Form.Select
                style={{ width: 'auto' }}
                value={estado}
                onChange={(e) => cambiarEstadoPedido(e.target.value)}
                disabled={actualizandoEstado}
              >
                {ESTADOS_PEDIDO.map(est => (
                  <option key={est.value} value={est.value}>
                    {est.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            {actualizandoEstado && (
              <Spinner animation="border" size="sm" />
            )}
          </div>
          <div className="mt-3">
            <small className="text-muted">Selecciona un nuevo estado para actualizar el pedido.</small>
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
                {pedido.detalles.map((detalle, index) => {
                  const nombreProducto = obtenerNombreProducto(detalle);
                  const marcaProducto = obtenerMarcaProducto(detalle);
                  const precioUsd = obtenerPrecioProducto(detalle);
                  const tc = Number(detalle.tipoCambioValor ?? detalle.tipoCambio?.valor ?? tipoCambioGlobal ?? 0);
                  const precioSoles = precioUsd * tc;
                  const cantidad = Number(detalle.cantidad ?? 0);
                  const subtotal = cantidad * precioSoles;
                  const productoEliminado = detalle.productoEliminado || !detalle.producto;

                  return (
                    <tr key={detalle.idDetalle ?? index} className={productoEliminado ? 'table-warning' : ''}>
                      <td>
                        {nombreProducto}
                        {productoEliminado && (
                          <span className="badge bg-secondary ms-2">Eliminado</span>
                        )}
                      </td>
                      <td>{marcaProducto}</td>
                      <td>
                        {precioUsd > 0 ? (
                          <>
                            {detalle.producto?.moneda?.simboloMoneda ?? '$'} {precioUsd.toFixed(2)}
                            {tc > 0 && (
                              <div className="text-muted small">
                                S/ {precioSoles.toFixed(2)} (TC {tc.toFixed(4)})
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-muted">No disponible</span>
                        )}
                      </td>
                      <td>{cantidad}</td>
                      <td>
                        {precioUsd > 0 && tc > 0 ? (
                          <>S/ {subtotal.toFixed(2)}</>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No hay productos en este pedido.</Alert>
          )}
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col-md-6">
              <h6 className="mb-3 text-muted">Resumen en Dólares (USD)</h6>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td><strong>Subtotal (sin IGV):</strong></td>
                    <td className="text-end">{monedaSimbolo} {calcularSubtotalUSD().toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>IGV (18%):</strong></td>
                    <td className="text-end">{monedaSimbolo} {calcularIGV_USD().toFixed(2)}</td>
                  </tr>
                  <tr className="table-primary">
                    <td><strong>Total (con IGV):</strong></td>
                    <td className="text-end"><strong>{monedaSimbolo} {calcularTotalConIGV_USD().toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h6 className="mb-3 text-muted">Resumen en Soles (PEN)</h6>
              <table className="table table-sm">
                <tbody>
                  <tr>
                    <td><strong>Subtotal (sin IGV):</strong></td>
                    <td className="text-end">S/ {calcularSubtotalSoles().toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>IGV (18%):</strong></td>
                    <td className="text-end">S/ {calcularIGV_Soles().toFixed(2)}</td>
                  </tr>
                  <tr className="table-success">
                    <td><strong>Total (con IGV):</strong></td>
                    <td className="text-end"><strong>S/ {calcularTotalConIGV_Soles().toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table>
              <small className="text-muted">
                Tipo de cambio promedio: S/ {tipoCambioGlobal?.toFixed(4) || 'N/A'}
              </small>
            </div>
          </div>
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
