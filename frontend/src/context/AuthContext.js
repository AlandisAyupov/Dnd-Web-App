import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "GET_PROFILE":
      return {
        profile: state.profile.map((p) => p.email === action.payload.email),
      };
    case "LOGIN":
      return { profile: action.payload };
    case "LOGOUT":
      return { profile: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    profile: null,
  });

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      dispatch({ type: "LOGIN", payload: profile });
    }
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
