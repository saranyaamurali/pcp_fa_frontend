import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

import { authReducer } from "./authReducer";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  const login = (token) => {
    localStorage.setItem("token", token);

    dispatch({
      type: "LOGIN",
      payload: token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");

    dispatch({
      type: "LOGOUT",
    });
  };

  useEffect(() => {
    window.appState = {
      authUser: state.isAuthenticated,
      token: state.token,

      students: [],
      companies: [],
      drives: [],
      applications: [],
      interviews: [],

      filters: {},
      analytics: {},
    };
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated:
          state.isAuthenticated,

        token: state.token,

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