import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Terminos.css";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const TerminosPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="terms-page">
      <div className="terms-header">
        <Container>
          <h1 className="text-center main-title">Términos y Condiciones</h1>
          <p className="text-center header-subtitle">AQP-PERU DATA S.R.L.</p>
        </Container>
      </div>

      <Container className="py-5">
        <p className="intro-text">
          Bienvenidos a la página web de <strong>AQP-PERU DATA S.R.L.</strong> (en adelante, “La Empresa” o “nosotros”), con RUC <strong>20454459416</strong>, domiciliada en Calle Villafuerte 306, Miraflores. Al acceder y utilizar nuestro sitio web, usted (en adelante, “el Usuario”) acepta cumplir con los siguientes Términos y Condiciones de uso. Si no está de acuerdo con estos términos, por favor, no utilice nuestro sitio web.
        </p>

        <section className="terms-section">
          <h5 className="section-title">1. Objeto del Sitio Web</h5>
          <p>
            El presente sitio tiene como finalidad principal la exhibición, promoción y venta de equipos informáticos (hardware, software y accesorios), así como la oferta de servicios de mantenimiento y soporte técnico relacionados.
          </p>
        </section>

        <section className="terms-section">
          <h5 className="section-title">2. Aceptación de los Términos</h5>
          <p>
            El acceso, navegación y uso del sitio web, así como la adquisición de productos o servicios ofrecidos, implica la aceptación plena e incondicional de estos Términos y Condiciones, así como nuestra Política de Privacidad. La Empresa se reserva el derecho de modificar estos términos en cualquier momento, siendo responsabilidad del Usuario revisarlos periódicamente.
          </p>
        </section>

        <section className="terms-section">
          <h5 className="section-title">3. Registro del Usuario</h5>
          <ul className="terms-list">
            <li>3.1. Algunos servicios o funcionalidades del sitio requieren un registro previo. El Usuario declara que la información proporcionada durante el registro es veraz, completa y actualizada.</li>
            <li>3.2. El Usuario es responsable exclusivo de mantener confidencialidad de su contraseña y de todas las actividades realizadas desde su cuenta. La Empresa no será responsable por accesos no autorizados a la cuenta del Usuario, salvo que se deban a negligencia propia.</li>
            <li>3.3. La Empresa se reserva el derecho de rechazar o cancelar registros, sin necesidad de justificación y sin que ello genere derecho a indemnización.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">4. Productos y Servicios</h5>
          <ul className="terms-list">
            <li><strong>4.1 Descripciones:</strong> Nos esforzamos en brindar descripciones precisas. No obstante, pueden existir variaciones mínimas entre las imágenes y los productos reales. En caso de discrepancias significativas, el Usuario podrá ejercer su derecho de reclamo conforme a la legislación vigente.</li>
            <li><strong>4.2 Disponibilidad:</strong> Todos los productos están sujetos a disponibilidad de stock. Si el producto solicitado no se encuentra disponible tras la compra, se informará al Usuario y se ofrecerá una alternativa o reembolso correspondiente.</li>
            <li><strong>4.3 Precios:</strong> Los precios están expresados en soles (S/.) e incluyen el IGV, salvo que indique lo contrario. La Empresa se reserva el derecho de modificar precios sin previo aviso. No obstante, el precio aplicable será el vigente al momento de confirmarse la compra.</li>
            <li><strong>4.4 Servicios de Mantenimiento:</strong> Las condiciones específicas para estos servicios (diagnóstico, reparación, garantías, etc.) se detallarán en una proforma, presupuesto o contrato independiente, que deberá ser aceptado por el Usuario antes de su ejecución.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">5. Proceso de Compra y Pago</h5>
          <ul className="terms-list">
            <li><strong>5.1 Cesta de Compra:</strong> El Usuario podrá seleccionar los productos y agregarlos a su cesta.</li>
            <li><strong>5.2 Confirmación del Pedido:</strong> Tras revisar el pedido, el Usuario deberá confirmarlo y efectuar el pago. La Empresa validará la disponibilidad y el pago antes de confirmar el pedido.</li>
            <li><strong>5.3 Comprobantes de Pago:</strong> Se emitirán facturas o boletas electrónicas según la información proporcionada por el Usuario, quien es responsable de su veracidad.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">6. Envíos y Entregas</h5>
          <ul className="terms-list">
            <li><strong>6.1 Cobertura:</strong> Realizamos envíos a todo el Perú.</li>
            <li><strong>6.2 Plazos de Entrega:</strong> Los plazos son referenciales y dependen de diversos factores (stock, ubicación, feriados). El plazo estimado se informará durante la compra.</li>
            <li><strong>6.3 Recepción del Pedido:</strong> La entrega se realiza en la dirección indicada por el Usuario. Esta persona o la persona autorizada debe revisar el estado del paquete al recibirlo y reportar inmediatamente cualquier incidencia.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">7. Cambios, Devoluciones y Garantías</h5>
          <ul className="terms-list">
            <li><strong>7.1 Cambios/Devoluciones por fallas:</strong> Se aceptan cambios o devoluciones solo por fallas de fábrica o productos erróneos. El Usuario debe notificarlo en un plazo máximo de 7 días calendario tras la recepción. El producto debe conservar su empaque original y todos sus accesorios.</li>
            <li><strong>7.2 Garantía de Productos:</strong> Se aplicará la garantía del fabricante. AQP-PERU DATA S.R.L. actuará como intermediario ante el proveedor o mayorista. Los términos específicos figurarán en la ficha del producto o comprobante de compra.</li>
            <li><strong>7.3 Garantía de Servicios:</strong> Los servicios de mantenimiento tienen una garantía de 30 días calendario sobre el trabajo realizado y sus componentes, salvo que se indique lo contrario en el presupuesto o contrato.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">8. Propiedad Intelectual</h5>
          <p>
            Todos los contenidos del sitio (textos, imágenes, logotipos, video, software, etc.) son de propiedad de AQP-PERU DATA S.R.L. o de sus respectivos titulares y están protegidos por la normativa sobre propiedad intelectual. Su uso no autorizado está estrictamente prohibido.
          </p>
        </section>

        <section className="terms-section">
          <h5 className="section-title">9. Protección de Datos Personales</h5>
          <p>
            El tratamiento de los datos personales del Usuario se rige por nuestra Política de Privacidad, disponible en un apartado específico del sitio. Al utilizar este sitio, el Usuario acepta dicha política.
          </p>
        </section>

        <section className="terms-section">
          <h5 className="section-title">10. Uso prohibido del Sitio Web</h5>
          <p>El Usuario se compromete a no usar el sitio con fines ilícitos ni que puedan perjudicar los derechos de la Empresa o terceros. Se prohíbe, entre otras conductas:</p>
          <ul className="terms-list">
            <li>Violar leyes o regulaciones vigentes.</li>
            <li>Introducir virus o sistemas maliciosos.</li>
            <li>Recopilar datos personales sin consentimiento.</li>
            <li>Realizar ingeniería inversa del sitio web.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">11. Limitación de Responsabilidad</h5>
          <p>
            AQP-PERU DATA S.R.L. no se responsabiliza por:
          </p>
          <ul className="terms-list">
            <li>Interrupciones o fallos técnicos fuera de su control.</li>
            <li>Daños derivados del uso indebido de la información del sitio.</li>
            <li>Errores tipográficos o inconsistencias, los cuales serán corregidos al ser detectados. En caso de afectar un pedido, se informará al Usuario.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h5 className="section-title">12. Libro de Reclamaciones</h5>
          <p>
            En cumplimiento del Código de Protección y Defensa del Consumidor, la Empresa dispone de un Libro de Reclamaciones virtual.
          </p>
        </section>
      </Container>
    </div>
  );
};

export default TerminosPage;
