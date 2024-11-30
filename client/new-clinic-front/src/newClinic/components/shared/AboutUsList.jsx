import AboutUsCard from "./AboutUsCard";
import { useState } from "react";
import Axios from "axios";
import { AddAboutUs } from "./AddAboutUs";
import { DeleteAboutUsModal } from "./DeleteAboutUsModal";
import { EditAboutUsModal } from "./EditAboutUsModal";

const AboutUsList = () => {
  const [informaciones, setInformaciones] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [infoToDelete, setInfoToDelete] = useState(null);
  const [infoToEdit, setInfoToEdit] = useState(null);

  
  // Abre modal de agregar
  const handleOpenAddModal = () => setIsAddModalOpen(true);

  // Cierra modal de agregar
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // Guarda nueva información en la base de datos
  const handleSave = async (newInfo) => {
    try {
      const response = await Axios.post("/api/v1/posts", newInfo);
      setInformaciones((prev) => [...prev, response.data.post]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la nueva información:", error);
    }
  };

  // Abre la ventana de eliminación
  const handleOpenDeleteModal = (info) => {
    setInfoToDelete(info);
    setIsDeleteModalOpen(true);
  };

  // Elimina un dato de la base de datos
  const handleDelete = async () => {
    try {
      await Axios.delete(`/api/v1/posts/${infoToDelete._id}`); // Asegúrate de que el ID sea correcto
      setInformaciones((prev) =>
        prev.filter((info) => info._id !== infoToDelete._id)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar la información:", error);
    }
  };

  // Cierra el modal de eliminación
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  // Abre el modal de edición
  const handleOpenEditModal = (info) => {
    setInfoToEdit(info);
    setIsEditModalOpen(true);
  };

  // Cierra el modal de edición
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  // Guarda los cambios de edición en la base de datos
  const handleEditSave = async (editedInfo) => {
    try {
      const response = await Axios.patch(
        `/api/v1/posts/${editedInfo._id}`,
        editedInfo
      );
      setInformaciones((prev) =>
        prev.map((info) =>
          info._id === editedInfo._id ? { ...info, ...response.data.post } : info
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error al guardar los cambios de edición:", error);
    }
  };

  return (
    <>
      {/* Contenedor de la lista de tarjetas */}
      <div className="flex flex-wrap gap-4 w-full">
        {informaciones.map((info) => (
          <div key={info._id} className="flex-grow bg-transparent border-none">
            <AboutUsCard
              title={info.title}
              description={info.description}
              image={info.image}
              onDelete={() => handleOpenDeleteModal(info)}
              onEdit={() => handleOpenEditModal(info)}
            />
          </div>
        ))}
      </div>

      {/* Botón para abrir modal de agregar */}
      <button
        onClick={handleOpenAddModal}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Agregar Nuevo Post
      </button>

      {/* Modales para agregar, eliminar y editar */}
      {isAddModalOpen && (
        <AddAboutUs 
        onClose={handleCloseAddModal} 
        onSave={handleSave} 
        isOpen={false}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteAboutUsModal
          info={ infoToDelete}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
        />
      )}
      {isEditModalOpen && (
        <EditAboutUsModal
          infoToEdit={infoToEdit}
          onClose={handleCloseEditModal}
          onSave={handleEditSave}
        />
      )}
    </>
  );
};

export default AboutUsList;