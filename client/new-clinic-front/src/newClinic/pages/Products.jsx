import Header from "../components/Header";
import { useContext, useEffect, useState } from "react";
import Input from "../components/shared/Input";
import { ElementsGrid } from "../components/shared/ElementsGrid";
import ElementModal from "../components/ElementModal";
import { AuthContext } from "../../auth/context/AuthContext";
import axios from "axios";
import Footer from "../components/Footer";

const Products = () => {
  const { authState } = useContext(AuthContext);

  // Input search term
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productsList, setProductsList] = useState();
  const [elementModalAnimationStyle, setElementModalAnimationStyle] = useState(
    "animate__animated animate__fadeIn"
  );

  const getProductsList = () => {
    axios
      .get("/api/v1/products/")
      .then(({ data }) => {
        if (authState?.logged) {
          setProductsList(
            data?.products.filter((element) => element.type === "producto")
          );
        } else {
          setProductsList(
            data?.products.filter(
              (element) => element.type === "producto" && element.state === true
            )
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductsList();
  }, []);

  const onCloseAddModal = () => {
    console.log("recall");
    getProductsList();
    setElementModalAnimationStyle("animate__animated animate__fadeOut");
    setTimeout(() => {
      setElementModalAnimationStyle("animate__animated animate__fadeIn");
      setIsModalOpen(!isModalOpen);
    }, 500);
  };

  const onCloseModal = () => {
    getProductsList();
  };

  // const handleAddProduct = (product) => {
  //   console.log("Product added:", product);
  // };

  return (
    <div className="grid min-h-screen pt-[150px]">
      <Header />

      <div className="flex-grow min-h-screen">
        <h2 className="text-2xl font-bold mb-4 ml-20 mt-8">Productos</h2>
        <div className="flex justify-center mb-4">
          <Input
            text={searchTerm}
            handleText={(newText) => setSearchTerm(newText.target.value)}
            placeHolder="Buscar por tipo de producto..."
            extraStyle="w-[300px]"
          />
        </div>

        {authState?.logged ? (
          <>
            <div className="flex justify-start relative">
              <button
                className={`rounded-md bg-yellow-300 
                        py-2 px-4 text-center text-lg transition-all shadow-sm 
                        hover:shadow-lg text-slate-600 hover:text-white
                        focus:text-white active:text-white disabled:pointer-events-none 
                        disabled:opacity-50 disabled:shadow-none ml-24`}
                onClick={() => {
                  // elementModalStyle = 'animate__animated animate__fadeIn';
                  setIsModalOpen(!isModalOpen);
                }}
              >
                Añadir nuevo producto
              </button>
            </div>

            <ElementModal
              title="Añadir Producto"
              isOpen={isModalOpen}
              onClose={onCloseAddModal}
              // onAddProduct={handleAddProduct}
              type="producto"
              style={elementModalAnimationStyle}
            />
          </>
        ) : null}

        <ElementsGrid
          data={productsList}
          searchTerm={searchTerm}
          onCloseDeleteModal={onCloseModal}
          onCloseEditModal={onCloseModal}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Products;
