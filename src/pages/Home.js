function Home() {
  return (
    <div className="home-main" style={{ background: "#f4f6fa", minHeight: "80vh", padding: "40px 0" }}>
      <div className="container">
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <h1 style={{ fontWeight: "bold", fontSize: "3rem", color: "#4682B4" }}>
              Bienvenido a ComputerShops
            </h1>
            <p style={{ fontSize: "1.3rem", color: "#333" }}>
              Tu tienda líder en tecnología, equipos y soluciones empresariales. Descubre productos, marcas y servicios de calidad.
            </p>
            <a href="/productos" className="btn btn-primary btn-lg mt-3">
              Ver productos
            </a>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="/images/hero.jpg"
              alt="Tienda ComputerShops"
              style={{ maxWidth: "100%", borderRadius: "20px", boxShadow: "0 8px 32px rgba(70,130,180,0.15)" }}
            />
          </div>
        </div>
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-4">
            <img src="/images/servicio.png" alt="Servicios" style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }} />
            <h4 style={{ color: "#4682B4" }}>Servicios Empresariales</h4>
            <p>Instalación, mantenimiento y soporte técnico para tu empresa.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/images/brand.png" alt="Marcas" style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }} />
            <h4 style={{ color: "#4682B4" }}>Las Mejores Marcas</h4>
            <p>Trabajamos con Apple, Dell, HP y más líderes del mercado.</p>
          </div>
          <div className="col-md-4 mb-4">
            <img src="/images/sales.jpg" alt="Ofertas" style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }} />
            <h4 style={{ color: "#4682B4" }}>Ofertas Exclusivas</h4>
            <p>Aprovecha descuentos y promociones especiales cada semana.</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 style={{ fontWeight: "bold", color: "#222" }}>¿Por qué elegirnos?</h2>
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              Más de 10 años de experiencia, atención personalizada y garantía en todos nuestros productos. ¡Haz crecer tu negocio con nosotros!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
