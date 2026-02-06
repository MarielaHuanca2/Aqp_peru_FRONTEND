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
  const [ordenarPor, setOrdenarPor] = useState("");
  const [paginaInput, setPaginaInput] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [mostrarBotonScroll, setMostrarBotonScroll] = useState(false);
  const { agregarAlCarrito } = useCarrito();
  const { formatearPrecioSoles, convertirAMonedaSoles } = useTipoCambio();

  const { filtros, setFiltros } = useFiltroProductos();

  // Obtener opciones únicas para los filtros
  const marcasDisponibles = [...new Set(productos.map(p => p.marca))].sort();
  const categoriasDisponibles = [...new Set(productos.map(p => p.categoria?.categoria?.toLowerCase().trim()).filter(Boolean))].sort();
  
  // Subcategorías filtradas según la categoría seleccionada
  const subCategoriasDisponibles = [...new Set(
    productos
      .filter(p => filtros.categoria === "" || p.categoria?.categoria?.toLowerCase().trim() === filtros.categoria.toLowerCase().trim())
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

  // Limpiar subcategoría cuando cambia la categoría
  useEffect(() => {
    if (filtros.categoria !== "") {
      // Verificar si la subcategoría actual existe en la categoría seleccionada
      const subCatExiste = productos.some(
        p => p.categoria?.categoria?.toLowerCase().trim() === filtros.categoria.toLowerCase().trim() &&
             p.subCategoria?.subCategoria?.toLowerCase().trim() === filtros.subCategoria.toLowerCase().trim()
      );
      if (!subCatExiste && filtros.subCategoria !== "") {
        setFiltros(prev => ({ ...prev, subCategoria: "" }));
      }
    }
  }, [filtros.categoria]);

  const productosFiltrados = productos.filter((prod) => {
    const texto = filtros.texto.toLowerCase().trim();
    
    // Filtro por precio
    const precioProducto = prod.precio || 0;
    const precioMin = filtros.precioMin ? parseFloat(filtros.precioMin) : 0;
    const precioMax = filtros.precioMax ? parseFloat(filtros.precioMax) : Infinity;

    const resultado = (
      // Búsqueda por texto (nombre, descripción, modelo, marca)
      (filtros.texto === "" ||
        prod.producto?.toLowerCase().includes(texto) ||
        prod.descripcion?.toLowerCase().includes(texto) ||
        prod.modelo?.toLowerCase().includes(texto) ||
        prod.marca?.toLowerCase().includes(texto)) &&

      // Filtro por marca
      (filtros.marca === "" ||
        prod.marca?.toLowerCase().trim() === filtros.marca.toLowerCase().trim()) &&

      // Filtro por categoría
      (filtros.categoria === "" ||
        prod.categoria?.categoria?.toLowerCase().trim() === filtros.categoria.toLowerCase().trim()) &&

      // Filtro por subcategoría
      (filtros.subCategoria === "" ||
        prod.subCategoria?.subCategoria?.toLowerCase().trim() === filtros.subCategoria.toLowerCase().trim()) &&

      // Filtro por condición
      (filtros.condicion === "" ||
        prod.condicionProducto?.condicionProd?.toLowerCase().trim() === filtros.condicion.toLowerCase().trim()) &&

      // Filtro por rango de precio
      (precioProducto >= precioMin && precioProducto <= precioMax) &&

      // Filtro solo ofertas
      (!filtros.soloOfertas || prod.esOferta === true)
    );

    return resultado;
  });

  // Ordenar productos
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (ordenarPor) {
      case "nombre-asc":
        return (a.producto || "").localeCompare(b.producto || "");
      case "nombre-desc":
        return (b.producto || "").localeCompare(a.producto || "");
      case "precio-asc":
        return (a.precio || 0) - (b.precio || 0);
      case "precio-desc":
        return (b.precio || 0) - (a.precio || 0);
      default:
        return 0;
    }
  });

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [filtros, ordenarPor]);

  // Scroll al inicio cuando cambia la página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [paginaActual]);

  // Detectar scroll para mostrar/ocultar botones
  useEffect(() => {
    const manejarScroll = () => {
      setMostrarBotonScroll(window.scrollY > 300);
    };

    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  // Funciones para scroll
  const irAlInicio = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const irAlFinal = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Cálculos de paginación
  const totalPaginas = Math.ceil(productosOrdenados.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const indiceFin = indiceInicio + productosPorPagina;
  const productosEnPagina = productosOrdenados.slice(indiceInicio, indiceFin);

  // Manejar navegación directa a página
  const irAPagina = (e) => {
    e.preventDefault();
    const pagina = parseInt(paginaInput, 10);
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
      setPaginaInput("");
    }
  };

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
    <Container fluid className="mt-4 px-4">
      <h1 className="text-center mb-4" style={{ fontWeight: '700', color: '#212529' }}>Productos</h1>

      <Row>
        {/* Sidebar de Filtros */}
        <Col 
          lg={sidebarVisible ? 3 : 'auto'} 
          md={sidebarVisible ? 4 : 'auto'} 
          className="mb-4"
          style={{
            transition: 'all 0.3s ease',
            minWidth: sidebarVisible ? undefined : '60px',
            maxWidth: sidebarVisible ? undefined : '60px'
          }}
        >
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            overflow: 'hidden',
            position: 'sticky',
            top: '10px',
            transition: 'all 0.3s ease',
            maxHeight: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header del sidebar con botón toggle */}
            <div style={{
              background: 'linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%)',
              padding: sidebarVisible ? '10px 14px' : '10px 8px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarVisible ? 'space-between' : 'center',
              flexShrink: 0
            }}>
              {sidebarVisible && (
                <span className="fw-bold d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
                  🔍 Filtros
                </span>
              )}
              <button
                onClick={() => setSidebarVisible(!sidebarVisible)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  fontSize: '0.85rem'
                }}
                onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.3)'}
                onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
                title={sidebarVisible ? 'Ocultar filtros' : 'Mostrar filtros'}
              >
                {sidebarVisible ? '◀' : '▶'}
              </button>
            </div>

            {sidebarVisible && (
            <div style={{ padding: '12px', overflowY: 'auto', flex: 1 }}>
              {/* Búsqueda */}
              <div className="mb-3">
                <Form.Label className="small fw-bold text-uppercase mb-1 d-flex align-items-center gap-1" style={{ color: '#6c757d', letterSpacing: '0.3px', fontSize: '0.7rem' }}>
                  🔎 Buscar
                </Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type="text"
                    placeholder="Nombre, marca..."
                    value={filtros.texto}
                    onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #dee2e6',
                      padding: '8px 10px',
                      fontSize: '0.8rem',
                      transition: 'all 0.2s ease',
                      backgroundColor: '#fafbfc'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0d6efd';
                      e.target.style.backgroundColor = '#fff';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#dee2e6';
                      e.target.style.backgroundColor = '#fafbfc';
                    }}
                  />
                  {filtros.texto && (
                    <button
                      onClick={() => setFiltros({ ...filtros, texto: '' })}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#e9ecef',
                        border: 'none',
                        borderRadius: '50%',
                        width: '16px',
                        height: '16px',
                        fontSize: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6c757d'
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Marca */}
              <div className="mb-3">
                <Form.Label className="small fw-bold text-uppercase mb-1" style={{ color: '#6c757d', fontSize: '0.7rem' }}>
                  🎯 Marca
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={filtros.marca}
                  onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    backgroundColor: '#fafbfc'
                  }}
                >
                  <option value="">Todas</option>
                  {marcasDisponibles.map((marca) => (
                    <option key={marca} value={marca}>{marca}</option>
                  ))}
                </Form.Select>
              </div>

              {/* Categoría */}
              <div className="mb-3">
                <Form.Label className="small fw-bold text-uppercase mb-1" style={{ color: '#6c757d', fontSize: '0.7rem' }}>
                  📂 Categoría
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={filtros.categoria}
                  onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value, subCategoria: "" })}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    backgroundColor: '#fafbfc'
                  }}
                >
                  <option value="">Todas</option>
                  {categoriasDisponibles.map((categoria) => (
                    <option key={categoria} value={categoria}>{categoria}</option>
                  ))}
                </Form.Select>
              </div>

              {/* Subcategoría */}
              <div className="mb-3">
                <Form.Label className="small fw-bold text-uppercase mb-1" style={{ color: '#6c757d', fontSize: '0.7rem' }}>
                  📌 Subcategoría
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={filtros.subCategoria}
                  onChange={(e) => setFiltros({ ...filtros, subCategoria: e.target.value })}
                  disabled={subCategoriasDisponibles.length === 0}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                    fontSize: '0.8rem',
                    cursor: subCategoriasDisponibles.length === 0 ? 'not-allowed' : 'pointer',
                    opacity: subCategoriasDisponibles.length === 0 ? 0.5 : 1,
                    backgroundColor: subCategoriasDisponibles.length === 0 ? '#f0f0f0' : '#fafbfc'
                  }}
                >
                  <option value="">Todas</option>
                  {subCategoriasDisponibles.map((subCategoria) => (
                    <option key={subCategoria} value={subCategoria}>{subCategoria}</option>
                  ))}
                </Form.Select>
              </div>

              {/* Condición */}
              <div className="mb-3">
                <Form.Label className="small fw-bold text-uppercase mb-1" style={{ color: '#6c757d', fontSize: '0.7rem' }}>
                  ✨ Condición
                </Form.Label>
                <Form.Select
                  size="sm"
                  value={filtros.condicion}
                  onChange={(e) => setFiltros({ ...filtros, condicion: e.target.value })}
                  style={{
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    backgroundColor: '#fafbfc'
                  }}
                >
                  <option value="">Todas</option>
                  {condicionesDisponibles.map((condicion) => (
                    <option key={condicion} value={condicion}>{condicion}</option>
                  ))}
                </Form.Select>
              </div>

              {/* Rango de precios */}
              <div className="mb-3">
                <Form.Label className="small fw-bold text-uppercase mb-1" style={{ color: '#6c757d', fontSize: '0.7rem' }}>
                  💰 Precio (S/)
                </Form.Label>
                <div className="d-flex gap-2 align-items-center">
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="Min"
                    min="0"
                    value={filtros.precioMin}
                    onChange={(e) => setFiltros({ ...filtros, precioMin: e.target.value })}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #dee2e6',
                      fontSize: '0.8rem',
                      backgroundColor: '#fafbfc'
                    }}
                  />
                  <span style={{ color: '#adb5bd', fontSize: '0.8rem' }}>-</span>
                  <Form.Control
                    size="sm"
                    type="number"
                    placeholder="Max"
                    min="0"
                    value={filtros.precioMax}
                    onChange={(e) => setFiltros({ ...filtros, precioMax: e.target.value })}
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #dee2e6',
                      fontSize: '0.8rem',
                      backgroundColor: '#fafbfc'
                    }}
                  />
                </div>
              </div>

              {/* Solo ofertas */}
              <div className="mb-3 p-2 rounded" style={{ background: filtros.soloOfertas ? '#fff3cd' : '#f8f9fa', transition: 'all 0.2s ease' }}>
                <Form.Check
                  type="switch"
                  id="solo-ofertas-switch"
                  label={<span className="fw-semibold" style={{ fontSize: '0.8rem' }}>🔥 Ofertas</span>}
                  checked={filtros.soloOfertas || false}
                  onChange={(e) => setFiltros({ ...filtros, soloOfertas: e.target.checked })}
                />
              </div>

              {/* Botón limpiar */}
              <button 
                className="btn btn-sm w-100" 
                onClick={limpiarFiltros}
                style={{
                  borderRadius: '8px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '8px',
                  fontWeight: '500',
                  fontSize: '0.8rem'
                }}
              >
                ↻ Limpiar
              </button>
            </div>
            )}
          </div>
        </Col>

        {/* Contenido principal */}
        <Col lg={sidebarVisible ? 9 : 12} md={sidebarVisible ? 8 : 12} style={{ transition: 'all 0.3s ease' }}>
          {/* Barra superior de ordenamiento */}
          <div className="mb-4 p-3 rounded-3 d-flex flex-wrap justify-content-between align-items-center gap-3" style={{
            background: 'white',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            border: '1px solid #e9ecef'
          }}>
            {/* Contador de resultados */}
            <div className="d-flex align-items-center gap-2">
              <div className="px-3 py-2 rounded-pill" style={{ background: '#e7f1ff', border: '1px solid #b6d4fe' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0d6efd' }}>
                  📦 {productosOrdenados.length} productos
                </span>
              </div>
              {totalPaginas > 1 && (
                <span className="badge" style={{ background: '#6c757d', borderRadius: '8px', padding: '6px 12px', fontSize: '0.8rem' }}>
                  Pág. {paginaActual} de {totalPaginas}
                </span>
              )}
            </div>

            {/* Opciones de ordenamiento y visualización */}
            <div className="d-flex align-items-center gap-3 flex-wrap">
              {/* Ordenar por */}
              <div className="d-flex align-items-center gap-2">
                <span className="small fw-semibold" style={{ color: '#6c757d', whiteSpace: 'nowrap' }}>Ordenar:</span>
                <Form.Select
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value)}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    minWidth: '180px'
                  }}
                >
                  <option value="">Relevancia</option>
                  <option value="nombre-asc">Nombre A-Z</option>
                  <option value="nombre-desc">Nombre Z-A</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                </Form.Select>
              </div>

              {/* Productos por página */}
              <div className="d-flex align-items-center gap-2">
                <span className="small fw-semibold" style={{ color: '#6c757d', whiteSpace: 'nowrap' }}>Mostrar:</span>
                <Form.Select
                  value={productosPorPagina}
                  onChange={(e) => {
                    setProductosPorPagina(Number(e.target.value));
                    setPaginaActual(1);
                  }}
                  style={{
                    borderRadius: '8px',
                    border: '2px solid #e9ecef',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    width: 'auto'
                  }}
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </Form.Select>
              </div>
            </div>
          </div>

          {/* Lista de productos */}
          <Row>
        {productosEnPagina.length > 0 ? (
          productosEnPagina.map((prod) => (
            <Col lg={4} md={6} xs={12} className="mb-4" key={prod.idProducto}>
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
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4 mb-4 p-3 rounded" style={{ background: '#f8f9fa' }}>
          <Pagination className="mb-0" style={{ gap: '2px' }}>
            <Pagination.First 
              onClick={() => setPaginaActual(1)} 
              disabled={paginaActual === 1}
              style={{ borderRadius: '8px 0 0 8px' }}
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
                style={numero === paginaActual ? { fontWeight: 'bold' } : {}}
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
              style={{ borderRadius: '0 8px 8px 0' }}
            />
          </Pagination>
          
          {/* Navegación directa a página */}
          <form onSubmit={irAPagina} className="d-flex align-items-center gap-2">
            <span className="small text-muted">Ir a:</span>
            <Form.Control
              type="number"
              min="1"
              max={totalPaginas}
              value={paginaInput}
              onChange={(e) => setPaginaInput(e.target.value)}
              placeholder="#"
              style={{
                width: '60px',
                textAlign: 'center',
                borderRadius: '8px',
                border: '2px solid #dee2e6',
                padding: '6px 8px',
                fontSize: '0.9rem'
              }}
            />
            <button 
              type="submit" 
              className="btn btn-primary btn-sm"
              disabled={!paginaInput || parseInt(paginaInput) < 1 || parseInt(paginaInput) > totalPaginas}
              style={{
                borderRadius: '8px',
                padding: '6px 12px'
              }}
            >
              Ir
            </button>
          </form>
        </div>
      )}
        </Col>
      </Row>

      {/* Botones flotantes de navegación */}
      {mostrarBotonScroll && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 1000
        }}>
          {/* Botón ir al inicio */}
          <button
            onClick={irAlInicio}
            style={{
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#0b5ed7';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#0d6efd';
              e.target.style.transform = 'scale(1)';
            }}
            title="Ir al inicio"
          >
            ▲
          </button>

          {/* Botón ir al final */}
          <button
            onClick={irAlFinal}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a6268';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#6c757d';
              e.target.style.transform = 'scale(1)';
            }}
            title="Ir al final"
          >
            ▼
          </button>
        </div>
      )}
    </Container>
  );
};

export default ListaProductos;


