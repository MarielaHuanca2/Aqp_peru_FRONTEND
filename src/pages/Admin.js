import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <Container className="mt-5">
      <h2>Bienvenido al panel de administrador</h2>
      <Button variant="danger" className="mt-3" onClick={handleLogout}>
        Cerrar sesión
      </Button>
    </Container>
  );
}

export default Admin;

