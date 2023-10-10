import { useAuthContext } from "./useAuthContext";
import { useCharactersContext } from "./useCharactersContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchCharacters } = useCharactersContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("profile");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchCharacters({ type: "SET_CHARACTERS", payload: null });
  };

  return { logout };
};
