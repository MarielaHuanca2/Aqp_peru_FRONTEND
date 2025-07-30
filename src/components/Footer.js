// src/components/Footer.jsx
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 border-top elegant-footer">
      <div className="container">
        <div className="row text-start">
          {/* Información de contacto */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contacto</h5>
            <p className="mb-1">
              <strong>Teléfono:</strong> +51 123 456 7890
            </p>
            <p className="mb-1">
              <strong>Email:</strong> contacto@computershops.com
            </p>
            <p className="mb-0">
              <strong>Dirección:</strong> Arequipa, Perú
            </p>
          </div>

          {/* Enlaces útiles */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Enlaces útiles</h5>
            <ul className="list-unstyled">
              {["Productos", "Marcas", "Servicios", "Experiencia", "Ofertas"].map((text) => (
                <li key={text}>
                  <a
                    href={`/${text.toLowerCase()}`}
                    className="text-light text-decoration-none footer-link"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales y horario */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Síguenos</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="https://facebook.com" className="footer-icon">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" className="footer-icon">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" className="footer-icon">
                <FaTwitter />
              </a>
            </div>
            <h5 className="fw-bold mb-2">Horario</h5>
            <p className="mb-1">Lunes a Sábado: 9:00am - 8:00pm</p>
            <p className="mb-0">Domingo: 10:00am - 6:00pm</p>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center">
          <small className="text-muted">
            &copy; 2025 frontend_computer. Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
