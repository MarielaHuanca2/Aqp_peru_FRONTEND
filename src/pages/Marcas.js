import { Container, Row, Col } from "react-bootstrap";

function Marcas() {
  // Arreglo de imágenes de marcas
  const brandImages = [
    "/dell_logo.png",
    "/lenovo_logo.png",
    "/hp_logo.png",
    "/cisco_logo.png",
  ];

  return (
    <Container className="py-4">
      <h2>Marcas</h2>
      <p>
        Esta es la página de marcas. Aquí podrás explorar las mejores marcas de tecnología disponibles en ComputerShops.
      </p>

      <Row className="mt-4">
        {Array.from({ length: 16 }).map((_, index) => {
          const imageSrc = brandImages[index % brandImages.length];
          return (
            <Col key={index} xs={12} sm={6} md={3} className="mb-4">
              <div
                style={{
                  backgroundColor: "#fff",
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              >
                <img
                  src={imageSrc}
                  alt={`Marca ${index + 1}`}
                  style={{ maxWidth: "100%", height: "80px", objectFit: "contain" }}
                />
              </div>
            </Col>
          );
        })}
      </Row>

      <p className="mt-5">
        En ComputerShops trabajamos constantemente para ofrecerte las mejores marcas del mercado, con productos de alta calidad
        y el respaldo de años de experiencia en tecnología. ¡Descubre lo mejor con nosotros!
      </p>
    </Container>
  );
}

export default Marcas;

