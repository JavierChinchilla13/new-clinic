import { Link } from "react-router-dom";
import Logo from "./shared/Logo";
import { useState } from "react";

const Header = () => {
  const imgStyles =
    "cursor-pointer hover:scale-105 transition-all mt-[20px] w-[140px]";

  const [menuOpen, setMenuOpen] = useState(false);

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
        <Link to="/services">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Servicios
          </li>
        </Link>

        <Link to="/products">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Productos
          </li>
        </Link>

        <Link to="/">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Sobre nosotros
          </li>
        </Link>

        <Link to="/contact">
          <li
            className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
          >
            Contáctanos
          </li>
        </Link>
      </ul>

      <Link to="/login">
        <label
          className="p-3 text-base text-emerald-700 hover:bg-emerald-600 
                    hover:text-white rounded-md transition-all
                    cursor-pointer"
        >
          Sign in
        </label>
      </Link>

      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      ></i>

      <div
        className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col 
                items-center gap-6 font-semibold text-lg
                transform transition-transform ${
                  menuOpen ? "opacity-100" : "opacity-0"
                }`}
        style={{ transition: "transform 0.3s ease, opacity 0.3s ease" }}
      >
        <Link to="/">
          <li
            className="list-none w-screen text-center 
                        p-4 hover:bg-emerald-600 hover:text-white
                        rounded-md transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Inicio
          </li>
        </Link>
        <Link to="/products">
          <li
            className="list-none w-screen text-center 
                        p-4 hover:bg-emerald-600 hover:text-white
                        rounded-md transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Productos
          </li>
        </Link>
        <Link to="/">
          <li
            className="list-none w-screen text-center 
                        p-4 hover:bg-emerald-600 hover:text-white
                        rounded-md transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Sobre nosotros
          </li>
        </Link>
        <Link to="/contact">
          <li
            className="list-none w-screen text-center 
                        p-4 hover:bg-emerald-600 hover:text-white
                        rounded-md transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Contáctanos
          </li>
        </Link>
        <Link to="/login">
          <li
            className="list-none w-screen text-center 
                        p-4 hover:bg-emerald-600 hover:text-white
                        rounded-md transition-all cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            Sign in
          </li>
        </Link>
      </div>
    </header>
  );
};

export default Header;
