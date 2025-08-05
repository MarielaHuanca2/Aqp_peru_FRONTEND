import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const ReclamoDetalle = () => {
  const { id } = useParams();
  const [reclamo, setReclamo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/reclamos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReclamo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5">
        <h2>Detalle de Reclamo</h2>
        <p>Cargando...</p>
      </Container>
    );
  }
  if (!reclamo) {
    return (
      <Container className="mt-5">
        <h2>Detalle de Reclamo</h2>
        <p>No se encontró el reclamo.</p>
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Button variant="secondary" className="mb-3" onClick={() => navigate(-1)}>
        Volver
      </Button>
      <Card>
        <Card.Header>
          <h3>Reclamo #{reclamo.id}</h3>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Nombres:</strong> {reclamo.nombres}</p>
              <p><strong>Apellidos:</strong> {reclamo.apellidos}</p>
              <p><strong>Tipo Documento:</strong> {reclamo.tipoDocumento}</p>
              <p><strong>Número Documento:</strong> {reclamo.numeroDocumento}</p>
              <p><strong>Correo:</strong> {reclamo.correo}</p>
              <p><strong>Teléfono Fijo:</strong> {reclamo.telefonoFijo}</p>
              <p><strong>Teléfono Móvil:</strong> {reclamo.telefonoMovil}</p>
              <p><strong>Dirección:</strong> {reclamo.direccion}</p>
            </Col>
            <Col md={6}>
              <p><strong>Tipo Bien:</strong> {reclamo.tipoBien}</p>
              <p><strong>Datos Bien Contratado:</strong> {reclamo.datosBienContratado}</p>
              <p><strong>Detalles Bien Contratado:</strong> {reclamo.detallesBienContratado}</p>
              <p><strong>Tipo Reclamo:</strong> {reclamo.tipoReclamo}</p>
              <p><strong>Detalles Reclamo:</strong> {reclamo.detallesReclamo}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReclamoDetalle;
