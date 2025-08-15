import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert, Button, Form, Modal } from 'react-bootstrap';
import { obtenerOfertas, importarCsvOfertas, crearOferta, actualizarOferta, eliminarOferta } from '../services/productoService';

const OfertasAdmin = () => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [current, setCurrent] = useState({});

  const cargarOfertas = async () => {
    try {
      setLoading(true);
      const response = await obtenerOfertas();
      setOfertas(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar ofertas:', err);
      setError('Error al cargar las ofertas');
    } finally {
      setLoading(false);
    }
  };

  const openCreate = () => {
    setCurrent({ producto: '', marca: '', precio: '', stock: '' });
    setEditing(false);
    setShowModal(true);
    setError(null);
    setSuccessMsg(null);
  };

  const openEdit = (oferta) => {
    setCurrent({ ...oferta });
    setEditing(true);
    setShowModal(true);
    setError(null);
    setSuccessMsg(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrent({});
  };

  const handleChangeField = (e) => {
    const { name, value } = e.target;
    setCurrent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError(null);
    try {
      // basic client-side validation
      if (!current.producto || !current.precio) {
        setError('Producto y precio son obligatorios.');
        return;
      }
      const payload = {
        ...current,
        precio: Number(current.precio),
        stock: current.stock !== undefined && current.stock !== '' ? Number(current.stock) : 0,
      };
      if (editing) {
        await actualizarOferta(current.idProducto || current.id || current._id, payload);
        setSuccessMsg('Oferta actualizada.');
      } else {
        await crearOferta(payload);
        setSuccessMsg('Oferta creada.');
      }
      closeModal();
      await cargarOfertas();
    } catch (err) {
      console.error('Error guardando oferta:', err);
      setError('Error al guardar la oferta.');
    }
  };

  const handleDelete = async (oferta) => {
    const id = oferta.idProducto || oferta.id || oferta._id;
    if (!window.confirm('¿Eliminar esta oferta? Esta acción no se puede deshacer.')) return;
    try {
      await eliminarOferta(id);
      setSuccessMsg('Oferta eliminada.');
      await cargarOfertas();
    } catch (err) {
      console.error('Error eliminando oferta:', err);
      setError('Error al eliminar la oferta.');
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
    setSuccessMsg(null);
    setError(null);
  };

  const handleImport = async () => {
    if (!file) {
      setError('Selecciona un archivo CSV para importar.');
      return;
    }
    setImporting(true);
    setError(null);
    setSuccessMsg(null);
    try {
      const formData = new FormData();
      formData.append('archivo', file);
      const resp = await importarCsvOfertas(formData);
      setSuccessMsg('Importación completada. Registros procesados.');
      await cargarOfertas();
    } catch (err) {
      console.error('Error importando CSV de ofertas:', err);
      setError('Error al importar el CSV. Revisa el formato y vuelve a intentar.');
    } finally {
      setImporting(false);
    }
  };

  useEffect(() => { cargarOfertas(); }, []);

  if (loading) return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" role="status" />
      <div>Cargando ofertas...</div>
    </Container>
  );

  return (
    <Container className="mt-5">
      <h2>Administrar Ofertas</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      <Form className="mb-3">
        <Form.Group controlId="csvOfertas">
          <Form.Label>Importar CSV de Ofertas</Form.Label>
          <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
        <div className="mt-2">
          <Button variant="primary" onClick={handleImport} disabled={importing}>
            {importing ? 'Importando...' : 'Importar CSV'}
          </Button>
        </div>
      </Form>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          {ofertas.length === 0 ? (
            <Alert variant="info">No hay ofertas.</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ofertas.map((o) => (
                  <tr key={o.idProducto || o.id || o._id}>
                    <td>{o.idProducto || o.id || o._id}</td>
                    <td>{o.producto}</td>
                    <td>{o.marca}</td>
                    <td>{o.precio}</td>
                    <td>{o.stock}</td>
                    <td>
                      <Button variant="outline-primary" size="sm" onClick={() => openEdit(o)}>Editar</Button>{' '}
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(o)}>Eliminar</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
        <div>
          <Button variant="success" onClick={openCreate}>Crear oferta</Button>
        </div>
      </div>
      <div className="mt-3">
        <Button variant="secondary" onClick={cargarOfertas}>Refrescar</Button>
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar Oferta' : 'Crear Oferta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Producto</Form.Label>
              <Form.Control name="producto" value={current.producto || ''} onChange={handleChangeField} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Marca</Form.Label>
              <Form.Control name="marca" value={current.marca || ''} onChange={handleChangeField} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio (USD)</Form.Label>
              <Form.Control name="precio" type="number" value={current.precio || ''} onChange={handleChangeField} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control name="stock" type="number" value={current.stock || ''} onChange={handleChangeField} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>{editing ? 'Guardar cambios' : 'Crear'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OfertasAdmin;
