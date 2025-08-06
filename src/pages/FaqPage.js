import React from 'react';
import './FaqPage.css';

function FaqPage() {
  return (
    <div className="faq-container">
      <h2>Preguntas Frecuentes</h2>

      <div className="faq-section" id="envios">
        <h3>Envío y Logística <span className="faq-date"></span></h3>

        <h4>¿Hacen envíos a todo el país?</h4>
        <p>Sí, realizamos envíos a todo el Perú.</p>

        <h4>¿Trabajan con couriers específicos (Olva, DHL, etc.)?</h4>
        <p>Trabajamos con Olva, DHL y Shalom.</p>

        <h4>Costos y tiempos de envío</h4>
        <p>Dependen del tipo, tamaño y cantidad del pedido. Contáctanos para una cotización exacta.</p>

        <h4>Políticas de devoluciones y garantías</h4>
        <p>Actualmente no contamos con políticas detalladas publicadas. Para más información, comunícate con nuestro equipo de atención al cliente.</p>
      </div>

      <div className="faq-section" id="pagos">
        <h3>Métodos de Pago y Políticas <span className="faq-date"></span></h3>

        <h4>Métodos de pago aceptados</h4>
        <ul>
          <li>Transferencia bancaria</li>
          <li>Transferencia interbancaria</li>
          <li>Depósito en cuenta</li>
        </ul>

        <h4>Políticas de pago (por adelantado, al crédito, por cuotas, etc.)</h4>
        <ul>
          <li>Pago contra entrega</li>
          <li>Crédito a 15 días</li>
        </ul>

        <h4>¿Cómo es el pago por servicios?</h4>
        <p>El pago por servicios también se puede realizar contra entrega o con crédito a 15 días.</p>

        <h4>¿Cómo es actualmente el sistema de pagos que usan?</h4>
        <p>Principalmente se usa transferencia o depósitos bancarios.</p>
      </div>
    </div>
  );
}

export default FaqPage;
