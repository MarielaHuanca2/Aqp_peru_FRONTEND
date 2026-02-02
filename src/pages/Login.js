import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import { authService } from "../services/authService";

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
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Iniciar Sesión</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formCorreo" className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formClave" className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <div className="position-relative">
            <Form.Control
              type={mostrarClave ? "text" : "password"}
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
              style={{ paddingRight: "40px" }}
            />
            <Button
              variant="link"
              onClick={() => setMostrarClave(!mostrarClave)}
              className="position-absolute"
              style={{
                right: "0",
                top: "0",
                bottom: "0",
                border: "none",
                background: "transparent",
                color: "#6c757d",
                padding: "0.375rem 0.75rem"
              }}
              type="button"
            >
              {mostrarClave ? "👁️" : "👁️‍🗨️"}
            </Button>
          </div>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100 mb-3"
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

      <div className="text-center">
        <p className="mb-0">¿No tienes cuenta?</p>
        <Link to={redirect ? `/registro?redirect=${redirect}` : "/registro"} className="btn btn-link">
          Crear cuenta nueva
        </Link>
      </div>
    </Container>
  );
}

export default Login;

