import { FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../../auth/context/AuthContext";

const AboutUsCard = ({ title, description, image, onEdit, onDelete }) => {

  const { authState } = useContext(AuthContext);


  return (
    <div className="flex border rounded-lg shadow-lg mb-6 p-6">
      {/* Bloque que acomoda el texto */}
      <div className="flex-1 pr-4">
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Bloque que acomoda la imagen */}
      <div className="flex items-center justify-between">
        <div className="w-80 h-60 bg-gray-200 rounded-lg overflow-hidden mb-4">
          <img src={image} alt="Imagen" className="w-full h-full object-cover" />
        </div>

        {/* Bloque que acomoda los botones de editar y eliminar */}
        <div className="flex space-x-2 ml-5 mt-[-10px]">
          {
            authState?.logged ?
            (
              <>
                <button
                  onClick={onEdit}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-md"
                  aria-label="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={onDelete}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
                  aria-label="Eliminar"
                >
                  <FaTrash />
                </button>
              </>
            )
            :
            null
          }
        </div>
      </div>
    </div>
  );
};

export default AboutUsCard;


AboutUsCard.propTypes = {
  title: PropTypes.string, 
  description: PropTypes.string, 
  image: PropTypes.string, 
  onEdit: PropTypes.func, 
  onDelete: PropTypes.func 
}