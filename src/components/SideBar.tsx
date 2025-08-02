import React, { useState } from "react";
import CharacterCard from "./CharacterCard";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CHARACTER, GET_CHARACTERS } from "../graphql/queries";
import AdjustmentsMenu from "./AdjustmentsMenu";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
}
interface SideBarProps {
  onCharacterSelect: (characterId: string) => void;
  characterSelected?: string | null;
  starredCharacters: Character[];
  toggleStarredCharacter: (char: Character) => void;
}

const SideBar: React.FC<SideBarProps> = ({
  onCharacterSelect,
  characterSelected,
  starredCharacters,
  toggleStarredCharacter,

}) => {
  
  // call get_characters query to get all characters
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  const [searchTerm, setSearchTerm] = useState("");
  const [openAdjustments, setOpenAdjustments] = useState(false);
  const [filters, setFilters] = useState({ character: "All", specie: "All" });

  const handleFilterChange = (newFilters: {
    character: string;
    specie: string;
  }) => {
    setFilters(newFilters);
  };

  const [getCharacters, { data: charactersData, loading: charactersLoading }] =
    useLazyQuery(GET_CHARACTER);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      getCharacters({ variables: { name: value } });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching characters</p>;

  // Choose which data to display
  const charactersToShow: Character[] =
    searchTerm && charactersData?.characters?.results
      ? charactersData.characters.results
      : data.characters.results;

  const filteredStarredCharacters = starredCharacters.filter((char) => {
    // Search
    if (
      searchTerm &&
      !char.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    // Filter by specie
    if (filters.specie !== "All" && char.species !== filters.specie)
      return false;

    // Filter by character group
    if (filters.character === "Others") return false;

    return true;
  });

  const filteredNonStarredCharacters = charactersToShow
    .filter(
      (char: Character) => !starredCharacters.some((c) => c.id === char.id)
    )
    .filter((char: Character) => {
      // Search
      if (
        searchTerm &&
        !char.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;

      // Filter by specie
      if (filters.specie !== "All" && char.species !== filters.specie)
        return false;

      // Filter by character group
      if (filters.character === "Starred") return false;

      return true;
    });

  return (
    <div
  className="bg-gray-100 px-4 h-screen max-h-screen overflow-y-auto w-full lg:w-[375px]"
>
      <h2 className="font-bold text-[24px] py-5 text-[#1F2937]">
        Rick and Morty list
      </h2>

      {/* Search Input */}
      <SearchBar
        onSearchChange={handleInputChange}
        openAdjustments={openAdjustments}
        setOpenAdjustments={setOpenAdjustments}
      />

      {/* desktop adjustments menu */}

      {openAdjustments && (
        <>
          <AdjustmentsMenu onFilter={handleFilterChange} openAdjustments={openAdjustments} setOpenAdjustments={setOpenAdjustments} />
        </>
      )}

      {/* Starred Characters */}
      {filteredStarredCharacters.length > 0 && (
        <>
          <h3 className="font-semibold text-[12px] py-3">
            STARRED CHARACTERS ({filteredStarredCharacters.length})
          </h3>
          {filteredStarredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              name={char.name}
              image={char.image}
              species={char.species}
              isStarred
              handleStarClick={() => toggleStarredCharacter(char)}
              handleSelectCharacter={() => onCharacterSelect(char.id)}
              selectedCharacter={characterSelected}
            />
          ))}
        </>
      )}
      {/* All Characters */}
      <h3 className="font-semibold text-[12px] py-3">
        CHARACTERS ({filteredNonStarredCharacters.length})
      </h3>

      {charactersLoading && (
        <div className="h-full">
          <Loader />
        </div>
      )}

      {!charactersLoading && filteredNonStarredCharacters.length === 0 && (
        <div className="h-full flex justify-center items-start pt-20">
          <p className="text-gray-500 text-sm">No items found</p>
        </div>
      )}

      {filteredNonStarredCharacters.map((char: Character) => (
        <CharacterCard
          key={char.id}
          id={char.id}
          name={char.name}
          image={char.image}
          species={char.species}
          isStarred={false}
          handleStarClick={() => toggleStarredCharacter(char)}
          handleSelectCharacter={() => onCharacterSelect(char.id)}
          selectedCharacter={characterSelected}
        />
      ))}
    </div>
  );
};

export default SideBar;
