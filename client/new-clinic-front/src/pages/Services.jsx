import { useState } from 'react';
import Input from '../components/shared/Input';
import { ElementsGrid } from "../components/shared/ElementsGrid";
import { servicesData } from '../data/tempData';



// Tarjetas de Servicios
const Services = () => {
  
  //Input search term
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div >

      <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Servicios</h2>
      <div className="flex justify-start mb-4 ml-[400px]"> 

      <Input
          text={searchTerm}
          handleText={(newText) => setSearchTerm(newText)}
          placeHolder="Buscar por tipo de servicio..."
          extraStyle = 'w-[300px]' 
        />

      </div>

      <ElementsGrid
        data={servicesData}
        searchTerm={searchTerm}
      />
      
    </div>
  );
};

export default Services;
