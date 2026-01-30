import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTipoCambio } from "../context/TipoCambioContext";
import { actualizarTipoCambio } from "../services/tipoCambioService";

const TipoCambioAdmin = () => {
  const { tipoCambio, cargarTipoCambio, actualizarTipoCambioGlobal } = useTipoCambio();
  const [nuevoTipoCambio, setNuevoTipoCambio] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNuevoTipoCambio(tipoCambio.toString());
  }, [tipoCambio]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const valor = parseFloat(nuevoTipoCambio);
    if (isNaN(valor) || valor <= 0) {
      setMensaje({ tipo: "danger", texto: "Por favor, ingresa un tipo de cambio válido mayor a 0" });
      return;
    }

    setLoading(true);
    try {
  await actualizarTipoCambioGlobal(valor, 1);
      setMensaje({ 
        tipo: "success", 
        texto: `Tipo de cambio actualizado exitosamente a ${valor.toFixed(4)} PEN por USD` 
      });
    } catch (error) {
      setMensaje({ 
        tipo: "danger", 
        texto: `Error al actualizar el tipo de cambio en la API. Se aplicará localmente.` 
      });
    } finally {
      setLoading(false);
    }
  };

  const ejemploPrecio = 100; // USD
  const precioConvertido = (ejemploPrecio * parseFloat(nuevoTipoCambio || tipoCambio)).toFixed(2);

  return (
    <Container className="mt-5">
      <h2>Configurar Tipo de Cambio</h2>
      
      {mensaje && (
        <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>
          {mensaje.texto}
        </Alert>
      )}

      <Card className="mt-4">
        <Card.Header>
          <h5>Tipo de Cambio USD a PEN</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Label><strong>Tipo de Cambio Actual:</strong></Form.Label>
              <div className="fs-4 text-primary">
                1 USD = {tipoCambio.toFixed(4)} PEN
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Nuevo Tipo de Cambio</Form.Label>
              <Form.Control
                type="number"
                step="0.0001"
                min="0.0001"
                value={nuevoTipoCambio}
                onChange={(e) => setNuevoTipoCambio(e.target.value)}
                placeholder="Ej: 3.7500"
                required
              />
              <Form.Text className="text-muted">
                Ingresa el nuevo tipo de cambio de USD a PEN (hasta 4 decimales)
              </Form.Text>
            </Form.Group>

            <div className="mb-3 p-3 bg-light rounded">
              <h6>Vista Previa:</h6>
              <p className="mb-1">
                <strong>Ejemplo:</strong> $100.00 USD = S/ {precioConvertido} PEN
              </p>
              <p className="mb-0 text-muted">
                Con el tipo de cambio: {nuevoTipoCambio || tipoCambio}
              </p>
            </div>

            <div className="d-flex gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading || nuevoTipoCambio === tipoCambio.toString()}
              >
                {loading ? "Actualizando..." : "Actualizar Tipo de Cambio"}
              </Button>
              
              <Button 
                variant="secondary" 
                type="button"
                onClick={() => {
                  setNuevoTipoCambio(tipoCambio.toString());
                  setMensaje(null);
                }}
              >
                Restablecer
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mt-4">
        <Card.Header>
          <h6>Información</h6>
        </Card.Header>
        <Card.Body>
          <ul className="mb-0">
            <li>Este tipo de cambio se aplicará a todos los productos mostrados en la tienda</li>
            <li>Los precios originales en USD se conservan en la base de datos</li>
            <li>Los usuarios verán los precios convertidos a soles peruanos (PEN)</li>
            <li>El cambio se refleja inmediatamente en toda la aplicación</li>
            <li><strong>Nota:</strong> El tipo de cambio se guarda localmente en el navegador</li>
          </ul>
        </Card.Body>
      </Card>

      <div className="mt-4">
        <Link to="/admin" className="btn btn-secondary">
          Volver al Panel de Administrador
        </Link>
      </div>
    </Container>
  );
};

export default TipoCambioAdmin;
