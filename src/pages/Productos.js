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

  const [filtros, setFiltros] = useState({
    texto: "",
    marca: "",
    precioMin: "",
    precioMax: ""
  });

  useEffect(() => {
    obtenerProductos()
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const texto = filtros.texto.toLowerCase();

    return (
      (filtros.texto === "" ||
        prod.producto.toLowerCase().includes(texto) ||
        prod.descripcion?.toLowerCase().includes(texto)) &&
      (filtros.marca === "" || prod.marca.toLowerCase().includes(filtros.marca.toLowerCase())) &&
      (filtros.precioMin === "" || prod.precio >= parseFloat(filtros.precioMin)) &&
      (filtros.precioMax === "" || prod.precio <= parseFloat(filtros.precioMax))
    );
  });

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

      {/* Filtros */}
      <div className="mb-4">
        <Row className="g-2">
          <Col md={3}>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por nombre o descripción"
              value={filtros.texto}
              onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
            />
          </Col>
          <Col md={3}>
            <input
              type="text"
              className="form-control"
              placeholder="Marca"
              value={filtros.marca}
              onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <input
              type="number"
              className="form-control"
              placeholder="Precio mínimo"
              value={filtros.precioMin}
              onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <input
              type="number"
              className="form-control"
              placeholder="Precio máximo"
              value={filtros.precioMax}
              onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
            />
          </Col>
        </Row>
      </div>

      {/* Lista de productos */}
      <Row>
        {productosFiltrados.map((prod) => (
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
                  <strong>Precio:</strong>{" "}
                  {prod.moneda?.simboloMoneda || "S/"} {prod.precio?.toFixed(2)} <br />
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


