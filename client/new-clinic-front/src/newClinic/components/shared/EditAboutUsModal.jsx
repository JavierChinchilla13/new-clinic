import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export const EditAboutUsModal = ({ onClose, onSave, infoToEdit }) => {
  
  const [editedInfo, setEditedInfo] = useState({
    name: "",
    description: "",
  });

  const [imageLoaded, setImageLoaded] = useState(false); // Estado para controlar si la imagen se ha cargado

  // Rellenar los campos con la información existente al abrir el modal
  useEffect(() => {
    if (infoToEdit) {
      setEditedInfo({
        name: infoToEdit.title, // Mapeando 'title' a 'name'
        description: infoToEdit.description,
        image: null,  // Se puede cargar la imagen por defecto si lo deseas
      });
    }
  }, [infoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedInfo((prev) => ({ ...prev, image: file }));
    setImageLoaded(true); // Marcar la imagen como cargada
  };

  const handleSubmit = () => {
    const updateInfo = {
      _id: infoToEdit?._id,
      name: editedInfo.name,
      description: editedInfo.description,
      image: editedInfo.image || infoToEdit.image, // Mantener imagen actual si no se cambia
      imageLoaded, // Agregar el estado de imagen cargada
    };

    onSave(updateInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Editar Información</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="name"
              value={editedInfo.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Escribe el título"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={editedInfo.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Escribe la descripción"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditAboutUsModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  infoToEdit: PropTypes.object,
};
