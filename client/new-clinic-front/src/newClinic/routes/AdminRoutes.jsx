import { Route, Routes } from "react-router-dom"
import AddUser from "../pages/addUser"

const AdminRoutes = () => {
  return (

    <Routes>
        {/* AddUser route */}
        <Route path="addUser" element={<AddUser />} />

    </Routes>
  )
}

export default AdminRoutes