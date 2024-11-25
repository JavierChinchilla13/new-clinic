import { AuthProvider } from "./auth/context/AuthProvider"
import AppRouter from "./router/AppRouter"

export const NewClinicApp = () => {
  return (
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
    )
}
