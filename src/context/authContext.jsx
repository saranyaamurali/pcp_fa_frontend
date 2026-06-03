import {
  createContext,
  useContext,
  useReducer,
} from "react";

import { authReducer }
from "./authReducer.js";

const AuthContext =
  createContext();

const initialState = {
  isAuthenticated: false,
  token: null,
};

export const AuthProvider = ({
  children,
}) => {
  const [state, dispatch] =
    useReducer(
      authReducer,
      initialState
    );

  const login = (token) => {
    dispatch({
      type: "LOGIN",
      payload: token,
    });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);