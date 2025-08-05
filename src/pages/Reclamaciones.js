import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

const initialForm = {
  nombres: "",
  apellidos: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
  correo: "",
  telefonoFijo: "",
  telefonoMovil: "",
  direccion: "",
  tipoBien: "Producto",
  datosBienContratado: "",
  detallesBienContratado: "",
  tipoReclamo: "Reclamo",
  detallesReclamo: "",
};

const ReclamacionesPage = () => {
  const [form, setForm] = useState(initialForm);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviado(false);
    try {
      const response = await fetch("http://localhost:8080/api/reclamo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Error al enviar el reclamo");
      setEnviado(true);
      setForm(initialForm);
    } catch (err) {
      setError("No se pudo enviar el reclamo. Intenta nuevamente.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Libro de Reclamaciones</h2>
      <p>Completa el siguiente formulario para registrar tu reclamo o queja:</p>

      {enviado && (
        <Alert variant="success">
          Tu reclamo ha sido enviado correctamente. ¡Gracias por tu comunicación!
        </Alert>
      )}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                name="nombres"
                value={form.nombres}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                value={form.apellidos}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Documento</Form.Label>
              <Form.Select
                name="tipoDocumento"
                value={form.tipoDocumento}
                onChange={handleChange}
                required
              >
                <option value="DNI">DNI</option>
                <option value="CE">Carnet de Extranjería</option>
                <option value="PAS">Pasaporte</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Número de Documento</Form.Label>
              <Form.Control
                type="text"
                name="numeroDocumento"
                value={form.numeroDocumento}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono Fijo</Form.Label>
              <Form.Control
                type="text"
                name="telefonoFijo"
                value={form.telefonoFijo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono Móvil</Form.Label>
              <Form.Control
                type="text"
                name="telefonoMovil"
                value={form.telefonoMovil}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Bien</Form.Label>
              <Form.Select
                name="tipoBien"
                value={form.tipoBien}
                onChange={handleChange}
                required
              >
                <option value="Producto">Producto</option>
                <option value="Servicio">Servicio</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Datos del Bien Contratado</Form.Label>
              <Form.Control
                type="text"
                name="datosBienContratado"
                value={form.datosBienContratado}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Detalles del Bien Contratado</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="detallesBienContratado"
            value={form.detallesBienContratado}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Reclamo</Form.Label>
              <Form.Select
                name="tipoReclamo"
                value={form.tipoReclamo}
                onChange={handleChange}
                required
              >
                <option value="Reclamo">Reclamo</option>
                <option value="Queja">Queja</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Detalles del Reclamo</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="detallesReclamo"
                value={form.detallesReclamo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" variant="primary">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default ReclamacionesPage;