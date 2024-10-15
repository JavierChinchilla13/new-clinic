import Logo from "./Logo"


const Header = () => {


    return (
        <header className='flex justify-between 
        items-center text-black py-6 px-8
        md:px-32 bg-emerald-400 drop-shadow-md'>

            <Logo classNames='w-[140px]' />

            <ul className='hidden xl:flex items-center
            gap-12 font-semibold text-base'>

                <li href='#' className='p-3 text-base text-emerald-700 hover:bg-emerald-600 
                hover:text-white rounded-md transition-all
                cursor-pointer'>Servicios</li>

                <li href='#' className='p-3 text-base text-emerald-700 hover:bg-emerald-600
                hover:text-white rounded-md transition-all
                cursor-pointer'>Productos</li>

                <li href='#' className='p-3 text-base text-emerald-700 hover:bg-emerald-600 
                hover:text-white rounded-md transition-all
                cursor-pointer'>Sobre nosotros</li>

                <li href='#' className='p-3 text-base text-emerald-700 hover:bg-emerald-600 
                hover:text-white rounded-md transition-all
                cursor-pointer'>Contáctanos</li>

            </ul>

            <div className='relative hidden md:flex 
            items-center justify-center gap-2'>

                <a href='#' className='text-emerald-700 ml-[20px] text-base 
                hover:bg-emerald-600 hover:text-white rounded-md transition-all
                cursor-pointer p-3'>
                    Sign in
                </a>

            </div>

        </header>
    )
}

export default Header