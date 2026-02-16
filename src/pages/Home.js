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
    <div className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <img src="/CSC-webinicio-01.jpg" alt="Banner principal" className="hero__bg" />
        <div className="hero__overlay" />
        <div className="hero__content fade-in">
          <h1 className="hero__title">Bienvenido a ComputerShops</h1>
          <p className="hero__text">
            Tu tienda líder en tecnología, equipos y soluciones empresariales.
            Descubre productos, marcas y servicios de calidad.
          </p>
          <a href="/productos" className="hero__cta">
            Ver productos
            <span className="hero__cta-arrow">→</span>
          </a>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features">
        <div className="features__grid">
          <article className="feature-card fade-in">
            <div className="feature-card__icon-wrap">
              <img src="/images/service_front.png" alt="Servicios" className="feature-card__icon" />
            </div>
            <h3 className="feature-card__title">Servicios Empresariales</h3>
            <p className="feature-card__desc">
              Instalación, mantenimiento y soporte técnico para tu empresa.
            </p>
          </article>

          <article className="feature-card fade-in">
            <div className="feature-card__icon-wrap">
              <img src="/images/sale_front.png" alt="Marcas" className="feature-card__icon" />
            </div>
            <h3 className="feature-card__title">Las Mejores Marcas</h3>
            <p className="feature-card__desc">
              Trabajamos con Lenovo, Dell, HP y más líderes del mercado.
            </p>
          </article>

          <article className="feature-card fade-in">
            <div className="feature-card__icon-wrap">
              <img src="/images/price_front.png" alt="Ofertas" className="feature-card__icon" />
            </div>
            <h3 className="feature-card__title">Ofertas Exclusivas</h3>
            <p className="feature-card__desc">
              Aprovecha descuentos y promociones especiales cada semana.
            </p>
          </article>
        </div>
      </section>

      {/* ── BANNER SECUNDARIO ── */}
      <section className="banner fade-in">
        <img src="/CSC-webinicio-02.jpg" alt="Banner 2" className="banner__img" />
      </section>

      {/* ── WHY US ── */}
      <section className="why-us fade-in">
        <span className="why-us__badge">Confianza &amp; Calidad</span>
        <h2 className="why-us__title">¿Por qué elegirnos?</h2>
        <p className="why-us__text">
          Más de 10 años de experiencia, atención personalizada y garantía
          en todos nuestros productos. ¡Haz crecer tu negocio con nosotros!
        </p>

        <div className="why-us__stats">
          <div className="stat">
            <span className="stat__number">10+</span>
            <span className="stat__label">Años de experiencia</span>
          </div>
          <div className="stat">
            <span className="stat__number">500+</span>
            <span className="stat__label">Clientes satisfechos</span>
          </div>
          <div className="stat">
            <span className="stat__number">100%</span>
            <span className="stat__label">Garantía en productos</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

