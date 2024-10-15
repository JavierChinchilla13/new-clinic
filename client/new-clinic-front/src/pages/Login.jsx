import { Link } from "react-router-dom";
import Button from '../components/shared/Button';
import Input from '../components/shared/Input'
import Logo from '../components/shared/Logo';
import Label from '../components/shared/Label';


const Login = () => {

    //component styles
    const textBoxStyles = 'ml-[150px] mt-[5px] w-[300px]';
    const imgStyles = 'hover:scale-105 transition-all ml-[100px] w-[440px] mt-[10px]';
    const buttonStyles = 'ml-[250px] mt-[25px] mb-[10px]';

    const handleSearch = (mail, password) => {
        console.log(mail, password);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center 
            bg-gradient-to-r from-blue-300 to-emerald-400'>
            <div className=" w-[600px] h-[560px] shadow-2xl rounded-lg shadow-emerald-400 bg-white">

                <Link to='/'>
                    <Logo extraStyle={imgStyles} />
                </Link>

                <Label>
                    Email
                </Label>

                <Input
                    placeHolder='Email'
                    returnTextFunc={(mail) => handleSearch(mail)}
                    extraStyle={textBoxStyles}
                />

                <Label>
                    Password
                </Label>

                <Input
                    placeHolder='Password'
                    returnTextFunc={(password) => handleSearch(password)}
                    extraStyle={textBoxStyles}
                />

                <Button extraStyle={buttonStyles} >
                    Sign in
                </Button>

                <Label>
                    Don&apos;t have an account?
                    <u href='#' className='text-blue-400 hover:text-blue-600 ml-[10px] cursor-pointer'>
                        Sign up
                    </u>
                </Label>

            </div>
        </div>
    )
}

export default Login