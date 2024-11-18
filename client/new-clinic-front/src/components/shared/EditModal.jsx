import PropTypes from "prop-types";
import { useState } from "react";

export const EditModal = ({ product, onClose, onSave }) => {
    const [editedProduct, setEditedProduct] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            setEditedProduct((prev) => ({ ...prev, price: value }));
        }
    };

    const handleSubmit = () => {
        onSave(editedProduct);
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Editar</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Nombre</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={editedProduct.name} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción</label>
                        <textarea 
                            name="description" 
                            value={editedProduct.description} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Precio</label>
                        <input 
                            type="text" 
                            name="price" 
                            value={editedProduct.price} 
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
                            value={editedProduct.type} 
                            onChange={handleChange} 
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Imagen (URL)</label>
                        <input 
                            type="text" 
                            name="image" 
                            value={editedProduct.image} 
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

EditModal.propTypes = {
    product: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};
