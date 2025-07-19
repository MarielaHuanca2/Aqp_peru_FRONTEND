import { Container, Row, Col } from "react-bootstrap";

function Marcas() {
  return (
    <Container className="py-4">
      <h2>Marcas</h2>
      <p>
        Esta es la página de marcas. Aquí podrás explorar las mejores marcas de tecnología disponibles en ComputerShops.
      </p>

      <Row className="mt-4">
        {Array.from({ length: 16 }).map((_, index) => (
          <Col key={index} xs={12} sm={6} md={3} className="mb-4">
            <div
              style={{
                backgroundColor: "#e0e0e0",
                textAlign: "center",
                padding: "50px 0",
                borderRadius: "8px",
                fontWeight: "bold",
              }}
            >
              image
            </div>
          </Col>
        ))}
      </Row>

      <p className="mt-5">
        En ComputerShops trabajamos constantemente para ofrecerte las mejores marcas del mercado, con productos de alta calidad
        y el respaldo de años de experiencia en tecnología. ¡Descubre lo mejor con nosotros!
      </p>
    </Container>
  );
}

export default Marcas;

