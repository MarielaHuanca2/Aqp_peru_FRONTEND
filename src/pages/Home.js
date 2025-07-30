import './Home.css';
function Home() {
  return (
    <div className="home-main">
      <div className="container">
        {/* Hero */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h1 className="home-title">Bienvenido a ComputerShops</h1>
            <p className="home-subtitle">
              Tu tienda líder en tecnología, equipos y soluciones empresariales.
              Descubre productos, marcas y servicios de calidad.
            </p>
            <a href="/productos" className="btn btn-primary btn-lg mt-3">
              Ver productos
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/images/hero.jpg"
              alt="Tienda ComputerShops"
              className="home-hero-image"
            />
          </div>
        </div>

        {/* Tres columnas */}
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-4">
            <img src="/images/servicio.png" alt="Servicios" className="home-card-img" />
            <h4 className="home-section-title">Servicios Empresariales</h4>
            <p>Instalación, mantenimiento y soporte técnico para tu empresa.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/images/brand.png" alt="Marcas" className="home-card-img" />
            <h4 className="home-section-title">Las Mejores Marcas</h4>
            <p>Trabajamos con Apple, Dell, HP y más líderes del mercado.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/images/sales.jpg" alt="Ofertas" className="home-card-img" />
            <h4 className="home-section-title">Ofertas Exclusivas</h4>
            <p>Aprovecha descuentos y promociones especiales cada semana.</p>
          </div>
        </div>

        {/* Sección final */}
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="home-benefits-title">¿Por qué elegirnos?</h2>
            <p className="home-benefits-text">
              Más de 10 años de experiencia, atención personalizada y garantía
              en todos nuestros productos. ¡Haz crecer tu negocio con nosotros!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
