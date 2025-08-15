import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import apiClient from "../services/authService";

const PedidosAdmin = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [filtros, setFiltros] = useState({
    fechaInicio: "",
    fechaFin: "",
    correo: ""
  });

  const obtenerPedidos = async () => {
    try {
      setLoading(true);
      let url = "/pedidos";
      const params = new URLSearchParams();
      
      if (filtros.fechaInicio) params.append("fechaInicio", filtros.fechaInicio);
      if (filtros.fechaFin) params.append("fechaFin", filtros.fechaFin);
      if (filtros.correo) params.append("correo", filtros.correo);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await apiClient.get(url);
      setPedidos(response.data);
      setError(null);
      setDebugInfo(null);
    } catch (err) {
      setError("Error al cargar los pedidos");
      setDebugInfo({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
        headers: err.response?.headers
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const aplicarFiltros = () => {
    obtenerPedidos();
  };

  const limpiarFiltros = () => {
    setFiltros({ fechaInicio: "", fechaFin: "", correo: "" });
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Cargando pedidos...</div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Administrar Pedidos</h2>
      
      {/* Filtros */}
      <Form className="mb-4 p-3 border rounded bg-light">
        <Row className="g-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label>Fecha Inicio</Form.Label>
              <Form.Control
                type="date"
                name="fechaInicio"
                value={filtros.fechaInicio}
                onChange={handleFiltroChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Fecha Fin</Form.Label>
              <Form.Control
                type="date"
                name="fechaFin"
                value={filtros.fechaFin}
                onChange={handleFiltroChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Correo Cliente</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                placeholder="Filtrar por correo del cliente"
                value={filtros.correo}
                onChange={handleFiltroChange}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end gap-2">
            <Button variant="primary" onClick={aplicarFiltros}>
              Filtrar
            </Button>
            <Button variant="outline-secondary" onClick={limpiarFiltros}>
              Limpiar
            </Button>
          </Col>
        </Row>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}
      {debugInfo && (
        <div className="mb-3 p-2 bg-light border rounded">
          <strong>Debug:</strong>
          <pre style={{ maxHeight: 200, overflow: 'auto' }}>{JSON.stringify(debugInfo, null, 2)}</pre>
        </div>
      )}

      {pedidos.length === 0 ? (
        <Alert variant="info">No se encontraron pedidos.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => {
              const id = pedido.idPedido ?? pedido.id ?? pedido.id_pedido ?? "";
              const nombres = pedido.nombresSolicitante ?? pedido.nombres ?? "";
              const apellidos = pedido.apellidosSolicitante ?? pedido.apellidos ?? "";
              const correo = pedido.correoSolicitante ?? pedido.correo ?? pedido.email ?? "";
              const telefono = pedido.telefonoSolicitante ?? pedido.telefono ?? "";
              const fechaRaw = pedido.fechaSolicitud ?? pedido.fechaPedido ?? pedido.fecha ?? null;
              const fecha = fechaRaw ? new Date(fechaRaw).toLocaleDateString() : "";
              const estado = pedido.estado ?? pedido.estadoPedido ?? "PENDIENTE";

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{nombres} {apellidos}</td>
                  <td>{correo}</td>
                  <td>{telefono}</td>
                  <td>{fecha}</td>
                  <td>
                    <span className={`badge ${estado === 'PENDIENTE' ? 'bg-warning' : 
                      estado === 'PROCESANDO' ? 'bg-info' : 
                      estado === 'COMPLETADO' ? 'bg-success' : 'bg-danger'}`}>
                      {estado}
                    </span>
                  </td>
                  <td>
                    <Link 
                      to={`/admin/pedidos/${id}`} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      Ver Detalles
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <div className="mt-3">
        <Link to="/admin" className="btn btn-secondary">
          Volver al Panel Admin
        </Link>
      </div>
    </Container>
  );
};

export default PedidosAdmin;
