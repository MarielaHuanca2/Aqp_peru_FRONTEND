import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { authService } from "../services/authService";
import "./Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarClave, setMostrarClave] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  // 🔐 Redirige si ya está logeado (admin -> /admin, user -> /)
  useEffect(() => {
    if (authService.isAuthenticated()) {
      if (authService.isAdmin()) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = await authService.login(correo, clave);
      console.log("Login exitoso:", userData);
      
      // Redirigir según el parámetro redirect o rol
      if (redirect === "carrito") {
        navigate("/carrito");
      } else if (authService.isAdmin()) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error de login:", err);
      if (err.response?.status === 401) {
        setError("Correo o contraseña incorrectos");
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Error de conexión. Verifica que el servidor esté funcionando.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <img src="/LOGOAQP.PNG" alt="ComputerShops" />
        </div>

        {/* Header */}
        <div className="login-header">
          <h2 className="login-title">Bienvenido de vuelta</h2>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin} className="login-form">
          <Form.Group controlId="formCorreo" className="mb-3">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="nombre@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formClave" className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <div className="login-password-wrap">
              <Form.Control
                type={mostrarClave ? "text" : "password"}
                placeholder="••••••••"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
                style={{ paddingRight: "48px" }}
              />
              <Button
                variant="link"
                onClick={() => setMostrarClave(!mostrarClave)}
                className="login-password-toggle"
                type="button"
                tabIndex={-1}
              >
                {mostrarClave ? "👁️" : "👁️‍🗨️"}
              </Button>
            </div>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Form>

        <div className="login-divider">
          <span>o</span>
        </div>

        <div className="login-footer">
          <p>¿No tienes cuenta?</p>
          <Link
            to={redirect ? `/registro?redirect=${redirect}` : "/registro"}
            className="login-footer-link"
          >
            Crear cuenta nueva
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

