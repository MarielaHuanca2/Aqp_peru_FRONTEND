import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import "./SobreNosotros.css";

const SobreNosotros = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <Container>
          <h1 className="text-center main-title">Sobre Nosotros</h1>
        </Container>
      </div>

      <Container className="py-5">
        {/* Sección 1: Quiénes somos */}
        <Row className="mb-5 align-items-center about-section">
          <Col md={6} className="order-2 order-md-1">
            <h2 className="section-title">¿Quiénes somos?</h2>
            <p className="about-text">
              En AQP Peru Data, somos una empresa líder en el sector de computadoras, servidores y soluciones tecnológicas para empresas. Con más de 10 años de experiencia, brindamos productos de alta calidad y un servicio personalizado para cada cliente.
            </p>
          </Col>
          <Col md={6} className="order-1 order-md-2 mb-4 mb-md-0">
            <Image
              src="/grupo_tra.png"
              alt="Nuestro equipo"
              fluid
              rounded
              className="about-image shadow-lg"
            />
          </Col>
        </Row>
      </Container>
      
      {/* Sección 2: Misión y Visión (con nuevo estilo) */}
      <div className="mission-vision-section py-5">
        <Container>
          <h2 className="text-center section-title-light mb-5">Mision y Vision</h2>
          <Row>
            <Col md={6}>
              <Card className="mission-vision-card shadow-lg mb-4 h-100">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <Image
                    src="/Mision.png"
                    alt="Misión"
                    className="mission-vision-image"
                  />
                  <Card.Title className="mission-title">Nuestra Misión</Card.Title>
                  <Card.Text className="card-text-justify">
                    Brindar soluciones tecnológicas especializadas y de alta calidad en venta de equipos para Datacenter y Mantenimiento Informático, garantizando eficiencia, seguridad y satisfacción del cliente mediante procesos rápidos y equipos profesionales de la empresa.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="mission-vision-card shadow-lg mb-4 h-100">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <Image
                    src="/Vision.png"
                    alt="Visión"
                    className="mission-vision-image"
                  />
                  <Card.Title className="vision-title">Nuestra Visión</Card.Title>
                  <Card.Text className="card-text-justify">
                    Ser referentes en el Sur del Perú en el suministro y soporte de tecnología para Datacenter, reconocidos por la confiabilidad de nuestros servicios, la mejora continua y el cumplimiento de estándares internacionales de calidad y seguridad.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Sección de Valores */}
      <div className="valores-section py-5">
        <Container>
          <h2 className="text-center section-title-light mb-4">Nuestros Valores</h2>
          <Row className="justify-content-center">
            <Col md={10}>
              <ul className="valores-list">
                <li><i className="bi bi-check-circle me-2"></i>Compromiso con el cliente</li>
                <li><i className="bi bi-check-circle me-2"></i>Innovación constante</li>
                <li><i className="bi bi-check-circle me-2"></i>Integridad y ética profesional</li>
                <li><i className="bi bi-check-circle me-2"></i>Trabajo en equipo</li>
                <li><i className="bi bi-check-circle me-2"></i>Mejora continua</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        {/* Sección de Políticas Corporativas */}
        <Row className="about-section">
          <Col>
            <h2 className="section-title">Políticas Corporativas</h2>
            <p className="policy-intro">
              AQP Peru Data, empresa peruana dedicada a brindar servicios tecnológicos e infraestructura tecnológica, bajo lineamientos que garanticen la calidad del servicio, la seguridad y salud ocupacional de los trabajadores, clientes, contratistas y demás partes interesadas se compromete a:
            </p>
            <ol className="policy-list">
              <li>
                <strong className="policy-item-title">Política de Calidad (ISO 9001:2015):</strong> Implementar y mantener un sistema de gestión orientado a la mejora continua, cumplimiento de requisitos del cliente y optimización de procesos.
              </li>
              <li>
                <strong className="policy-item-title">Política de Atención al Cliente:</strong> Mantener canales efectivos de comunicación, atención oportuna a consultas y reclamos, y asegurar una experiencia positiva.
              </li>
              <li>
                <strong className="policy-item-title">Política de Soporte Técnico y Mantenimiento:</strong> Garantizar la entrega puntual y el correcto funcionamiento de los equipos, estableciendo procesos de control y seguimiento para los servicios en los plazos acordados.
              </li>
              <li>
                <strong className="policy-item-title">Política de Relaciones con Proveedores:</strong> Seleccionar y trabajar con proveedores confiables que cumplan con estándares de calidad y tiempos de entrega.
              </li>
              <li>
                <strong className="policy-item-title">Política de Innovación y Actualización Tecnológica:</strong> Fomentar la capacitación continua del personal y la actualización constante de los portafolios de productos y servicios.
              </li>
              <li>
                <strong className="policy-item-title">Política de Ética y Responsabilidad Social:</strong> Desarrollar operaciones con integridad, transparencia y compromiso con el entorno social y ambiental, alineándose a los valores corporativos y las mejores prácticas.
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SobreNosotros;