import React, { useState } from 'react';

// Componente para tarjetas de servicio
const ServiceCard = ({ title, price, imageUrl, type, onViewDetails }) => {
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

// Componente de más detalles para servicios
const ServiceDetailsModal = ({ service, onClose, onContact }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
        <img className="w-full h-64 object-cover mb-4" src={service.imageUrl} alt={service.title} />
        <p className="text-gray-700 mb-4">{service.description}</p>
        <span className="text-green-600 font-bold text-xl">{service.price}</span>
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

// Tarjetas de Servicios
const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      title: 'Masaje Relajante',
      description: 'Disfruta de un masaje que alivia el estrés.',
      price: '₡30.000',
      type: 'Bienestar',
      imageUrl: 'https://via.placeholder.com/400?text=Masaje+Relajante',
    },
    {
      title: 'Corte de Pelo',
      description: 'Estilo moderno para hombres y mujeres.',
      price: '₡15.000',
      type: 'Estética',
      imageUrl: '',
    },
    {
      title: 'Asesoría Nutricional',
      description: 'Plan personalizado para una alimentación saludable.',
      price: '₡50.000',
      type: 'Salud',
      imageUrl: '',
    },
    {
      title: 'Entrenamiento Personal',
      description: 'Entrenamientos adaptados a tus necesidades.',
      price: '₡40.000',
      type: 'Fitness',
      imageUrl: '',
    },
    {
      title: 'Facial Hidratante',
      description: 'Tratamiento para una piel radiante y saludable.',
      price: '₡20.000',
      type: 'Estética',
      imageUrl: '',
    },
    {
      title: 'Yoga en Grupo',
      description: 'Clases grupales para mejorar tu bienestar.',
      price: '₡10.000',
      type: 'Bienestar',
      imageUrl: '',
    },
    {
      title: 'Terapia de Relajación',
      description: 'Métodos para liberar tensiones y estrés.',
      price: '₡35.000',
      type: 'Bienestar',
      imageUrl: '',
    },
  ];

  // Filtro según tipo
  const filteredServices = searchTerm 
   ? services.filter(service =>
       service.type.toLowerCase().includes(searchTerm.toLowerCase())
   ) 
   : services;

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setShowContactForm(false);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleContact = () => {
    setShowContactForm(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Servicios</h2>
      <div className="flex justify-end mb-4"> 
        <input
            type="text"
            placeholder="Buscar por tipo de servicio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-80 p-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
        {filteredServices.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            price={service.price}
            imageUrl={service.imageUrl}
            type={service.type}
            onViewDetails={() => handleViewDetails(service)}
          />
        ))}
      </div>

      <ServiceDetailsModal
        service={selectedService}
        onClose={handleCloseModal}
        onContact={handleContact}
      />
      
      {showContactForm && <ContactFormModal onClose={() => setShowContactForm(false)} />}
    </div>
  );
};

export default Services;
