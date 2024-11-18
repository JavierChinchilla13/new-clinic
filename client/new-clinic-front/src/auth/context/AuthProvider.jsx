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
    id: string
    name: string
}

*/

const user = {}

const init = () => {
    return user;
}

export const AuthProvider = ({children}) => {

    const [ authState, dispatch ] = useReducer( authReducer, user, init );

    const login = ( id, name ) => {
        const action = {
            type: types.login,
            payload: {
                id,
                name
            }
        }

        dispatch(action);
    }

    const logout = ( ) => {
        const action = {
            type: types.logout,
        }

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