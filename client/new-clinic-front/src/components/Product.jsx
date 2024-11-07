// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import ProductInfo from "./ProductInfo";
// import PropTypes from "prop-types";
import { getProducts } from "../utils/productService";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((result) => {
        console.log("API response:", result); // Log the full response
        const products = result.data.products || [];
        setProducts(products); // Assuming result.data is the array of products
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>HOLAAA</h1>
      <ul /*className="product-header"*/>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              <div /*className="product-image"*/>
                <img
                  src={product.image}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </div>
              <div /*className="product-info"*/>
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <p /*className="product-price"*/>${product.price}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
}

// Define prop-types for validation
// Product.propTypes = {
//   _id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   state: PropTypes.string.isRequired,
// };
