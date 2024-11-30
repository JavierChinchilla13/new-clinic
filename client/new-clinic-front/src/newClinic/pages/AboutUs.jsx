import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import AboutUsList from "../components/shared/AboutUsList";
import { AddAboutUs } from "../components/shared/AddAboutUs";
import { AuthContext } from "../../auth/context/AuthContext";
import Axios from "axios";

const AboutUs = () => {
  const { authState } = useContext(AuthContext);

  const [informaciones, setInformaciones] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar información desde la API al montar el componente
  useEffect(() => {
    Axios.get("/api/v1/posts")
      .then((response) => {
        setInformaciones(response.data.posts || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(`Error al cargar la información: ${error.message}`);
        setLoading(false);
      });
  }, []);

  const handleAddInfo = (newInfo) => {
    // Aquí puedes integrar una llamada POST a la API si deseas que los datos sean persistentes
    setInformaciones((prev) => [...prev, { id: prev.length + 1, ...newInfo }]);
  };

  return (
    <>
      <Header />
      <h1 className="text-4xl ml-12 mt-12 font-bold">Bienvenido a New Clinic!</h1>
      <div className="bg-white py-12 px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Sobre nosotros</h2>

        {authState?.logged && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-teal-500 text-white py-2 px-4 rounded mb-6"
            >
              Añadir Información
            </button>
          </div>
        )}

        {/* Mostrar mensaje de error o cargar información */}
        {loading ? 
          (
            <p>Cargando información...</p>
          ) 
          : error ? 
          (
            <p className="text-red-500">{error}</p>
          ) 
          : 
          (
            <AboutUsList 
            informaciones={informaciones} 
            />
          )
        }

        {/* Modal para agregar información */}
        {isModalOpen && (
          <AddAboutUs
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddInfo}
            isOpen={true}
          />
        )}
      </div>
    </>
  );
};

export default AboutUs;
