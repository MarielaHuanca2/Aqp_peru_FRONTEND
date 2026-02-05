// src/pages/ListaProductos.js
import React, { useEffect, useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useTipoCambio } from "../context/TipoCambioContext";
import { Container, Row, Col, Card, Form, Pagination, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { obtenerProductos } from "../services/productoService";
import { useFiltroProductos } from "../context/FiltroProductosContext";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginaActual, setPaginaActual] = useState(1);
  const [productosPorPagina, setProductosPorPagina] = useState(12);
  const { agregarAlCarrito } = useCarrito();
  const { formatearPrecioSoles, convertirAMonedaSoles } = useTipoCambio();

  const { filtros, setFiltros } = useFiltroProductos();

  // Obtener opciones únicas para los filtros
  const marcasDisponibles = [...new Set(productos.map(p => p.marca))].sort();
  const categoriasDisponibles = [...new Set(productos.map(p => p.categoria?.categoria?.toLowerCase().trim()).filter(Boolean))].sort();
  
  // Filtrar subcategorías según la categoría seleccionada
  const subCategoriasDisponibles = filtros.categoria === ""
    ? [...new Set(productos.map(p => p.subCategoria?.subCategoria?.toLowerCase().trim()).filter(Boolean))].sort()
    : [...new Set(
        productos
          .filter(p => p.categoria?.categoria?.toLowerCase().trim() === filtros.categoria.toLowerCase().trim())
          .map(p => p.subCategoria?.subCategoria?.toLowerCase().trim())
          .filter(Boolean)
      )].sort();
  
  const condicionesDisponibles = [...new Set(productos.map(p => p.condicionProducto?.condicionProd?.toLowerCase().trim()).filter(Boolean))].sort();

  useEffect(() => {
    obtenerProductos()
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const texto = filtros.texto.toLowerCase().trim();
    
    // Convertir precio del producto a soles para comparar
    const precioEnSoles = convertirAMonedaSoles(prod.precio || 0);
    
    // Validar filtros de precio
    const precioMin = filtros.precioMin === "" ? null : Number(filtros.precioMin);
    const precioMax = filtros.precioMax === "" ? null : Number(filtros.precioMax);
    
    const cumplePrecioMin = precioMin === null || precioEnSoles >= precioMin;
    const cumplePrecioMax = precioMax === null || precioEnSoles <= precioMax;

    const resultado = (
      (filtros.texto === "" ||
        prod.descripcion?.toLowerCase().includes(texto) ||
        prod.modelo?.toLowerCase().includes(texto) ||
        prod.producto?.toLowerCase().includes(texto)) &&

      (filtros.marca === "" ||
        prod.marca?.toLowerCase().trim() === filtros.marca.toLowerCase().trim()) &&

      (filtros.categoria === "" ||
        prod.categoria?.categoria?.toLowerCase().trim() === filtros.categoria.toLowerCase().trim()) &&

      (filtros.subCategoria === "" ||
        prod.subCategoria?.subCategoria?.toLowerCase().trim() === filtros.subCategoria.toLowerCase().trim()) &&

      (filtros.condicion === "" ||
        prod.condicionProducto?.condicionProd?.toLowerCase().trim() === filtros.condicion.toLowerCase().trim()) &&

      cumplePrecioMin &&
      cumplePrecioMax &&

      (!filtros.soloOfertas || prod.esOferta === true)
    );

    return resultado;
  });

  console.log("Productos filtrados:", productosFiltrados); // Debugging log

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [filtros]);

  // Cálculos de paginación
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosEnPagina = productosFiltrados.slice(indiceInicio, indiceFin);

  // Generar números de página para mostrar
  const generarNumerosPaginas = () => {
    const paginas = [];
    const maxPaginasVisibles = 5;
    let inicio = Math.max(1, paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio + 1 < maxPaginasVisibles) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  };

  const limpiarFiltros = () => {
    setFiltros({
      texto: "",
      marca: "",
      categoria: "",
      subCategoria: "",
      condicion: "",
      precioMin: "",
      precioMax: "",
      soloOfertas: false,
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
                onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value, subCategoria: "" })}
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
              <Form.Label className="small text-muted mb-1">Precio mínimo (S/)</Form.Label>
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
              <Form.Label className="small text-muted mb-1">Precio máximo (S/)</Form.Label>
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
          <Col md={4}>
            <div className="d-flex gap-3 align-items-center">
              <button className="btn btn-outline-secondary btn-sm" onClick={limpiarFiltros}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Limpiar filtros
              </button>
              <Form.Check
                type="checkbox"
                label="🔥 Solo ofertas"
                checked={filtros.soloOfertas || false}
                onChange={(e) => setFiltros({ ...filtros, soloOfertas: e.target.checked })}
                className="text-danger fw-bold"
              />
            </div>
          </Col>
          <Col md={4} className="text-center">
            <Form.Group className="d-inline-flex align-items-center gap-2">
              <Form.Label className="small text-muted mb-0">Mostrar:</Form.Label>
              <Form.Select
                size="sm"
                style={{ width: 'auto' }}
                value={productosPorPagina}
                onChange={(e) => {
                  setProductosPorPagina(Number(e.target.value));
                  setPaginaActual(1);
                }}
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </Form.Select>
              <span className="small text-muted">por página</span>
            </Form.Group>
          </Col>
          <Col md={4} className="text-end">
            <small className="text-muted fw-bold">
              📦 {productosFiltrados.length} de {productos.length} productos
              {totalPaginas > 1 && ` (Página ${paginaActual} de ${totalPaginas})`}
            </small>
          </Col>
        </Row>
      </div>

      {/* Lista de productos */}
      <Row>
        {productosEnPagina.length > 0 ? (
          productosEnPagina.map((prod) => (
            <Col md={4} sm={6} xs={12} className="mb-4" key={prod.idProducto}>
              <Card 
                className="h-100 shadow-sm border-0" 
                style={{ 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  background: prod.esOferta 
                    ? 'linear-gradient(145deg, #fff9e6 0%, #ffffff 100%)' 
                    : '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = prod.esOferta 
                    ? '0 8px 25px rgba(255, 107, 0, 0.25)' 
                    : '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ position: 'relative', backgroundColor: '#f8f9fa' }}>
                  <Link
                    to={`/productos/${prod.idProducto}`}
                    className="d-block"
                    aria-label={`Ir al detalle de ${prod.producto}`}
                    style={{ display: 'block' }}
                  >
                    <Card.Img
                      variant="top"
                      src={prod.foto1 || "/productos/fd.png"}
                      alt={prod.producto || "Imagen del producto"}
                      onError={(e) => { e.target.onerror = null; e.target.src = "/productos/fd.png"; }}
                      loading="lazy"
                      style={{ objectFit: "contain", height: "220px", width: "100%", padding: "10px" }}
                    />
                  </Link>
                  {prod.esOferta && (
                    <Badge 
                      bg="danger" 
                      style={{ 
                        position: 'absolute', 
                        top: '10px', 
                        right: '10px',
                        fontSize: '0.8rem',
                        padding: '6px 10px',
                        borderRadius: '20px',
                        boxShadow: '0 2px 8px rgba(220, 53, 69, 0.4)',
                        animation: 'pulse 2s infinite'
                      }}
                    >
                      🔥 OFERTA
                    </Badge>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ fontSize: '1rem', fontWeight: '600', minHeight: '48px' }}>
                    {prod.producto}
                  </Card.Title>
                  <Card.Text className="small text-muted mb-2">
                    <strong>Marca:</strong> {prod.marca} <br />
                    <strong>Modelo:</strong> {prod.modelo} <br />
                    <strong>Categoría:</strong> {prod.categoria?.categoria} <br />
                    <strong>Condición:</strong> {prod.condicionProducto?.condicionProd}
                  </Card.Text>
                  <div className={`mb-3 text-center p-2 rounded ${prod.esOferta ? '' : 'bg-light'}`} 
                    style={prod.esOferta ? { backgroundColor: '#fff3cd' } : {}}
                  >
                    <div style={{ 
                      fontSize: '1.2rem', 
                      fontWeight: 'bold', 
                      color: prod.esOferta ? '#dc3545' : '#212529' 
                    }}>
                      {formatearPrecioSoles(prod.precio || 0)}
                    </div>
                    <small className="text-muted d-block">Precio sin IGV</small>
                    <small className="text-muted">Stock: {prod.stock}</small>
                  </div>
                  <div className="mt-auto d-grid gap-2">
                    <Link to={`/productos/${prod.idProducto}`} className="btn btn-primary btn-sm">
                      Ver Detalles
                    </Link>
                    {prod.stock > 0 ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => agregarAlCarrito(prod)}
                      >
                        🛒 Añadir al carrito
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary btn-sm"
                        disabled
                      >
                        ❌ Agotado
                      </button>
                    )}
                    {prod.linkHojaDeDatos && (
                      <a
                        href={prod.linkHojaDeDatos}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        📄 Hoja de Datos
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

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="d-flex justify-content-center mt-4 mb-4">
          <Pagination>
            <Pagination.First 
              onClick={() => setPaginaActual(1)} 
              disabled={paginaActual === 1}
            />
            <Pagination.Prev 
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))} 
              disabled={paginaActual === 1}
            />
            
            {generarNumerosPaginas()[0] > 1 && (
              <>
                <Pagination.Item onClick={() => setPaginaActual(1)}>1</Pagination.Item>
                {generarNumerosPaginas()[0] > 2 && <Pagination.Ellipsis disabled />}
              </>
            )}
            
            {generarNumerosPaginas().map(numero => (
              <Pagination.Item
                key={numero}
                active={numero === paginaActual}
                onClick={() => setPaginaActual(numero)}
              >
                {numero}
              </Pagination.Item>
            ))}
            
            {generarNumerosPaginas()[generarNumerosPaginas().length - 1] < totalPaginas && (
              <>
                {generarNumerosPaginas()[generarNumerosPaginas().length - 1] < totalPaginas - 1 && (
                  <Pagination.Ellipsis disabled />
                )}
                <Pagination.Item onClick={() => setPaginaActual(totalPaginas)}>
                  {totalPaginas}
                </Pagination.Item>
              </>
            )}
            
            <Pagination.Next 
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))} 
              disabled={paginaActual === totalPaginas}
            />
            <Pagination.Last 
              onClick={() => setPaginaActual(totalPaginas)} 
              disabled={paginaActual === totalPaginas}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default ListaProductos;


