import { Route, Routes } from "react-router-dom"
import SignUp from "../pages/SignUp"
// import Login from "../pages/Login"
import Login from '../pages/Login'

export const AuthRoutes = () => {
  return (
    <Routes>

        {/* <Route path="login" element={ <Login/>}/> */}
        <Route path="login" element={ <Login/>}/>
        <Route path="register" element={ <SignUp/>}/>

    </Routes>
)
}
