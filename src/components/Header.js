import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Ícono del carrito
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
    <Navbar expand="lg" className="navbar-header">
      <Container fluid style={{ position: "relative" }}>
        {/* Logo + Nombre */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <img
            src="/LOGO_CSHOPS.png"
            alt="Logo"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <span className="navbar-title">ComputerShops</span>
        </Navbar.Brand>

        <Nav className="me-auto d-flex align-items-center" style={{ width: "100%" }}>
          {/* Productos */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative" }}>
            <Link to="/productos" className="nav-link-custom">Productos</Link>
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
            <Link to="/marcas" className="nav-link-custom">Marcas</Link>
            <div className="mega-menu">
              <div className="mega-menu-content">
                <div className="mega-menu-column">
                  <img src="/images/Lenovo_header2.jpg" alt="Apple" className="mega-menu-img" />
                  <p>Productos originales y accesorios.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/images/Dell_header.png" alt="Dell" className="mega-menu-img" />
                  <p>Equipos Dell para oficina y hogar.</p>
                </div>
                <div className="mega-menu-column">
                  <img src="/images/cisco_header.png" alt="HP" className="mega-menu-img" />
                  <p>Soluciones para todos los usos.</p>
                </div>
                 <div className="mega-menu-column">
                  <img src="/images/Fortinet_header.png" alt="Apple" className="mega-menu-img" />
                  <p>Productos originales y accesorios.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experiencia */}
                <div className="nav-item">
                     <Link to="/experiencia" className="nav-link-custom">Experiencia</Link>
                     </div>
          {/* Servicios */}
          <div className="nav-item mega-hover mega-dropdown" style={{ position: "relative" }}>
            <Link to="/servicios" className="nav-link-custom">Servicios</Link>
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
            <Link to="/sobre-nosotros" className="nav-link-custom">Sobre Nosotros</Link>
          </div>
        </Nav>

        {/* Ícono del carrito */}
        <Link to="/carrito" className="shopping-cart-icon" style={{ fontSize: "1.6rem", color: "#000", marginRight: "15px" }}>
          <FaShoppingCart />
        </Link>

        {/* Botones de sesión */}
        <div className="d-flex gap-2">
          <Button className="btn-offer" onClick={() => navigate("/ofertas")}>
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

