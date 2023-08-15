import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CharactersContextProvider } from "./context/CharactersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CharactersContextProvider>
      <App />
    </CharactersContextProvider>
  </React.StrictMode>
);
