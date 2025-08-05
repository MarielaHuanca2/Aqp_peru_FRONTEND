// src/pages/ListaProductos.js
import React, { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useCarrito();

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
          <Col md={4} sm={6} xs={12} className="mb-4" key={prod.idProducto}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={prod.foto1}
                alt={prod.producto}
                style={{ objectFit: "cover", height: "250px" }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{prod.producto}</Card.Title>
                <Card.Text>
                  <strong>Marca:</strong> {prod.marca} <br />
                  <strong>Modelo:</strong> {prod.modelo} <br />
                  <strong>Precio:</strong> {prod.moneda?.simboloMoneda || 'S/'} {prod.precio?.toFixed(2)} <br />
                  <strong>Stock:</strong> {prod.stock}
                </Card.Text>
                <div className="mt-auto d-flex flex-column gap-2">
                  <Link to={`/productos/${prod.idProducto}`} className="btn btn-primary mb-2">
                    Ver Detalles
                  </Link>
                  <button
                    className="btn btn-success mb-2"
                    onClick={() => agregarAlCarrito(prod)}
                  >
                    Añadir al carrito
                  </button>
                  {prod.linkHojaDeDatos && (
                    <a
                      href={prod.linkHojaDeDatos}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      Hoja de Datos
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


