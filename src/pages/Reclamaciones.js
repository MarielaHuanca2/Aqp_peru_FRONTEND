import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const ReclamacionesPage = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <Container className="mt-5">
      <h2>Libro de Reclamaciones</h2>
      <p>Si deseas presentar una queja o reclamo, completa el siguiente formulario:</p>

      {enviado && (
        <Alert variant="success">
          Tu reclamo ha sido enviado correctamente. ¡Gracias por tu comunicación!
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
            placeholder="Escribe tu queja o sugerencia aquí"
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default ReclamacionesPage;