// src/pages/ProductoDetalle.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Spinner, Alert, Button, Toast, ToastContainer } from "react-bootstrap";
import { useCarrito } from "../context/CarritoContext";
import { useTipoCambio } from "../context/TipoCambioContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { agregarAlCarrito } = useCarrito();
  const { formatearPrecioSoles } = useTipoCambio();

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

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad);
    setShowToast(true);
    setTimeout(() => {
      navigate('/productos');
    }, 1500);
  };

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
          <p className="mb-1"><strong>Precio:</strong> {formatearPrecioSoles(producto.precio || 0)}</p>
          <p className="mb-1"><strong>Garantía:</strong> {producto.garantia} {producto.umGarantia}</p>
          <p className="mb-1"><strong>Fecha Alta:</strong> {producto.fechaAlta}</p>
          <hr />
          <p className="mb-1"><strong>Descripción:</strong> {producto.descripcion}</p>
          <p className="mb-1"><strong>Especificaciones:</strong> {producto.especificaciones}</p>
          {producto.observaciones && <p className="mb-1"><strong>Observaciones:</strong> {producto.observaciones}</p>}
          <div className="d-flex flex-column gap-2 mt-3">
            <div className="d-flex align-items-center gap-2 mb-2">
              <label htmlFor="cantidad" className="fw-bold">Cantidad:</label>
              <input
                id="cantidad"
                type="number"
                min="1"
                max={producto.stock || 99}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                className="form-control"
                style={{ width: "80px" }}
              />
            </div>
            <Button variant="success" onClick={handleAgregarCarrito}>
              Añadir al carrito ({cantidad} {cantidad === 1 ? 'unidad' : 'unidades'})
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
      <ToastContainer position="top-center" className="p-3" style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={1500} autohide>
          <Toast.Header>
            <strong className="me-auto">¡Éxito!</strong>
          </Toast.Header>
          <Toast.Body>Producto agregado al carrito. Redirigiendo...</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default ProductoDetalle;

