import { createContext, useReducer } from "react";

export const CharactersContext = createContext();

export const charactersReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return {
        characters: action.payload,
      };
    case "CREATE_CHARACTER":
      return {
        characters: [action.payload, ...state.characters],
      };
    case "DELETE_CHARACTER":
      return {
        characters: state.characters.filter(
          (c) => c._id !== action.payload._id
        ),
      };
    case "UPDATE_CHARACTER":
      return {
        characters: state.characters.map((character) =>
          character._id === action.payload._id ? action.payload : character
        ),
      };
    default:
      return state;
  }
};

export const CharactersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(charactersReducer, {
    characters: null,
  });

  return (
    <CharactersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CharactersContext.Provider>
  );
};
