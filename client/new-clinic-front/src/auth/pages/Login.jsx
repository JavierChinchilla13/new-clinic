import { Link, useNavigate } from "react-router-dom";
import Button from "../../newClinic/components/shared/Button";
import Input from "../../newClinic/components/shared/Input";
import { useContext, useState } from "react";
import { logInUser, resgisterUser } from "../helpers/getUsers";
import { toast } from "react-toastify";
import Logo from "../../newClinic/components/shared/Logo";
import { AuthContext } from "../context/AuthContext";
 
const Login = () => {
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Component styles
  const containerStyles = "flex flex-col items-center space-y-4"; // Estilo para alinear verticalmente los elementos
  const textBoxStyles = "w-9/12 mt-4 ml-16"; // Ajustar el ancho al 100% del contenedor padre
  const imgStyles = "hover:scale-105 transition-all w-3/4 max-w-[440px] mt-4 ml-16"; // Ajustar el tamaño de la imagen
  const buttonStyles = "mt-4 w-32"; // Centrar y ajustar el tamaño del botón
  const labelStyle = 'text-lg mt-4 ml-16'

  // State management
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { email, password, name } = formValues;

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill out all fields");
      return;
    }


    if (isLogin) {
      
      login(email, password );
      // const {successStatus, response} = logInUser(email, password);
      // if(successStatus) {
      //   console.log('login')
      //   console.log(response.data)
      //   login(email, password );
      //   navigate('/');
      // }
      // console.log(response)
      // console.error("Login failed");
      // toast.error("Login failed");

        // .then((response) => {
        //   console.log("Login successful", response.data);
        //   toast.success("Login successful");
        // })
        // .catch((error) => {
        //   console.error("Login failed", error);
        //   toast.error("Login failed");
        // });
    } else {
      // createUser({ name, email, password })
        // .then((response) => {
        //   console.log("Registration successful", response.data);
        //   toast.success("Registration successful");
        // })
        // .catch((error) => {
        //   console.error("Registration failed", error);
        //   toast.error("Registration failed");
        // });
    }


  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
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
          {!isLogin && (
            <div className="w-full">
              <label className={labelStyle}>Name</label>
              <Input
                text={formValues.name}
                nameRef="name"
                handleText={handleInputChange}
                placeHolder="Name"
                extraStyle={textBoxStyles}
              />
            </div>
          )}

          <div className="w-full">
            <label className={labelStyle}>Email</label>
            <Input
              text={formValues.email}
              nameRef="email"
              handleText={handleInputChange}
              placeHolder="Email"
              extraStyle={textBoxStyles}
            />
          </div>

          <div className="w-full">
            <label className={labelStyle}>Password</label>
            <Input
              text={formValues.password}
              nameRef="password"
              handleText={handleInputChange}
              placeHolder="Password"
              extraStyle={textBoxStyles}
            />
          </div>

          <Button extraStyle={buttonStyles} onClickFunc={onSubmit}>
            {isLogin ? "Sign in" : "Register"}
          </Button>
        </form>

        <label className={labelStyle}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <u
            onClick={toggleForm}
            className="text-blue-400 hover:text-blue-600 ml-2 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Sign in"}
          </u>
        </label>
      </div>
    </div>
  );
};

export default Login;
