import axios from "axios";

// Configurar la URL base
export const API_BASE_URL = "http://localhost:8080/api";

// Crear instancia de axios con cookies habilitadas
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

const clearSession = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("userRole");
  localStorage.setItem("isLoggedIn", "false");
};

const persistSession = (userData) => {
  localStorage.setItem("isLoggedIn", "true");
  if (userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
    if (userData.rol) {
      localStorage.setItem("userRole", userData.rol);
    }
  }
};

// Interceptor de respuesta: limpia sesión y redirige si la cookie expira
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const skipRedirect = error.config?.skipAuthRedirect;

    if (skipRedirect) {
      return Promise.reject(error);
    }

    if (status === 401 || status === 403) {
      clearSession();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Funciones de autenticación
export const authService = {
  // Verificar si el usuario está autenticado (cookie httpOnly + flag local)
  isAuthenticated: () => localStorage.getItem("isLoggedIn") === "true",

  // Obtener el rol del usuario
  getUserRole: () => localStorage.getItem("userRole"),

  // Obtener datos del usuario
  getUserData: () => {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  },

  // Verificar si el usuario es admin
  isAdmin: () => authService.getUserRole() === "ROLE_ADMIN",

  // Borrar sesión local; evitamos llamar al backend para no disparar prompts del navegador
  logout: () => {
    clearSession();
    window.location.href = "/login";
  },

  // Login: backend coloca cookie httpOnly; persistimos sólo datos mínimos
  login: async (correo, clave) => {
    const response = await apiClient.post(
      "/auth/login",
      { correo, clave },
      { skipAuthRedirect: true }
    );

    persistSession(response.data);
    return response.data;
  }
};

export default apiClient;
