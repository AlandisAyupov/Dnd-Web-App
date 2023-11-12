import { useEffect, useState } from "react";
import CharacterStats from "../../components/CharacterStats";
import { useCharactersContext } from "../../hooks/useCharactersContext";
import styles from "./Home.modules.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Home = () => {
  const { characters, dispatch } = useCharactersContext();
  const [word, setWord] = useState("");
  const { profile } = useAuthContext();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("/api/characters", {
        headers: {
          Authorization: `Bearer ${profile.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CHARACTERS", payload: json });
      }
    };
    if (profile) {
      fetchCharacters();
    }
  }, []);

  return (
    <div className="home">
      <div className="search-wrapper" style={styles}>
        <label for="search">Search</label>
        <input
          type="text"
          onChange={(e) => setWord(e.target.value)}
          value={word}
        />
      </div>
      <div className="characters">
        {characters &&
          characters.map(
            (character) =>
              character.name.includes(word) && (
                <CharacterStats character={character} key={character._id} />
              )
          )}
      </div>
    </div>
  );
};

export default Home;
