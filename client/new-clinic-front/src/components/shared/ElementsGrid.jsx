import { useState } from "react";
import { ContactCard } from "./ContactCard";
import ItemCard from "./ItemCard";
import { ItemDetailsCard } from "./ItemDetailsCard";
import PropTypes from "prop-types";

/*
    type data = {
        key={index}
        title={element.title}
        price={element.price}
        imageUrl={element.imageUrl}
        description={element.description}
    }

*/

export const ElementsGrid = ({data, searchTerm}) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);

    // Filtro según tipo
    const filteredProducts = searchTerm
    ? data.filter((element) =>
        element.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : data;

    const handleViewDetails = (element) => {
        setSelectedProduct(element);
        setShowContactForm(false);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const handleContact = () => {
        setShowContactForm(true);
    };

  return (
    <>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 max-w-6xl mx-auto">
            {filteredProducts.map((element, index) => (
              <ItemCard
                key={index}
                title={element.title}
                price={element.price}
                imageUrl={element.imageUrl}
                description={element.description}
                onViewDetails={() => handleViewDetails(element)}
              />
            ))}
    </div>

        <ItemDetailsCard
        data={selectedProduct}
        onClose={handleCloseModal}
        onContact={handleContact}
        />

        {showContactForm && (
        <ContactCard onClose={() => setShowContactForm(false)} />
        )}
    </>
  )
}

ElementsGrid.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchTerm: PropTypes.string,
}

