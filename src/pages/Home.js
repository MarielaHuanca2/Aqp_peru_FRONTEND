import { useEffect } from 'react';
import './Home.css';

function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-main">
      {/* Primera imagen a pantalla completa */}
      <div className="full-width-image fade-in">
        <img src="/CSC-webinicio-01.jpg" alt="Banner 1" className="banner-image" />
      </div>

      <div className="container">
        {/* Texto y botón */}
        <div className="row align-items-center my-5">
          <div className="col-md-6">
            <h1 className="home-title">Bienvenido a ComputerShops</h1>
            <p className="home-subtitle">
              Tu tienda líder en tecnología, equipos y soluciones empresariales.
              Descubre productos, marcas y servicios de calidad.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <a href="/productos" className="btn btn-primary btn-lg">
              Ver productos
            </a>
          </div>
        </div>
      </div>

      {/* Segunda imagen a pantalla completa */}
      <div className="full-width-image fade-in">
        <img src="/CSC-webinicio-02.jpg" alt="Banner 2" className="banner-image" />
      </div>

      <div className="container">
        {/* Tres columnas */}
        <div className="row text-center mb-5 mt-5">
          <div className="col-md-4 mb-4">
            <img src="/images/service_front.png" alt="Servicios" className="home-card-img" />
            <h4 className="home-section-title">Servicios Empresariales</h4>
            <p>Instalación, mantenimiento y soporte técnico para tu empresa.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/images/sale_front.png" alt="Marcas" className="home-card-img" />
            <h4 className="home-section-title">Las Mejores Marcas</h4>
            <p>Trabajamos con Lenovo, Dell, HP y más líderes del mercado.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/images/price_front.png" alt="Ofertas" className="home-card-img" />
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

