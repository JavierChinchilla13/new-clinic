import { Route, Routes } from "react-router-dom";
import Services from "../pages/Services";
import Products from "../pages/Products";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import ResetPassword from "../pages/ResetPassword";
import Verify from "../pages/Verify";

const NewClinicRoutes = () => {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/*" element={<AboutUs />} />

      {/* Contact route */}
      <Route path="/contact" element={<Contact />} />

      {/* Products route */}
      <Route path="/products" element={<Products />} />

      {/* Services route */}
      <Route path="/services" element={<Services />} />

      <Route path="/user/reset-password" element={<ResetPassword />} />

      <Route path="/user/verify-email" element={<Verify />} />
    </Routes>
  );
};

export default NewClinicRoutes;
