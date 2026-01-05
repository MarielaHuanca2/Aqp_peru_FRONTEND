import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Estado para forzar el cierre del menú al hacer click
  const [isMenuForcedClosed, setIsMenuForcedClosed] = useState(false);

  // Función para cerrar el menú inmediatamente
  const closeMenu = () => {
    setIsMenuForcedClosed(true);
    // Resetear el estado rápidamente para que el hover vuelva a funcionar después
    setTimeout(() => setIsMenuForcedClosed(false), 300);
  };

  const handleAdminClick = () => {
    closeMenu();
    navigate("/admin");
  };

  const handleLoginClick = () => {
    closeMenu();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="navbar-header">
      <Container fluid style={{ position: "relative" }}>
        {/* Logo + Nombre */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom" onClick={closeMenu}>
          <img
            src="/logo_nuevo.png"
            alt="Logo"
            style={{ height: "80px", objectFit: "contain" }}
          />
        </Navbar.Brand>

        {/* Toggler para el menú de hamburguesa en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Contenedor colapsable que agrupa los links y los botones */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Links de navegación */}
          <Nav className="me-auto d-flex align-items-center">
            {/* Productos */}
            <div
              className={`nav-item mega-hover mega-dropdown ${isMenuForcedClosed ? "forced-closed" : ""}`}
              style={{ position: "relative" }}
            >
              <Link to="/productos" className="nav-link-custom" onClick={closeMenu}>
                Productos
              </Link>
              <div className="mega-menu">
                <div
                  className="mega-menu-content"
                  style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: "0",
                    minWidth: "500px",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Tipos de producto */}
                  <div style={{ minWidth: "180px", marginRight: "16px" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        marginBottom: "10px",
                        textAlign: "left",
                      }}
                    >
                      Tipos de Producto
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li><Link to="/productos/laptops" onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>Laptops</Link></li>
                      <li><Link to="/productos/servidores" onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>Servidores</Link></li>
                      <li><Link to="/productos/pcs" onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>PCs</Link></li>
                      <li><Link to="/productos/monitores" onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>Monitores</Link></li>
                      <li><Link to="/productos/impresoras" onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>Impresoras</Link></li>
                      <li><Link to="/productos/accesorios" onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>Accesorios</Link></li>
                    </ul>
                  </div>
                  {/* Separador vertical */}
                  <div style={{ width: "1px", background: "#d1d5db", height: "100%", margin: "0 16px" }} />
                  {/* Marcas distribuidas en dos columnas */}
                  <div style={{ minWidth: "320px", display: "flex", flexDirection: "column", marginLeft: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "10px", textAlign: "left" }}>Marcas</div>
                    <div style={{ display: "flex", gap: "24px" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "140px" }}>
                        {["DELL", "Lenovo", "HP", "HPE", "Cisco", "Extreme Networks", "Fortinet", "Microsoft"].map((marca, idx) => (
                          <li key={idx} style={{ marginBottom: "8px" }}>
                            <Link to={`/productos/marca/${marca.toLowerCase().replace(/\s+/g, "-")}`} onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>{marca}</Link>
                          </li>
                        ))}
                      </ul>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, width: "140px" }}>
                        {["Samsung", "Qnap", "Intel", "AMD", "Kingston", "LG", "APC", "EPSON", "Dynabook"].map((marca, idx) => (
                          <li key={idx} style={{ marginBottom: "8px" }}>
                            <Link to={`/productos/marca/${marca.toLowerCase().replace(/\s+/g, "-")}`} onClick={closeMenu} style={{ color: "#222", textDecoration: "none" }}>{marca}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marcas */}
            <div className={`nav-item mega-hover mega-dropdown ${isMenuForcedClosed ? "forced-closed" : ""}`} style={{ position: "relative" }}>
              <Link to="/marcas" className="nav-link-custom" onClick={closeMenu}>Marcas</Link>
              <div className="mega-menu">
                <div className="mega-menu-content" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
                  {[
                    { nombre: "DELL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/640px-Dell_Logo.svg.png" },
                    { nombre: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lenovo_%282015%29.svg/640px-Lenovo_%282015%29.svg.png" },
                    { nombre: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/HP_logo_1979.svg/640px-HP_logo_1979.svg.png" },
                    { nombre: "HPE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/HPE-logo-2025.png/640px-HPE-logo-2025.png" },
                    { nombre: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/640px-Cisco_logo_blue_2016.svg.png" },
                    { nombre: "Extreme Networks", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Logo_of_Extreme_Networks%2C_Inc._%28old%29.svg/640px-Logo_of_Extreme_Networks%2C_Inc._%28old%29.svg.png" },
                    { nombre: "Fortinet", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/640px-Fortinet_logo.svg.png" },
                    { nombre: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/640px-Microsoft_logo_%282012%29.svg.png" },
                    { nombre: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png" },
                    { nombre: "Qnap", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Qnap_Logo_2004.svg/640px-Qnap_Logo_2004.svg.png" },
                    { nombre: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/640px-Intel_logo_%282006-2020%29.svg.png" },
                    { nombre: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/640px-AMD_logo_pre-2013.svg.png" },
                    { nombre: "Kingston", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87_Kingston_WhiteHead_Black.png/640px-%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87_Kingston_WhiteHead_Black.png" },
                    { nombre: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/LG_logo_%282014%2C_3D%29.svg/640px-LG_logo_%282014%2C_3D%29.svg.png" },
                    { nombre: "APC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/LogoAPC.svg/640px-LogoAPC.svg.png" },
                    { nombre: "EPSON", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/EPSON-Logo.svg/640px-EPSON-Logo.svg.png" },
                    { nombre: "Dynabook", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Dynabook_Logo.svg/640px-Dynabook_Logo.svg.png" },
                  ].map((marca, idx) => (
                    <div key={idx} style={{ width: "120px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }} onClick={closeMenu}>
                      <img src={marca.logo} alt={marca.nombre} style={{ height: "54px", objectFit: "contain", marginBottom: "10px", maxWidth: "100px", filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))" }} />
                      <div style={{ fontSize: "0.9rem", color: "#333", fontWeight: 500 }}>{marca.nombre}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experiencia */}
            <div className={`nav-item mega-hover mega-dropdown ${isMenuForcedClosed ? "forced-closed" : ""}`} style={{ position: "relative" }}>
              <Link to="/experiencia" className="nav-link-custom" onClick={closeMenu}>Experiencia</Link>
              <div className="mega-menu">
                <div className="mega-menu-content" style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
                  {[
                    { titulo: "Data Center SEAL", resumen: "Renovación de infraestructura crítica para SEAL (Arequipa).", logo: "/seal.png" },
                    { titulo: "Servidores EGASA", resumen: "Modernización de servidores industriales para EGASA.", logo: "/egasa_logo.png" },
                    { titulo: "Mantenimiento SUNARP", resumen: "Mantenimiento integral de servidores y data center SUNARP.", logo: "/sunarp_logo.png" },
                    { titulo: "Video Vigilancia ZOFRATACNA", resumen: "Sistema CCTV IP y monitoreo centralizado en ZOFRATACNA.", logo: "/Zofratacna_logo.jpg" },
                  ].map((exp, idx) => (
                    <div key={idx} style={{ width: "140px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", background: "#f4f6fa", borderRadius: "10px", padding: "12px 8px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }} onClick={closeMenu}>
                      <img src={exp.logo} alt={exp.titulo} style={{ width: "60px", height: "60px", objectFit: "contain", marginBottom: "8px" }} />
                      <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "4px" }}>{exp.titulo}</div>
                      <div style={{ fontSize: "0.85rem", color: "#555" }}>{exp.resumen}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div className={`nav-item mega-hover mega-dropdown ${isMenuForcedClosed ? "forced-closed" : ""}`} style={{ position: "relative" }}>
              <Link to="/servicios" className="nav-link-custom" onClick={closeMenu}>Servicios</Link>
              <div className="mega-menu">
                <div className="mega-menu-content" style={{ display: "flex", gap: "20px" }}>
                  {[
                    { path: "instalacion", img: "/images/instalacion.jpg", label: "Instalación", desc: "Instalación profesional de equipos." },
                    { path: "garantia", img: "/images/garantia.jpg", label: "Garantía", desc: "Garantía extendida y soporte técnico." },
                    { path: "mantenimiento", img: "/images/mantenimiento.jpg", label: "Mantenimiento", desc: "Mantenimiento preventivo y correctivo." }
                  ].map((item, i) => (
                    <div key={i} className="mega-menu-column" onClick={closeMenu}>
                      <img src={item.img} alt={item.label} className="mega-menu-img" />
                      <Link to={`/servicios/${item.path}`} onClick={closeMenu}><h5>{item.label}</h5></Link>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/sobre-nosotros" className="nav-link-custom" onClick={closeMenu}>Sobre Nosotros</Link>
          </Nav>

          {/* Botones y carrito */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            <Link to="/carrito" className="shopping-cart-icon" onClick={closeMenu} style={{ fontSize: "1.6rem", color: "#000" }}><FaShoppingCart /></Link>
            <Button className="btn-offer" onClick={() => { closeMenu(); navigate("/ofertas"); }}>Ofertas</Button>
            {isLoggedIn ? (
              <Button variant="outline-dark" onClick={handleAdminClick}>Admin</Button>
            ) : (
              <Button variant="outline-dark" onClick={handleLoginClick}>Iniciar Sesión</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;