import PropTypes from "prop-types";

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
const ItemCard = ({ name, description, image, type, price, onViewDetails }) => {
    return (
        <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg bg-white"> 
          <img className="w-full h-64 object-cover" src={image} alt={name} />
          <div className="px-6 py-4">
            <h3 className="font-bold text-2xl mb-2">{name}</h3>
            <p className="text-gray-600">{description}</p> 
            <p className="text-gray-600">{type}</p> 
          </div>
          <div className="px-6 pt-4 pb-2 flex justify-between items-center">
            <span className="text-green-600 font-bold text-xl">{price}</span>
            <button 
              onClick={onViewDetails} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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
    onViewDetails: PropTypes.func
}

export default ItemCard