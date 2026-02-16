import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return (
    <footer className="ft">
      {/* ── MAIN GRID ── */}
      <div className="ft__inner">
        {/* Brand column */}
        <div className="ft__col ft__brand">
          <Link to="/" className="ft__logo">
            <img src="/logo_nuevo.png" alt="ComputerShops" />
          </Link>
          <p className="ft__tagline">
            Tu tienda líder en tecnología, equipos y soluciones empresariales en Arequipa.
          </p>
          <div className="ft__social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick links */}
        <div className="ft__col">
          <h4 className="ft__heading">Navegación</h4>
          <ul className="ft__list">
            {["Productos", "Marcas", "Servicios", "Experiencia", "Ofertas"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase()}`}>{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div className="ft__col">
          <h4 className="ft__heading">Preguntas Frecuentes</h4>
          <ul className="ft__list">
            <li><Link to="/faq#envios">¿Realizan envíos a provincias?</Link></li>
            <li><Link to="/faq#pagos">¿Qué métodos de pago aceptan?</Link></li>
            <li><Link to="/faq#garantia">¿Los productos tienen garantía?</Link></li>
            <li><Link to="/faq#devoluciones">¿Cómo hago una devolución?</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="ft__col">
          <h4 className="ft__heading">Contacto</h4>
          <ul className="ft__contact">
            <li>
              <FaPhoneAlt className="ft__contact-icon" />
              <span>+51 958 952 138</span>
            </li>
            <li>
              <FaEnvelope className="ft__contact-icon" />
              <span>ventas@computershops.pe</span>
            </li>
            <li>
              <FaMapMarkerAlt className="ft__contact-icon" />
              <span>Av. Venezuela Mza. B Lote 14, Urb. Ampliación La Negrita, Arequipa</span>
            </li>
            <li>
              <FaClock className="ft__contact-icon" />
              <div>
                <span>Lun – Vie: 8:00 am – 6:00 pm</span><br />
                <span>Sáb: 9:00 am – 1:00 pm</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="ft__bottom">
        <small>&copy; {new Date().getFullYear()} ComputerShops. Todos los derechos reservados.</small>
        <div className="ft__legal">
          <Link to="/terminos">Términos y Condiciones</Link>
          <span className="ft__dot" />
          <Link to="/reclamaciones">Libro de Reclamaciones</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

