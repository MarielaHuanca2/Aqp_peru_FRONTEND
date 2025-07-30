import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

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
    <Navbar expand="lg" style={{ backgroundColor: "#4682B4", minHeight: "90px" }}>
      <Container fluid style={{ position: "relative" }}>
        {/* Logo + Nombre */}
        <Navbar.Brand as={Link} to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/LOGO_CSHOPS.png"
            alt="Logo"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "2rem", color: "white" }}>
            ComputerShops
          </span>
        </Navbar.Brand>

        <Nav className="me-auto" style={{ width: "100%" }}>
          {/* Productos */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative", display: "inline-block" }}>
            <div className="nav-link" style={{ fontWeight: "normal", fontSize: "1.3rem", cursor: "pointer", color: "#fff" }}>
              <Link to="/productos" style={{ color: "#fff", textDecoration: "none" }}>Productos</Link>
            </div>
            <div className="mega-menu">
              <div className="mega-menu-content">
                <div className="mega-menu-column">
                  <Link to="/productos/categorias"><h5>Categorías</h5></Link>
                  <p>Explora todas las categorías de productos.</p>
                </div>
                <div className="mega-menu-column">
                  <Link to="/productos/nuevos"><h5>Nuevos</h5></Link>
                  <p>Descubre los productos más recientes.</p>
                </div>
                <div className="mega-menu-column">
                  <Link to="/productos/populares"><h5>Populares</h5></Link>
                  <p>Los productos favoritos de nuestros clientes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Marcas */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative" }}>
            <Link to="/marcas" className="nav-link" style={{ fontWeight: "normal", fontSize: "1.3rem", cursor: "pointer", textDecoration: "none", color: "#fff" }}>
              Marcas
            </Link>
            <div className="mega-menu">
              <div className="mega-menu-content">
                <div className="mega-menu-column">
                  <img src="/images/apple.png" alt="Apple" className="mega-menu-img" />
                  <Link to="/marcas/apple"><h5>Apple</h5></Link>
                  <p>Productos Apple originales y accesorios.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/dell_logo.png" alt="Dell" className="mega-menu-img" />
                  <Link to="/marcas/dell"><h5>Dell</h5></Link>
                  <p>Equipos Dell para oficina y hogar.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/hp_logo.png" alt="HP" className="mega-menu-img" />
                  <Link to="/marcas/hp"><h5>HP</h5></Link>
                  <p>Soluciones HP para todos los usos.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experiencia */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative" }}>
            <Link to="/experiencia" className="nav-link" style={{ fontWeight: "normal", fontSize: "1.3rem", cursor: "pointer", textDecoration: "none", color: "#fff" }}>
              Experiencia
            </Link>
            <div className="mega-menu">
              <div className="mega-menu-content">
                <div className="mega-menu-column">
                  <img src="/images/testimonios.jpg" alt="Testimonios" className="mega-menu-img" />
                  <Link to="/experiencia/testimonios"><h5>Testimonios</h5></Link>
                  <p>Opiniones de nuestros clientes.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/images/casos.jpg" alt="Casos de éxito" className="mega-menu-img" />
                  <Link to="/experiencia/casos"><h5>Casos de éxito</h5></Link>
                  <p>Historias de éxito con nuestros productos.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/images/soporte.jpg" alt="Soporte" className="mega-menu-img" />
                  <Link to="/experiencia/soporte"><h5>Soporte</h5></Link>
                  <p>Asistencia y ayuda personalizada.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Servicios */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative" }}>
            <Link to="/servicios" className="nav-link" style={{ fontWeight: "normal", fontSize: "1.3rem", cursor: "pointer", textDecoration: "none", color: "#fff" }}>
              Servicios
            </Link>
            <div className="mega-menu">
              <div className="mega-menu-content">
                <div className="mega-menu-column">
                  <img src="/images/instalacion.jpg" alt="Instalación" className="mega-menu-img" />
                  <Link to="/servicios/instalacion"><h5>Instalación</h5></Link>
                  <p>Instalación profesional de equipos.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/images/garantia.jpg" alt="Garantía" className="mega-menu-img" />
                  <Link to="/servicios/garantia"><h5>Garantía</h5></Link>
                  <p>Garantía extendida y soporte técnico.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/images/mantenimiento.jpg" alt="Mantenimiento" className="mega-menu-img" />
                  <Link to="/servicios/mantenimiento"><h5>Mantenimiento</h5></Link>
                  <p>Mantenimiento preventivo y correctivo.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Sobre Nosotros */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative" }}>
            <Link
              to="/sobre-nosotros"
              className="nav-link"
              style={{
                fontWeight: "normal",
                fontSize: "1.3rem",
                cursor: "pointer",
                textDecoration: "none",
                color: "#fff"
              }}
            >
              Sobre Nosotros
            </Link>
          </div>
        </Nav>

        {/* Botones de sesión */}
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
