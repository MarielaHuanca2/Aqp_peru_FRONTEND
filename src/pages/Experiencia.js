import { Container, Row, Col, Card } from "react-bootstrap";
import "./Experiencia.css";

// Datos de los casos de éxito
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
    logo: "/seal.png" // Agregamos un logo para cada caso
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
        <h1 className="main-title text-center mb-2">Nuestra Experiencia</h1>
        <p className="page-subtitle text-center mb-5">
          En ComputerShops nos dedicamos a brindar soluciones tecnológicas personalizadas a empresas de todos los tamaños. Nuestro equipo experto
          garantiza asesoría especializada, soporte constante y productos de alta calidad.
        </p>

        {/* Sección de Logos de Clientes */}
        <section className="cliente-logos-section mb-5">
          <h2 className="section-title text-center mb-4">Nuestros Clientes</h2>
          <Row className="justify-content-center">
            {casosDeExito.map((caso, index) => (
              <Col key={index} xs={6} md={3} className="text-center mb-4">
                <div className="cliente-logo-container d-flex flex-column align-items-center">
                  <img src={caso.logo} alt={`Logo de ${caso.cliente}`} className="cliente-logo" />
                  <p className="cliente-nombre mt-2">{caso.cliente}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        <hr className="my-5" />

        {/* Sección de Casos de Éxito */}
        <section className="casos-de-exito-section">
          <h2 className="section-title text-center mb-5">Casos de Éxito</h2>
          {casosDeExito.map((caso, index) => (
            <Card key={index} className="caso-card mb-4">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={3} className="text-center mb-3 mb-md-0">
                    <img src={caso.logo} alt={`Logo de ${caso.cliente}`} className="caso-logo-card" />
                    <p className="caso-cliente-nombre mt-2">{caso.cliente}</p>
                  </Col>
                  <Col md={9}>
                    <h4 className="caso-title">{caso.titulo}</h4>
                    <p className="caso-resumen">{caso.resumen}</p>
                    <p>
                      <strong>Sector:</strong> {caso.sector}<br />
                      <strong>Ubicación:</strong> {caso.ubicacion}
                    </p>
                    <p>
                      <strong>Solución:</strong> {caso.solucion}
                    </p>
                    <p>
                      <strong>Resultados:</strong> {caso.resultados}
                    </p>
                    <p className="caso-ejecutado">
                      <em>Ejecutado por: {caso.ejecutadoPor}</em>
                    </p>
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

