import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa"; 

/*
    Prop OnViewDetails es para manejar la funcionalidad onCLick del boton mostrar detalles 
 */

    /*
    type data = {
        key={index}
        name={element.name}
        description={element.description}
        image={element.image}
        type:{element.type}
        price={element.price}
    }

*/

const ItemCard = ({ name, description, image, type, price, onViewDetails, onEdit, onDelete }) => {
    return (
        <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white relative"> 

            <img className="w-full h-64 object-cover" src={image} alt={name} />

            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl">{name}</h3>
                    
                    {/* Botones de Editar y Eliminar*/}
                    <div className="flex space-x-2">
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
                    </div>
                </div>
                
                <p className="text-gray-600">{description}</p> 
                <p className="text-gray-600">{type}</p> 
            </div>

            <div className="px-6 pt-4 pb-2 flex justify-between items-center">
                <span className="text-green-600 font-bold text-xl">{price}</span>
                <button 
                    onClick={onViewDetails} 
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
                >
                    Ver detalles
                </button>
            </div>
        </div>
    );
}

ItemCard.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    onViewDetails: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
};

export default ItemCard;