import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { authService } from "../services/authService";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
  };

    return (
      <>
    {/* ...botones del menú... */}
        <Container className="mt-5">
      <h2>Bienvenido al panel de administrador</h2>
      <Button
        variant="primary"
        className="mt-3 me-3"
        onClick={() => navigate("/admin/reclamaciones")}
      >
        Ver Reclamaciones
      </Button>
      <Button
        variant="success"
        className="mt-3 me-3"
        onClick={() => navigate("/admin/pedidos")}
      >
        Ver Pedidos
      </Button>
      <Button
        variant="info"
        className="mt-3 me-3"
        onClick={() => navigate("/admin/productos")}
      >
        Gestionar Productos
      </Button>
      <Button
        variant="secondary"
        className="mt-3 me-3"
        onClick={() => navigate('/admin/mesa-ayuda')}
      >
        Mesa de ayuda
      </Button>
      <Button
        variant="warning"
        className="mt-3 me-3"
        onClick={() => navigate("/admin/tipo-cambio")}
      >
        Configurar Tipo de Cambio
      </Button>
      <Button variant="danger" className="mt-3" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Container>
    {/* Segunda imagen a pantalla completa (del Home) */}
    <br />
    
    <div className="full-width-image-container">
      <img src="/BannerAQP-02.jpg" alt="Banner 2" className="banner-image" />
    </div>
    </>
  );
}

export default Admin;

