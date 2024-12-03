import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Logo from "../components/shared/Logo";
import { AuthContext } from "../../auth/context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext); // Asegúrate de tener el AuthContext bien configurado

  const imgStyles =
    "cursor-pointer hover:scale-105 transition-all mt-[20px] w-[180px]";

  const [menuOpen, setMenuOpen] = useState(false);

  const onLogoutLogin = () => {
    if (authState?.logged) {
      logout(); // Limpia la sesión
      navigate("/"); // Redirige al inicio o la página de login
    } else {
      navigate("/auth/login"); // Redirige al login si no está logueado
    }
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-emerald-400 drop-shadow-md flex justify-between items-center text-black py-4 px-8 md:px-11"
      style={{ height: "150px" }} // Cambia este valor según sea necesario
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

        {authState?.logged ? (
          <NavLink to="/admin/addUser">
            <li
              className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                      hover:text-white rounded-md transition-all
                      cursor-pointer"
            >
              Agregar colaborador
            </li>
          </NavLink>
        ) : null}
      </ul>

      <label
        className={
          !authState?.logged
            ? `p-3 text-base text-emerald-700 hover:bg-emerald-600 
            hover:text-white rounded-md transition-all
            cursor-pointer hidden xl:flex`
            : `p-3 text-base text-emerald-700 hover:bg-red-500 
            hover:text-white rounded-md transition-all
            cursor-pointer hidden xl:flex`
        }
        onClick={onLogoutLogin}
      >
        {authState?.logged ? "Cerrar sesión" : "Iniciar sesión"}
      </label>

      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>

      {menuOpen && (
        <div
          className={`fixed top-32 left-0 w-full bg-white flex flex-col 
            items-center gap-6 font-semibold text-lg z-[1000] border-b-2 border-gray-300`}
          style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
        >
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
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              Contáctanos
            </li>
          </NavLink>
          {authState?.logged && (
            <NavLink to="/admin/addUser">
              <li
                className="list-none w-screen text-center 
                      p-4 hover:bg-emerald-600 hover:text-white
                      rounded-md transition-all cursor-pointer"
                onClick={() => {}}
              >
                Agregar colaborador
              </li>
            </NavLink>
          )}
          <li
            className={
              !authState?.logged
                ? `list-none w-screen text-center 
            p-4 hover:bg-emerald-600 hover:text-white
            rounded-md transition-all cursor-pointer`
                : `list-none w-screen text-center 
            p-4 hover:bg-red-500 hover:text-white
            rounded-md transition-all cursor-pointer`
            }
            onClick={() => {
              setMenuOpen(!menuOpen);
              onLogoutLogin();
            }}
          >
            {authState?.logged ? "Cerrar sesión" : "Iniciar sesión"}
          </li>
        </div>
      )}
    </header>
  );
};

export default Header;
