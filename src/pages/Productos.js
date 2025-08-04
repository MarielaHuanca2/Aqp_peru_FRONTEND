// src/pages/ListaProductos.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerProductos()
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Container className="mt-5">
        <h1 className="text-center mb-4">Productos</h1>
        <p className="text-center">Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Productos</h1>
      <Row>
        {productos.map((prod) => (
          <Col md={4} sm={6} xs={12} className="mb-4" key={prod.partNumber}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={prod.imagen}
                alt={prod.descripcion}
                style={{ objectFit: "cover", height: "250px" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{prod.descripcion}</Card.Title>
                <Card.Text>
                  <strong>Precio:</strong> S/. {prod.precio?.toFixed(2)} <br />
                  <strong>Stock:</strong> {prod.stock} <br />
                  <strong>Línea:</strong> {prod.linea}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-between gap-2">
                  <Link to={`/productos/${prod.partNumber}`} className="btn btn-primary">
                    Ver Detalles
                  </Link>
                  {prod.linkFicha && (
                    <a
                      href={prod.linkFicha}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Ficha Técnica
                    </a>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListaProductos;


