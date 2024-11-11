import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/shared/Button";
import ElementModal from "../components/shared/ElementModal";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddProduct = (product) => {
    console.log("Product added:", product);
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Button onClickFunc={handleOpenModal}>Añadir nuevo item</Button>

          <ElementModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddProduct={handleAddProduct}
          />
        </div>
      </div>
      <Product />
    </>
  );
};

export default Products;
