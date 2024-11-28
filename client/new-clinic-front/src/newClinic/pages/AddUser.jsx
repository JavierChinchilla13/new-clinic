// import { useForm } from "../../hooks/useForm";
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

  const inputExtraStyle = `w-2/4 `;
  const buttonExtraStyle = ` mt-4 w-32`;

  const { showAlert, loading, setLoading, setSuccess, hideAlert } =
    useLocalState();

  const onInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onRegisterUser = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, email, password } = formState;
    const registerNewUser = { name, email, password };

    try {
      const { data } = await axios.post(
        `/api/v1/auth/register`,
        registerNewUser
      );

      setSuccess(true);
      setFormState({ name: "", email: "", password: "" });
      showAlert({ text: data.msg, type: "success" });
    } catch (error) {
      const { msg } = error.response.data;
      showAlert({ text: msg || "there was an error" });
    }
    setLoading(false);
  };

  return (
    <>
      <Header />

      <div className="flex justify-between">
        <div className="w-full justify-items-center">
          <div className="grid w-9/12 justify-items-center bg-gray-200 rounded-2xl p-14 gap-4 m-24 ml-60">
            <h1 className="text-3xl mb-7 font-bold  text-gray-600 ">
              Agregar administrador
            </h1>

            <Input
              text={formState.name}
              placeHolder="Nombre"
              extraStyle={inputExtraStyle}
              nameRef={"name"}
              handleText={onInputChange}
              key={"name"}
            />

            <Input
              text={formState.email}
              placeHolder="Email"
              extraStyle={inputExtraStyle}
              nameRef={"email"}
              handleText={onInputChange}
              key={"email"}
            />

            <Input
              text={formState.password}
              placeHolder="Contraseña"
              extraStyle={inputExtraStyle}
              nameRef={"password"}
              handleText={onInputChange}
              key={"password"}
            />

            <Button
              extraStyle={buttonExtraStyle}
              onClickFunc={onRegisterUser}
              type="submit"
              disabled={loading}
            >
              {loading ? "Caragndo..." : "Registrar"}
            </Button>
          </div>
        </div>

        <div className=" grid w-full justify-items-center">
          <h1 className="text-3xl mt-24 font-bold text-gray-600">
            Lista de administradores
            <AdminList></AdminList>
          </h1>
        </div>
      </div>
    </>
  );
};

export default AddUser;
