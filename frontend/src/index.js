import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CharactersContextProvider } from "./context/CharactersContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CharactersContextProvider>
        <App />
      </CharactersContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
