import { useState } from "react";
import { useCharactersContext } from "../hooks/useCharactersContext.js";

const CharacterForm = () => {
  const { dispatch } = useCharactersContext();
  const [name, setName] = useState("");
  const [charClass, setCharClass] = useState("");
  const [level, setLevel] = useState("");
  const [alignment, setAlignment] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const character = { name, charClass, level, alignment };

    const response = await fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify(character),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setEmptyFields([]);
      setError(null);
      setName("");
      setCharClass("");
      setLevel("");
      setAlignment("");
      dispatch({ type: "CREATE_CHARACTER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Character</h3>

      <label>Character Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      />

      <label>Character Class:</label>
      <input
        type="text"
        onChange={(e) => setCharClass(e.target.value)}
        value={charClass}
        className={emptyFields.includes("charClass") ? "error" : ""}
      />

      <label>Level:</label>
      <input
        type="number"
        onChange={(e) => setLevel(e.target.value)}
        value={level}
        className={emptyFields.includes("level") ? "error" : ""}
      />

      <label>Alignment:</label>
      <input
        type="text"
        onChange={(e) => setAlignment(e.target.value)}
        value={alignment}
        className={emptyFields.includes("alignment") ? "error" : ""}
      />

      <button>Add Character</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default CharacterForm;
