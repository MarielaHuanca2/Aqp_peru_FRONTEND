// src/pages/ProductoDetalle.js
import React from "react";
import { useParams } from "react-router-dom";
import productos from "../data/productos";
import { Container, Row, Col, Image } from "react-bootstrap";

const ProductoDetalle = () => {
  const { id } = useParams();
  
  // Busca el producto de forma segura
  const producto = productos.find(p => p.partNumber && p.partNumber.toString() === id);

  // Si no se encuentra el producto, muestra mensaje
  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado</h2>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={producto.imagen} fluid alt={producto.descripcion} />
        </Col>
        <Col md={6}>
          <h2>{producto.descripcion}</h2>
          <p><strong>Línea:</strong> {producto.linea}</p>
          <p><strong>Stock:</strong> {producto.stock}</p>
          <p><strong>Garantía:</strong> {producto.garantia}</p>
          <p className="text-success fw-bold">S/. {producto.precio.toFixed(2)}</p>
          {producto.linkFicha && (
            <a
              href={producto.linkFicha}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Ver Ficha Técnica
            </a>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoDetalle;
;

