import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import FormRow from "../components/shared/FormRow";
import useLocalState from "../utils/localState";
import Button from "../components/shared/Button";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { alert, showAlert, loading, setLoading, success, setSuccess } =
    useLocalState();

  const query = useQuery();

  // Variables para pruebas
  const token = query.get("token");
  const email = query.get("email");

  useEffect(() => {
    console.log("Token recibido:", token);
    console.log("Email recibido:", email);
  }, [token, email]);

  const handleChange = (e) => {
    setPassword(e.target.value);
    console.log("Valor actualizado de la contraseña:", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Verifica que el valor de la contraseña esté correcto
    console.log("Password al enviar:", password);

    if (!password) {
      showAlert({ text: "Por favor, ingrese una contraseña" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/v1/auth/reset-password", {
        password,
        token,
        email,
      });
      console.log("Respuesta del servidor:", response.data);
      setLoading(false);
      setSuccess(true);
      showAlert({
        text: "Éxito, redirigiendo a la página de inicio de sesión en breve",
        type: "success",
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : "Ocurrió un error inesperado";
      console.error("Error al enviar la solicitud:", error);
      showAlert({ text: errorMessage });
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-r from-blue-300 to-emerald-400"
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {alert.show && (
          <div
            className={`alert alert-${
              alert.type
            } mb-4 p-4 text-center rounded-lg ${
              alert.type === "error"
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {alert.text}
          </div>
        )}
        {!success && (
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl font-semibold text-center mb-4">
              Restablecer Contraseña
            </h4>
            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
            />

            <Button type="submit" extraStyle={"w-full"} disabled={loading}>
              {loading ? "Por favor, espere..." : "Nueva contraseña"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
