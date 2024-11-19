import { useReducer } from "react";
import { AuthContext } from "./AuthContext"
import { authReducer } from "./authReducer";
import { types } from "../types/authTypes";
import PropTypes from "prop-types";

/*
actionType = {

    type: string,
    payload: user
    
}

user = {
    email: string
    token: string
}

*/

const user = {
    logged: false
}

const init = () => {
    return JSON.parse(localStorage.getItem("userAuth"));
    // return user;
}

export const AuthProvider = ({children}) => {

    const [ authState, dispatch ] = useReducer( authReducer, user, init );

    const login = ( email, token ) => {
        const action = {
            type: types.login,
            payload: {
                email,
                token
            }
        }
        localStorage.setItem("userAuth", JSON.stringify({
            logged: true,
            user:{
                email,
                token
            }
        }));

        dispatch(action);
    }

    const logout = ( ) => {
        const action = {
            type: types.logout,
        }
        localStorage.removeItem('userAuth');

        dispatch(action);
    }


  return (
    <AuthContext.Provider value={
       {
        authState,
        login,
        logout
        }
    }>
        {children}
    </AuthContext.Provider>

  )
}


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}