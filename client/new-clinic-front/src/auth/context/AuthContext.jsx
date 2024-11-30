import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ logged: false, user: null });
  const [isLoading, setIsLoading] = useState(true); // Estado de carga, útil si deseas mostrar un indicador de carga

  const saveUser = (user) => {
    setAuthState({ logged: true, user });
  };

  const removeUser = () => {
    setAuthState({ logged: false, user: null });
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/v1/users/showMe");
      saveUser(data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      removeUser();
    } finally {
      setIsLoading(false); // Esto asegura que setIsLoading se ejecute independientemente del éxito o fallo
    }
  };

  const logout = async () => {
    try {
      await axios.delete("/api/v1/auth/logout");
      removeUser(); // Eliminar usuario del estado después de cerrar sesión
    } catch (error) {
      console.error("Error during logout:", error); // Mejor mensaje de error
    }
  };

  useEffect(() => {
    fetchUser(); // Este effect se ejecuta una vez cuando el componente se monta
  }, []);

  return (
    <AuthContext.Provider value={{ authState, logout }}>
      {isLoading ? (
        <div>Loading...</div> // Puedes cambiar esto para mostrar un indicador de carga
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
