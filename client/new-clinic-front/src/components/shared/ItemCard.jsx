import PropTypes from "prop-types";

/*
    Prop OnvewDetails es para manejar la funcionalidad onCLick del boton mostrar detalles 
 */
const ItemCard = ({ title, price, imageUrl, description, onViewDetails }) => {
    return (
        <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg bg-white"> 
          <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />
          <div className="px-6 py-4">
            <h3 className="font-bold text-2xl mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p> 
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
    title: PropTypes.string,
    price: PropTypes.string,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    onViewDetails: PropTypes.func
}

export default ItemCard