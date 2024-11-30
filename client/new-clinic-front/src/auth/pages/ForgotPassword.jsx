import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "../../newClinic/components/shared/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ show: false, text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const showAlert = (alertData) => {
    setAlert({ show: true, ...alertData });
  };

  const hideAlert = () => {
    setAlert({ show: false, text: "", type: "" });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    hideAlert();

    if (!email) {
      showAlert({
        text: "Por favor proporcione un correo electrónico",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/auth/forgot-password", {
        email,
      });
      showAlert({ text: data.msg, type: "completado" });
      setSuccess(true);
    } catch (error) {
      showAlert({
        text: error.response?.data?.msg || "Algo salió mal, inténtelo de nuevo",
        type: "error",
      });
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
  bg-gradient-to-r from-blue-300 to-emerald-400"
    >
      <div className="min-h-[600px] flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8">
          {alert.show && (
            <div
              className={`text-center p-4 rounded-lg bg-${
                alert.type === "completado" ? "green" : "red"
              }-100 text-${alert.type === "completado" ? "green" : "red"}-700`}
            >
              {alert.text}
            </div>
          )}

          {!success && (
            <form
              className={`space-y-8 ${
                loading ? "opacity-50 pointer-events-none" : ""
              }`}
              onSubmit={handleSubmit}
            >
              <h4 className="text-3xl font-bold text-center text-gray-800">
                Recuperar Contraseña
              </h4>

              <div className="flex flex-col space-y-3">
                <label
                  htmlFor="email"
                  className="text-lg font-medium text-gray-700"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  placeholder="Digite su email"
                />
              </div>

              <Button
                type="submit"
                extraStyle={
                  "w-full py-2 rounded-lg font-semibold transition disabled:bg-blue-300 "
                }
                disabled={loading}
              >
                {loading ? "Porfavor Espere..." : "Obtener link"}
              </Button>

              <p className="text-center text-gray-600 text-lg">
                ¿Ya tiene cuenta?{" "}
                <Link
                  to="../login"
                  className="text-blue-500 hover:underline ml-1"
                >
                  Log In
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
