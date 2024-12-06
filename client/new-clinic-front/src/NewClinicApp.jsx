import { AuthProvider } from "./auth/context/AuthProvider"
import { AppProvider } from "./newClinic/context"
import AppRouter from "./router/AppRouter"

export const NewClinicApp = () => {
  return (
    <AppProvider>
      <AuthProvider>
          <AppRouter/>
      </AuthProvider>
    </AppProvider>
    )
}
