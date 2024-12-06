import { useState } from "react";
import PropTypes from "prop-types";

export const ContactCard = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    details: "",
  });

  //Actualiza formData al ingreso de datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //Correo
  const sendEmail = () => {
    const subject = `Solicitud de información`;
    const body = `Nombre: ${encodeURIComponent(formData.name)}%0A` +
                 `Teléfono: ${encodeURIComponent(formData.phone)}%0A` +
                 `Email: ${encodeURIComponent(formData.email)}%0A` +
                 `Detalles: ${encodeURIComponent(formData.details)}`;
    const mailtoLink = `mailto:newclinics.info@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    sendEmail();
    onClose();
  };

  //whatsApp
  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();

    const message = `Hola, soy ${encodeURIComponent(
      formData.name
    )}%0A${encodeURIComponent(formData.details)}%0A%0A`;
    const emailText = `Mi email es ${encodeURIComponent(formData.email)}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=50685192913&text=${message}${emailText}`;

    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Contacto</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Celular:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Detalles:</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleSubmitEmail}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar por correo
            </button>
            <button
              onClick={handleSubmitWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  onClose: PropTypes.func,
};
