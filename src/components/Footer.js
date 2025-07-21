function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top">
      <div className="container">
        <div className="row text-start">
          {/* Información de contacto */}
          <div className="col-md-4 mb-4">
            <h5>Contacto</h5>
            <p>
              <strong>Teléfono:</strong> +51 123 456 7890
              <br />
              <strong>Email:</strong> contacto@computershops.com
              <br />
              <strong>Dirección:</strong> Arequipa, Perú
            </p>
          </div>
          {/* Enlaces útiles */}
          <div className="col-md-4 mb-4">
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/productos"
                  className="text-light text-decoration-none"
                >
                  Productos
                </a>
              </li>
              <li>
                <a
                  href="/marcas"
                  className="text-light text-decoration-none"
                >
                  Marcas
                </a>
              </li>
              <li>
                <a
                  href="/servicios"
                  className="text-light text-decoration-none"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="/experiencia"
                  className="text-light text-decoration-none"
                >
                  Experiencia
                </a>
              </li>
              <li>
                <a
                  href="/ofertas"
                  className="text-light text-decoration-none"
                >
                  Ofertas
                </a>
              </li>
            </ul>
          </div>
          {/* Redes sociales y horario */}
          <div className="col-md-4 mb-4">
            <h5>Síguenos</h5>
            <a
              href="https://facebook.com"
              className="me-2 text-light text-decoration-none"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              className="me-2 text-light text-decoration-none"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              className="text-light text-decoration-none"
            >
              Twitter
            </a>
            <h5 className="mt-4">Horario</h5>
            <p>
              Lunes a Sábado: 9:00am - 8:00pm
              <br />
              Domingo: 10:00am - 6:00pm
            </p>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center">
          <small>
            &copy; 2025 frontend_computer. Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
