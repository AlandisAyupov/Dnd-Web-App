import { useState } from "react";

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
    <div>
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
