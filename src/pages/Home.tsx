import React, { useState } from "react";
import CharacterInfo from "../components/CharacterInfo";
import SideBar from "../components/SideBar";

const Home = () => {
  interface Character {
    id: string;
    name: string;
    image: string;
    species: string;
  }

  const [characterSelected, setCharacterSelected] = React.useState<
    string | null
  >(null);
  const [characterInfoOpen, setCharacterInfoOpen] =
    React.useState<boolean>(false);
  const [starredCharacters, setStarredCharacters] = useState<Character[]>([]);

  const closeCharacterInfo = () => {
    setCharacterInfoOpen(false);
  };

  const toggleStarredCharacter = (character: Character) => {
    setStarredCharacters((prev) => {
      const isAlreadyStarred = prev.some((c) => c.id === character.id);
      return isAlreadyStarred
        ? prev.filter((c) => c.id !== character.id)
        : [...prev, character];
    });
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar - full width on mobile, 1/3 on desktop */}
      <div className="w-full lg:w-[375px] border-b lg:border-b-0 lg:border-r">
        <SideBar
          characterSelected={characterSelected}
          onCharacterSelect={(id) => {
            setCharacterSelected(id);
            setCharacterInfoOpen(true); // Open character info when a character is selected
          }}
          toggleStarredCharacter={toggleStarredCharacter}
          starredCharacters={starredCharacters}
        />
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          characterInfoOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCharacterInfo}
      />

      <div
        className={`fixed right-0 top-0 w-full bg-white h-screen shadow-lg transition-transform transform ${
          characterInfoOpen ? "translate-x-0" : "translate-x-full"
        } lg:relative lg:block lg:translate-x-0`}
      >
        <CharacterInfo
  closecharacterinfo={closeCharacterInfo}
  characterSelected={characterSelected}
  starredCharacters={starredCharacters}
/>
      </div>
    </div>
  );
};

export default Home;
