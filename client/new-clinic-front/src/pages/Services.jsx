import { useState } from 'react';
import Input from '../components/shared/Input';
import { ElementsGrid } from "../components/shared/ElementsGrid";
import useFetch from '../hooks/useFetch';

// Tarjetas de Servicios
const Services = () => {
  //Input search term
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, hasError, error} = useFetch("/api/v1/products/");

  const filteredProducts = data?.products.filter( (element) => element.type === 'servicio');
    //Si la llamada a la api da error imprmirlo en consola
  if(hasError) console.log(error);

  return (
    <div >

      <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Servicios</h2>
      <div className="flex justify-center mb-4">

      <Input
          text={searchTerm}
          handleText={(newText) => setSearchTerm(newText)}
          placeHolder="Buscar por tipo de servicio..."
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

export default Services;
