import React from "react";
import { Container } from "react-bootstrap";

const TerminosPage = () => {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="mb-4 text-center">TÉRMINOS Y CONDICIONES DE COMPUTER SHOP’S CORPORATION S.R.L.</h2>

      <p>
        Bienvenidos a la página web de <strong>COMPUTER SHOP’S CORPORATION S.R.L.</strong> (en adelante, “La Empresa” o “nosotros”), 
        con RUC 20498152555, domiciliada en Av. Venezuela Mza. B Lote 14 Urb. Ampliación la Negrita. Al acceder y utilizar nuestro sitio web, 
        usted (en adelante, “el usuario”) acepta cumplir con los siguientes Términos y Condiciones de uso. 
        Si no está de acuerdo con estos términos, por favor, no utilice nuestro sitio web.
      </p>

      <h5>1. Objeto del Sitio Web</h5>
      <p>
        El presente sitio tiene como finalidad principal la exhibición, promoción y venta de equipos informáticos (hardware, software y accesorios), 
        así como la oferta de servicios de mantenimiento y soporte técnico relacionados.
      </p>

      <h5>2. Aceptación de los Términos</h5>
      <p>
        El acceso, navegación y uso del sitio web, así como la adquisición de productos o servicios ofrecidos, implica la aceptación plena 
        e incondicional de estos Términos y Condiciones, así como nuestra Política de Privacidad. La Empresa se reserva el derecho de 
        modificar estos términos en cualquier momento, siendo responsabilidad del Usuario revisarlos periódicamente.
      </p>

      <h5>3. Registro del Usuario</h5>
      <ul>
        <li>3.1. Algunos servicios o funcionalidades del sitio requieren un registro previo. El Usuario declara que la información proporcionada durante el registro es veraz, completa y actualizada.</li>
        <li>3.2. El Usuario es responsable exclusivo de mantener la confidencialidad de su contraseña y de todas las actividades realizadas desde su cuenta.</li>
        <li>3.3. La Empresa se reserva el derecho de rechazar o cancelar registros sin necesidad de justificación.</li>
      </ul>

      <h5>4. Productos y Servicios</h5>
      <ul>
        <li><strong>Descripciones:</strong> pueden existir variaciones mínimas entre imágenes y productos reales.</li>
        <li><strong>Disponibilidad:</strong> todos los productos están sujetos a stock.</li>
        <li><strong>Precios:</strong> expresados en soles (S/.) e incluyen IGV.</li>
        <li><strong>Servicios de Mantenimiento:</strong> se rigen por proformas o presupuestos aceptados previamente.</li>
      </ul>

      <h5>5. Proceso de Compra y Pago</h5>
      <ul>
        <li><strong>Cesta de Compra:</strong> el Usuario podrá seleccionar productos y agregarlos a su cesta.</li>
        <li><strong>Confirmación del Pedido:</strong> se validará disponibilidad y pago antes de la confirmación.</li>
        <li><strong>Comprobantes de Pago:</strong> se emitirán boletas o facturas según los datos proporcionados.</li>
      </ul>

      <h5>6. Envíos y Entregas</h5>
      <ul>
        <li><strong>Cobertura:</strong> realizamos envíos a todo el Perú.</li>
        <li><strong>Plazos de Entrega:</strong> son referenciales y dependen de diversos factores.</li>
        <li><strong>Recepción del Pedido:</strong> debe revisarse el estado del paquete al momento de la entrega.</li>
      </ul>

      <h5>7. Cambios, Devoluciones y Garantías</h5>
      <ul>
        <li><strong>Cambios/Devoluciones:</strong> solo por fallas de fábrica o errores. Se debe notificar dentro de 7 días calendario.</li>
        <li><strong>Garantía de Productos:</strong> se aplica la garantía del fabricante, gestionada por la Empresa como intermediario.</li>
        <li><strong>Garantía de Servicios:</strong> 30 días calendario salvo indicación distinta en el contrato.</li>
      </ul>

      <h5>8. Propiedad Intelectual</h5>
      <p>
        Todos los contenidos del sitio (textos, imágenes, logotipos, videos, software, etc.) son propiedad de COMPUTER SHOP’S CORPORATION S.R.L. 
        o de sus respectivos titulares y están protegidos por la normativa sobre propiedad intelectual. 
        Su uso no autorizado está estrictamente prohibido.
      </p>

      <h5>9. Protección de Datos Personales</h5>
      <p>
        El tratamiento de los datos personales del Usuario se rige por nuestra Política de Privacidad. 
        Al utilizar este sitio, el Usuario acepta dicha política.
      </p>

      <h5>10. Uso Prohibido del Sitio Web</h5>
      <p>El Usuario se compromete a no usar el sitio con fines ilícitos. Se prohíbe:</p>
      <ul>
        <li>Violar leyes o regulaciones vigentes.</li>
        <li>Introducir virus o sistemas maliciosos.</li>
        <li>Recopilar datos personales sin consentimiento.</li>
        <li>Realizar ingeniería inversa del sitio web.</li>
      </ul>

      <h5>11. Limitación de Responsabilidad</h5>
      <ul>
        <li>Interrupciones o fallos técnicos fuera del control de la Empresa.</li>
        <li>Daños derivados del uso indebido del sitio.</li>
        <li>Errores tipográficos o inconsistencias que serán corregidos cuando se detecten.</li>
      </ul>

      <p className="mt-4">
        Para consultas adicionales, puedes contactarnos a través de <strong>contacto@computershops.com</strong>.
      </p>
    </Container>
  );
};

export default TerminosPage;
