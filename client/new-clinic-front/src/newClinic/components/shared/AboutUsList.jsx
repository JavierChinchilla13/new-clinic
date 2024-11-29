import AboutUsCard from "./AboutUsCard";
import { useState } from "react";
import { AddAboutUs } from "./AddAboutUs";
import { DeleteAboutUsModal } from "./DeleteAboutUsModal"; 
import { EditAboutUsModal } from "./EditAboutUsModal"; 
import PropTypes from "prop-types";

// Manejo de estados para controlar la visibilidad de los modales de agregar, editar y eliminar
// y almacenar la información de la entrada seleccionada para realizar las acciones correspondientes.
const AboutUsList = ({ informaciones, setInformaciones }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [infoToDelete, setInfoToDelete] = useState(null);
  const [infoToEdit, setInfoToEdit] = useState(null);

  // abre modal de agregar
 // const handleOpenAddModal = () => setIsAddModalOpen(true);

  // cierra modal de agregar
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // guarda nueva información ********conectar bd*********
  const handleSave = (newInfo) => {
    const newId = informaciones.length + 1;
    setInformaciones((prev) => [
      ...prev,
    ]);
    setIsAddModalOpen(false);
  };

  // abre la ventana de eliminación
  const handleOpenDeleteModal = (info) => {
    setInfoToDelete(info);
    setIsDeleteModalOpen(true);
  };

  // simular eliminación de dato **********conectar bd********* 
  const handleDelete = () => {

    setInformaciones((prev) => prev.filter((info) => info.id !== infoToDelete.id));
    setIsDeleteModalOpen(false);
  };

  // cierra el modal de eliminación
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  // abre el modal de edición
  const handleOpenEditModal = (info) => {
    setInfoToEdit(info);
    setIsEditModalOpen(true);
  };

  // cierra el modal de edición
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  //Para guardar los cambios de edición *****conectar bd *****
  const handleEditSave = (editedInfo) => {
    setInformaciones((prev) =>
      prev.map((info) => (info.id === editedInfo.id ? { ...info, ...editedInfo } : info))
    );
    setIsEditModalOpen(false);
  };

  return (
    <>
      {/* Contenedor de la lista de tarjetas  */}
      <div className="flex flex-wrap gap-4 w-full">
        {informaciones.map((info) => (
          <div className="flex-grow bg-transparent border-none"
            key={info.id}>
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


      {/* Modales para agregar, eliminar y editar */}
      {isAddModalOpen && (
        <AddAboutUs onClose={handleCloseAddModal} onSave={handleSave} />
      )}

      {isDeleteModalOpen && (
        <DeleteAboutUsModal
          info={infoToDelete}
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


AboutUsList.propTypes = {
  informaciones: PropTypes.array, 
  setInformaciones: PropTypes.func
}