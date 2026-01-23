import React, { useState, useEffect } from "react";
import { Container, Table, Button, Form, Row, Col, Alert, Spinner, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { obtenerProductos, importarCsvOfertas, toggleOfertaProducto } from "../services/productoService";
import { useTipoCambio } from "../context/TipoCambioContext";
import apiClient from "../services/authService";

const ProductosAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editandoProducto, setEditandoProducto] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [importandoCsv, setImportandoCsv] = useState(false);
  const { formatearPrecioSoles } = useTipoCambio();
  const navigate = useNavigate();
  
  const [filtros, setFiltros] = useState({
    texto: "",
    marca: "",
    categoria: ""
  });

  const [formProducto, setFormProducto] = useState({
    nroModelo: "",
    nroParte: "",
    nroSKU: "",
    producto: "",
    marca: "",
    modelo: "",
    descripcion: "",
    especificaciones: "",
    precio: "",
    stock: "",
    observaciones: "",
    foto1: "",
    foto2: "",
    foto3: "",
    foto4: "",
    linkHojaDeDatos: "",
    garantia: "",
    umGarantia: "años"
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const response = await obtenerProductos();
      setProductos(response.data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const productosFiltrados = productos.filter((prod) => {
    const texto = filtros.texto.toLowerCase();
    return (
      (filtros.texto === "" ||
        prod.producto.toLowerCase().includes(texto) ||
        prod.descripcion?.toLowerCase().includes(texto) ||
        prod.marca.toLowerCase().includes(texto)) &&
      (filtros.marca === "" || prod.marca === filtros.marca) &&
      (filtros.categoria === "" || prod.categoria?.categoria === filtros.categoria)
    );
  });

  const marcasDisponibles = [...new Set(productos.map(p => p.marca))].sort();
  const categoriasDisponibles = [...new Set(productos.map(p => p.categoria?.categoria).filter(Boolean))].sort();

  const abrirModalEditar = (producto = null) => {
    if (producto) {
      setEditandoProducto(producto);
      setFormProducto({
        nroModelo: producto.nroModelo || "",
        nroParte: producto.nroParte || "",
        nroSKU: producto.nroSKU || "",
        producto: producto.producto || "",
        marca: producto.marca || "",
        modelo: producto.modelo || "",
        descripcion: producto.descripcion || "",
        especificaciones: producto.especificaciones || "",
        precio: producto.precio || "",
        stock: producto.stock || "",
        observaciones: producto.observaciones || "",
        foto1: producto.foto1 || "",
        foto2: producto.foto2 || "",
        foto3: producto.foto3 || "",
        foto4: producto.foto4 || "",
        linkHojaDeDatos: producto.linkHojaDeDatos || "",
        garantia: producto.garantia || "",
        umGarantia: producto.umGarantia || "años"
      });
    } else {
      setEditandoProducto(null);
      setFormProducto({
        nroModelo: "",
        nroParte: "",
        nroSKU: "",
        producto: "",
        marca: "",
        modelo: "",
        descripcion: "",
        especificaciones: "",
        precio: "",
        stock: "",
        observaciones: "",
        foto1: "",
        foto2: "",
        foto3: "",
        foto4: "",
        linkHojaDeDatos: "",
        garantia: "",
        umGarantia: "años"
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormProducto({ ...formProducto, [e.target.name]: e.target.value });
  };

  const guardarProducto = async (e) => {
    e.preventDefault();
    try {
      if (editandoProducto) {
        await apiClient.put(`/productos/${editandoProducto.idProducto}`, formProducto);
      } else {
        await apiClient.post("/productos", formProducto);
      }
      
      setMensaje({ 
        tipo: "success", 
        texto: editandoProducto ? "Producto actualizado exitosamente" : "Producto creado exitosamente" 
      });
      
      setShowModal(false);
      cargarProductos();
    } catch (err) {
      setMensaje({ 
        tipo: "danger", 
        texto: `Error al ${editandoProducto ? 'actualizar' : 'crear'} el producto: ${err.response?.data?.message || err.message}` 
      });
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await apiClient.delete(`/productos/${id}`);
        setMensaje({ tipo: "success", texto: "Producto eliminado exitosamente" });
        cargarProductos();
      } catch (err) {
        setMensaje({ tipo: "danger", texto: `Error al eliminar el producto: ${err.response?.data?.message || err.message}` });
      }
    }
  };

  const handleToggleOferta = async (producto) => {
    try {
      const nuevoEstado = !producto.esOferta;
      await toggleOfertaProducto(producto.idProducto, nuevoEstado);
      setMensaje({ 
        tipo: "success", 
        texto: nuevoEstado 
          ? `"${producto.producto}" marcado como oferta` 
          : `"${producto.producto}" ya no es oferta` 
      });
      cargarProductos();
    } catch (err) {
      setMensaje({ 
        tipo: "danger", 
        texto: `Error al cambiar estado de oferta: ${err.response?.data?.message || err.message}` 
      });
    }
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <div>Cargando productos...</div>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Gestionar Productos</h2>
      
      {mensaje && <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>{mensaje.texto}</Alert>}
      
      {/* Botón para volver al panel de administrador */}
      <Button variant="primary" className="mb-3" onClick={() => navigate("/admin")}>
        Volver al Panel de Administrador
      </Button>

      {/* Filtros y acciones (más compactos y alineados) */}
      <Row className="mb-4 p-3 bg-light rounded align-items-center">
        <Col md={7} className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Buscar productos..."
            value={filtros.texto}
            onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
          />
          <Form.Select
            value={filtros.marca}
            onChange={(e) => setFiltros({ ...filtros, marca: e.target.value })}
            style={{ maxWidth: '220px' }}
          >
            <option value="">Todas las marcas</option>
            {marcasDisponibles.map((marca) => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </Form.Select>
          <Form.Select
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            style={{ maxWidth: '220px' }}
          >
            <option value="">Todas las categorías</option>
            {categoriasDisponibles.map((categoria) => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={5} className="d-flex justify-content-end align-items-center gap-2">
          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => setCsvFile(e.target.files[0] || null)}
              style={{ maxWidth: '220px' }}
            />
            <Button
              variant="primary"
              onClick={async () => {
                if (!csvFile) {
                  setMensaje({ tipo: 'danger', texto: 'Selecciona un archivo CSV primero.' });
                  return;
                }
                setImportandoCsv(true);
                setMensaje(null);
                try {
                  const formData = new FormData();
                  formData.append('archivo', csvFile);
                  const resp = await apiClient.post('/productos/importar-csv', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
                  setMensaje({ tipo: 'success', texto: resp.data?.message || 'CSV importado correctamente.' });
                  setCsvFile(null);
                  cargarProductos();
                } catch (err) {
                  console.error('Error importando CSV:', err);
                  setMensaje({ tipo: 'danger', texto: `Error al importar CSV: ${err.response?.data?.message || err.message}` });
                } finally {
                  setImportandoCsv(false);
                }

          {/* Importar CSV para ofertas */}
          <div className="d-flex align-items-center gap-2">
            <Form.Control
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => setCsvFile(e.target.files[0] || null)}
              style={{ maxWidth: '220px' }}
            />
            <Button
              variant="info"
              onClick={async () => {
                if (!csvFile) {
                  setMensaje({ tipo: 'danger', texto: 'Selecciona un archivo CSV para ofertas primero.' });
                  return;
                }
                setImportandoCsv(true);
                setMensaje(null);
                try {
                  const formData = new FormData();
                  formData.append('archivo', csvFile);
                  const resp = await importarCsvOfertas(formData);
                  setMensaje({ tipo: 'success', texto: resp.data?.message || 'CSV de ofertas importado correctamente.' });
                  setCsvFile(null);
                  cargarProductos();
                } catch (err) {
                  console.error('Error importando CSV ofertas:', err);
                  setMensaje({ tipo: 'danger', texto: `Error al importar CSV de ofertas: ${err.response?.data?.message || err.message}` });
                } finally {
                  setImportandoCsv(false);
                }
              }}
              disabled={importandoCsv}
            >
              {importandoCsv ? (<><Spinner size="sm" animation="border" className="me-2"/>Importando ofertas...</>) : 'Importar CSV Ofertas'}
            </Button>
          </div>
              }}
              disabled={importandoCsv}
            >
              {importandoCsv ? (<><Spinner size="sm" animation="border" className="me-2"/>Importando...</>) : 'Importar CSV'}
            </Button>
          </div>

          <Button variant="secondary" onClick={cargarProductos}>
            Refrescar
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tabla de productos */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Oferta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.idProducto}>
              <td>{producto.idProducto}</td>
              <td>{producto.producto}</td>
              <td>{producto.marca}</td>
              <td>{producto.modelo}</td>
              <td>{formatearPrecioSoles(producto.precio || 0)}</td>
              <td>{producto.stock}</td>
              <td>
                <span className={`badge ${producto.estadoProducto?.estadoProd === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                  {producto.estadoProducto?.estadoProd || 'N/A'}
                </span>
              </td>
              <td className="text-center">
                <Form.Check
                  type="checkbox"
                  checked={producto.esOferta || false}
                  onChange={() => handleToggleOferta(producto)}
                  title={producto.esOferta ? 'Quitar de ofertas' : 'Marcar como oferta'}
                />
              </td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => abrirModalEditar(producto)}
                >
                  Editar
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => eliminarProducto(producto.idProducto)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para editar/crear producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editandoProducto ? 'Editar' : 'Crear'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={guardarProducto}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre del Producto</Form.Label>
                  <Form.Control
                    type="text"
                    name="producto"
                    value={formProducto.producto}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="marca"
                    value={formProducto.marca}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="modelo"
                    value={formProducto.modelo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>N° Parte</Form.Label>
                  <Form.Control
                    type="text"
                    name="nroParte"
                    value={formProducto.nroParte}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    name="nroSKU"
                    value={formProducto.nroSKU}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>N° Modelo</Form.Label>
                  <Form.Control
                    type="text"
                    name="nroModelo"
                    value={formProducto.nroModelo}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="precio"
                    value={formProducto.precio}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formProducto.stock}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formProducto.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Especificaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="especificaciones"
                value={formProducto.especificaciones}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Garantía</Form.Label>
                  <Form.Control
                    type="number"
                    name="garantia"
                    value={formProducto.garantia}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Unidad de Garantía</Form.Label>
                  <Form.Select
                    name="umGarantia"
                    value={formProducto.umGarantia}
                    onChange={handleInputChange}
                  >
                    <option value="días">Días</option>
                    <option value="meses">Meses</option>
                    <option value="años">Años</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL Foto 1</Form.Label>
              <Form.Control
                type="url"
                name="foto1"
                value={formProducto.foto1}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link Hoja de Datos</Form.Label>
              <Form.Control
                type="url"
                name="linkHojaDeDatos"
                value={formProducto.linkHojaDeDatos}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="observaciones"
                value={formProducto.observaciones}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editandoProducto ? 'Actualizar' : 'Crear'} Producto
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <div className="mt-3">
        <Link to="/admin" className="btn btn-secondary">
          Volver al Panel Admin
        </Link>
      </div>
    </Container>
  );
};

export default ProductosAdmin;
