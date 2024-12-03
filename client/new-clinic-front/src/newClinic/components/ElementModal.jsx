import { useState } from "react";
import PropTypes from "prop-types";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { createPost, uploadImage } from "../utils/productService";
import { useForm } from "../../hooks/useForm";

const ElementModal = ({ isOpen, onClose, title, type, style }) => {
  const { formState, onInputChange } = useForm({
    name: "",
    description: "",
    price: "",
  });

  // const [type, setType] = useState("producto");
  const [state, setState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    // Validación de los campos
    if (!formState.name || !formState.description) {
      alert("Todos los campos son requeridos.");
      return;
    }
    const price = parseInt(formState.price);

    if (formState.price) {
      if (isNaN(price)) {
        alert("El precio debe ser un número válido.");
        return;
      }
    }
    // Validar que el precio sea un número

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
      const newProduct = {
        name,
        description,
        image: imageUrl,
        type: type,
        price, // Enviamos el precio como un número
        state,
      };

      await createPost(newProduct);
      // onAddProduct(newProduct);
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ${style}`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg max-w-md w-full grid `}
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <label>Nombre</label>
        <Input
          text={formState.name}
          handleText={onInputChange}
          placeHolder="Nombre"
          nameRef="name"
        />

        <label>Descripción</label>
        <Input
          text={formState.description}
          handleText={onInputChange}
          placeHolder="Descripción"
          nameRef="description"
        />

        <label>Imagen</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />

        <label>Precio</label>
        <Input
          text={formState.price}
          handleText={onInputChange}
          placeHolder="Precio"
          nameRef="price"
        />

        <label>Estado</label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value === "true")}
          className="py-2 px-3 rounded-xl border-2 border-blue-300 mb-4"
        >
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        <div className="flex justify-end space-x-2 mt-4">
          <Button onClickFunc={onClose} extraStyle="bg-gray-300">
            Cancelar
          </Button>
          <Button
            onClickFunc={handleSubmit}
            extraStyle="bg-emerald-400"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
};

ElementModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // onAddProduct: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default ElementModal;
