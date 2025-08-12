// src/pages/ListaProductos.js
import React, { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useCarrito();

  const [filtros, setFiltros] = useState({
    texto: "",
    marca: "",
    categoria: "",
    subCategoria: "",
    condicion: "",
    precioMin: "",
    precioMax: ""
  });

  // Obtener opciones únicas para los filtros
  const marcasDisponibles = [...new Set(productos.map(p => p.marca))].sort();
  const categoriasDisponibles = [...new Set(productos.map(p => p.categoria?.categoria).filter(Boolean))].sort();
  const subCategoriasDisponibles = [...new Set(productos.map(p => p.subCategoria?.subCategoria).filter(Boolean))].sort();
  const condicionesDisponibles = [...new Set(productos.map(p => p.condicionProducto?.condicionProd).filter(Boolean))].sort();

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
        prod.descripcion?.toLowerCase().includes(texto) ||
        prod.modelo?.toLowerCase().includes(texto)) &&
      (filtros.marca === "" || prod.marca === filtros.marca) &&
      (filtros.categoria === "" || prod.categoria?.categoria === filtros.categoria) &&
      (filtros.subCategoria === "" || prod.subCategoria?.subCategoria === filtros.subCategoria) &&
      (filtros.condicion === "" || prod.condicionProducto?.condicionProd === filtros.condicion) &&
      (filtros.precioMin === "" || prod.precio >= parseFloat(filtros.precioMin)) &&
      (filtros.precioMax === "" || prod.precio <= parseFloat(filtros.precioMax))
    );
  });

  const limpiarFiltros = () => {
    setFiltros({
      texto: "",
      marca: "",
      categoria: "",
      subCategoria: "",
      condicion: "",
      precioMin: "",
      precioMax: ""
    });
  };

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

      {/* Filtros mejorados */}
      <div className="mb-4 p-4 bg-light rounded shadow-sm">
        <h6 className="mb-3 text-muted fw-bold">🔍 FILTROS DE BÚSQUEDA</h6>
        
        {/* Primera fila de filtros */}
        <Row className="g-2 mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Buscar producto</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Nombre, descripción o modelo..."
                value={filtros.texto}
                onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Marca</Form.Label>
              <Form.Select
                size="sm"
                value={filtros.marca}
                onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
              >
                <option value="">Todas</option>
                {marcasDisponibles.map((marca) => (
                  <option key={marca} value={marca}>
                    {marca}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Categoría</Form.Label>
              <Form.Select
                size="sm"
                value={filtros.categoria}
                onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
              >
                <option value="">Todas</option>
                {categoriasDisponibles.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Segunda fila de filtros */}
        <Row className="g-2 mb-3">
          <Col md={3}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Subcategoría</Form.Label>
              <Form.Select
                size="sm"
                value={filtros.subCategoria}
                onChange={(e) => setFiltros({ ...filtros, subCategoria: e.target.value })}
              >
                <option value="">Todas</option>
                {subCategoriasDisponibles.map((subCategoria) => (
                  <option key={subCategoria} value={subCategoria}>
                    {subCategoria}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Condición</Form.Label>
              <Form.Select
                size="sm"
                value={filtros.condicion}
                onChange={(e) => setFiltros({ ...filtros, condicion: e.target.value })}
              >
                <option value="">Todas</option>
                {condicionesDisponibles.map((condicion) => (
                  <option key={condicion} value={condicion}>
                    {condicion}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Precio mínimo</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="S/ 0.00"
                value={filtros.precioMin}
                onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label className="small text-muted mb-1">Precio máximo</Form.Label>
              <Form.Control
                size="sm"
                type="number"
                placeholder="S/ 99,999"
                value={filtros.precioMax}
                onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Botón para limpiar filtros y contador de resultados */}
        <Row className="align-items-center pt-2 border-top">
          <Col md={6}>
            <button className="btn btn-outline-secondary btn-sm" onClick={limpiarFiltros}>
              <i className="bi bi-arrow-clockwise me-1"></i>
              Limpiar filtros
            </button>
          </Col>
          <Col md={6} className="text-end">
            <small className="text-muted fw-bold">
              📦 {productosFiltrados.length} de {productos.length} productos
            </small>
          </Col>
        </Row>
      </div>

      {/* Lista de productos */}
      <Row>
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((prod) => (
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
                    <strong>Categoría:</strong> {prod.categoria?.categoria} <br />
                    <strong>Condición:</strong> {prod.condicionProducto?.condicionProd} <br />
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
          ))
        ) : (
          <Col xs={12}>
            <div className="text-center py-5">
              <h5>No se encontraron productos</h5>
              <p className="text-muted">Intenta ajustar los filtros de búsqueda</p>
              <button className="btn btn-primary" onClick={limpiarFiltros}>
                Ver todos los productos
              </button>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ListaProductos;


