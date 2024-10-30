import React, { useState } from 'react';

// Componente tarjeta de producto
const ProductCard = ({ title, price, imageUrl, type, onViewDetails }) => {
  return (
    <div className="w-full max-w-xs rounded-lg overflow-hidden shadow-lg bg-white"> 
      <img className="w-full h-64 object-cover" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <h3 className="font-bold text-2xl mb-2">{title}</h3>
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
};

// Componente de más detalles
const ProductDetailsModal = ({ product, onClose, onContact }) => {
  if (!product) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        <img className="w-full h-64 object-cover mb-4" src={product.imageUrl} alt={product.title} />
        <p className="text-gray-700 mb-4">{product.description}</p>
        <span className="text-green-600 font-bold text-xl">{product.price}</span>
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
};

// Form de contacto
const ContactFormModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    details: '',
  });

  //Actualiza formData al ingreso de datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //Correo
  const handleSubmitEmail = (e) => {
    e.preventDefault();
    alert('Datos enviados por correo: ' + JSON.stringify(formData));
    onClose();
  };
  //whatsApp
  const handleSubmitWhatsApp = (e) => {
    e.preventDefault();
    const whatsappUrl = 'https://wa.link/4upxnv';
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Contacto</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Celular:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Detalles:</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              rows="4"
              required
            />
          </div>
          <div className="flex justify-between">
            <button 
              onClick={handleSubmitEmail} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar por correo
            </button>
            <button 
              onClick={handleSubmitWhatsApp} 
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Enviar por WhatsApp
            </button>
          </div>
        </form>
        <button 
          onClick={onClose} 
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Tarjetas de Productos
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      title: 'Crema Especial',
      description: 'Un tratamiento especial para tu piel',
      price: '₡10.000',
      type: 'Facial',
      imageUrl: 'https://via.placeholder.com/400?text=Exfoliaci%C3%B3n+Corporal',
    },
    {
      title: 'Humectante',
      description: 'Elimina tatuajes no deseados',
      price: '₡200.000',
      type: 'Eliminación',
      imageUrl: '',
    },
    {
      title: 'Aceite Relajante',
      description: 'Un aceite para liberar tensiones',
      price: '₡15.000',
      type: 'Masaje',
      imageUrl: '',
    },
    {
      title: 'Crema Capilar',
      description: 'Tratamiento para un cabello saludable',
      price: '₡80.000',
      type: 'Cuidado',
      imageUrl: '',
    },
    {
      title: 'Crema de pies',
      description: 'Disfruta de un producto completo para pedicura',
      price: '₡6.000',
      type: 'Pedicura',
      imageUrl: ''
    },
    {
      title: 'Crema de manos',
      description: 'Cuida tus manos con un producto profesional',
      price: '₡5.000',
      type: 'Manicura',
      imageUrl: '',
    },
    {
      title: 'Antienvejecimiento',
      description: 'Reduce las arrugas y rejuvenece tu piel',
      price: '₡120.000',
      type: 'Facial',
      imageUrl: ''
    },
    {
      title: 'Exfoliante',
      description: 'Renueva tu piel con una exfoliación profunda',
      price: '₡90.000',
      type: 'Corporal',
      imageUrl: '',
    },
  ];

   // Filtro según tipo
   const filteredProducts = searchTerm 
   ? products.filter(product =>
       product.type.toLowerCase().includes(searchTerm.toLowerCase())
   ) 
   : products;

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowContactForm(false); 
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleContact = () => {
    setShowContactForm(true);
  };

  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Productos</h2>
        <div className="flex justify-end mb-4"> 
            <input
                type="text"
                placeholder="Buscar por tipo de producto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-80 p-2 border rounded"
            />

    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
      {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            price={product.price}
            imageUrl={product.imageUrl}
            type={product.type}
            onViewDetails={() => handleViewDetails(product)}
          />
        ))}
      </div>

      
      <ProductDetailsModal
        product={selectedProduct}
        onClose={handleCloseModal}
        onContact={handleContact}
      />

      
      {showContactForm && <ContactFormModal onClose={() => setShowContactForm(false)} />}
    </div>
  );
};

export default Products;
