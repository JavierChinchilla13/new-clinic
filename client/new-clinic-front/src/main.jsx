import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { NewClinicApp } from "./NewClinicApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NewClinicApp/>
    </BrowserRouter>
  </StrictMode>
);
