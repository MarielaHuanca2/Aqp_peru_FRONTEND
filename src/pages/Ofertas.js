import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { obtenerOfertas } from "../services/productoService";
import { useCarrito } from "../context/CarritoContext";
import { useTipoCambio } from "../context/TipoCambioContext";

function Ofertas() {
  const placeholderHero = "/images/45001.2018.jpg";
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useCarrito();
  const { formatearPrecioSoles } = useTipoCambio();

  const cargarOfertas = async () => {
    try {
      setLoading(true);
      const resp = await obtenerOfertas();
      const data = resp && resp.data ? resp.data : [];
      setOfertas(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error cargando ofertas:', err);
      setError('No se pudieron cargar las ofertas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarOfertas(); }, []);

  const handleAgregar = (oferta) => {
    // Normalize fields so carrito logic finds idProducto and precioUSD
    const idProducto = oferta.idProducto || oferta.id || oferta._id;
    const precioRaw = oferta.precioUSD ?? oferta.precio ?? 0;
    const precioUsd = typeof precioRaw === 'string' ? parseFloat(precioRaw) || 0 : precioRaw;
    const productoParaCarrito = {
      ...oferta,
      idProducto,
      precioUSD: precioUsd,
    };
    agregarAlCarrito(productoParaCarrito, 1);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-3">Ofertas Especiales</h2>

      <div className="mb-4 rounded overflow-hidden shadow-sm" style={{ height: 320 }}>
        <img
          src={placeholderHero}
          alt="Ofertas destacadas"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <p className="lead text-muted">Aprovecha nuestras promociones por tiempo limitado.</p>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" /></div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : ofertas.length === 0 ? (
        <div className="mt-4">
          <Card className="p-4 text-center border-0">
            <Card.Body>
              <h5 className="mb-2">No hay ofertas disponibles</h5>
              <p className="text-muted mb-0">Las ofertas se cargarán automáticamente cuando haya promociones activas.</p>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {ofertas.map((o) => {
            const id = o.idProducto || o.id || o._id;
            const precioRaw = o.precioUSD ?? o.precio ?? 0;
            const precioUsd = typeof precioRaw === 'string' ? parseFloat(precioRaw) || 0 : precioRaw;
            return (
              <Col key={id}>
                <Card className="h-100">
                  {o.imagen ? (
                    <Card.Img variant="top" src={o.imagen} style={{ height: 160, objectFit: 'cover' }} />
                  ) : null}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: '1rem' }}>{o.producto || o.nombre || 'Sin nombre'}</Card.Title>
                    <Card.Text className="text-muted small">{o.marca}</Card.Text>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div>
                        <div><strong>{formatearPrecioSoles(precioUsd)}</strong></div>
                        <div className="small text-muted">USD {precioUsd}</div>
                      </div>
                      <Button variant="primary" onClick={() => handleAgregar(o)}>Agregar al carrito</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default Ofertas;
