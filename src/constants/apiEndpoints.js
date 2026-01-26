// Configuración de endpoints y constantes de la API

// Base URL del backend - usa variable de entorno o fallback a IP local
// Para cambiar la URL, edita el archivo .env en la raíz del proyecto
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://192.168.0.189:8080/api";

export const API_ENDPOINTS = {
  // Autenticación
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/usuarios"
  },
  
  // Productos
  PRODUCTOS: {
    BASE: "/productos",
    BY_ID: (id) => `/productos/${id}`
  },
  
  // Pedidos (requiere autenticación)
  PEDIDOS: {
    BASE: "/pedidos",
    BY_ID: (id) => `/pedidos/${id}`
  },
  
  // Reclamaciones/Reclamos (requiere autenticación para admin)
  RECLAMOS: {
    BASE: "/reclamos",
    BY_ID: (id) => `/reclamos/${id}`,
    PUBLIC: "/reclamo" // Para crear reclamos sin autenticación
  },
  
  // Email (requiere autenticación)
  EMAIL: {
    ENVIAR_HTML: "/email/enviar-html",
    NOTIFICAR_EMPRESA: "/email/notificar-empresa"
  },
  
  // Tipo de cambio (requiere autenticación para modificar)
  TIPO_CAMBIO: {
    BASE: "/tipocambio",
    BY_ID: (id) => `/tipocambio/${id}`
  }
};

// Estados de autenticación
export const AUTH_ROLES = {
  USER: "ROLE_USER",
  ADMIN: "ROLE_ADMIN"
};

// Configuración de localStorage
// Nota: El token JWT ahora se almacena en cookie HTTP-only, no en localStorage
export const STORAGE_KEYS = {
  // AUTH_TOKEN ya no se usa - el JWT está en cookie HTTP-only
  USER_DATA: "userData",
  USER_ROLE: "userRole",
  IS_LOGGED_IN: "isLoggedIn"
};
