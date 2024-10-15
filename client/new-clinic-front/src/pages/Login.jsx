import Button from '../components/shared/Button';
import Input from '../components/shared/Input'
import Logo from '../components/shared/Logo';
import Label from '../components/shared/Label';


const Login = () => {

    const handleSearch = (mail, password) => {
        console.log(mail, password);
    }

    return (
        <div className='w-screen h-screen flex items-center justify-center 
            bg-gradient-to-r from-blue-300 to-emerald-400'>
            <div className=" w-[600px] h-[550px] shadow-2xl rounded-lg shadow-emerald-400 bg-white">

                <Logo widthPx='440' extraStyle='ml-[100px]' />

                <Label>
                    Email
                </Label>

                <Input
                    placeHolder='Email'
                    returnTextFunc={(mail) => handleSearch(mail)}
                />

                <Label>
                    Password
                </Label>

                <Input
                    placeHolder='Password'
                    returnTextFunc={(password) => handleSearch(password)}

                />

                <Button extraStyle='ml-[250px] mt-[25px] mb-[10px]' >
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