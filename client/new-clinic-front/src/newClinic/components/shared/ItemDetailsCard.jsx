import PropTypes from "prop-types";

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


export const ItemDetailsCard = ({ data, onClose, onContact }) => {

    if (!data) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
          <img className="w-full h-64 object-cover mb-4" src={data.image} alt={data.name} />
          <p className="text-gray-700 mb-4">{`Descripción: ${data.description}`}</p>
          <p className="text-gray-700 mb-4">{`Tipo: ${data.type}`}</p>
          <span className="text-green-600 font-bold text-xl">{`Precio: ${data.price}`}</span>
          <div className="mt-4">
            <button 
              onClick={onContact} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Contactar
            </button>
            <button 
              onClick={onClose} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
}


ItemDetailsCard.propTypes = {
    data: PropTypes.object,
    onClose: PropTypes.func,
    onContact: PropTypes.func
}
