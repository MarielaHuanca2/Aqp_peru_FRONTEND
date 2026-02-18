import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "./Experiencia.css";

const casosDeExito = [
  {
    cliente: "Universidad Nacional de San Agustín – UNSA",
    sector: "Educación superior pública",
    ubicacion: "Arequipa, Perú",
    titulo: "Implementación de Nube Privada – Centro de Datos UNSA",
    resumen: "La UNSA requería modernizar su infraestructura de centro de datos para atender la creciente demanda académica y administrativa, mejorando procesamiento, almacenamiento y disponibilidad de sus servicios.",
    solucion: "Implementación de nube privada con almacenamiento EMC VNX, switches de fibra canal redundantes, tarjetas HBA y virtualización con VMware vSphere Enterprise y vCenter. Instalación, configuración, puesta en marcha y capacitación especializada.",
    resultados: "Mayor disponibilidad y fiabilidad de servicios, optimización de recursos, reducción de riesgos y costos, y preparación para crecimiento futuro con mejor recuperación ante desastres.",
    ejecutadoPor: "AQP-Peru Data",
    logo: "/unsa_logo.png"
  },
  {
    cliente: "Zona Registral Nº XII – SUNARP",
    sector: "Servicios registrales públicos",
    ubicacion: "Arequipa, Perú",
    titulo: "Mantenimiento Preventivo y Correctivo de Equipos Informáticos",
    resumen: "La institución requería soporte especializado para garantizar la continuidad operativa de sus equipos informáticos e infraestructura tecnológica en múltiples sedes de la región.",
    solucion: "Servicio integral por dos años de soporte técnico especializado, mantenimiento preventivo y correctivo de PCs, laptops, impresoras, UPS, switches, cableado estructurado y atención de incidencias de hardware y software.",
    resultados: "Continuidad operativa asegurada, reducción de tiempos de parada, prolongación de vida útil de equipos y mejora en la eficiencia del soporte tecnológico institucional.",
    ejecutadoPor: "AQP-Peru Data",
    logo: "/sunarp_logo.png"
  },
  {
    cliente: "SEDAPAR S.A.",
    sector: "Servicios de saneamiento",
    ubicacion: "Arequipa, Perú",
    titulo: "Servicio Especializado de Mantenimiento de Infraestructura TI",
    resumen: "SEDAPAR necesitaba reforzar el soporte técnico de sus equipos informáticos para garantizar la continuidad de sus operaciones en distintas sedes de la región.",
    solucion: "Contrato de mantenimiento preventivo y correctivo por dos años, incluyendo soporte a PCs, workstations, servidores Dell/IBM/HP, impresoras, plotters, UPS, switches y atención de incidentes especializados.",
    resultados: "Operatividad continua de los sistemas informáticos, reducción de fallas críticas, extensión de vida útil de los equipos y mínima interrupción en las actividades empresariales.",
    ejecutadoPor: "AQP-Peru Data",
    logo: "/sedapar_logo.png"
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

