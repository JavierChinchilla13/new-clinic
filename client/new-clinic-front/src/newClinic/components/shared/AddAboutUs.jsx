import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { createPost, uploadImage } from "../../utils/AboutUsService";
import Input from "./Input";

export const AddAboutUs = ({ onClose, isOpen }) => {

  const { formState, onInputChange} = useForm({
    name: "",
    description: "",
  })


  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    if (!formState.name || !formState.description) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const { data } = await uploadImage(formData);
        imageUrl = data.image.src;
      }

      const { name, description } = formState;
      const newPost = {
        name,
        description,
        image: imageUrl,
      };

      await createPost(newPost);

      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Añadir Información</h2>

        {/* Formulario */}
        <form>
          {/* Campo de Nombre */}
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <Input
              text={formState.name}
              handleText={onInputChange}
              placeHolder="Nombre"
              nameRef="name"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Campo de Descripción */}
          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <Input
              text={formState.description}
              handleText={onInputChange}
              placeHolder="Descripción"
              nameRef="description"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Campo de Imagen */}
          <div className="mb-4">
            <label className="block text-gray-700">Imagen</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Botones de acción */}
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
              disabled={loading}
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
  isOpen: PropTypes.bool.isRequired,
};
