import { useForm } from "../../hooks/useForm"
import Header from "../components/Header"
import Button from "../components/shared/Button"
import Input from "../components/shared/Input"

const AddUser = () => {

    const {formState, onInputChange} = useForm({
        name: '',
        email: '',
        password: ''
    });

    const inputExtraStyle = `w-2/4 `;
    const buttonExtraStyle = ` mt-4 w-32`;

    const onRegisterUser = () => {
        console.log(formState.name);
        console.log(formState.email);
        console.log(formState.password);
    }

  return (
    <>
        <Header/>

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
                    nameRef={'name'}
                    handleText={onInputChange}
                    key={"name"}
                    />

                    <Input
                    text={formState.email}
                    placeHolder="Email"
                    extraStyle={inputExtraStyle}
                    nameRef={'email'}
                    handleText={onInputChange}
                    key={"email"}
                    />

                    <Input
                    text={formState.password}
                    placeHolder="Contraseña"
                    extraStyle={inputExtraStyle}
                    nameRef={'password'}
                    handleText={onInputChange}
                    key={"password"}
                    />
                    
                    <Button
                        extraStyle={buttonExtraStyle}
                        onClickFunc={onRegisterUser}
                    >
                        Registrar
                    </Button>
                </div>
                


            </div>

            <div className=" grid w-full justify-items-center">

                <h1 className="text-3xl mt-24 font-bold text-gray-600">Lista de administradores</h1>

            </div>

        </div>

        
    </>
  )
}

export default AddUser