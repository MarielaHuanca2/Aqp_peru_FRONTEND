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
            En <strong>ComputerShops</strong>, somos una empresa líder en el
            sector de computadoras, servidores y soluciones tecnológicas para
            empresas. Con más de 10 años de experiencia, brindamos productos de
            alta calidad y un servicio personalizado para cada cliente.
          </p>
        </Col>
        <Col md={6}>
          <Image
            src="/grupo_trabajo.png"
            alt="Nuestro equipo"
            fluid
            rounded
          />
        </Col>
      </Row>

  {/* Sección 2: Misión y Visión */}
<Row className="mb-5">
  <Col md={6} className="d-flex flex-column align-items-center">
    <div className="text-center mb-3 w-100">
      <img
        src="/Vision.png"
        alt="Visión"
        className="img-fluid rounded shadow"
        style={{ maxHeight: "225px", width: "auto", objectFit: "cover" }}
      />
    </div>
    <Card className="h-100 shadow w-100">
      <Card.Body>
        <Card.Title className="text-center text-primary">VISIÓN</Card.Title>
        <Card.Text
          style={{
            columnCount: 1,
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          Ser referentes en el Sur del Perú en el suministro y soporte de
          tecnología para Datacenter, reconocidos por la confiabilidad de
          nuestros servicios, la mejora continua y el cumplimiento de estándares
          internacionales de calidad y seguridad.
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>

  <Col md={6} className="d-flex flex-column align-items-center">
    <div className="text-center mb-3 w-100">
      <img
        src="/Mision.png"
        alt="Misión"
        className="img-fluid rounded shadow"
        style={{ maxHeight: "225px", width: "auto", objectFit: "cover" }}
      />
    </div>
    <Card className="h-100 shadow w-100 bg-light">
      <Card.Body>
        <Card.Title className="text-center text-primary">MISIÓN</Card.Title>
        <Card.Text
          style={{
            columnCount: 1,
            textAlign: "justify",
            lineHeight: "1.6",
          }}
        >
          Brindar soluciones tecnológicas especializadas y de alta calidad en
          venta de equipos para Datacenter y Mantenimiento Informático,
          garantizando eficiencia, seguridad y satisfacción del cliente mediante
          procesos rápidos y equipos profesionales de la empresa.
        </Card.Text>
      </Card.Body>
    </Card>
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

      {/* Sección 5: Políticas */}
      <Row className="mb-5">
        <Col>
          <h3>Políticas Corporativas</h3>
          <p style={{ textAlign: "justify" }}>
            <strong>COMPUTER SHOP’S CORPORATION S.R.L.</strong>, empresa peruana
            dedicada a brindar servicios tecnológicos e infraestructura
            tecnológica, bajo lineamientos que garanticen la calidad del
            servicio, la seguridad y salud ocupacional de los trabajadores,
            clientes, contratistas y demás partes interesadas se compromete a:
          </p>
          <ol style={{ textAlign: "justify", lineHeight: "1.6" }}>
            <li>
              <strong>Política de Calidad (ISO 9001:2015):</strong> Implementar y
              mantener un sistema de gestión orientado a la mejora continua,
              cumplimiento de requisitos del cliente y optimización de procesos.
              Garantizar la trazabilidad y calidad en la entrega de productos,
              reduciendo errores y fortaleciendo la confianza en cada venta o
              servicio.
            </li>
            <li>
              <strong>Política de Atención al Cliente:</strong> Mantener canales
              efectivos de comunicación, atención oportuna a consultas y
              reclamos, y asegurar una experiencia positiva antes, durante y
              después de la venta o servicio.
            </li>
            <li>
              <strong>Política de Soporte Técnico y Mantenimiento:</strong>{" "}
              Garantizar la entrega puntual y el correcto funcionamiento de los
              equipos, estableciendo procesos de control y seguimiento para los
              servicios de mantenimiento y atención a datacenters en los plazos
              acordados.
            </li>
            <li>
              <strong>Política de Relaciones con Proveedores:</strong> Seleccionar
              y trabajar con proveedores confiables que cumplan con estándares de
              calidad y tiempos de entrega. Realizar evaluaciones periódicas de
              desempeño para asegurar óptimos resultados en la cadena de
              suministro.
            </li>
            <li>
              <strong>Política de Innovación y Actualización Tecnológica:</strong>{" "}
              Fomentar la capacitación continua del personal y la actualización
              constante de los portafolios de productos y servicios, anticipándose
              a las tendencias tecnológicas y demandas del mercado.
            </li>
            <li>
              <strong>Política de Ética y Responsabilidad Social:</strong>{" "}
              Desarrollar operaciones con integridad, transparencia y compromiso
              con el entorno social y ambiental, alineándose a los valores
              corporativos y las mejores prácticas del sector.
            </li>
          </ol>
        </Col>
      </Row>
    </Container>
  );
};

export default SobreNosotros;

