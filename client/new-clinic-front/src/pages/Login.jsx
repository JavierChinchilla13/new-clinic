import { Link } from "react-router-dom";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Logo from "../components/shared/Logo";
import Label from "../components/shared/Label";
import { useState } from "react";

const Login = () => {
  //component styles
  const textBoxStyles = "ml-[150px] mt-[5px] w-[300px]";
  const imgStyles =
    "hover:scale-105 transition-all ml-[100px] w-[440px] mt-[10px]";
  const buttonStyles = "ml-[250px] mt-[25px] mb-[10px]";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    //si el input tiene menos de 1 caracter no se sube el formulario
    if (email.length < 1 || password.length < 1) return;
    console.log(email, password);
    setEmail('');
    setPassword('');

    }



  return (
    <div
      className="w-screen h-screen flex items-center justify-center 
            bg-gradient-to-r from-blue-300 to-emerald-400"
    >
      <div className=" w-[600px] h-[560px] shadow-2xl rounded-lg shadow-emerald-400 bg-white">
        <Link to="/">
          <Logo extraStyle={imgStyles} />
        </Link>

        <form onSubmit={(event) => onSubmit(event)}>

            <Label>Email</Label>

            <Input
            text={email}
            handleText={(e) => setEmail(e.target.value)}
            placeHolder="Email"
            extraStyle={textBoxStyles}
            />

            <Label>Password</Label>

            <Input
            text={password}
            handleText={(e) => setPassword(e.target.value)}
            placeHolder="Password"
            extraStyle={textBoxStyles}
            />

            <Button extraStyle={buttonStyles} onClickFunc={onSubmit}>
            Sign in
            </Button>
        </form>

        <Label>
          Don&apos;t have an account?
          <u
            href="#"
            className="text-blue-400 hover:text-blue-600 ml-[10px] cursor-pointer"
          >
            Sign up
          </u>
        </Label>
      </div>
    </div>
  );
};

export default Login;
