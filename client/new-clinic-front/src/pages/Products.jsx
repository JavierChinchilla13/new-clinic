// import { useState } from "react";
// import Input from "../components/shared/Input";
// import { productsData } from "../data/tempData";
// import { ElementsGrid } from "../components/shared/ElementsGrid";
import Product from "../components/Product";

const Products = () => {
  //Input search term
  // const [searchTerm, setSearchTerm] = useState("");

  // return (
  //   <div>
  //     <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Productos</h2>
  //     <div className="flex justify-start mb-4 ml-[400px]">

  //           <Input
  //             text={searchTerm}
  //             handleText={(newText) => setSearchTerm(newText)}
  //             placeHolder="Buscar por tipo de producto..."
  //             extraStyle = 'w-[300px]'
  //           />

  //     </div>

  //     <ElementsGrid
  //       data={productsData}
  //       searchTerm={searchTerm}
  //     />

  //     </div>
  //   );

  return (
    <>
      <Product></Product>
    </>
  );
};

export default Products;
