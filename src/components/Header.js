import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
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

        {/* Toggler para el menú de hamburguesa en pantallas pequeñas */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        {/* Contenedor colapsable que agrupa los links y los botones */}
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Links de navegación */}
          <Nav className="me-auto d-flex align-items-center">
            {/* Productos */}
            <div
              className="nav-item mega-hover mega-dropdown"
              style={{ position: "relative" }}
            >
              <Link to="/productos" className="nav-link-custom">
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
                      <li>
                        <Link
                          to="/productos/laptops"
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          Laptops
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/productos/servidores"
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          Servidores
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/productos/pcs"
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          PCs
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/productos/monitores"
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          Monitores
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/productos/impresoras"
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          Impresoras
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/productos/accesorios"
                          style={{ color: "#222", textDecoration: "none" }}
                        >
                          Accesorios
                        </Link>
                      </li>
                    </ul>
                  </div>
                  {/* Separador vertical */}
                  <div
                    style={{
                      width: "1px",
                      background: "#d1d5db",
                      height: "100%",
                      margin: "0 16px",
                    }}
                  />
                  {/* Marcas distribuidas en dos columnas */}
                  <div
                    style={{
                      minWidth: "320px",
                      display: "flex",
                      flexDirection: "column",
                      marginLeft: 0,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        marginBottom: "10px",
                        textAlign: "left",
                      }}
                    >
                      Marcas
                    </div>
                    <div style={{ display: "flex", gap: "24px" }}>
                      {/* Primera columna */}
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          width: "140px",
                        }}
                      >
                        {[
                          "DELL",
                          "Lenovo",
                          "HP",
                          "HPE",
                          "Cisco",
                          "Extreme Networks",
                          "Fortinet",
                          "Microsoft",
                        ].map((marca, idx) => (
                          <li key={idx} style={{ marginBottom: "8px" }}>
                            <Link
                              to={`/productos/marca/${marca
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              style={{ color: "#222", textDecoration: "none" }}
                            >
                              {marca}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {/* Segunda columna */}
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          width: "140px",
                        }}
                      >
                        {[
                          "Samsung",
                          "Qnap",
                          "Intel",
                          "AMD",
                          "Kingston",
                          "LG",
                          "APC",
                          "EPSON",
                          "Dynabook",
                        ].map((marca, idx) => (
                          <li key={idx} style={{ marginBottom: "8px" }}>
                            <Link
                              to={`/productos/marca/${marca
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              style={{ color: "#222", textDecoration: "none" }}
                            >
                              {marca}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Marcas */}
            <div
              className="nav-item mega-hover mega-dropdown"
              style={{ position: "relative" }}
            >
              <Link to="/marcas" className="nav-link-custom">
                Marcas
              </Link>
              <div className="mega-menu">
                <div
                  className="mega-menu-content"
                  style={{ flexWrap: "wrap", gap: "1.5rem" }}
                >
                  {/* Logos de marcas distribuidas */}
                  {[
                    {
                      nombre: "DELL",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/640px-Dell_Logo.svg.png",
                    },
                    {
                      nombre: "Lenovo",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lenovo_%282015%29.svg/640px-Lenovo_%282015%29.svg.png",
                    },
                    {
                      nombre: "HP",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/HP_logo_1979.svg/640px-HP_logo_1979.svg.png",
                    },
                    {
                      nombre: "HPE",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/HPE-logo-2025.png/640px-HPE-logo-2025.png",
                    },
                    {
                      nombre: "Cisco",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/640px-Cisco_logo_blue_2016.svg.png",
                    },
                    {
                      nombre: "Extreme Networks",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Logo_of_Extreme_Networks%2C_Inc._%28old%29.svg/640px-Logo_of_Extreme_Networks%2C_Inc._%28old%29.svg.png",
                    },
                    {
                      nombre: "Fortinet",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/640px-Fortinet_logo.svg.png",
                    },
                    {
                      nombre: "Microsoft",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/640px-Microsoft_logo_%282012%29.svg.png",
                    },
                    {
                      nombre: "Samsung",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png",
                    },
                    {
                      nombre: "Qnap",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Qnap_Logo_2004.svg/640px-Qnap_Logo_2004.svg.png",
                    },
                    {
                      nombre: "Intel",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/640px-Intel_logo_%282006-2020%29.svg.png",
                    },
                    {
                      nombre: "AMD",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/640px-AMD_logo_pre-2013.svg.png",
                    },
                    {
                      nombre: "Kingston",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87_Kingston_WhiteHead_Black.png/640px-%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87_Kingston_WhiteHead_Black.png",
                    },
                    {
                      nombre: "LG",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/LG_logo_%282014%2C_3D%29.svg/640px-LG_logo_%282014%2C_3D%29.svg.png",
                    },
                    {
                      nombre: "APC",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/LogoAPC.svg/640px-LogoAPC.svg.png",
                    },
                    {
                      nombre: "EPSON",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/EPSON-Logo.svg/640px-EPSON-Logo.svg.png",
                    },
                    {
                      nombre: "Dynabook",
                      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Dynabook_Logo.svg/640px-Dynabook_Logo.svg.png",
                    },
                  ].map((marca, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "120px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={marca.logo}
                        alt={marca.nombre}
                        style={{
                          height: "54px",
                          objectFit: "contain",
                          marginBottom: "10px",
                          maxWidth: "100px",
                          filter:
                            "drop-shadow(0 2px 6px rgba(0,0,0,0.08))",
                        }}
                      />
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#333",
                          fontWeight: 500,
                        }}
                      >
                        {marca.nombre}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Experiencia */}
            <div
              className="nav-item mega-hover mega-dropdown"
              style={{ position: "relative" }}
            >
              <Link to="/experiencia" className="nav-link-custom">
                Experiencia
              </Link>
              <div className="mega-menu">
                <div
                  className="mega-menu-content"
                  style={{
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {/* Tarjetas de experiencia con logos */}
                  {[
                    {
                      titulo: "Data Center SEAL",
                      resumen:
                        "Renovación de infraestructura crítica para SEAL (Arequipa).",
                      logo: "/seal.png",
                    },
                    {
                      titulo: "Servidores EGASA",
                      resumen:
                        "Modernización de servidores industriales para EGASA.",
                      logo: "/egasa_logo.png",
                    },
                    {
                      titulo: "Mantenimiento SUNARP",
                      resumen:
                        "Mantenimiento integral de servidores y data center SUNARP.",
                      logo: "/sunarp_logo.png",
                    },
                    {
                      titulo: "Video Vigilancia ZOFRATACNA",
                      resumen:
                        "Sistema CCTV IP y monitoreo centralizado en ZOFRATACNA.",
                      logo: "/Zofratacna_logo.jpg",
                    },
                  ].map((exp, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "140px",
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f4f6fa",
                        borderRadius: "10px",
                        padding: "12px 8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <img
                        src={exp.logo}
                        alt={exp.titulo}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "contain",
                          marginBottom: "8px",
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          marginBottom: "4px",
                        }}
                      >
                        {exp.titulo}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "#555" }}>
                        {exp.resumen}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div
              className="nav-item mega-hover mega-dropdown"
              style={{ position: "relative" }}
            >
              <Link to="/servicios" className="nav-link-custom">
                Servicios
              </Link>
              <div className="mega-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-column">
                    <img
                      src="/images/instalacion.jpg"
                      alt="Instalación"
                      className="mega-menu-img"
                    />
                    <Link to="/servicios/instalacion">
                      <h5>Instalación</h5>
                    </Link>
                    <p>Instalación profesional de equipos.</p>
                  </div>
                  <div className="mega-menu-column">
                    <img
                      src="/images/garantia.jpg"
                      alt="Garantía"
                      className="mega-menu-img"
                    />
                    <Link to="/servicios/garantia">
                      <h5>Garantía</h5>
                    </Link>
                    <p>Garantía extendida y soporte técnico.</p>
                  </div>
                  <div className="mega-menu-column">
                    <img
                      src="/images/mantenimiento.jpg"
                      alt="Mantenimiento"
                      className="mega-menu-img"
                    />
                    <Link to="/servicios/mantenimiento">
                      <h5>Mantenimiento</h5>
                    </Link>
                    <p>Mantenimiento preventivo y correctivo.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sobre Nosotros */}
            <div
              className="nav-item mega-hover mega-dropdown"
              style={{ position: "relative" }}
            >
              <Link to="/sobre-nosotros" className="nav-link-custom">
                Sobre Nosotros
              </Link>
            </div>
          </Nav>

          {/* Grupo de botones y carrito alineado a la derecha */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
            {/* Ícono del carrito */}
            <Link
              to="/carrito"
              className="shopping-cart-icon"
              style={{ fontSize: "1.6rem", color: "#000" }}
            >
              <FaShoppingCart />
            </Link>

            {/* Botones de sesión */}
            <Button
              className="btn-offer"
              onClick={() => navigate("/ofertas")}
            >
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
