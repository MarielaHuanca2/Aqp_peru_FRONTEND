import { Container, Row, Col, Card } from "react-bootstrap";

function Marcas() {
  const proveedores = ["Grupo Deltron", "Ingram Micro", "Adister"];
const marcasDistribuidas = [
  { nombre: "DELL", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/640px-Dell_Logo.svg.png" },
  { nombre: "Lenovo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Lenovo_%282015%29.svg/640px-Lenovo_%282015%29.svg.png" },
  { nombre: "HP", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/HP_logo_1979.svg/640px-HP_logo_1979.svg.png" },
  { nombre: "HPE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/HPE-logo-2025.png/640px-HPE-logo-2025.png" },
  { nombre: "Cisco", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/640px-Cisco_logo_blue_2016.svg.png" },
  { nombre: "Extreme Networks", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Logo_of_Extreme_Networks%2C_Inc._%28old%29.svg/640px-Logo_of_Extreme_Networks%2C_Inc._%28old%29.svg.png" },
  { nombre: "Fortinet", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/640px-Fortinet_logo.svg.png" },
  { nombre: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/640px-Microsoft_logo_%282012%29.svg.png" },
  { nombre: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/320px-Samsung_Logo.svg.png" },
  { nombre: "Qnap", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Qnap_Logo_2004.svg/640px-Qnap_Logo_2004.svg.png" },
  { nombre: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/640px-Intel_logo_%282006-2020%29.svg.png" },
  { nombre: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/AMD_logo_pre-2013.svg/640px-AMD_logo_pre-2013.svg.png" },
  { nombre: "Kingston", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87_Kingston_WhiteHead_Black.png/640px-%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87_Kingston_WhiteHead_Black.png" },
  { nombre: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/LG_logo_%282014%2C_3D%29.svg/640px-LG_logo_%282014%2C_3D%29.svg.png" },
  { nombre: "APC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/LogoAPC.svg/640px-LogoAPC.svg.png" },
  { nombre: "EPSON", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/EPSON-Logo.svg/640px-EPSON-Logo.svg.png" },
  { nombre: "Dynabook", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Dynabook_Logo.svg/640px-Dynabook_Logo.svg.png" }
];


  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Marcas y Proveedores</h2>
      <p className="text-center">
        En ComputerShops trabajamos con los mejores proveedores y distribuimos marcas líderes a nivel mundial.
        Ofrecemos productos originales, soporte técnico y garantía de fábrica.
      </p>

      {/* Sección de proveedores */}
      <section className="mt-5">
        <h4 className="mb-3">Proveedores autorizados</h4>
        <ul>
          {proveedores.map((prov, idx) => (
            <li key={idx}>{prov}</li>
          ))}
        </ul>
      </section>

      {/* Sección de marcas */}
      <section className="mt-5">
        <h4 className="mb-4">Marcas que distribuimos</h4>
        <Row>
          {marcasDistribuidas.map((marca, idx) => (
            <Col key={idx} xs={6} sm={4} md={3} lg={2} className="mb-4 d-flex justify-content-center">
              <Card className="p-3 border-0 shadow-sm" style={{ width: '100%', textAlign: 'center' }}>
                <Card.Img
                  variant="top"
                  src={marca.logo}
                  alt={marca.nombre}
                  style={{ height: "60px", objectFit: "contain", marginBottom: "10px" }}
                />
                <Card.Text style={{ fontSize: "0.9rem", fontWeight: "500" }}>
                  {marca.nombre}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <p className="mt-5 text-center">
        ¡Explora nuestras marcas y descubre la tecnología que se adapta a tus necesidades!
      </p>
    </Container>
  );
}

export default Marcas;

