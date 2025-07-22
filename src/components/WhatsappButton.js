
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  const phoneNumber = "51976159076"; 
  const message = "Hola! Estoy interesado en una cotización 🖥️";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsappButton;
