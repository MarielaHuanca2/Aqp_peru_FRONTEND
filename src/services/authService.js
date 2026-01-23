import axios from "axios";
import { API_BASE_URL } from "../constants/apiEndpoints";

// Configurar la URL base desde constantes centralizadas

// Crear instancia de axios con soporte para cookies
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Enviar cookies automáticamente en cada petición
});

// Interceptor para manejar respuestas y errores de autenticación
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const skipRedirect = error.config?.skipAuthRedirect;

    // Si la petición indicó que no haga redirección al login, re-lanzar el error sin limpiar/redirigir
    if (skipRedirect) {
      return Promise.reject(error);
    }

    if (status === 401 || status === 403) {
      // Token expirado, inválido o acceso denegado: limpiar localStorage y redirigir al login
      // Nota: La cookie JWT se limpiará automáticamente al expirar o desde el backend
      localStorage.removeItem("userData");
      localStorage.removeItem("userRole");
      localStorage.setItem("isLoggedIn", "false");

      // Redirigir al login si no estamos ya ahí
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Funciones de autenticación
export const authService = {
  // Verificar si el usuario está autenticado
  // Con JWT en cookie HTTP-only, verificamos el estado local (userData y isLoggedIn)
  // La cookie se envía automáticamente y el backend valida su autenticidad
  isAuthenticated: () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userData = localStorage.getItem("userData");
    return isLoggedIn && Boolean(userData && userData !== "null" && userData !== "undefined");
  },

  // El token está en cookie HTTP-only, no accesible desde JavaScript
  // Este método se mantiene por compatibilidad pero retorna null
  getToken: () => {
    return null; // JWT está en cookie HTTP-only
  },

  // Obtener el rol del usuario
  getUserRole: () => {
    return localStorage.getItem("userRole");
  },

  // Obtener datos del usuario
  getUserData: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  // Verificar si el usuario es admin
  isAdmin: () => {
    const role = authService.getUserRole();
    return role === "ROLE_ADMIN";
  },

  // Cerrar sesión
  logout: async () => {
    try {
      // Llamar al endpoint de logout para limpiar la cookie en el servidor
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.warn("Error al cerrar sesión en el servidor:", error);
    }
    // Limpiar datos locales (la cookie JWT se limpia desde el servidor)
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "/login";
  },

  // Login - El backend envía el JWT como cookie HTTP-only
  login: async (correo, clave) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      correo,
      clave
    }, {
      withCredentials: true // Importante: permite recibir y guardar la cookie del servidor
    });
    
    // Guardar datos en localStorage (el token JWT está en cookie HTTP-only)
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(response.data));
    // No guardamos el token en localStorage - está en cookie HTTP-only
    localStorage.setItem("userRole", response.data.rol);
    
    return response.data;
  }
};

export default apiClient;
