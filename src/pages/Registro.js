import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Alert, Spinner, Row, Col } from "react-bootstrap";
import apiClient from "../services/authService";

function Registro() {
  const [formData, setFormData] = useState({
    ruc: "",
    razonSocial: "",
    correo: "",
    clave: "",
    confirmarClave: "",
    telefono: "",
    direccion: "",
    rol: "ROLE_USER"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validar que las contraseñas coincidan
    if (formData.clave !== formData.confirmarClave) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    // Validar RUC (debe tener 11 dígitos)
    if (formData.ruc.length !== 11 || !/^\d+$/.test(formData.ruc)) {
      setError("El RUC debe tener exactamente 11 dígitos");
      setLoading(false);
      return;
    }

    try {
      // Preparar datos para enviar (sin confirmarClave)
      const { confirmarClave, ...dataToSend } = formData;
      
      console.log("Registrando usuario:", dataToSend);
      
      const response = await apiClient.post("/usuarios", dataToSend);
      
      console.log("Registro exitoso:", response.data);
      setSuccess("¡Usuario registrado exitosamente! Redirigiendo al login...");
      
      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      console.error("Error de registro:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.status === 400) {
        setError("Los datos ingresados no son válidos. Verifica la información.");
      } else if (err.response?.status === 409) {
        setError("El correo o RUC ya están registrados.");
      } else {
        setError("Error de conexión. Verifica que el servidor esté funcionando.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Crear Cuenta</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formRuc" className="mb-3">
              <Form.Label>RUC *</Form.Label>
              <Form.Control
                type="text"
                name="ruc"
                placeholder="20481234567"
                value={formData.ruc}
                onChange={handleChange}
                maxLength="11"
                pattern="[0-9]{11}"
                required
              />
              <Form.Text className="text-muted">
                Debe tener exactamente 11 dígitos
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formTelefono" className="mb-3">
              <Form.Label>Teléfono *</Form.Label>
              <Form.Control
                type="tel"
                name="telefono"
                placeholder="976159076"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formRazonSocial" className="mb-3">
          <Form.Label>Razón Social *</Form.Label>
          <Form.Control
            type="text"
            name="razonSocial"
            placeholder="Nombre de la empresa o razón social"
            value={formData.razonSocial}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCorreo" className="mb-3">
          <Form.Label>Correo electrónico *</Form.Label>
          <Form.Control
            type="email"
            name="correo"
            placeholder="correo@empresa.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDireccion" className="mb-3">
          <Form.Label>Dirección *</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            placeholder="Av. Los Olivos 123, Lima"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formClave" className="mb-3">
              <Form.Label>Contraseña *</Form.Label>
              <Form.Control
                type="password"
                name="clave"
                placeholder="Mínimo 6 caracteres"
                value={formData.clave}
                onChange={handleChange}
                minLength="6"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formConfirmarClave" className="mb-3">
              <Form.Label>Confirmar contraseña *</Form.Label>
              <Form.Control
                type="password"
                name="confirmarClave"
                placeholder="Repite tu contraseña"
                value={formData.confirmarClave}
                onChange={handleChange}
                minLength="6"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formRol" className="mb-3">
          <Form.Label>Tipo de usuario</Form.Label>
          <Form.Select 
            name="rol" 
            value={formData.rol} 
            onChange={handleChange}
          >
            <option value="ROLE_USER">Usuario</option>
            <option value="ROLE_ADMIN">Administrador</option>
          </Form.Select>
          <Form.Text className="text-muted">
            Selecciona el tipo de cuenta que necesitas
          </Form.Text>
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
              Creando cuenta...
            </>
          ) : (
            "Crear cuenta"
          )}
        </Button>
      </Form>

      <div className="text-center">
        <p className="mb-0">¿Ya tienes cuenta?</p>
        <Link to="/login" className="btn btn-link">
          Iniciar sesión
        </Link>
      </div>
    </Container>
  );
}

export default Registro;