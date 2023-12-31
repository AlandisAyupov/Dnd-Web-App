import { useState } from "react";
import { useCharactersContext } from "../hooks/useCharactersContext";
import { useAuthContext } from "../hooks/useAuthContext";

const CharacterStats = ({ character }) => {
  const { dispatch } = useCharactersContext();
  const [swtch, setSwtch] = useState(true);
  const [alignment, setAlignment] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { profile } = useAuthContext();

  const handleClick = async () => {
    if (!profile) return;
    const response = await fetch("/api/characters/" + character._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${profile.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_CHARACTER", payload: json });
    }
  };

  const handleEdit = () => {
    if (swtch) setSwtch(false);
    else setSwtch(true);
  };

  const handleChange = async () => {
    if (!profile) return;
    const update = await fetch("/api/characters/" + character._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({ alignment: alignment }),
    });
    const json = await update.json();

    if (update.ok) {
      setAlignment("");
      dispatch({ type: "UPDATE_CHARACTER", payload: json });
    }
  };

  const handleIncrement = async () => {
    if (!profile) return;
    const update = await fetch("/api/characters/" + character._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.token}`,
      },
      body: JSON.stringify({ level: character.level + 1 }),
    });
    const json = await update.json();

    if (update.ok) {
      dispatch({ type: "UPDATE_CHARACTER", payload: json });
    }
  };

  const handleDecrement = async () => {
    if (!profile) return;
    if (character.level >= 1) {
      const update = await fetch("/api/characters/" + character._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.token}`,
        },
        body: JSON.stringify({ level: character.level - 1 }),
      });
      const json = await update.json();

      if (update.ok) {
        dispatch({ type: "UPDATE_CHARACTER", payload: json });
      }
    }
  };

  return (
    <div className="character-stats">
      <h4>{character.name}</h4>
      <p>
        <strong>Class : </strong>
        {character.charClass}
      </p>
      <p>
        <strong>Level : </strong>
        {character.level}
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </p>
      <p>
        <strong>Alignment : </strong>
        {swtch && character.alignment}
        {!swtch && (
          <form onSubmit={handleChange}>
            <input
              type="text"
              onChange={(e) => setAlignment(e.target.value)}
              value={alignment}
              className={emptyFields.includes("alignment") ? "error" : ""}
            />
            <button>Change</button>
          </form>
        )}
        <button onClick={handleEdit}>Edit</button>
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default CharacterStats;
