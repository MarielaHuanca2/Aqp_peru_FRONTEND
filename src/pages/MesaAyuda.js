import React, { useMemo, useState, useEffect } from 'react';
import { Container, Button, Card, Form, Row, Col, Table, Badge, Modal, Spinner, Alert } from 'react-bootstrap';
import { 
  obtenerTickets, 
  obtenerTicket, 
  crearTicket, 
  actualizarTicket, 
  eliminarTicket,
  agregarRespuesta,
  ESTADOS, 
  PRIORIDADES, 
  NIVELES_RESPUESTA, 
  ORIGENES 
} from '../services/mesaAyudaService';

const MesaAyuda = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ 
    estado: 'TODOS', 
    prioridad: 'TODOS', 
    nivelRespuesta: 'TODOS',
    asignadoA: '',
    q: '' 
  });
  const [showModal, setShowModal] = useState(false);
  const [current, setCurrent] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const onChangeFiltro = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });

  // Load tickets from backend
  const cargarTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await obtenerTickets(filtros);
      setTickets(response.data || []);
    } catch (err) {
      console.error('Error cargando tickets:', err);
      setError('Error al cargar los tickets. Verifique la conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // Load tickets on mount and filter changes
  useEffect(() => {
    cargarTickets();
  }, [filtros]);

  const filtered = useMemo(() => {
    // Server-side filtering is preferred, but keep client-side as fallback
    return tickets.filter(t => {
      if (filtros.estado !== 'TODOS' && t.estado !== filtros.estado) return false;
      if (filtros.prioridad !== 'TODOS' && t.prioridad !== filtros.prioridad) return false;
      if (filtros.nivelRespuesta !== 'TODOS' && t.nivelRespuesta != filtros.nivelRespuesta) return false;
      if (filtros.q && !(`${t.titulo} ${t.descripcion} ${t.nombreCliente} ${t.correoCliente}`).toLowerCase().includes(filtros.q.toLowerCase())) return false;
      return true;
    });
  }, [tickets, filtros]);

  const openView = (ticket) => { setCurrent(ticket); setEditing(false); setShowModal(true); };
  const openEdit = (ticket) => { setCurrent(ticket); setEditing(true); setShowModal(true); };

  const closeModal = () => { setShowModal(false); setCurrent(null); setEditing(false); };

  const handleSave = async () => {
    if (!current) return closeModal();
    
    try {
      setSaving(true);
      setError(null);
      
      if (current.id && current.id.startsWith('TCK-')) {
        // Update existing ticket
        await actualizarTicket(current.id, current);
      } else {
        // Create new ticket
        await crearTicket(current);
      }
      
      closeModal();
      await cargarTickets(); // Refresh list
    } catch (err) {
      console.error('Error guardando ticket:', err);
      setError('Error al guardar el ticket. Verifique los datos e intente nuevamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ticketId) => {
    if (!window.confirm('¿Eliminar este ticket? Esta acción no se puede deshacer.')) return;
    
    try {
      await eliminarTicket(ticketId);
      await cargarTickets(); // Refresh list
    } catch (err) {
      console.error('Error eliminando ticket:', err);
      setError('Error al eliminar el ticket.');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Mesa de ayuda</h2>
      <p className="text-muted">Gestión de tickets de soporte.</p>

      {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

      <Card className="p-3 mb-3">
        <Form>
          <Row className="g-2 align-items-end">
            <Col md={2}>
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={filtros.estado} onChange={onChangeFiltro}>
                {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>Prioridad</Form.Label>
              <Form.Select name="prioridad" value={filtros.prioridad} onChange={onChangeFiltro}>
                {PRIORIDADES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>Nivel Respuesta</Form.Label>
              <Form.Select name="nivelRespuesta" value={filtros.nivelRespuesta} onChange={onChangeFiltro}>
                {NIVELES_RESPUESTA.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Label>Buscar</Form.Label>
              <Form.Control name="q" value={filtros.q} onChange={onChangeFiltro} placeholder="buscar por título, cliente o correo" />
            </Col>
            <Col md={3} className="d-grid">
              <Button variant="primary" onClick={() => setFiltros({ estado: 'TODOS', prioridad: 'TODOS', nivelRespuesta: 'TODOS', asignadoA: '', q: '' })}>Limpiar filtros</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card className="p-3 mb-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Tickets ({loading ? '...' : filtered.length})</h5>
          <div className="d-flex gap-2">
            <Button variant="success" onClick={() => { 
              const newT = { 
                titulo: '', 
                nombreCliente: '', 
                correoCliente: '', 
                estado: 'ABIERTO', 
                prioridad: 'MEDIA', 
                nivelRespuesta: 2,
                descripcion: '',
                origen: 'WEB'
              }; 
              setCurrent(newT); 
              setEditing(true); 
              setShowModal(true); 
            }}>Crear ticket</Button>
            <Button variant="outline-secondary" onClick={cargarTickets} disabled={loading}>
              {loading ? <Spinner size="sm" /> : 'Refrescar'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2 text-muted">Cargando tickets...</p>
          </div>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Cliente</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Nivel</th>
                <th>Fecha</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>{t.id}</td>
                  <td>{t.titulo}</td>
                  <td>{t.nombreCliente}<div className="small text-muted">{t.correoCliente}</div></td>
                  <td>
                    {t.prioridad === 'CRITICA' ? <Badge bg="danger">Crítica</Badge> : 
                     t.prioridad === 'ALTA' ? <Badge bg="warning">Alta</Badge> : 
                     t.prioridad === 'MEDIA' ? <Badge bg="info">Media</Badge> : 
                     <Badge bg="secondary">Baja</Badge>}
                  </td>
                  <td>
                    <Badge bg={
                      t.estado === 'ABIERTO' ? 'success' :
                      t.estado === 'EN_PROGRESO' ? 'primary' :
                      t.estado === 'PENDIENTE_CLIENTE' ? 'warning' :
                      t.estado === 'RESUELTO' ? 'info' : 'secondary'
                    }>
                      {t.estado?.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td>{t.nivelRespuesta || '-'}</td>
                  <td>{t.fechaCreacion ? new Date(t.fechaCreacion).toLocaleString() : '-'}</td>
                  <td className="text-end">
                    <Button size="sm" variant="outline-primary" className="me-2" onClick={() => openView(t)}>Ver</Button>
                    <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => openEdit(t)}>Editar</Button>
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(t.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    No se encontraron tickets con los filtros aplicados.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card>

      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar ticket' : 'Ver ticket'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {current && (
            <Form>
              <Row>
                <Col md={8}>
                  <Form.Group className="mb-2">
                    <Form.Label>Título *</Form.Label>
                    <Form.Control 
                      value={current.titulo || ''} 
                      onChange={(e) => setCurrent({...current, titulo: e.target.value})} 
                      readOnly={!editing} 
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-2">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select 
                      value={current.estado || 'ABIERTO'} 
                      onChange={(e) => setCurrent({...current, estado: e.target.value})} 
                      disabled={!editing}
                    >
                      {ESTADOS.filter(e => e.value !== 'TODOS').map(e => 
                        <option key={e.value} value={e.value}>{e.label}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Cliente *</Form.Label>
                    <Form.Control 
                      value={current.nombreCliente || ''} 
                      onChange={(e) => setCurrent({...current, nombreCliente: e.target.value})} 
                      readOnly={!editing} 
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-2">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control 
                      type="email"
                      value={current.correoCliente || ''} 
                      onChange={(e) => setCurrent({...current, correoCliente: e.target.value})} 
                      readOnly={!editing} 
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-2">
                    <Form.Label>Prioridad</Form.Label>
                    <Form.Select 
                      value={current.prioridad || 'MEDIA'} 
                      onChange={(e) => setCurrent({...current, prioridad: e.target.value})} 
                      disabled={!editing}
                    >
                      {PRIORIDADES.filter(p => p.value !== 'TODOS').map(p => 
                        <option key={p.value} value={p.value}>{p.label}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-2">
                    <Form.Label>Nivel Respuesta</Form.Label>
                    <Form.Select 
                      value={current.nivelRespuesta || 2} 
                      onChange={(e) => setCurrent({...current, nivelRespuesta: parseInt(e.target.value)})} 
                      disabled={!editing}
                    >
                      {NIVELES_RESPUESTA.filter(n => n.value !== 'TODOS').map(n => 
                        <option key={n.value} value={n.value}>{n.label}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-2">
                    <Form.Label>Origen</Form.Label>
                    <Form.Select 
                      value={current.origen || 'WEB'} 
                      onChange={(e) => setCurrent({...current, origen: e.target.value})} 
                      disabled={!editing}
                    >
                      {ORIGENES.map(o => 
                        <option key={o.value} value={o.value}>{o.label}</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-2">
                <Form.Label>Descripción *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  value={current.descripcion || ''} 
                  onChange={(e) => setCurrent({...current, descripcion: e.target.value})} 
                  readOnly={!editing} 
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Asignado a</Form.Label>
                <Form.Control 
                  value={current.asignadoA || ''} 
                  onChange={(e) => setCurrent({...current, asignadoA: e.target.value})} 
                  readOnly={!editing}
                  placeholder="email del responsable"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Archivos adjuntos</Form.Label>
                <Form.Control 
                  value={current.attachments || ''} 
                  onChange={(e) => setCurrent({...current, attachments: e.target.value})} 
                  readOnly={!editing}
                  placeholder="nombre1.ext,nombre2.ext"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal} disabled={saving}>Cerrar</Button>
          {editing ? (
            <Button variant="primary" onClick={handleSave} disabled={saving}>
              {saving ? <><Spinner size="sm" className="me-2" />Guardando...</> : 'Guardar'}
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MesaAyuda;
