import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";
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
      const resp = await obtenerProductos();
      const data = resp && resp.data ? resp.data : [];
      // Filtrar solo productos con esOferta === true
      const productosEnOferta = Array.isArray(data) 
        ? data.filter(p => p.esOferta === true) 
        : [];
      setOfertas(productosEnOferta);
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
                <Card className="h-100 shadow-sm border-0" style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: 'linear-gradient(145deg, #fff9e6 0%, #ffffff 100%)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                >
                  <div style={{ position: 'relative' }}>
                    <Card.Img 
                      variant="top" 
                      src={o.foto1 || o.imagen || '/productos/fd.png'} 
                      onError={(e) => { e.target.onerror = null; e.target.src = '/productos/fd.png'; }}
                      style={{ height: 180, objectFit: 'cover' }} 
                    />
                    <Badge 
                      bg="danger" 
                      style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px',
                        fontSize: '0.85rem',
                        padding: '8px 12px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.4)'
                      }}
                    >
                      🔥 OFERTA
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontSize: '1rem', fontWeight: '600' }}>
                      {o.producto || o.nombre || 'Sin nombre'}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-2">
                      <strong>Marca:</strong> {o.marca}<br/>
                      <strong>Modelo:</strong> {o.modelo || 'N/A'}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="mb-3 text-center p-2 rounded" style={{ backgroundColor: '#fff3cd' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#dc3545' }}>
                          {formatearPrecioSoles(precioUsd)}
                        </div>
                        <div className="small text-muted">USD ${precioUsd.toFixed(2)}</div>
                      </div>
                      <div className="d-grid gap-2">
                        <Link to={`/productos/${id}`} className="btn btn-outline-primary btn-sm">
                          Ver Detalles
                        </Link>
                        <Button variant="success" size="sm" onClick={() => handleAgregar(o)}>
                          🛒 Agregar al carrito
                        </Button>
                      </div>
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
