import React, { useEffect } from 'react';
import { Container, Accordion } from 'react-bootstrap';
import './FaqPage.css';

// Datos de las FAQs estructurados para ser más fáciles de gestionar
const faqs = [
  {
    id: 'envios',
    title: 'Envío y Logística',
    questions: [
      {
        q: '¿Hacen envíos a todo el país?',
        a: 'Sí, realizamos envíos a todo el Perú.'
      },
      {
        q: '¿Trabajan con couriers específicos?',
        a: 'Trabajamos con Olva Courier, DHL y Shalom, garantizando la cobertura y el mejor servicio para tu pedido.'
      },
      {
        q: '¿Cuáles son los costos y tiempos de envío?',
        a: 'Los costos y tiempos de envío varían dependiendo del tipo, tamaño y cantidad del pedido, así como del destino. Te recomendamos contactar a nuestro equipo de ventas para una cotización exacta y un estimado de entrega.'
      },
      {
        q: '¿Cuentan con políticas de devoluciones y garantías?',
        a: 'Actualmente no contamos con políticas detalladas publicadas en el sitio web. Para cualquier consulta sobre devoluciones o garantías, por favor comunícate directamente con nuestro equipo de atención al cliente.'
      }
    ]
  },
  {
    id: 'pagos',
    title: 'Métodos de Pago y Políticas',
    questions: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: (
          <>
            Aceptamos los siguientes métodos de pago:
            <ul>
              <li>Transferencia bancaria</li>
              <li>Transferencia interbancaria</li>
              <li>Depósito en cuenta</li>
            </ul>
          </>
        )
      },
      {
        q: '¿Cuáles son las políticas de pago?',
        a: (
          <>
            Ofrecemos opciones de pago flexibles para nuestros clientes corporativos:
            <ul>
              <li>Pago contra entrega</li>
              <li>Crédito a 15 días (sujeto a evaluación)</li>
            </ul>
          </>
        )
      },
      {
        q: '¿Cómo se realizan los pagos por servicios?',
        a: 'El pago por servicios también puede realizarse de forma flexible, ya sea al finalizar el servicio (pago contra entrega) o a través de un crédito a 15 días, previa coordinación.'
      },
      {
        q: '¿Cuál es el sistema de pagos que utilizan actualmente?',
        a: 'Nuestro sistema de pagos se basa principalmente en transferencias y depósitos bancarios, lo que nos permite un proceso seguro y eficiente.'
      }
    ]
  }
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function FaqPage() {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="faq-page">
      <Container className="py-5">
        <h1 className="faq-main-title text-center mb-5">Preguntas Frecuentes</h1>
        
        {faqs.map(section => (
          <div key={section.id} className="faq-section mb-5">
            <h2 className="faq-section-title" onClick={scrollToTop}>{section.title}</h2>
            <Accordion defaultActiveKey="0" flush>
              {section.questions.map((item, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header className="faq-question">
                    {item.q}
                  </Accordion.Header>
                  <Accordion.Body className="faq-answer">
                    {item.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default FaqPage;