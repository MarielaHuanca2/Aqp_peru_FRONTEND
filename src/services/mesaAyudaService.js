import axios from 'axios';
import { API_BASE_URL } from './authService';

// Axios client que envía automáticamente la cookie httpOnly
const mesaAyudaClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

const MESA_AYUDA_URL = '/mesa-ayuda';

// GET /api/mesa-ayuda - List tickets with filters
export const obtenerTickets = (filtros = {}) => {
  const params = new URLSearchParams();
  
  if (filtros.estado && filtros.estado !== 'TODOS') params.append('estado', filtros.estado);
  if (filtros.prioridad && filtros.prioridad !== 'TODOS') params.append('prioridad', filtros.prioridad);
  if (filtros.nivelRespuesta && filtros.nivelRespuesta !== 'TODOS') params.append('nivelRespuesta', filtros.nivelRespuesta);
  if (filtros.asignadoA) params.append('asignadoA', filtros.asignadoA);
  if (filtros.q) params.append('q', filtros.q);
  if (filtros.page) params.append('page', filtros.page);
  if (filtros.size) params.append('size', filtros.size);
  
  const queryString = params.toString();
  const url = queryString ? `${MESA_AYUDA_URL}?${queryString}` : MESA_AYUDA_URL;
  
  return mesaAyudaClient.get(url);
};

// GET /api/mesa-ayuda/:id - Get single ticket
export const obtenerTicket = (id) => mesaAyudaClient.get(`${MESA_AYUDA_URL}/${id}`);

// POST /api/mesa-ayuda - Create ticket
export const crearTicket = (ticket) => mesaAyudaClient.post(MESA_AYUDA_URL, ticket);

// PUT /api/mesa-ayuda/:id - Update ticket
export const actualizarTicket = (id, ticket) => mesaAyudaClient.put(`${MESA_AYUDA_URL}/${id}`, ticket);

// DELETE /api/mesa-ayuda/:id - Delete ticket
export const eliminarTicket = (id) => mesaAyudaClient.delete(`${MESA_AYUDA_URL}/${id}`);

// POST /api/mesa-ayuda/:id/respuestas - Add response to ticket
export const agregarRespuesta = (ticketId, respuesta) => mesaAyudaClient.post(`${MESA_AYUDA_URL}/${ticketId}/respuestas`, respuesta);

// Helper constants for dropdowns
export const ESTADOS = [
  { value: 'TODOS', label: 'Todos' },
  { value: 'ABIERTO', label: 'Abierto' },
  { value: 'EN_PROGRESO', label: 'En Progreso' },
  { value: 'PENDIENTE_CLIENTE', label: 'Pendiente Cliente' },
  { value: 'RESUELTO', label: 'Resuelto' },
  { value: 'CERRADO', label: 'Cerrado' }
];

export const PRIORIDADES = [
  { value: 'TODOS', label: 'Todos' },
  { value: 'BAJA', label: 'Baja' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'ALTA', label: 'Alta' },
  { value: 'CRITICA', label: 'Crítica' }
];

export const NIVELES_RESPUESTA = [
  { value: 'TODOS', label: 'Todos' },
  { value: 1, label: '1 - Bajo' },
  { value: 2, label: '2 - Medio' },
  { value: 3, label: '3 - Alto/Crítico' }
];

export const ORIGENES = [
  { value: 'WEB', label: 'Web' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'TELEFONO', label: 'Teléfono' },
  { value: 'CHAT', label: 'Chat' },
  { value: 'PRESENCIAL', label: 'Presencial' }
];