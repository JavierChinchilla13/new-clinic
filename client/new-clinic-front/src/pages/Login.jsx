import Button from '../components/Button';
import Input from '../components/Input'
import Logo from '../components/Logo';


const Login = () => {



    const handleSearch = (mail, password) => {
        console.log(mail, password);
    }


    return (
        <div className='w-screen h-screen flex items-center justify-center 
            bg-gradient-to-r from-blue-300 to-emerald-400'>
            <div className=" w-[600px] h-[550px] shadow-2xl rounded-lg shadow-emerald-400 bg-white">

                <Logo classNames='w-[440px] ml-[100px]' />

                <p className='text-lg ml-[150px] mt-[10px]'>
                    Password
                </p>
                <Input
                    placeHolder='Email'
                    returnTextFunc={(mail) => handleSearch(mail)}
                    classNames={`py-2 pl-10 rounded-xl border-2 
                        border-blue-300 focus:outline-sky-500 
                        ml-[150px] mt-[5px] w-[300px]`}
                />

                <p className='text-lg ml-[150px] mt-[10px]'>
                    Password
                </p>

                <Input
                    placeHolder='Password'
                    returnTextFunc={(password) => handleSearch(password)}
                    classNames={`py-2 pl-10 rounded-xl border-2 
                        border-blue-300 focus:outline-sky-500 
                        ml-[150px] mt-[5px] w-[300px]`}
                />

                <Button value='Sign In' extraClassNames='ml-[250px] mt-[25px] mb-[10px]' />

                <p className='text-lg ml-[150px] mt-[10px]'>
                    Don&apos;t have an account?
                    <u href='#' className='text-blue-400 hover:text-blue-600 ml-[10px] cursor-pointer'>
                        Sign up
                    </u>
                </p>

            </div>
        </div>
    )
}

export default Login