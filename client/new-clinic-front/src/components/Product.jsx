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
        console.log("API response:", result);
        const products = result.data.products || [];
        setProducts(products);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <ul /*className="product-header"*/>
        {Array.isArray(products) && products.length > 0 ? (
          products
            .filter(
              (product) => product.type === "producto" && product.state === true
            ) // Filter by type
            .map((product, index) => (
              <li key={product.id || index}>
                {" "}
                {/* Use product.id or index as fallback */}
                <div /*className="product-image"*/>
                  <img
                    src={product.image}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
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
