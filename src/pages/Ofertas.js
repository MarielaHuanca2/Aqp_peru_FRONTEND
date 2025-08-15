import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Ofertas() {
  const placeholderHero = "/images/45001.2018.jpg"; // replace with your large image

  // No sample data here. Replace with API-driven content when ready.

  return (
    <Container className="py-4">
      <h2 className="mb-3">Ofertas Especiales</h2>

      {/* Hero / Large image area */}
      <div className="mb-4 rounded overflow-hidden shadow-sm" style={{ height: 320 }}>
        <img
          src={placeholderHero}
          alt="Ofertas destacadas"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <p className="lead text-muted">Aprovecha nuestras promociones por tiempo limitado.</p>

      {/* Empty state: no offers to display */}
      <div className="mt-4">
        <Card className="p-4 text-center border-0">
          <Card.Body>
            <h5 className="mb-2">No hay ofertas disponibles</h5>
            <p className="text-muted mb-0">Las ofertas se cargarán automáticamente cuando haya promociones activas.</p>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Ofertas;
