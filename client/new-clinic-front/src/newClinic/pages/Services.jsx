import { useContext, useEffect, useState } from "react";
import Input from "../components/shared/Input";
import { ElementsGrid } from "../components/shared/ElementsGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../../auth/context/AuthContext";
import ElementModal from "../components/ElementModal";
import axios from "axios";

/**
 * Componente para mostrar los servicios disponibles y permitir su gestión.
 * Los usuarios autenticados pueden añadir nuevos servicios.
 */
const Services = () => {
  const { authState } = useContext(AuthContext); // Obtiene el estado de autenticación

  // Estado para almacenar la búsqueda, el modal y la lista de servicios
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [servicesList, setServicesList] = useState(null);
  const [elementModalAnimationStyle, setElementModalAnimationStyle] = useState(
    "animate__animated animate__fadeIn"
  );

  /**
   * Función para obtener la lista de productos de tipo servicio desde la API.
   */
  const getProductsList = () => {
    axios
      .get("/api/v1/products/")
      .then(({ data }) => {
        // console.log(data)
        if (authState?.logged) {
          // Si el usuario está autenticado, muestra todos los servicios
          setServicesList(
            data?.products.filter((element) => element.type === "servicio")
          );
        } else {
          // Si el usuario no está autenticado, solo muestra servicios activos
          setServicesList(
            data?.products.filter(
              (element) => element.type === "servicio" && element.state === true
            )
          );
        }
      })
      .catch((error) => {
        console.log(error); // Maneja cualquier error
      });
  };

  // Ejecuta getProductsList cuando el componente se monta
  useEffect(() => {
    getProductsList();
  }, []);

  /**
   * Cierra el modal de agregar servicio y recarga la lista de productos.
   */
  const onCloseAddModal = () => {
    getProductsList();
    setElementModalAnimationStyle("animate__animated animate__fadeOut");
    setTimeout(() => {
      setElementModalAnimationStyle("animate__animated animate__fadeIn");
      setIsModalOpen(!isModalOpen);
    }, 500);
  };

  /**
   * Función para cerrar el modal de edición o eliminación y recargar la lista.
   */
  const onCloseModal = () => {
    console.log("recall"); 
    getProductsList(); // Recarga la lista de productos
  };

  return (
    <div className="grid min-h-screen pt-[150px]">
      <Header />

      <div className="flex-grow  min-h-screen">
        <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Servicios</h2>

        {/* Barra de búsqueda */}
        <div className="flex justify-center mb-4">
          <Input
            text={searchTerm}
            handleText={(newText) => setSearchTerm(newText.target.value)}
            placeHolder="Buscar por tipo de servicio..."
            extraStyle="w-[300px]"
          />
        </div>

        {/* Mostrar el botón para añadir servicio solo si el usuario está autenticado */}
        {authState?.logged ? (
          <>
            <div className="flex justify-start relative">
              <button
                className={`rounded-md bg-yellow-300 
                    py-2 px-4 text-center text-lg transition-all shadow-sm 
                    hover:shadow-lg text-slate-600 hover:text-white
                    focus:text-white active:text-white disabled:pointer-events-none 
                    disabled:opacity-50 disabled:shadow-none ml-24`}
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                Añadir nuevo servicio
              </button>
            </div>

            {/* Modal para añadir un nuevo servicio */}
            <ElementModal
              title="Añadir Servicio"
              isOpen={isModalOpen}
              onClose={onCloseAddModal}
              // onAddProduct={handleAddProduct}
              type="servicio"
              style={elementModalAnimationStyle}
            />
          </>
        ) : null}

        {/* Mostrar la lista de servicios */}
        <ElementsGrid
          data={servicesList}
          searchTerm={searchTerm}
          onCloseDeleteModal={onCloseModal}
          onCloseEditModal={onCloseModal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Services;
