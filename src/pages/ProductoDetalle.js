// src/pages/ProductoDetalle.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Image, Spinner, Alert, Button } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("No se encontró el producto");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Cargando producto...</div>
      </Container>
    );
  }

  if (error || !producto) {
    return <Alert variant="danger" className="mt-5 text-center">{error || "Producto no encontrado"}</Alert>;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={producto.foto1} fluid alt={producto.producto} className="mb-3 rounded shadow-sm" />
          <div className="d-flex flex-wrap gap-2 mb-3">
            {[producto.foto2, producto.foto3, producto.foto4].filter(Boolean).map((foto, idx) => (
              <Image key={idx} src={foto} thumbnail style={{ width: 80, height: 80, objectFit: 'cover' }} alt={`Foto extra ${idx+2}`} />
            ))}
          </div>
        </Col>
        <Col md={6}>
          <h2 className="fw-bold mb-2">{producto.producto}</h2>
          <p className="mb-1"><strong>Marca:</strong> {producto.marca}</p>
          <p className="mb-1"><strong>Modelo:</strong> {producto.modelo}</p>
          <p className="mb-1"><strong>N° Parte:</strong> {producto.nroParte}</p>
          <p className="mb-1"><strong>SKU:</strong> {producto.nroSKU}</p>
          <p className="mb-1"><strong>Categoría:</strong> {producto.categoria?.categoria}</p>
          <p className="mb-1"><strong>Subcategoría:</strong> {producto.subCategoria?.subCategoria}</p>
          <p className="mb-1"><strong>Condición:</strong> {producto.condicionProducto?.condicionProd}</p>
          <p className="mb-1"><strong>Estado:</strong> {producto.estadoProducto?.estadoProd}</p>
          <p className="mb-1"><strong>Stock:</strong> {producto.stock}</p>
          <p className="mb-1"><strong>Precio:</strong> {producto.moneda?.simboloMoneda || 'S/'} {producto.precio?.toFixed(2)}</p>
          <p className="mb-1"><strong>Garantía:</strong> {producto.garantia} {producto.umGarantia}</p>
          <p className="mb-1"><strong>Fecha Alta:</strong> {producto.fechaAlta}</p>
          <hr />
          <p className="mb-1"><strong>Descripción:</strong> {producto.descripcion}</p>
          <p className="mb-1"><strong>Especificaciones:</strong> {producto.especificaciones}</p>
          {producto.observaciones && <p className="mb-1"><strong>Observaciones:</strong> {producto.observaciones}</p>}
          <div className="d-flex flex-column gap-2 mt-3">
            <Button variant="success" onClick={() => agregarAlCarrito(producto)}>
              Añadir al carrito
            </Button>
            {producto.linkHojaDeDatos && (
              <a
                href={producto.linkHojaDeDatos}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Hoja de Datos
              </a>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductoDetalle;

