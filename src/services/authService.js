import axios from "axios";

// Configurar la URL base
const API_BASE_URL = "http://localhost:8080/api";

// Crear instancia de axios
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar el token a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores de autenticación
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido, limpiar localStorage y redirigir al login
      localStorage.removeItem("authToken");
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
  isAuthenticated: () => {
    const token = localStorage.getItem("authToken");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    return !!(token && isLoggedIn);
  },

  // Obtener el token actual
  getToken: () => {
    return localStorage.getItem("authToken");
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
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "/login";
  },

  // Login (ya manejado en el componente Login)
  login: async (correo, clave) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      correo,
      clave
    });
    
    // Guardar datos en localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userData", JSON.stringify(response.data));
    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("userRole", response.data.rol);
    
    return response.data;
  }
};

export default apiClient;
