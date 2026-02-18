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
              En AQP-Peru Data brindamos soluciones integrales en tecnología de la información para organizaciones del sector público y privado. Contamos con experiencia comprobada en venta de equipos, infraestructura para datacenters y servicios de soporte técnico, siempre orientados a la calidad y la satisfacción del cliente.
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
          <h2 className="text-center section-title-light mb-5">Misión y Visión</h2>
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
                    Estar comprometidos en ser el socio tecnológico preferido de nuestros clientes, buscando satisfacer sus necesidades, brindando servicios de calidad en las oportunidades y por el medio del talento humano de nuestro personal capacitado.
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
                    Ser reconocidos como lideres en el Mercado de Servicios y Comercialización de infraestructura informática, destacándonos por la calidad y ética en nuestro trabajo.
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

      {/* Sección Historia */}
      <div className="history-section py-5 bg-light">
        <Container>
          <h2 className="text-center section-title mb-4">Nuestra Historia</h2>
          <Row className="justify-content-center">
            <Col md={10}>
              <p className="about-text">
                En febrero del año 2007 surge la empresa AQP-Peru Data con la finalidad de brindar servicio en las diferentes ramas de tecnología de la información, ofreciendo soluciones integrales a empresas del sector público y privado.
              </p>
              <p className="about-text">
                Con nuestro compromiso de mejora continua, en el año 2024 AQP-Peru Data logró obtener las certificaciones <strong>ISO 9001:2015</strong> (Gestión de Calidad) e <strong>ISO 45001:2018</strong> (Gestión de la Seguridad y Salud en el Trabajo), lo que nos permitió mejorar tanto la calidad de nuestros productos y servicios, como la seguridad y salud de nuestros colaboradores.
              </p>
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
              AQP PERU DATA S.R.L., empresa peruana dedicada a brindar servicios tecnológicos e infraestructura tecnológica, bajo lineamientos que garanticen la calidad del servicio, la seguridad y salud ocupacional de los trabajadores, clientes, contratistas y demás partes interesadas, se compromete a:
            </p>
            <ol className="policy-list">
              <li>
                Proporcionar condiciones de trabajo seguras y saludables para la prevención de lesiones y deterioro de la salud relacionados con el trabajo y que sean apropiadas al propósito, tamaño y contexto de la organización y a la naturaleza específica de sus riesgos para la SST y sus oportunidades para la SST.
              </li>
              <li>
                Proteger la seguridad y salud de todos los miembros de la organización mediante la prevención de lesiones, dolencias, enfermedades e incidentes relacionados con el trabajo.
              </li>
              <li>
                Eliminar los peligros y reducir los riesgos para la SST.
              </li>
              <li>
                Sensibilizar, capacitar y entrenar a nuestro personal administrativo y operativo en:
                <ol type="a">
                  <li>El desempeño de las actividades laborales</li>
                  <li>Seguridad y salud en el trabajo</li>
                </ol>
              </li>
              <li>
                Cumplir con los requisitos legales y aplicables y otros requisitos relacionados a nuestras actividades, los programas voluntarios, de la negociación colectiva en seguridad y salud en el trabajo, y de otras prescripciones que suscribimos.
              </li>
              <li>
                Fomentar la participación y consulta de los trabajadores haciendo énfasis en los temas de seguridad y salud ocupacional.
              </li>
              <li>
                Mejorar continuamente el desempeño y eficacia del sistema de gestión de calidad y seguridad y salud controlando adecuadamente nuestros procesos.
              </li>
              <li>
                Mejorar la satisfacción del cliente enfocándonos en sus necesidades.
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SobreNosotros;