import React, { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useFiltroProductos } from "../context/FiltroProductosContext";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const { setFiltros } = useFiltroProductos();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Estado para forzar el cierre del menú al hacer click
  const [isMenuForcedClosed, setIsMenuForcedClosed] = useState(false);
  // Estado para controlar el mega menú de Productos
  const [isMegaOpen, setIsMegaOpen] = useState(false);

  // Función para cerrar el menú inmediatamente
  const closeMenu = () => {
    setIsMenuForcedClosed(true);
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

  // 👉 FUNCIÓN CENTRAL DE FILTRADO
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

    // Cerrar mega menú y menu forzado antes de navegar
    setIsMegaOpen(false);
    closeMenu();
    navigate("/productos");
  };

  return (
    <Navbar expand="lg" className="navbar-header">
      <Container fluid style={{ position: "relative" }}>
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand-custom"
          onClick={closeMenu}
        >
          <img
            src="/logo_nuevo.png"
            alt="Logo"
            style={{ height: "80px", objectFit: "contain" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            {/* PRODUCTOS (mega menú controlado por botón) */}
            <div className={`nav-item mega-dropdown ${isMenuForcedClosed ? "forced-closed" : ""}`}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Link to="/productos" className="nav-link-custom" onClick={() => { closeMenu(); setIsMegaOpen(false); }}>
                  Productos
                </Link>

                <button
                  type="button"
                  className="mega-toggle-btn"
                  aria-expanded={isMegaOpen}
                  aria-label="Abrir mega menú Productos"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMegaOpen((v) => !v);
                  }}
                >
                  ▾
                </button>
              </div>

              <div
                className="mega-menu"
                onMouseEnter={() => setIsMegaOpen(true)}
                onMouseLeave={() => setIsMegaOpen(false)}
                style={{ display: isMegaOpen ? 'block' : 'none' }}
              >
                <div className="mega-menu-content" style={{ display: "flex", minWidth: "500px" }}>
                  {/* TIPOS */}
                  <div style={{ minWidth: "180px" }}>
                    <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "10px" }}>
                      Tipos de Producto
                    </div>

                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {["Laptops", "Servidores", "PCs", "Monitores", "Impresoras", "Accesorios"].map((tipo) => (
                        <li key={tipo}>
                          <span style={{ color: "#222", cursor: "pointer" }} onClick={() => { irAProductosConFiltro({ texto: tipo }); setIsMegaOpen(false); }}>
                            {tipo}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ width: "1px", background: "#d1d5db", margin: "0 16px" }} />

                  {/* MARCAS */}
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "10px" }}>
                      Marcas
                    </div>

                    <div style={{ display: "flex", gap: "24px" }}>
                      {[
                        ["DELL","Lenovo","HP","HPE","Cisco","Extreme Networks","Fortinet","Microsoft"],
                        ["Samsung","Qnap","Intel","AMD","Kingston","LG","APC","EPSON","Dynabook"],
                      ].map((col, i) => (
                        <ul key={i} style={{ listStyle: "none", padding: 0 }}>
                          {col.map((marca) => (
                            <li key={marca}>
                              <span style={{ color: "#222", cursor: "pointer" }} onClick={() => { irAProductosConFiltro({ marca }); setIsMegaOpen(false); }}>
                                {marca}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MARCAS (LOGOS) */}
            <div
              className={`nav-item mega-hover mega-dropdown ${
                isMenuForcedClosed ? "forced-closed" : ""
              }`}
            >
              <Link
                to="/marcas"
                className="nav-link-custom"
                onClick={closeMenu}
              >
                Marcas
              </Link>

              <div className="mega-menu">
                <div
                  className="mega-menu-content"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                  }}
                >
                  {[
                    { nombre: "DELL", logo: "/marcas/Dell_marcas.png" },
                    { nombre: "Lenovo", logo: "/marcas/Lenovo_marcas.png" },
                    { nombre: "HP", logo: "/marcas/hp_marcas.png" },
                    { nombre: "HPE", logo: "/marcas/hpe_marcas.png" },
                    { nombre: "Cisco", logo: "/marcas/cisco_marcas.png" },
                    {
                      nombre: "Extreme Networks",
                      logo: "/marcas/extreme_marcas.png",
                    },
                    {
                      nombre: "Fortinet",
                      logo: "/marcas/fortinet_marcas.png",
                    },
                    {
                      nombre: "Microsoft",
                      logo: "/marcas/microsoft_marcas.png",
                    },
                    { nombre: "Samsung", logo: "/marcas/samsung_marcas.png" },
                    { nombre: "Qnap", logo: "/marcas/QNAP_marcas.png" },
                    { nombre: "Intel", logo: "/marcas/intel_marcas.png" },
                    { nombre: "AMD", logo: "/marcas/amd_marcas.png" },
                    {
                      nombre: "Kingston",
                      logo: "/marcas/kingston_marcas.png",
                    },
                    { nombre: "LG", logo: "/marcas/LG_marcas.png" },
                    { nombre: "APC", logo: "/marcas/apc_marcas.png" },
                    { nombre: "EPSON", logo: "/marcas/epson_marcas.png" },
                    {
                      nombre: "Dynabook",
                      logo: "/marcas/dynabook_marcas.png",
                    },
                  ].map((marca) => (
                    <div
                      key={marca.nombre}
                      style={{
                        width: "120px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        irAProductosConFiltro({ marca: marca.nombre })
                      }
                    >
                      <img
                        src={marca.logo}
                        alt={marca.nombre}
                        style={{ height: "54px", marginBottom: "10px" }}
                      />
                      <div
                        style={{ fontSize: "0.9rem", fontWeight: 500 }}
                      >
                        {marca.nombre}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/experiencia"
              className="nav-link-custom"
              onClick={closeMenu}
            >
              Experiencia
            </Link>

            <Link
              to="/servicios"
              className="nav-link-custom"
              onClick={closeMenu}
            >
              Servicios
            </Link>

            <Link
              to="/sobre-nosotros"
              className="nav-link-custom"
              onClick={closeMenu}
            >
              Sobre Nosotros
            </Link>
          </Nav>

          <div className="d-flex align-items-center gap-2">
            <Link to="/carrito" onClick={closeMenu}>
              <FaShoppingCart />
            </Link>

            <Button onClick={() => navigate("/ofertas")}>Ofertas</Button>

            {isLoggedIn ? (
              <Button onClick={handleAdminClick}>Admin</Button>
            ) : (
              <Button onClick={handleLoginClick}>Iniciar Sesión</Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

