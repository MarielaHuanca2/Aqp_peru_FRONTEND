import { Container, Row, Col } from "react-bootstrap";
import "./Marcas.css";

function Marcas() {
  const proveedores = ["Grupo Deltron", "Ingram Micro", "Adister"];

  const marcasDistribuidas = [
    { nombre: "DELL", logo: "/marcas/Dell_marcas.png" },
    { nombre: "Lenovo", logo: "/marcas/Lenovo_marcas.png" },
    { nombre: "HP", logo: "/marcas/hp_marcas.png" },
    { nombre: "HPE", logo: "/marcas/hpe_marcas.png" },
    { nombre: "Cisco", logo: "/marcas/cisco_marcas.png" },
    { nombre: "Extreme Networks", logo: "/marcas/extreme.png" },
    { nombre: "Fortinet", logo: "/marcas/fortinet.png" },
    { nombre: "Microsoft", logo: "/marcas/microsoft.png" },
    { nombre: "Samsung", logo: "/marcas/samsung_marcas.png" },
    { nombre: "Qnap", logo: "/marcas/QNAP_marcas.png" },
    { nombre: "Intel", logo: "/marcas/intel.png" },
    { nombre: "AMD", logo: "/marcas/amd_marcas.png" },
    { nombre: "Kingston", logo: "/marcas/kingston.png" },
    { nombre: "LG", logo: "marcas/lg_logo.png" },
    { nombre: "APC", logo: "/marcas/apc.png" },
    { nombre: "EPSON", logo: "/marcas/epson.png" },
    { nombre: "Dynabook", logo: "/marcas/Dynabook_Logo.svg.png" }
  ];

  return (
    <div className="marcas-page">
      <Container className="py-5">
        <h1 className="main-title text-center mb-2">Marcas y Proveedores</h1>

        <p className="page-subtitle text-center mb-5">
          En ComputerShops trabajamos con los mejores proveedores y distribuimos marcas líderes a nivel mundial,
          ofreciendo productos originales y soporte de fábrica.
        </p>

        {/* Sección de Marcas */}
        <section className="marcas-section mb-5">
          <h2 className="section-title text-center mb-4">Marcas que distribuimos</h2>

          <Row xs={2} sm={3} md={4} lg={5} className="g-4">
            {marcasDistribuidas.map((marca, idx) => (
              <Col key={idx}>
                <div className="brand-card h-100 d-flex flex-column justify-content-center align-items-center p-3">
                  <img
                    src={marca.logo}
                    alt={marca.nombre}
                    className="brand-logo"
                  />
                  <div className="brand-name mt-3">
                    {marca.nombre}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Sección de Proveedores */}
        <section className="proveedores-section mt-5">
          <h2 className="section-title text-center mb-4">
            Nuestros proveedores autorizados
          </h2>

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
