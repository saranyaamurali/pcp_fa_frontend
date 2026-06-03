import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";

const AppContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  students: [],
  companies: [],
  drives: [],
  applications: [],
  interviews: [],
  filters: {},
  analytics: {},
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "SET_COMPANIES":
      return { ...state, companies: action.payload };
    case "SET_DRIVES":
      return { ...state, drives: action.payload };
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };
    case "SET_INTERVIEWS":
      return { ...state, interviews: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: action.payload };
    case "SET_ANALYTICS":
      return { ...state, analytics: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    appReducer,
    initialState
  );

  // Update window.appState whenever state changes
  useEffect(() => {
    window.appState = {
      authUser: state.user?.role || null,
      token: state.token,
      students: state.students.length,
      companies: state.companies.length,
      drives: state.drives.length,
      applications: state.applications.length,
      interviews: state.interviews.length,
      filters: state.filters,
      analytics: state.analytics,
    };
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
