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
  const [searchTerm, setSearchTerm] = useState("");
  const [openAdjustments, setOpenAdjustments] = useState(false);
  const [filters, setFilters] = useState({ character: "All", specie: "All" });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
  });

  const sortByName = (a: Character, b: Character) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);

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

  if (loading) return <Loader />;
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

  const sortedStarredCharacters = [...filteredStarredCharacters].sort(
    sortByName
  );
  const sortedNonStarredCharacters = [...filteredNonStarredCharacters].sort(
    sortByName
  );

  return (
    <div className="bg-gray-100 px-4 h-screen max-h-screen overflow-y-auto w-full lg:w-[375px]">
      <h2 className="font-bold text-[24px] py-5 text-[#1F2937]">
        Rick and Morty list
      </h2>

      {/* Search Input */}
      <SearchBar
        onSearchChange={handleInputChange}
        openAdjustments={openAdjustments}
        setOpenAdjustments={setOpenAdjustments}
      />

      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="asc">Name (A-Z)</option>
            <option value="desc">Name (Z-A)</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-sm text-gray-600">Page:</label>
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="text-sm border rounded px-2 py-1"
          >
            {Array.from(
              { length: data?.characters?.info?.pages || 1 },
              (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Page {i + 1}
                </option>
              )
            )}
          </select>
        </div>
        <p className="text-xs text-gray-500 text-right">
          Showing page {currentPage} of {data?.characters?.info?.pages}
        </p>
      </div>

      {/* desktop adjustments menu */}

      {openAdjustments && (
        <>
          <AdjustmentsMenu
            onFilter={handleFilterChange}
            openAdjustments={openAdjustments}
            setOpenAdjustments={setOpenAdjustments}
          />
        </>
      )}

      {/* Starred Characters */}
      {sortedStarredCharacters.length > 0 && (
        <>
          <h3 className="font-semibold text-[12px] py-3">
            STARRED CHARACTERS ({sortedStarredCharacters.length})
          </h3>
          {sortedStarredCharacters.map((char) => (
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

      {sortedNonStarredCharacters.map((char: Character) => (
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
