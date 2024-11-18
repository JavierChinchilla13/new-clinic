import Header from "../components/Header";
import { useContext, useState } from "react";
import Input from "../components/shared/Input";
import { ElementsGrid } from "../components/shared/ElementsGrid";
import useFetch from "../../hooks/useFetch";
import ElementModal from "../components/ElementModal";
import {AuthContext} from '../../auth/context/AuthContext'
// import Product from "../components/Product";


const Products = () => {

  const { authState } = useContext(AuthContext);

  // Input search term
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, hasError, error} = useFetch("/api/v1/products/");
  const filteredProducts = data?.products.filter( (element) => element.type === 'producto');
  //Si la llamada a la api da error imprmirlo en consola
  if(hasError) console.log(error);


  const handleAddProduct = (product) => {
    console.log("Product added:", product);
  };


  return (
    <>
      <Header />

      
        <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Productos</h2>
        <div className="flex justify-start mb-4 ml-[400px]">

              <Input
                text={searchTerm}
                handleText={(newText) => setSearchTerm(newText)}
                placeHolder="Buscar por tipo de producto..."
                extraStyle = 'w-[300px]'
              />

        </div>

        {

            authState.logged ?

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
              title="Añadir Producto"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(!isModalOpen)}
              onAddProduct={handleAddProduct}
              />
            </>

            :
            null
        }

        {
          isLoading ?
          <p>Cargando servicios...</p>
          :
          <ElementsGrid
            data={filteredProducts}
            searchTerm={searchTerm}
          />
        }

        
    </>
    );
};

export default Products;
