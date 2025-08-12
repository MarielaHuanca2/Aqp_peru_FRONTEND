import { Container, Row, Col } from "react-bootstrap";
import "./Servicios.css";

function Servicios() {
  return (
    <div className="servicios-page">
      <div className="banner-principal">
        <Container>
          <div className="banner-content">
            <h1 className="banner-title">Las Mejores Soluciones en TIC para su Organización</h1>
            <p className="banner-subtitle">
              ComputerShop's Corporation S.R.L. se funda el año 2001 en la ciudad de Arequipa. Desde entonces, ofrecemos productos y servicios de alta calidad, trabajando con las principales empresas privadas y públicas del País.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <h2 className="text-center servicios-main-title">Nuestros Servicios</h2>
        
        {/* Fila 1 */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Diseño, Implementación y Mantenimiento de Data Center, Data Center Moviles</h4>
              <p className="service-text">
                Diseño de centro de datos, racks, gabinetes, sistema eléctrico, sistema de climatización de precisión, sistema de UPS (fuente de alimentación ininterrumpida), sistema de detección y supresión de incendios, sistema de acceso biométrico, seguridad y vigilancia.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Suministro de Servidores, Storage, SAN, NAS, DAS y equipos de Backup</h4>
              <p className="service-text">
                Unidades rack y blade, unidades de almacenamiento en fibra, iSCSI, SAS, FC, NAS, librerías de respaldo en cinta, sistemas de respaldo, respaldo en disco, software de respaldo.
              </p>
            </div>
          </Col>
        </Row>

        {/* Fila 2 */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Implementación de gabinetes climatizados y auto-contenidos, comunicaciones, de datos, eléctricos y bases antisísmicas</h4>
              <p className="service-text">
                Venta e implementación de gabinetes climatizados para equipos de comunicaciones y datos, gabinetes con sistema de protección de incendios.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Suministro de equipos de comunicaciones para redes WAN, LAN, F.O., Wi-Fi, Radio enlaces, Telefonía IP y Videoconferencia</h4>
              <p className="service-text">
                Switches, access point, Router, Firewalls, UTM, Teléfonos IP, teléfonos industriales, radio, sistemas de video conferencia, software y equipos de telefonía.
              </p>
            </div>
          </Col>
        </Row>

        {/* Fila 3 */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Diseño e Implementación de Sistemas de Videovigilancia, Seguridad Electrónica y Cableado de Redes</h4>
              <p className="service-text">
                Cámaras IP y PoE, Cámaras IP PTZ, cámaras IP panorámicas, DVR/NVR, cableado estructurado, fibra óptica, video vigilancia, sistemas de alarmas y videovigilancia.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Venta de Sistemas de Protección Eléctrica (UPS) Industriales, Estabilizadores de Corriente y Grupos Electrógenos</h4>
              <p className="service-text">
                Venta de sistemas de protección de alta, media y baja potencia, estabilizadores, supresores, inversores, transformadores de aislamiento, grupos electrógenos.
              </p>
            </div>
          </Col>
        </Row>

        {/* Fila 4 */}
        <Row className="mb-5 align-items-center">
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Suministro de equipos informáticos industriales, Workstation, Drones, Plotters, GPS, Ruggeds, Impresoras 3D para procesos de construcción e ingeniería</h4>
              <p className="service-text">
                Workstations de escritorio, notebooks y tablets rugged, GPS, plotters, drones, impresoras 3D, equipos para minería, topografía.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <div className="service-card p-4">
              <h4 className="service-title">Ingeniería de redes de datos</h4>
              <p className="service-text">
                Cableado estructurado para redes de datos, voz, video, fibra óptica, Wi-Fi.
              </p>
            </div>
          </Col>
        </Row>

      </Container>
    </div>
  );
}

export default Servicios;