import React, { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useFiltroProductos } from "../context/FiltroProductosContext";
import { authService } from "../services/authService";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { setFiltros } = useFiltroProductos();

  // Auth state
  const isLoggedIn = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();
  const userData = authService.getUserData();
  const userName = userData?.nombre || userData?.correo?.split("@")[0] || "Usuario";

  // Estado para controlar el mega menú de Productos
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const megaRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    function handleDocClick(e) {
      const target = e.target;
      if (isMegaOpen) {
        if (megaRef.current && !megaRef.current.contains(target) && !(toggleRef.current && toggleRef.current.contains(target))) {
          setIsMegaOpen(false);
        }
      }
    }
    function handleEsc(e) {
      if (e.key === 'Escape') {
        setIsMegaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isMegaOpen]);

  const closeMenu = () => {
    setExpanded(false);
    setIsMegaOpen(false);
  }; 

  const handleLogout = () => {
    closeMenu();
    authService.logout();
  };

  // Función central de filtrado
  const irAProductosConFiltro = (nuevoFiltro) => {
    setFiltros({
      texto: "",
      marca: "",
      categoria: "",
      subCategoria: "",
      condicion: "",
      precioMin: "",
      precioMax: "",
      ...nuevoFiltro,
    });
    closeMenu();
    navigate("/productos");
  };

  // Categorías y marcas para el mega menú
  const categorias = [
    { nombre: "Laptops", icono: "💻" },
    { nombre: "Servidores", icono: "🖥️" },
    { nombre: "PCs", icono: "🖳" },
    { nombre: "Monitores", icono: "🖵" },
    { nombre: "Impresoras", icono: "🖨️" },
    { nombre: "Accesorios", icono: "⌨️" },
  ];

  const marcas = [
    { nombre: "DELL", logo: "/marcas/Dell_marcas.png" },
    { nombre: "Lenovo", logo: "/marcas/Lenovo_marcas.png" },
    { nombre: "HP", logo: "/marcas/hp_marcas.png" },
    { nombre: "HPE", logo: "/marcas/hpe_marcas.png" },
    { nombre: "Cisco", logo: "/marcas/cisco_marcas.png" },
    { nombre: "Extreme Networks", logo: "/marcas/extreme_marcas.png" },
    { nombre: "Fortinet", logo: "/marcas/fortinet_marcas.png" },
    { nombre: "Microsoft", logo: "/marcas/microsoft_marcas.png" },
    { nombre: "Samsung", logo: "/marcas/samsung_marcas.png" },
    { nombre: "Qnap", logo: "/marcas/QNAP_marcas.png" },
    { nombre: "Intel", logo: "/marcas/intel_marcas.png" },
    { nombre: "AMD", logo: "/marcas/amd_marcas.png" },
  ];

  return (
    <Navbar expand="lg" className="navbar-header" expanded={expanded} onToggle={setExpanded}>
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom" onClick={closeMenu}>
          <img
            src="/logo_nuevo.png"
            alt="Logo"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex align-items-lg-center">
            {/* PRODUCTOS - Mega Menu */}
            <div
              className={`mega-dropdown ${isMegaOpen ? 'open' : ''}`}
              ref={megaRef}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/productos" className="mega-dropdown-trigger" onClick={() => { closeMenu(); navigate('/productos'); }}>
                  Productos
                </Link>
                <button
                  ref={toggleRef}
                  className="mega-dropdown-trigger mega-toggle-btn"
                  aria-expanded={isMegaOpen}
                  aria-label="Abrir mega menú Productos"
                  onClick={(e) => { e.stopPropagation(); setIsMegaOpen(v => !v); }}
                >
                  <span className="mega-toggle-icon">▼</span>
                </button>
              </div>

              <div className={`mega-menu ${isMegaOpen ? "show" : ""}`} role="menu" aria-hidden={!isMegaOpen}>
                <div className="mega-menu-content">
                  {/* Categorías */}
                  <div className="mega-menu-section">
                    <div className="mega-menu-title">Categorías</div> 
                    <ul className="mega-menu-list">
                      {categorias.map((cat) => (
                        <li key={cat.nombre} className="mega-menu-item">
                          <span
                            className="mega-menu-link"
                            onClick={() => irAProductosConFiltro({ texto: cat.nombre })}
                          >
                            {cat.icono} {cat.nombre}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mega-menu-divider" />

                  {/* Marcas con logos */}
                  <div className="mega-menu-section" style={{ minWidth: "360px" }}>
                    <div className="mega-menu-title">Marcas Destacadas</div>
                    <div className="mega-menu-brands">
                      {marcas.map((marca) => (
                        <div
                          key={marca.nombre}
                          className="mega-menu-brand-item"
                          onClick={() => irAProductosConFiltro({ marca: marca.nombre })}
                        >
                          <img src={marca.logo} alt={marca.nombre} />
                          <span>{marca.nombre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MARCAS */}
            <Link to="/marcas" className="nav-link-custom" onClick={closeMenu}>
              Marcas
            </Link>

            {/* EXPERIENCIA */}
            <Link to="/experiencia" className="nav-link-custom" onClick={closeMenu}>
              Experiencia
            </Link>

            {/* SERVICIOS */}
            <Link to="/servicios" className="nav-link-custom" onClick={closeMenu}>
              Servicios
            </Link>

            {/* SOBRE NOSOTROS */}
            <Link to="/sobre-nosotros" className="nav-link-custom" onClick={closeMenu}>
              Sobre Nosotros
            </Link>
          </Nav>

          {/* Right Section */}
          <div className="header-right">
            {/* Carrito */}
            <Link to="/carrito" className="cart-link" onClick={closeMenu}>
              <FaShoppingCart />
            </Link>

            {/* Ofertas */}
            <button
              className="btn-header btn-offers"
              onClick={() => { closeMenu(); navigate("/ofertas"); }}
            >
              🔥 Ofertas
            </button>

            {isLoggedIn ? (
              <>
                {/* User Info */}
                <div className="user-info">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <span className="user-name">{userName}</span>
                </div>

                {/* Admin Button - Solo para admins */}
                {isAdmin && (
                  <button
                    className="btn-header btn-admin"
                    onClick={() => { closeMenu(); navigate("/admin"); }}
                  >
                    <FaCog /> Admin
                  </button>
                )}

                {/* Logout */}
                <button className="btn-header btn-logout" onClick={handleLogout}>
                  <FaSignOutAlt />
                </button>
              </>
            ) : (
              <button
                className="btn-header btn-login"
                onClick={() => { closeMenu(); navigate("/login"); }}
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

