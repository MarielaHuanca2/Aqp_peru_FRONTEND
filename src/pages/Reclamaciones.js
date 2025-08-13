import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import "./Reclamaciones.css";

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

      if (!response.ok) {
        throw new Error("Error al enviar el reclamo.");
      }

      setEnviado(true);
      setForm(initialForm);
    } catch (err) {
      setError("No se pudo enviar el reclamo. Intenta de nuevo.");
    }
  };

  return (
    <div className="reclamaciones-page">
      <div className="reclamaciones-header">
        <Container>
          <h1 className="text-center main-title">Libro de Reclamaciones</h1>
          <p className="text-center header-subtitle">
            Completa el siguiente formulario para registrar tu reclamo o queja. Tu opinión es importante para nosotros.
          </p>
        </Container>
      </div>

      <Container className="py-5">
        <div className="form-wrapper shadow-lg p-4">
          {enviado && (
            <Alert variant="success" className="mb-4 text-center">
              Tu reclamo ha sido enviado correctamente. ¡Gracias por tu comunicación!
            </Alert>
          )}
          {error && <Alert variant="danger" className="mb-4 text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <h4 className="form-section-title">Datos del Reclamante</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombres <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Apellidos <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Tipo de Documento <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Número de Documento <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Correo electrónico <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Teléfono Móvil <span className="required-field">*</span></Form.Label>
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
              <Form.Label>Dirección <span className="required-field">*</span></Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <h4 className="form-section-title mt-4">Detalles del Bien Contratado</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Bien <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Datos del Bien Contratado <span className="required-field">*</span></Form.Label>
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
              <Form.Label>Detalles del Bien Contratado <span className="required-field">*</span></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="detallesBienContratado"
                value={form.detallesBienContratado}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <h4 className="form-section-title mt-4">Detalles del Reclamo</h4>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Reclamo <span className="required-field">*</span></Form.Label>
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
                  <Form.Label>Detalles del Reclamo <span className="required-field">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="detallesReclamo"
                    value={form.detallesReclamo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <p className="required-legend mt-4">
              <span className="required-field">*</span> Campos obligatorios
            </p>
            <Button type="submit" variant="primary" className="w-100 mt-3">
              Enviar Reclamo
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ReclamacionesPage;