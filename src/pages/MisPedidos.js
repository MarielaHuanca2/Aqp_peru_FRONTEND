import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Spinner, Alert, Badge } from 'react-bootstrap';
import { authService } from '../services/authService';
import { obtenerPedidosPorCorreo } from '../services/pedidoService';
import { useNavigate } from 'react-router-dom';
import { useTipoCambio } from '../context/TipoCambioContext';
import './MisPedidos.css';

function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = authService.getUserData();
  const correo = userData?.correo;
  const { tipoCambio: tipoCambioGlobal } = useTipoCambio();

  useEffect(() => {
    if (!correo) {
      setError('No se pudo obtener el correo del usuario');
      setLoading(false);
      return;
    }

    const cargarPedidos = async () => {
      try {
        setLoading(true);
        const response = await obtenerPedidosPorCorreo(correo);
        setPedidos(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Error al cargar pedidos:', err);
        setError('No se pudieron cargar los pedidos');
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, [correo]);

  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearNumero = (numero) => {
    return numero.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getEstadoBadge = (estado) => {
    const estadoMap = {
      'PENDIENTE': 'warning',
      'CONFIRMADO': 'info',
      'EN_PROCESO': 'primary',
      'ENVIADO': 'success',
      'ENTREGADO': 'success',
      'CANCELADO': 'danger'
    };
    return <Badge bg={estadoMap[estado] || 'secondary'}>{estado}</Badge>;
  };

  if (loading) {
    return (
      <Container className="mis-pedidos-container my-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <p className="mt-3">Cargando tus pedidos...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mis-pedidos-container my-5">
      <h1 className="mb-4">Mis Pedidos</h1>
      <p className="text-muted mb-4">
        Pedidos realizados con: <strong>{correo}</strong>
      </p>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {pedidos.length === 0 ? (
        <Alert variant="info">
          <Alert.Heading>No tienes pedidos aún</Alert.Heading>
          <p>
            Cuando realices pedidos, aparecerán aquí para que puedas hacer seguimiento.
          </p>
        </Alert>
      ) : (
        <div className="pedidos-list">
          {pedidos.map((pedido) => {
            // Calcular totales
            const calcularSubtotalUSD = () => {
              return pedido.detalles?.reduce((total, detalle) => {
                const cantidad = Number(detalle.cantidad ?? 0);
                const precio = Number(detalle.producto?.precio ?? 0);
                return total + cantidad * precio;
              }, 0) || 0;
            };

            const calcularIGV_USD = () => {
              return calcularSubtotalUSD() * 0.18;
            };

            const calcularTotalConIGV_USD = () => {
              return calcularSubtotalUSD() + calcularIGV_USD();
            };

            const convertirConDetalle = (precioUsd, detalle) => {
              const tc = Number(detalle?.tipoCambioValor ?? detalle?.tipoCambio?.valor ?? tipoCambioGlobal ?? 0);
              return precioUsd * tc;
            };

            const calcularSubtotalSoles = () => {
              return pedido.detalles?.reduce((total, detalle) => {
                const cantidad = Number(detalle.cantidad ?? 0);
                const precio = Number(detalle.producto?.precio ?? 0);
                return total + cantidad * convertirConDetalle(precio, detalle);
              }, 0) || 0;
            };

            const calcularIGV_Soles = () => {
              return calcularSubtotalSoles() * 0.18;
            };

            const calcularTotalConIGV_Soles = () => {
              return calcularSubtotalSoles() + calcularIGV_Soles();
            };

            const monedaSimbolo = pedido.detalles?.[0]?.producto?.moneda?.simboloMoneda ?? '$';

            return (
              <Card key={pedido.idPedido} className="mb-4 pedido-card">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Pedido #{pedido.idPedido}</strong>
                    <div className="text-muted small mt-1">
                      {formatearFecha(pedido.fechaSolicitud)}
                    </div>
                  </div>
                  <div>
                    {getEstadoBadge(pedido.estadoPedido)}
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="pedido-info mb-3">
                    <div className="row">
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Cliente:</strong> {pedido.nombres} {pedido.apellidos}
                        </p>
                        <p className="mb-1">
                          <strong>Teléfono:</strong> {pedido.telefono}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="mb-1">
                          <strong>Correo:</strong> {pedido.correo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {pedido.detalles && pedido.detalles.length > 0 && (
                    <div className="pedido-detalles">
                      <h6 className="mb-3">Productos:</h6>
                      <Table striped bordered hover responsive size="sm">
                        <thead>
                          <tr>
                            <th>Producto</th>
                            <th>Marca</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pedido.detalles.map((detalle, index) => {
                            const precioUsd = Number(detalle.producto?.precio ?? 0);
                            const tc = Number(detalle.tipoCambioValor ?? detalle.tipoCambio?.valor ?? tipoCambioGlobal ?? 0);
                            const precioSoles = precioUsd * tc;
                            const cantidad = Number(detalle.cantidad ?? 0);
                            const subtotal = cantidad * precioSoles;

                            return (
                              <tr key={detalle.idDetalle || index}>
                                <td>
                                  {detalle.productoNombre || detalle.producto?.producto || 'Producto no disponible'}
                                  {detalle.producto?.idProducto && (
                                    <div className="text-muted small">
                                      ID: {detalle.producto.idProducto}
                                    </div>
                                  )}
                                  {detalle.productoEliminado && (
                                    <div className="text-danger small">
                                      (Producto eliminado)
                                    </div>
                                  )}
                                </td>
                                <td>{detalle.producto?.marca || 'N/A'}</td>
                                <td>{cantidad}</td>
                                <td>
                                  {precioUsd > 0 ? (
                                    <>
                                      {detalle.producto?.moneda?.simboloMoneda ?? '$'} {formatearNumero(precioUsd)}
                                      {tc > 0 && (
                                        <div className="text-muted small">
                                          S/ {formatearNumero(precioSoles)}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    'N/A'
                                  )}
                                </td>
                                <td>
                                  {precioUsd > 0 && tc > 0 ? (
                                    <>S/ {formatearNumero(subtotal)}</>
                                  ) : (
                                    '-'
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </Card.Body>
                <Card.Footer>
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="mb-2 text-muted">Resumen en Dólares (USD)</h6>
                      <table className="table table-sm mb-0">
                        <tbody>
                          <tr>
                            <td><strong>Subtotal (sin IGV):</strong></td>
                            <td className="text-end">{monedaSimbolo} {formatearNumero(calcularSubtotalUSD())}</td>
                          </tr>
                          <tr>
                            <td><strong>IGV (18%):</strong></td>
                            <td className="text-end">{monedaSimbolo} {formatearNumero(calcularIGV_USD())}</td>
                          </tr>
                          <tr className="table-primary">
                            <td><strong>Total (con IGV):</strong></td>
                            <td className="text-end"><strong>{monedaSimbolo} {formatearNumero(calcularTotalConIGV_USD())}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="col-md-6">
                      <h6 className="mb-2 text-muted">Resumen en Soles (PEN)</h6>
                      <table className="table table-sm mb-0">
                        <tbody>
                          <tr>
                            <td><strong>Subtotal (sin IGV):</strong></td>
                            <td className="text-end">S/ {formatearNumero(calcularSubtotalSoles())}</td>
                          </tr>
                          <tr>
                            <td><strong>IGV (18%):</strong></td>
                            <td className="text-end">S/ {formatearNumero(calcularIGV_Soles())}</td>
                          </tr>
                          <tr className="table-success">
                            <td><strong>Total (con IGV):</strong></td>
                            <td className="text-end"><strong>S/ {formatearNumero(calcularTotalConIGV_Soles())}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default MisPedidos;
