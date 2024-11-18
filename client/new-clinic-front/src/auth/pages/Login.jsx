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
  const containerStyles = "flex flex-col items-center space-y-4";
  const textBoxStyles = "w-9/12 mt-4 ml-16";
  const imgStyles =
    "hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4 ml-16";
  const buttonStyles = "mt-4 w-32";
  const labelStyle = "text-lg mt-4 ml-16";

  // Estados
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

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
      const url = isLogin ? "/api/v1/auth/login" : "";
      console.log("Enviando solicitud a:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        alert(isLogin ? "Login correcto!" : "Registro correcto!");
        login(email, password);
        navigate("/"); // Redirige a la página principal
        setEmail("");
        setPassword("");
      } else {
        const errorData = await response.json();
        alert(
          (isLogin ? "Login failed: " : "Registro fallido: ") +
            (errorData.message || "Unknown error")
        );
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
      <div className="w-full max-w-[600px] p-8 shadow-2xl rounded-lg shadow-emerald-400 bg-white">
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
            placeHolder="Password"
            extraStyle={textBoxStyles}
          />
          <Button type="submit" extraStyle={buttonStyles}>
            {isLogin ? "Iniciar sesión" : "Registro"}
          </Button>
        </form>

        <label className={labelStyle}>
          {isLogin ? "No tiene cuenta?" : "Tiene cuenta?"}
          <u
            onClick={toggleForm}
            className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer"
          >
            {isLogin ? "Inscribirse" : "Iniciar sesión"}
          </u>
        </label>
      </div>
    </div>
  );
};

export default Login;
