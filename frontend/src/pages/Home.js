import { useEffect } from "react";
import CharacterStats from "../components/CharacterStats";
import { useCharactersContext } from "../hooks/useCharactersContext";

const Home = () => {
  const { characters, dispatch } = useCharactersContext();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch("/api/characters");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CHARACTERS", payload: json });
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="home">
      <div className="characters">
        {characters &&
          characters.map((character) => (
            <CharacterStats character={character} key={character._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
