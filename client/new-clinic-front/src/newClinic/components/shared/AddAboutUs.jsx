import PropTypes from "prop-types";
import { useState } from "react";

export const AddAboutUs = ({ onClose, onSave }) => {
  const [newInfo, setNewInfo] = useState({
    title: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewInfo((prev) => ({ ...prev, image: file }));
    alert("Por favor, complete todos los campos.");
  };

  const handleSubmit = () => {
    if (!newInfo.title || !newInfo.description) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    onSave(newInfo); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Añadir Información</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={newInfo.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Escribe el título"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              name="description"
              value={newInfo.description}
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

AddAboutUs.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
