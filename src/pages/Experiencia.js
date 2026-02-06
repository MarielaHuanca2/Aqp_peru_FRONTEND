import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./Experiencia.css";

const casosDeExito = [
  {
    cliente: "Sociedad Eléctrica del Sur Oeste S.A. - SEAL",
    sector: "Energía eléctrica",
    ubicacion: "Arequipa, Perú",
    titulo: "Renovación del Data Center de SEAL",
    resumen: "SEAL necesitaba modernizar su Data Center para garantizar el funcionamiento de sus aplicaciones críticas y conexiones remotas.",
    solucion: "Aire acondicionado de precisión, sistema contra incendios, UPS, gabinetes, y acceso biométrico.",
    resultados: "Ambiente óptimo, mayor seguridad y escalabilidad.",
    ejecutadoPor: "Consorcio ComputerShop’s S.R.L. e Integrity Perú S.A.C.",
    logo: "/seal.png"
  },
  {
    cliente: "Empresa de Generación Eléctrica de Arequipa S.A. - EGASA",
    sector: "Generación eléctrica",
    ubicacion: "C.T. Pisco y C.T. Chilina",
    titulo: "Servidores Industriales para Sala de Control – EGASA",
    resumen: "EGASA necesitaba renovar sus servidores para mejorar el sistema SCADA sin interrupciones.",
    solucion: "Servidores Blade HP, almacenamiento MSA 2040, migración sin pérdida de datos y capacitación técnica.",
    resultados: "Continuidad operativa, reducción de fallas y ahorro energético.",
    ejecutadoPor: "ComputerShop’s Corporation.",
    logo: "/egasa_logo.png"
  },
  {
    cliente: "Zona Registral Nº XII – SUNARP",
    sector: "Servicios registrales",
    ubicacion: "Arequipa, Perú",
    titulo: "Mantenimiento de Servidores – Zona Registral Nº XII (SUNARP)",
    resumen: "Los equipos de su centro de datos habían superado su garantía y requerían mantenimiento preventivo y correctivo para garantizar continuidad operativa.",
    solucion: "Mantenimiento integral a servidores, almacenamiento, respaldo, red, UPS, aire acondicionado, cableado y monitoreo.",
    resultados: "Reducción de incidencias, aumento de vida útil y operatividad constante.",
    ejecutadoPor: "ComputerShop’s Corporation.",
    logo: "/sunarp_logo.png"
  },
  {
    cliente: "Zona Franca de Tacna – ZOFRATACNA",
    sector: "Comercio exterior / Seguridad institucional",
    ubicacion: "Tacna, Perú",
    titulo: "Sistema de Video Vigilancia y Monitoreo – ZOFRATACNA",
    resumen: "ZOFRATACNA contaba con un sistema CCTV obsoleto, poniendo en riesgo la seguridad. Se requería implementar un sistema IP moderno y eficiente.",
    solucion: "Instalación de 8 cámaras IP Axis, software ISS SecurOS, servidor Dell, cableado estructurado Cat 6 y fibra OM3. Centro de monitoreo con joystick y pantalla dedicada. Integración con infraestructura virtualizada VMware.",
    resultados: "Vigilancia en tiempo real, control de accesos, monitoreo bajo demanda, y gestión centralizada.",
    ejecutadoPor: "Consorcio ComputerShop’s S.R.L. y Soluciones Digitales Unificadas.",
    logo: "/Zofratacna_logo.jpg"
  }
];

function Experiencia() {
  return (
    <div className="experiencia-page">
      <Container className="py-5">
        <header className="text-center mb-5">
          <h1 className="main-title mb-3">Nuestra Experiencia</h1>
          <p className="page-subtitle mx-auto">
            En ComputerShops nos dedicamos a brindar soluciones tecnológicas personalizadas a empresas de todos los tamaños. Nuestro equipo experto garantiza asesoría especializada, soporte constante y productos de alta calidad.
          </p>
        </header>

        {/* Sección de Logos de Clientes */}
        <section className="cliente-logos-section mb-5">
          <h2 className="section-title text-center mb-4">Nuestros Clientes</h2>
          <div className="logos-wrapper">
            {casosDeExito.map((caso, index) => (
              <div key={index} className="logo-box">
                <img src={caso.logo} alt={`Logo de ${caso.cliente}`} className="cliente-logo" />
                <span className="logo-hover-name">{caso.cliente}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="custom-divider" />

        {/* Sección de Casos de Éxito */}
        <section className="casos-de-exito-section">
          <h2 className="section-title text-center mb-5">Casos de Éxito Detallados</h2>
          {casosDeExito.map((caso, index) => (
            <Card key={index} className="caso-card mb-5 border-0 shadow-sm">
              <Card.Body className="p-0">
                <Row className="g-0">
                  <Col lg={3} className="caso-header-aside p-4 text-center d-flex flex-column justify-content-center">
                    <img src={caso.logo} alt={caso.cliente} className="caso-logo-card mb-3" />
                    <h5 className="caso-cliente-nombre">{caso.cliente}</h5>
                    <Badge bg="primary" className="mt-2 py-2 px-3 badge-custom">{caso.sector}</Badge>
                    <div className="mt-3 text-muted small">
                      <strong>Ubicación:</strong><br />{caso.ubicacion}
                    </div>
                  </Col>
                  
                  <Col lg={9} className="p-4 p-md-5">
                    <h3 className="caso-title mb-3">{caso.titulo}</h3>
                    <div className="caso-resumen-box mb-4">
                      <p className="mb-0">{caso.resumen}</p>
                    </div>

                    <Row className="mb-4">
                      <Col md={6} className="mb-3 mb-md-0">
                        <h6 className="text-uppercase fw-bold text-primary small mb-2">Solución Técnica</h6>
                        <p className="detail-text">{caso.solucion}</p>
                      </Col>
                      <Col md={6}>
                        <h6 className="text-uppercase fw-bold text-success small mb-2">Resultados Obtenidos</h6>
                        <p className="detail-text fw-medium">{caso.resultados}</p>
                      </Col>
                    </Row>

                    <footer className="caso-footer border-top pt-3">
                      <p className="caso-ejecutado mb-0">
                        <i className="bi bi-person-check-fill me-2"></i>
                        Ejecutado por: <strong>{caso.ejecutadoPor}</strong>
                      </p>
                    </footer>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </section>
      </Container>
    </div>
  );
}

export default Experiencia;

