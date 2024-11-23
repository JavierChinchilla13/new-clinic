import { useContext, useState } from "react";
import Header from "../components/Header";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ContactList from "../components/shared/ContactList";
import { AuthContext } from "../../auth/context/AuthContext";

const center = [9.9357769, -84.1106032]; // Coordenadas de Sabana, Multicentro Sabana

const Contact = () => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      <Header />

      <div className="flex flex-col items-center z-5">
        {/* Sección de contacto */}
        <div className="w-full flex flex-col md:flex-row justify-center items-start p-8 space-y-4 md:space-y-0 md:space-x-8">
          {/* Información de contacto y dirección */}
          <div className="flex flex-col items-start space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Contacto</h2>

            <ContactList />

            {/* Botón de WhatsApp */}
            <a
              href="https://wa.me/50661226703"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 transition"
            >
              Contactar por WhatsApp
            </a>

            {/* Botón de Email */}
            <a
              href="mailto:newclinics.info@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-4 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition"
            >
              Contactar por Email
            </a>
          </div>

          {/* Mapa con iframe de Google */}
          <div className="w-full md:w-1/2 h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15719.842792015383!2d-84.12075295435953!3d9.937228188552835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fd0064a3a29b%3A0x3f5027275e7b1701!2sNew%20Clinic!5e0!3m2!1ses-419!2scr!4v1732404705181!5m2!1ses-419!2scr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Imagen de contacto */}
          <div className="w-full md:w-1/4 flex justify-center items-center">
            <img
              src="/path/to/contact-image.jpg"
              alt="Persona recibiendo tratamiento"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
