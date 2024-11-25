import { useState } from "react";
import { ContactCard } from "./ContactCard";
import ItemCard from "./ItemCard";
import { ItemDetailsCard } from "./ItemDetailsCard";
import { DeleteModal } from "./DeleteModal"; 
import { EditModal } from "./EditModal"; 
import PropTypes from "prop-types";

/*
    type data = {
        key={index}
        name={element.name}
        description={element.description}
        image={element.image}
        type:{element.type}
        price={element.price}
*/

export const ElementsGrid = ({data, searchTerm}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [productToDelete, setProductToDelete] = useState(null); 
    const [showEditModal, setShowEditModal] = useState(false); 
    const [productToEdit, setProductToEdit] = useState(null);

    // Filtro segun tipo
    const filteredProducts = searchTerm
    ? data?.filter((element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : data;

    const handleViewDetails = (element) => {
        setSelectedProduct(element);
        setShowContactForm(false);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleContact = () => {
        setShowContactForm(true);
    };

    const handleDeleteProduct = (product) => { 
        setProductToDelete(product);  
        setShowDeleteModal(true);              
    };

    const handleEditProduct = (product) => { 
        setProductToEdit(product); 
        setShowEditModal(true);                
    };

  return (
    <>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
        {filteredProducts?.map((element) => (
          <ItemCard
            key={element._id}
            name={element.name}
            description={element.description}
            image={element.image}
            type={element.type}
            price={element.price}
            onViewDetails={() => handleViewDetails(element)}
            onEdit={() => handleEditProduct(element)}  
            onDelete={() => handleDeleteProduct(element)}  
          />
        ))}
      </div>

      {selectedProduct && ( 
        <ItemDetailsCard
          data={selectedProduct}
          onClose={handleCloseModal}
          onContact={handleContact}  
        />
      )}

      {showContactForm && (
        <ContactCard onClose={() => setShowContactForm(false)} />
      )}

      {showDeleteModal && (         
        <DeleteModal 
          product={productToDelete} 
          onClose={() => setShowDeleteModal(false)} 
          onConfirm={() => {
            console.log("Producto eliminado", productToDelete); 
            setShowDeleteModal(false); 
          }}
        />
      )}

      {showEditModal && ( 
        <EditModal
          product={productToEdit} 
          onClose={() => setShowEditModal(false)} 
          onSave={(updatedProduct) => { 
            console.log("Producto editado", updatedProduct); 
            setShowEditModal(false); 
          }}
        />
      )}

    </>
  );
};

ElementsGrid.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchTerm: PropTypes.string,
};