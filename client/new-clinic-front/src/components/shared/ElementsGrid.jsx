import { useState } from "react";
import { ContactCard } from "./ContactCard";
import ItemCard from "./ItemCard";
import { ItemDetailsCard } from "./ItemDetailsCard";
import { DeleteModal } from "./DeleteModal"; 
import { EditModal } from "./EditModal"; 
import { AddModal } from "./AddModal"; // Importamos el nuevo modal
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
    const [showAddModal, setShowAddModal] = useState(false); // Estado para el modal de agregar

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

    const handleAddProduct = () => {
        setShowAddModal(true); // Abrir modal de agregar
    };

  return (
    <>
      {/* Botón para agregar producto */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddProduct}
          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mr-40"
        >
          +Agregar 
        </button>
      </div>

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

      {showAddModal && ( 
        <AddModal
          onClose={() => setShowAddModal(false)} 
          onSave={(newProduct) => { 
            console.log("Producto agregado", newProduct); 
            setShowAddModal(false); 
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
