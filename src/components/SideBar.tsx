import React, { useState } from "react";
import CharacterCard from "./CharacterCard";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_CHARACTER, GET_CHARACTERS } from "../graphql/queries";

const SideBar: React.FC = () => {
  interface Character {
    id: string;
    name: string;
    image: string;
    species: string;
  }
  // call get_characters query to get all characters
  const { loading, error, data } = useQuery(GET_CHARACTERS);
  const [starredCharacters, setStarredCharacters] = useState<Character[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openAdjustments, setOpenAdjustments] = useState(false);
  // adjustments modal variables
  const [selectedCharacter, setSelectedCharacter] = useState("All");
  const [selectedSpecie, setSelectedSpecie] = useState("All");

  const isFilterActive =
    selectedCharacter !== "All" || selectedSpecie !== "All";

  const baseButtonClasses =
    "w-[102px] flex justify-center items-center border border-gray-300 h-full rounded-md transition-colors duration-300";
  const activeButtonClasses = "bg-primary-100 text-primary-600";

  const [getCharacters, { data: charactersData, loading: charactersLoading }] =
    useLazyQuery(GET_CHARACTER);

  const toggleStarredCharacter = (character: Character) => {
    setStarredCharacters((prev) => {
      const isAlreadyStarred = prev.some((c) => c.id === character.id);
      if (isAlreadyStarred) {
        return prev.filter((c) => c.id !== character.id);
      } else {
        return [...prev, character];
      }
    });
  };

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

  return (
    <div
      className="bg-gray-100 px-[16px] h-screen max-h-screen overflow-y-scroll"
      style={{ width: "375px" }}
    >
      <h2 className="font-bold text-[24px] py-5 text-[#1F2937]">
        Rick and Morty list
      </h2>

      {/* Search Input */}

      <div className="flex items-center bg-white rounded-md h-[52px] shadow-sm px-3 py-2 mb-4">
        <span className="px-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="gray"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="9" r="6" />
            <line x1="13.5" y1="13.5" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search or filter results"
          className="flex-grow outline-none text-sm text-gray-700"
          onChange={handleInputChange}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#8054C7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setOpenAdjustments(!openAdjustments)}
          className={`p-1 hover:bg-[#EEE3FF] transition-colors duration-300 rounded-md ${
            openAdjustments ? "bg-[#EEE3FF]" : ""
          }`}
          style={{ cursor: "pointer" }} // Makes it look clickable
        >
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <circle cx="4" cy="12" r="2" />
          <circle cx="12" cy="10" r="2" />
          <circle cx="20" cy="14" r="2" />
        </svg>
      </div>

      {/* desktop adjustments menu */}

      {openAdjustments && (
        <>
          <div className="bg-white w-[330px] rounded-md shadow-md p-[24px] absolute mb-4 h-[278px] flex flex-col gap-[24px] ">
            {/* character */}
            <div className="h-[72px] gap-[8px] flex flex-col">
              <p className="text-[#6B7280] font-medium text-[14px]">
                Character
              </p>
              {/* character boxes */}
              <div className="flex gap-[8px] h-[44px]">
                {["All", "Starred", "Others"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedCharacter(label)}
                    className={`${baseButtonClasses} ${
                      selectedCharacter === label ? activeButtonClasses : ""
                    }`}
                    style={{ padding: "17px 10px" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* specie */}
            <div className="h-[72px] gap-[8px] flex flex-col">
              <p className="text-[#6B7280] font-medium text-[14px]">Specie</p>
              {/* specie boxes */}
              <div className="flex gap-[8px] h-[44px]">
                {["All", "Human", "Alien"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setSelectedSpecie(label)}
                    className={`${baseButtonClasses} ${
                      selectedSpecie === label ? activeButtonClasses : ""
                    }`}
                    style={{ padding: "17px 10px" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* filter button */}
            <button
              className={`text-white transition-colors duration-300  ${
                isFilterActive
                  ? "bg-primary-600 cursor-pointer"
                  : "bg-gray-100 text-gray-800 cursor-not-allowed"
              }`}
              style={{ padding: "9px 17px", borderRadius: "8px" }}
            >
              Filter
            </button>
          </div>
        </>
      )}

      {/* Starred Characters */}
      {starredCharacters.length > 0 && (
        <>
          <h3 className="font-semibold text-[12px] py-3">
            STARRED CHARACTERS ({starredCharacters.length})
          </h3>
          {starredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              name={char.name}
              image={char.image}
              species={char.species}
              isStarred
              handleStarClick={() => toggleStarredCharacter(char)}
            />
          ))}
        </>
      )}

      <h3 className="font-semibold text-[12px] py-3">
        CHARACTERS ({charactersToShow.length - starredCharacters.length})
      </h3>

      {charactersLoading && (
        <div className="h-full flex justify-center items-start pt-20">
          <div className="spinner">
            <div className="spinnerin"></div>
          </div>
        </div>
      )}
      {!charactersLoading && charactersToShow.length === 0 && (
        <div className="h-full flex justify-center items-start pt-20">
          <p className="text-gray-500 text-sm">No items found</p>
        </div>
      )}

      {charactersToShow
        .filter(
          (char: Character) => !starredCharacters.some((c) => c.id === char.id)
        )
        .map((char: Character) => (
          <CharacterCard
            key={char.id}
            id={char.id}
            name={char.name}
            image={char.image}
            species={char.species}
            isStarred={starredCharacters.some((c) => c.id === char.id)}
            handleStarClick={() => toggleStarredCharacter(char)}
          />
        ))}
    </div>
  );
};

export default SideBar;
