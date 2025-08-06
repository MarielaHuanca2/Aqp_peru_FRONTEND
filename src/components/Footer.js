import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-section">
          <h5>Contacto</h5>
          <p><strong>Teléfono:</strong> +51 123 456 7890</p>
          <p><strong>Email:</strong> ventas@computershops.pe</p>
          <p><strong>Dirección:</strong> Av. Venezuela Mza. B Lote 14 Urb. Ampliación La Negrita – Arequipa – Arequipa – Arequipa</p>
          <p><strong>Horarios de atención:</strong></p>
        </div>

        <div className="footer-section">
          <h5>Enlaces útiles</h5>
          <ul>
            {["Productos", "Marcas", "Servicios", "Experiencia", "Ofertas"].map((item) => (
              <li key={item}>
                <a href={`/${item.toLowerCase()}`}>{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h5>Preguntas Frecuentes</h5>
          <ul>
            <li><Link to="/faq#envios">¿Realizan envíos a provincias?</Link></li>
            <li><Link to="/faq#pagos">¿Qué métodos de pago aceptan?</Link></li>
            <li><Link to="/faq#garantia">¿Los productos tienen garantía?</Link></li>
            <li><Link to="/faq#devoluciones">¿Cómo hago una devolución?</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Síguenos</h5>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
          </div>
          <h5>Horario</h5>
          <p>Lunes a Sábado: 9:00am - 8:00pm</p>
          <p>Domingo: 10:00am - 6:00pm</p>
        </div>
      </div>

      <div className="footer-bottom full-width-dark" width="100%">
        <div className="footer-legal">
          <small>&copy; 2025 ComputerShops. Todos los derechos reservados.</small>
          <div className="legal-links">
            <Link to="/terminos">Términos y Condiciones</Link>
            <span> | </span>
            <Link to="/reclamaciones">Libro de Reclamaciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

