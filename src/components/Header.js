import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleAdminClick = () => {
    navigate("/admin");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#4682B4" }}>
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ marginRight: "2rem", fontWeight: "bold", fontSize: "2rem" }}>
          ComputerShops
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/productos" style={{ fontWeight: "bold" }}>Productos</Nav.Link>
          <Nav.Link as={Link} to="/marcas" style={{ fontWeight: "bold" }}>Marcas</Nav.Link>
          <Nav.Link as={Link} to="/experiencia" style={{ fontWeight: "bold" }}>Experiencia</Nav.Link>
          <Nav.Link as={Link} to="/servicios" style={{ fontWeight: "bold" }}>Servicios</Nav.Link>
        </Nav>
        <div className="d-flex gap-2">
          <Button variant="danger" onClick={() => navigate("/ofertas")}>
            Ofertas
          </Button>
          {isLoggedIn ? (
            <Button variant="outline-dark" onClick={handleAdminClick}>
              Admin
            </Button>
          ) : (
            <Button variant="outline-dark" onClick={handleLoginClick}>
              Iniciar Sesión
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;