import { useState } from "react";
import styles from "./Dice.modules.css";

const Dice = () => {
  const [num, setNum] = useState(0);
  const [sides, setSides] = useState(6);
  const randomNum = () => {
    setNum(Math.floor(Math.random() * sides) + 1);
  };
  const increment = () => {
    setSides(sides + 1);
  };
  const decrement = () => {
    setSides(sides - 1);
  };
  return (
    <div class="dice">
      <h1>Value:</h1>
      <p>{num}</p>
      <h1>Sided Die:</h1>
      <p>{sides}</p>
      <button onClick={randomNum}>Roll</button>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Dice;
