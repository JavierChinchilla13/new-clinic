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

          {/* Mapa */}
          <div className="w-full md:w-1/2 h-64">
            <MapContainer
              center={center}
              zoom={13}
              style={{ height: "250px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              <Marker position={center}>
                <Popup>Estamos aquí</Popup>
              </Marker>
            </MapContainer>
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
