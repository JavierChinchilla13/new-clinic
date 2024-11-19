import { useContext, useEffect, useState } from 'react';
import Input from '../components/shared/Input';
import { ElementsGrid } from "../components/shared/ElementsGrid";
import Header from '../components/Header';
import { AuthContext } from '../../auth/context/AuthContext';
import ElementModal from '../components/ElementModal';
import axios from 'axios';

// Tarjetas de Servicios
const Services = () => {

  const { authState } = useContext(AuthContext);

  //Input search term
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicesList, setServicesList] = useState();

const getProductsList = () => {
    console.log('rerender')
    axios
    .get("/api/v1/products/")
    .then( ({data}) => {
        setServicesList(data?.products.filter( (element) => element.type === 'servicio'));
        console.log(servicesList)
    })
    .catch((error) => {
        console.log(error);
    })
  }

  useEffect(() => {
    getProductsList();
  }, [])

  const onCloseModal = () => {
    console.log('recall')
    getProductsList();
    setIsModalOpen(!isModalOpen)
  }

  const handleAddProduct = (product) => {
    console.log("Product added:", product);
  };


  return (
    <>
      <Header/>
      

        <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Servicios</h2>
        <div className="flex justify-start mb-4 ml-[400px]">

        <Input
            text={searchTerm}
            handleText={(newText) => setSearchTerm(newText)}
            placeHolder="Buscar por tipo de servicio..."
            extraStyle = 'w-[300px]'
          />

        </div>

        {

            authState?.logged ?

            <>
            <div className="flex justify-items-center justify-self-start ml-20">
            <button 
                className={`rounded-md bg-yellow-400 
                      py-2 px-4 text-center text-lg transition-all shadow-sm 
                      hover:shadow-lg text-slate-600 hover:text-white
                      focus:text-white active:text-white disabled:pointer-events-none 
                      disabled:opacity-50 disabled:shadow-none`}
                onClick={() => setIsModalOpen(!isModalOpen)}
                >
                  Añadir nuevo producto
                </button>
            </div>

              <ElementModal
              title="Añandir Servicio"
              isOpen={isModalOpen}
              onClose={onCloseModal}
              onAddProduct={handleAddProduct}
              type='servicio'
              />
            </>

            :
            null
        }

        <ElementsGrid
            data={servicesList}
            searchTerm={searchTerm}
          />

      
    </>
  );
};

export default Services;
