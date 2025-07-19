import { Container, Row, Col, Card } from "react-bootstrap";

function Productos() {
  const products = [
    {
      title: "Laptop Ultraligera Pro",
      description: "Portátil de 14 pulgadas con procesador Intel i7, 16GB RAM y SSD de 512GB. Ideal para profesionales en movimiento.",
    },
    {
      title: "Servidor Empresarial X1",
      description: "Servidor de alto rendimiento con 32GB RAM, 4TB de almacenamiento y procesador Xeon, perfecto para empresas en crecimiento.",
    },
    {
      title: "PC Gaming Titan",
      description: "Computadora gaming con GPU RTX 3080, 32GB RAM y enfriamiento líquido, diseñada para juegos de última generación.",
    },
    {
      title: "Monitor 4K UltraWide",
      description: "Monitor de 34 pulgadas con resolución 4K, ideal para diseño gráfico, edición de video y multitarea.",
    },
    {
      title: "Teclado Mecánico RGB",
      description: "Teclado con interruptores mecánicos personalizables, retroiluminación RGB y diseño ergonómico para largas sesiones.",
    },
    {
      title: "Mouse Inalámbrico Elite",
      description: "Mouse óptico con 16000 DPI, diseño ligero y batería de larga duración, perfecto para gaming y productividad.",
    },
    {
      title: "SSD Externo Rápido",
      description: "Unidad SSD portátil de 1TB con velocidades de transferencia USB-C ultrarrápidas, ideal para backups y movilidad.",
    },
    {
      title: "Auriculares Inmersivos",
      description: "Auriculares con cancelación de ruido, sonido envolvente 7.1 y micrófono retráctil, perfectos para gaming y música.",
    },
    {
      title: "Workstation Z2",
      description: "Estación de trabajo con procesador Ryzen 9, 64GB RAM y GPU profesional, diseñada para renderizado y CAD.",
    },
    {
      title: "Router WiFi 6",
      description: "Router de alta velocidad con tecnología WiFi 6, cobertura amplia y soporte para múltiples dispositivos.",
    },
    {
      title: "Tableta Gráfica Pro",
      description: "Tableta de dibujo con pantalla de 13 pulgadas y lápiz sensible a la presión, ideal para artistas digitales.",
    },
    {
      title: "Cámara Web 1080p",
      description: "Cámara web con resolución Full HD, autofocus y micrófono integrado, perfecta para videollamadas y streaming.",
    },
  ];

  return (
    <Container className="py-4">
      <h2>Productos</h2>
      <p>Explora nuestro catálogo de computadoras, servidores y más.</p>
      {Array.from({ length: Math.ceil(products.length / 4) }).map((_, rowIndex) => (
        <Row key={rowIndex} className="g-4 mb-4">
          {products.slice(rowIndex * 4, rowIndex * 4 + 4).map((product, index) => (
            <Col key={index} xs={12} md={6} lg={3}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}

export default Productos;