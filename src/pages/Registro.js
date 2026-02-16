import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { FaBuilding, FaEnvelope, FaShieldAlt } from "react-icons/fa";
import apiClient from "../services/authService";
import "./Registro.css";

function Registro() {
  const [formData, setFormData] = useState({
    ruc: "",
    razonSocial: "",
    correo: "",
    clave: "",
    confirmarClave: "",
    telefono: "",
    direccion: "",
  // rol eliminado, todos los usuarios serán normales
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

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
      
      // Redirigir al login después de 2 segundos, pasando el parámetro redirect si existe
      setTimeout(() => {
        if (redirect) {
          navigate(`/login?redirect=${redirect}`);
        } else {
          navigate("/login");
        }
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
    <div className="registro-page">
      <div className="registro-card">
        {/* Header */}
        <div className="registro-header">
          <div className="registro-logo">
            <img src="/LOGOAQP.PNG" alt="ComputerShops" />
          </div>
          <h2 className="registro-title">Crear tu cuenta</h2>
          <p className="registro-subtitle">Completa los datos para registrarte como empresa</p>
        </div>

        {/* Step indicator */}
        <div className="registro-steps">
          <div className="registro-step registro-step--active">
            <span className="registro-step__dot">1</span>
            <span>Empresa</span>
          </div>
          <span className="registro-step__line" />
          <div className="registro-step registro-step--active">
            <span className="registro-step__dot">2</span>
            <span>Contacto</span>
          </div>
          <span className="registro-step__line" />
          <div className="registro-step registro-step--active">
            <span className="registro-step__dot">3</span>
            <span>Seguridad</span>
          </div>
        </div>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit} className="registro-form">

          {/* ── Section: Empresa ── */}
          <div className="registro-section">
            <div className="registro-section__icon registro-section__icon--empresa"><FaBuilding /></div>
            <p className="registro-section__label">Datos de la empresa</p>
            <span className="registro-section__line" />
          </div>

          <div className="registro-row">
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

            <Form.Group controlId="formRazonSocial" className="mb-3">
              <Form.Label>Razón Social *</Form.Label>
              <Form.Control
                type="text"
                name="razonSocial"
                placeholder="Nombre de la empresa"
                value={formData.razonSocial}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>

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

          {/* ── Section: Contacto ── */}
          <div className="registro-section">
            <div className="registro-section__icon registro-section__icon--contacto"><FaEnvelope /></div>
            <p className="registro-section__label">Información de contacto</p>
            <span className="registro-section__line" />
          </div>

          <div className="registro-row">
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
          </div>

          {/* ── Section: Seguridad ── */}
          <div className="registro-section">
            <div className="registro-section__icon registro-section__icon--seguridad"><FaShieldAlt /></div>
            <p className="registro-section__label">Contraseña</p>
            <span className="registro-section__line" />
          </div>

          <div className="registro-row">
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
          </div>

          <Button
            variant="primary"
            type="submit"
            className="registro-submit"
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

        <div className="registro-divider">
          <span>o</span>
        </div>

        <div className="registro-footer">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/login" className="registro-footer-link">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Registro;