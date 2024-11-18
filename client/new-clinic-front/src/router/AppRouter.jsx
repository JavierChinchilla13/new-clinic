import { Routes, Route } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import NewClinicRoutes from "../newClinic/routes/NewClinicRoutes"
import { PublicRoute } from "./PublicRoute"

const AppRouter = () => {
  return (
    
    <Routes>


        <Route path="/auth/*" element={ 
            <PublicRoute>
              <AuthRoutes/>
            </PublicRoute>
          }/>


        <Route path="/*" element={ <NewClinicRoutes/>}/>

    </Routes>

)
}

export default AppRouter