import { Route, Routes } from "react-router-dom"
import Services from "../pages/Services"
import Products from "../pages/Products"
import Contact from "../pages/Contact"
import AboutUs from "../pages/AboutUs"

const NewClinicRoutes = () => {
  return (

    <Routes>
        {/* Home route */}
        <Route path="/*" element={<AboutUs />}/>

        {/* Contact route */}
        <Route path="/contact" element={<Contact />}/>

        {/* Products route */}
        <Route path="/products" element={<Products />}/>

        {/* Services route */}
        <Route path="/services" element={<Services />}/>

    </Routes>
  )
}

export default NewClinicRoutes