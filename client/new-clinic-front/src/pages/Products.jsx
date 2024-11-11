import { useState } from "react";
import Input from "../components/shared/Input";
import { ElementsGrid } from "../components/shared/ElementsGrid";
import useFetch from "../hooks/useFetch";
// import Product from "../components/Product";

const Products = () => {
  // Input search term
  const [searchTerm, setSearchTerm] = useState("");


  const { data, isLoading, hasError, error} = useFetch("/api/v1/products/");
  const filteredProducts = data?.products.filter( (element) => element.type === 'producto');
  //Si la llamada a la api da error imprmirlo en consola
  if(hasError) console.log(error);

  return (
    <div>
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
        isLoading ?
        <p>Cargando servicios...</p>
        :
        <ElementsGrid
          data={filteredProducts}
          searchTerm={searchTerm}
        />
      }

      </div>
    );
};

export default Products;
