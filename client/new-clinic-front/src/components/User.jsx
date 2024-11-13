import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Logo from "../components/shared/Logo";
import Label from "../components/shared/Label";
import { useState } from "react";
import { getUser, createUser } from "../utils/getUsers";
import { toast } from "react-toastify";

const Login = ({ onSwitchForm }) => {
  // Component styles
  const containerStyles = "flex flex-col items-center space-y-4"; // Estilo para alinear verticalmente los elementos
  const textBoxStyles = "w-full"; // Ajustar el ancho al 100% del contenedor padre
  const imgStyles = "hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4"; // Ajustar el tamaño de la imagen
  const buttonStyles = "mt-4 w-1/2"; // Centrar y ajustar el tamaño del botón

  // State management
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
    isLogin: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password, name, isLogin } = formValues;

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isLogin) {
      getUser()
        .then((response) => {
          console.log("Login successful", response.data);
          toast.success("Login successful");
        })
        .catch((error) => {
          console.error("Login failed", error);
          toast.error("Login failed");
        });
    } else {
      createUser({ name, email, password })
        .then((response) => {
          console.log("Registration successful", response.data);
          toast.success("Registration successful");
        })
        .catch((error) => {
          console.error("Registration failed", error);
          toast.error("Registration failed");
        });
    }
  };

  const toggleForm = () => {
    setFormValues({ ...formValues, isLogin: !formValues.isLogin });
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
          {!formValues.isLogin && (
            <div className="w-full">
              <Label>Name</Label>
              <Input
                text={formValues.name}
                name="name"
                handleText={handleInputChange}
                placeHolder="Name"
                extraStyle={textBoxStyles}
              />
            </div>
          )}

          <div className="w-full">
            <Label>Email</Label>
            <Input
              text={formValues.email}
              name="email"
              handleText={handleInputChange}
              placeHolder="Email"
              extraStyle={textBoxStyles}
            />
          </div>

          <div className="w-full">
            <Label>Password</Label>
            <Input
              text={formValues.password}
              name="password"
              handleText={handleInputChange}
              placeHolder="Password"
              extraStyle={textBoxStyles}
            />
          </div>

          <Button extraStyle={buttonStyles} onClickFunc={onSubmit}>
            {formValues.isLogin ? "Sign in" : "Register"}
          </Button>
        </form>

        <Label>
          {formValues.isLogin ? "Don't have an account?" : "Already have an account?"}
          <u
            onClick={toggleForm}
            className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer"
          >
            {formValues.isLogin ? "Sign up" : "Sign in"}
          </u>
        </Label>
      </div>
    </div>
  );
};

export default Login;
