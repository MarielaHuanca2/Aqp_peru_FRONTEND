import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const SobreNosotros = () => {
  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center mb-4">Sobre Nosotros</h1>

      {/* Sección 1: Quiénes somos */}
      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <h3>¿Quiénes somos?</h3>
          <p>
            En <strong>ComputerShops</strong>, somos una empresa líder en el sector de computadoras, servidores y soluciones tecnológicas para empresas. Con más de 10 años de experiencia, brindamos productos de alta calidad y un servicio personalizado para cada cliente.
          </p>
        </Col>
        <Col md={6}>
          <Image
            src="/imagenes/equipo_trabajo.jpg"
            alt="Nuestro equipo"
            fluid
            rounded
          />
        </Col>
      </Row>

      {/* Sección 2: Misión y Visión */}
      <Row className="mb-5">
        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Misión</Card.Title>
              <Card.Text>
                Proporcionar a empresas soluciones tecnológicas de alto rendimiento, con un enfoque en confiabilidad, soporte técnico y crecimiento sostenible.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>Visión</Card.Title>
              <Card.Text>
                Ser referentes en el sector tecnológico B2B en Latinoamérica, ofreciendo innovación, calidad y compromiso con nuestros clientes.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sección 3: Certificaciones ISO */}
      <Row className="mb-5">
        <Col md={6}>
          <h4>Certificación ISO 9001</h4>
          <p>
            Nuestra empresa cumple con los estándares de calidad establecidos por la norma ISO 9001. Esto garantiza procesos eficientes y servicios confiables.
          </p>
          <Image
            src="./images/9001.jpg"
            alt="Certificación ISO 9001"
            fluid
            rounded
          />
        </Col>
        <Col md={6}>
          <h4>Certificación ISO 27001</h4>
          <p>
            También estamos certificados con la norma ISO 27001 en seguridad de la información, protegiendo los datos de nuestros clientes con las mejores prácticas del sector.
          </p>
          <Image
            src="./images/45001.2018.jpg"
            alt="Certificación ISO 27001"
            fluid
            rounded
          />
        </Col>
      </Row>

      {/* Sección 4: Valores */}
      <Row className="mb-5">
        <Col>
          <h3>Nuestros Valores</h3>
          <ul>
            <li>✔ Compromiso con el cliente</li>
            <li>✔ Innovación constante</li>
            <li>✔ Integridad y ética profesional</li>
            <li>✔ Trabajo en equipo</li>
            <li>✔ Mejora continua</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreNosotros;
