import { Link, useNavigate } from "react-router-dom";
import Button from "../../newClinic/components/shared/Button";
import Input from "../../newClinic/components/shared/Input";
import { useState, useContext } from "react";
import Logo from "../../newClinic/components/shared/Logo";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estilos
  const containerStyles = "flex flex-col items-center h-42";
  const textBoxStyles = "w-4/6 mt-4";
  const imgStyles =
    "hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4 ml-16";
  const buttonStyles = "mt-6 mb-6";

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    console.log("Formulario enviado");
    event.preventDefault();

    // Mensaje de ayuda para depuración
    console.log("Formulario enviado");

    if (!email || !password) {
      toast.error("Es necesario el email y contraseña");
      return;
    }

    const user = { email, password };

    try {
      const url = "/api/v1/auth/login";
      console.log("Enviando solicitud a:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log(response);
        console.log("Login correcto!");
        login(email, password); //se actualiza el context
        navigate("/"); // Redirige a la página principal
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        console.log("Login fallido: " + (errorData.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Ocurrió un error durante el proceso.");
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
      bg-gradient-to-r from-blue-300 to-emerald-400"
    >
      <div className="w-full max-w-[600px] p-8 shadow-2xl rounded-lg shadow-emerald-400 bg-white ">
        <Link to="/">
          <Logo extraStyle={imgStyles} />
        </Link>

        <form onSubmit={onSubmit} className={containerStyles}>
          <Input
            text={email}
            nameRef="email"
            handleText={(e) => setEmail(e.target.value)}
            placeHolder="Email"
            extraStyle={textBoxStyles}
          />
          <Input
            text={password}
            nameRef="password"
            handleText={(e) => setPassword(e.target.value)}
            placeHolder="Contraseña"
            extraStyle={textBoxStyles}
          />

          <Button type="submit" extraStyle={buttonStyles}>
            {"Iniciar sesión como colaborador"}
          </Button>

          <p>
            <Link
              to="../forgot-password"
              className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer"
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
