import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import NewClinicRoutes from "../newClinic/routes/NewClinicRoutes";
// import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import AdminRoutes from "../newClinic/routes/AdminRoutes";
import { AppProvider } from "../newClinic/context";

const AppRouter = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminRoutes />
              </PrivateRoute>
            }
          />

          <Route path="/*" element={<NewClinicRoutes />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default AppRouter;
