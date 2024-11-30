import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import axios from "axios";
import useLocalState from "../utils/localState";
import AdminList from "../components/shared/AdminList";

const AddUser = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [refreshTable, setRefreshTable] = useState(false);

  const { alert, showAlert, loading, setLoading, setSuccess, hideAlert } =
    useLocalState();

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onRegisterUser = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);

    try {
      const { data } = await axios.post(`/api/v1/auth/register`, formState);
      setSuccess(true);
      setFormState({ name: "", email: "", password: "" });
      showAlert({ text: data.msg, type: "success" });

      // Refrescar tabla de usuarios
      setRefreshTable((prev) => !prev);
    } catch (error) {
      const { msg } = error.response?.data || "Hubo un error.";
      showAlert({ text: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-8 p-8 bg-gray-50">
        {/* Formulario */}
        <div className="w-full lg:w-5/12 bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-700 mb-4">
            Agregar administrador
          </h1>

          {alert.show && (
            <div
              className={`p-4 mb-4 text-center rounded-lg ${
                alert.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {alert.text}
            </div>
          )}

          <form onSubmit={onRegisterUser} className="space-y-4">
            <Input
              text={formState.name}
              placeHolder="Nombre"
              extraStyle="w-full"
              nameRef="name"
              handleText={onInputChange}
            />
            <Input
              text={formState.email}
              placeHolder="Email"
              extraStyle="w-full"
              nameRef="email"
              handleText={onInputChange}
            />
            <Input
              text={formState.password}
              placeHolder="Contraseña"
              extraStyle="w-full"
              nameRef="password"
              handleText={onInputChange}
            />
            <Button
              extraStyle="w-full bg-blue-500 text-white py-2 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Registrar"}
            </Button>
          </form>
        </div>

        {/* Lista de Administradores */}
        <div className="w-full lg:w-6/12 bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-700 mb-4">
            Lista de administradores
          </h1>
          <AdminList refreshTrigger={refreshTable} />
        </div>
      </div>
    </>
  );
};

export default AddUser;
