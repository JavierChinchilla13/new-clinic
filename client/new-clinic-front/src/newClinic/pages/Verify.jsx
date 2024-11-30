import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/shared/Button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const query = useQuery();
  const navigate = useNavigate(); // Hook para redirigir

  const verifyToken = async () => {
    setLoading(true);
    try {
      await axios.post("/api/v1/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error verifying token:", error);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-r from-blue-300 to-emerald-400"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {loading && (
          <div className="bg-blue-100 text-blue-600 p-4 text-center rounded-lg">
            <h2 className="text-lg font-semibold">Cargando...</h2>
          </div>
        )}

        {error && (
          <div className="bg-red-100 text-red-600 p-4 text-center rounded-lg">
            <h4 className="text-lg">
              Hubo un error, por favor verifica el enlace.
            </h4>
          </div>
        )}

        {success && (
          <>
            <h2 className="text-2xl font-semibold text-green-600 text-center mb-4">
              Cuenta confirmada
            </h2>
            <Button
              type="button"
              extraStyle={"w-full"}
              onClick={() => navigate("../../auth/login")} // Redirige al hacer clic
            >
              Inicia sesión
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyPage;
