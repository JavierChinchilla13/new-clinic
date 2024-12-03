import { useState, useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext"; // Importación del contexto de autenticación
import Header from "../components/Header";
import AboutUsList from "../components/shared/AboutUsList";
import AddAboutUs from "../components/shared/AddAboutUs"; // Modal para añadir información
import logo from "../../assets/logo.png"; // Ruta al logo

const AboutUs = () => {
  const { authState } = useContext(AuthContext); // Obtiene el estado de autenticación
  const [informaciones, setInformaciones] = useState([]); // Estado para la lista de información
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

  // Función para abrir el modal
  const handleOpenModal = () => setIsModalOpen(true);

  // Función para cerrar el modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Función para guardar nueva información
  const handleSaveInfo = (newInfo) => {
    setInformaciones((prev) => [...prev, newInfo]); // Agrega el nuevo post al estado actual
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <main className="container mx-auto px-6 py-12">
        {/* Logo y título */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-10">
            <div>
              <img
                src={logo}
                alt="Logo de New Clinic"
                className="h-24 md:h-28 mb-4 md:mb-0 mx-auto md:mx-0"
              />
            </div>
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-4xl font-bold text-gray-800">
                Sobre Nosotros
              </h1>
            </div>
          </div>
          {/* Botón solo para usuarios autenticados */}
          {authState?.logged && ( // Verifica si el usuario está autenticado
            <div className="mt-4 md:mt-0">
              <button
                onClick={handleOpenModal}
                className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300"
              >
                Añadir Información
              </button>
            </div>
          )}
        </div>

        {/* Subtítulo */}
        <p className="text-xl font-bold text-teal-500 mb-6">
          • Medicina Estética • Medicina General • Nutrición • Spa
        </p>

        {/* Lista de información */}
        <AboutUsList
          informaciones={informaciones}
          setInformaciones={setInformaciones}
        />

        {/* Modal para añadir información */}
        <AddAboutUs
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveInfo}
        />
      </main>
    </div>
  );
};

export default AboutUs;
