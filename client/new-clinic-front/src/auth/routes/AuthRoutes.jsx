import { Route, Routes } from "react-router-dom";
// import SignUp from "../pages/SignUp";
// import Login from "../pages/Login"
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
export const AuthRoutes = () => {
  return (
    <Routes>
      {/* <Route path="login" element={ <Login/>}/> */}
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      {/* <Route path="register" element={<SignUp />} /> */}
    </Routes>
  );
};
