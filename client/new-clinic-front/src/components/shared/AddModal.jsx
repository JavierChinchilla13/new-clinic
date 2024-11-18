import PropTypes from "prop-types";
import { useState } from "react";

export const AddModal = ({ onClose, onSave }) => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        type: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setNewProduct((prev) => ({ ...prev, price: value }));
        }
    };

    const handleSubmit = () => {
        onSave(newProduct);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Agregar</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={newProduct.name} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea 
                            name="description" 
                            value={newProduct.description} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Precio</label>
                        <input 
                            type="text" 
                            name="price" 
                            value={newProduct.price} 
                            onChange={handlePriceChange} 
                            className="w-full p-2 border rounded"
                            min="0"
                            step="any"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tipo</label>
                        <input 
                            type="text" 
                            name="type" 
                            value={newProduct.type} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Imagen (URL)</label>
                        <input 
                            type="text" 
                            name="image" 
                            value={newProduct.image} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button 
                            onClick={onClose} 
                            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            onClick={handleSubmit} 
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
