import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from '../components/shared/Logo'
import { AuthContext } from "../../auth/context/AuthContext";

const Header = () => {

  const navigate = useNavigate();

  const { authState, logout } = useContext(AuthContext);

  const imgStyles =
    "cursor-pointer hover:scale-105 transition-all mt-[20px] w-[140px]";

  const [menuOpen, setMenuOpen] = useState(false);

  const onLogoutLogin = () => {
    if (authState.logged){
      logout();
      navigate('/');
    }else{
      navigate('/auth/login');
    }
  }

  return (
    <header
      className="flex justify-between 
        items-center text-black py-6 px-8
        md:px-11 bg-emerald-400 drop-shadow-md"
    >
      <Link to="/">
        <Logo extraStyle={imgStyles} />
      </Link>

      <ul
        className="hidden xl:flex items-center
            gap-12 font-semibold text-base"
      >
        <NavLink to="/services">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Servicios
          </li>
        </NavLink>

        <NavLink to="/products">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Productos
          </li>
        </NavLink>

        <NavLink to="/">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Sobre nosotros
          </li>
        </NavLink>

        <NavLink to="/contact">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Contáctanos
          </li>
        </NavLink>
      </ul>

      {/* <NavLink to="/auth/login"> */}
        <label
          className={
            !authState.logged ?
            ( `p-3 text-base text-emerald-700 hover:bg-emerald-600 
            hover:text-white rounded-md transition-all
            cursor-pointer hidden xl:flex`)
            :
            ( `p-3 text-base text-emerald-700 hover:bg-red-500 
            hover:text-white rounded-md transition-all
            cursor-pointer hidden xl:flex`)
            }

          onClick={onLogoutLogin}
        >
          {
            authState.logged ?
            ("Logout")
            : ("Sign in")
          }
        </label>
      {/* </NavLink> */}

      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>

          {
            menuOpen ?
              <div
                className={`absolute top-24 left-0 w-full bg-white flex flex-col 
                        items-center gap-6 font-semibold text-lg
                        transform transition-transform z-50`}
                style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
              >
                <NavLink to="/">
                  <li
                    className="list-none w-screen text-center 
                                p-4 hover:bg-emerald-600 hover:text-white
                                rounded-md transition-all cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    Inicio
                  </li>
                </NavLink>
                <NavLink to="/products">
                  <li
                    className="list-none w-screen text-center 
                                p-4 hover:bg-emerald-600 hover:text-white
                                rounded-md transition-all cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    Productos
                  </li>
                </NavLink>
                <NavLink to="/services">
                  <li
                    className="list-none w-screen text-center 
                                p-4 hover:bg-emerald-600 hover:text-white
                                rounded-md transition-all cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    Servicios
                  </li>
                </NavLink>
                <NavLink to="/">
                  <li
                    className="list-none w-screen text-center 
                                p-4 hover:bg-emerald-600 hover:text-white
                                rounded-md transition-all cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    Sobre nosotros
                  </li>
                </NavLink>
                <NavLink to="/contact">
                  <li
                    className="list-none w-screen text-center 
                                p-4 hover:bg-emerald-600 hover:text-white
                                rounded-md transition-all cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                  >
                    Contáctanos
                  </li>
                </NavLink>
                  <li
                    className={
                      !authState.logged ?
                      (`list-none w-screen text-center 
                      p-4 hover:bg-emerald-600 hover:text-white
                      rounded-md transition-all cursor-pointer`)
                      :
                      (`list-none w-screen text-center 
                      p-4 hover:bg-red-500 hover:text-white
                      rounded-md transition-all cursor-pointer`)
                    }
                    
                    onClick={() => {
                      setMenuOpen(!menuOpen) 
                      onLogoutLogin()}}
                  >
                    {
                    authState.logged ?
                    ("Logout")
                    : ("Sign in")
                    }
                  </li>
              </div>

              :
              null

          }
    </header>
  );
};

export default Header;
