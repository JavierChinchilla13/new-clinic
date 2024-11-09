import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Header from "./components/Header.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Products from "./pages/Products.jsx";
import Services from "./pages/Services.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home route */}
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <AboutUs />
            </>
          }
        />

        {/* Contact route */}
        <Route
          exact
          path="/contact"
          element={
            <>
              <Header />
              <Contact />
            </>
          }
        />

        {/* Products route */}
        <Route
          exact
          path="/products"
          element={
            <>
              <Header />
              <Products />
            </>
          }
        />

        {/* Services route */}
        <Route
          exact
          path="/services"
          element={
            <>
              <Header />
              <Services />
            </>
          }
        />

        {/* Login route */}
        <Route exact path="/login" element={<Login />} />

        {/* SignUp route */}
        <Route exact path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
