import { useContext } from "react";
import Header from "../components/Header";
import { AuthContext } from "../../auth/context/AuthContext";

const AboutUs = () => {

    const { authState } = useContext(AuthContext);
    console.log(JSON.stringify(authState));

    return (
        <>
            <Header />
            <h1
                className="text-4xl ml-12 mt-12 font-bold "
            >Bienvenido a New Clinic!</h1>
            <div className="bg-white py-12 px-8 flex flex-col lg:flex-row items-center lg:items-start">
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Sobre nosotros</h2>
                    <p className="text-xl text-gray-600 mb-6">• Medicina Estética • Medicina General • Nutrición • Spa</p>
                    <p className="text-gray-600">
                        Información general de la empresa y explicación de quiénes son. Información general de la empresa y explicación de quiénes son.
                        Información general de la empresa y explicación de quiénes son. Información general de la empresa y explicación de quiénes son.
                        Información general de la empresa y explicación de quiénes son. Información general de la empresa y explicación de quiénes son.
                    </p>
                </div>
                <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
                    <img 
                        src="C:\Users\lizan\OneDrive\Imágenes\meme" 
                        alt="Doctora en New Clinic" 
                        className="w-64 h-auto"
                    />
                </div>
            </div>
        </>
    )
}

export default AboutUs