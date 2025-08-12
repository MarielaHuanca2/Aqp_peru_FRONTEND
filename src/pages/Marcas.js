import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Marcas.css";

function Marcas() {
  const proveedores = ["Grupo Deltron", "Ingram Micro", "Adister"];
  const marcasDistribuidas = [
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
    { nombre: "Dynabook", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Dynabook_Logo.svg/640px-Dynabook_Logo.svg.png" }
  ];


  return (
    <div className="marcas-page">
      <Container className="py-5">
        <h1 className="main-title text-center mb-2">Marcas y Proveedores</h1>
        <p className="page-subtitle text-center mb-5">
          En ComputerShops trabajamos con los mejores proveedores y distribuimos marcas líderes a nivel mundial, ofreciendo productos originales y soporte de fábrica.
        </p>

        {/* Sección de Marcas (Grid) */}
        <section className="marcas-section mb-5">
          <h2 className="section-title text-center mb-4">Marcas que distribuimos</h2>
          <Row xs={2} sm={3} md={4} lg={5} className="g-4">
            {marcasDistribuidas.map((marca, idx) => (
              <Col key={idx}>
                <Link to={`/productos/marca/${marca.nombre.toLowerCase().replace(/\s/g, '-')}`} className="brand-link">
                  <div className="brand-card h-100 d-flex flex-column justify-content-center align-items-center p-3">
                    <img
                      src={marca.logo}
                      alt={marca.nombre}
                      className="brand-logo"
                    />
                    <div className="brand-name mt-3">{marca.nombre}</div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </section>

        {/* Sección de Proveedores */}
        <section className="proveedores-section mt-5">
          <h2 className="section-title text-center mb-4">Nuestros proveedores autorizados</h2>
          <Row className="justify-content-center">
            {proveedores.map((prov, idx) => (
              <Col key={idx} xs={12} sm={6} md={4} className="mb-3">
                <div className="proveedor-card text-center p-3">
                  <h5 className="proveedor-name">{prov}</h5>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <p className="final-text text-center mt-5">
          ¡Explora nuestras marcas y descubre la tecnología que se adapta a tus necesidades!
        </p>
      </Container>
    </div>
  );
}

export default Marcas;