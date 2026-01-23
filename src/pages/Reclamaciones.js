import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { API_BASE_URL } from "../constants/apiEndpoints";
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
  const [validationErrors, setValidationErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviado(false);
    setValidationErrors([]);

    // Validar localmente antes de enviar
    const errors = validateForm(form);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    // Formatear payload: trim y normalizar
    const payload = Object.fromEntries(Object.entries(form).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));

    // Debug: log payload
    console.debug('Reclamaciones: payload a enviar ->', payload);
    setDebugInfo(null);
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/reclamos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Intentar leer el cuerpo de la respuesta para debug (text o json)
      let respBody = null;
      try {
        const text = await response.text();
        try { respBody = JSON.parse(text); } catch { respBody = text; }
      } catch (readErr) {
        respBody = `<no body: ${readErr.message}>`;
      }

      console.debug('Reclamaciones: response status', response.status, 'body:', respBody);

      if (!response.ok) {
        // Guardar debug info en estado para mostrar en UI
        setDebugInfo({ status: response.status, body: respBody });
        setError(`Error al enviar el reclamo (status ${response.status}). Revisa los detalles.`);
        return;
      }

      setEnviado(true);
      setForm(initialForm);
    } catch (err) {
      console.error('Reclamaciones: excepción al enviar reclamo', err);
      setError("No se pudo enviar el reclamo. Intenta de nuevo.");
      setDebugInfo({ exception: err.message || String(err) });
    } finally {
      setSubmitting(false);
    }
  };

  // Validaciones del formulario (devuelve array de mensajes)
  function validateForm(values) {
    const errs = [];
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const digitsOnly = (s) => (s || '').replace(/\D/g, '');

    if (!values.nombres || !values.nombres.trim()) errs.push('El campo "Nombres" es obligatorio.');
    if (!values.apellidos || !values.apellidos.trim()) errs.push('El campo "Apellidos" es obligatorio.');

    const tiposDoc = ['DNI', 'CE', 'PAS'];
    if (!tiposDoc.includes(values.tipoDocumento)) errs.push('Tipo de documento inválido.');

    if (!values.numeroDocumento || !values.numeroDocumento.trim()) {
      errs.push('El número de documento es obligatorio.');
    } else {
      const nd = values.numeroDocumento.trim();
      if (values.tipoDocumento === 'DNI' && !/^\d{8}$/.test(nd)) errs.push('DNI debe tener 8 dígitos.');
      if (values.tipoDocumento === 'CE' && nd.length < 5) errs.push('Carnet de extranjería inválido.');
      if (values.tipoDocumento === 'PAS' && nd.length < 5) errs.push('Pasaporte inválido.');
    }

    if (!values.correo || !values.correo.trim()) {
      errs.push('El correo electrónico es obligatorio.');
    } else if (!emailRe.test(values.correo.trim())) {
      errs.push('Formato de correo electrónico inválido.');
    }

    // teléfono móvil obligatorio y al menos 7 dígitos
    if (!values.telefonoMovil || !values.telefonoMovil.trim()) {
      errs.push('El teléfono móvil es obligatorio.');
    } else if (digitsOnly(values.telefonoMovil).length < 7) {
      errs.push('El teléfono móvil debe contener al menos 7 dígitos.');
    }

    if (!values.direccion || !values.direccion.trim()) errs.push('La dirección es obligatoria.');

    const tiposBien = ['Producto', 'Servicio'];
    if (!tiposBien.includes(values.tipoBien)) errs.push('Tipo de bien inválido.');

    if (!values.datosBienContratado || !values.datosBienContratado.trim()) errs.push('Datos del bien contratado son obligatorios.');
    if (!values.detallesBienContratado || values.detallesBienContratado.trim().length < 10) errs.push('Detalles del bien contratado (mínimo 10 caracteres).');

    const tiposReclamo = ['Reclamo', 'Queja'];
    if (!tiposReclamo.includes(values.tipoReclamo)) errs.push('Tipo de reclamo inválido.');
    if (!values.detallesReclamo || values.detallesReclamo.trim().length < 10) errs.push('Detalles del reclamo (mínimo 10 caracteres).');

    return errs;
  }

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
          {validationErrors.length > 0 && (
            <Alert variant="warning" className="mb-4">
              <strong>Errores de validación:</strong>
              <ul>
                {validationErrors.map((v, i) => <li key={i}>{v}</li>)}
              </ul>
            </Alert>
          )}

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
            <Button type="submit" variant="primary" className="w-100 mt-3" disabled={submitting}>
              {submitting ? 'Enviando...' : 'Enviar Reclamo'}
            </Button>
            {debugInfo && (
              <div className="mt-3">
                <h6>Debug info</h6>
                <pre style={{ maxHeight: 200, overflow: 'auto', background: '#f8f9fa', padding: 10 }}>{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ReclamacionesPage;