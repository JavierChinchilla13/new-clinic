import { useState } from "react";
import Header from "../components/Header";
import AboutUsList from "../components/shared/AboutUsList";
import { AddAboutUs } from "../components/shared/AddAboutUs";

const AboutUs = () => {
  const [informaciones, setInformaciones] = useState([
    {
      id: 1,
      title: "Misión",
      description: "Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. V Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. Nuestra misión es brindar un servicio excepcional. ",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Visión",
      description: "Nuestra visión es convertirnos en líderes del sector salud.",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddInfo = (newInfo) => {
    setInformaciones((prev) => [
      ...prev,
      { id: prev.length + 1, ...newInfo },
    ]);
  };

  return (
    <>
      <Header />
      <h1 className="text-4xl ml-12 mt-12 font-bold">Bienvenido a New Clinic!</h1>
      <div className="bg-white py-12 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sobre nosotros</h2>

        <div className="flex justify-end">
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-teal-500 text-white py-2 px-4 rounded mb-6"
            >  
            Añadir Información
            </button>
        </div>

        {/* AboutUsList para manejar el listado */}
        <AboutUsList informaciones={informaciones} />

        {/* Modal para agregar información */}
        {isModalOpen && (
          <AddAboutUs
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddInfo}
          />
        )}
      </div>
    </>
  );
};

export default AboutUs;