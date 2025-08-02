import React, { useState } from "react";

interface FilterPanelProps {
    onFilter: (filters: { character: string; specie: string }) => void;
    setOpenAdjustments: (value: boolean) => void;
    openAdjustments: boolean;
  }
  

const baseButtonClasses =
  "text-sm border border-gray-200 rounded-md transition-colors duration-200 flex-1 py-2";
const activeButtonClasses = "bg-primary-100 text-primary-600 border-gray-200";

const AdjustmentsMenu: React.FC<FilterPanelProps> = ({ onFilter, setOpenAdjustments, openAdjustments }) => {
  const [selectedCharacter, setSelectedCharacter] = useState("All");
  const [selectedSpecie, setSelectedSpecie] = useState("All");

  

    const handleFilterClick = () => {
        onFilter({ character: selectedCharacter, specie: selectedSpecie });
        setOpenAdjustments(!openAdjustments);
      };
      

  return (
    <div className="bg-white w-[330px] rounded-md shadow-md p-6 absolute mb-4 h-[278px] flex flex-col gap-6">
      {/* Character */}
      <div className="flex flex-col gap-2">
        <p className="text-[#6B7280] font-medium text-sm">Character</p>
        <div className="flex gap-2 h-11">
          {["All", "Starred", "Others"].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedCharacter(label)}
              className={`${baseButtonClasses} ${
                selectedCharacter === label ? activeButtonClasses : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Specie */}
      <div className="flex flex-col gap-2">
        <p className="text-[#6B7280] font-medium text-sm">Specie</p>
        <div className="flex gap-2 h-11">
          {["All", "Human", "Alien"].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedSpecie(label)}
              className={`${baseButtonClasses} ${
                selectedSpecie === label ? activeButtonClasses : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Button */}
      <button
        onClick={handleFilterClick}
        className={`text-white font-medium rounded-lg py-2 transition-colors duration-300 bg-primary-600 cursor-pointer`}
      >
        Filter
      </button>
    </div>
  );
};

export default AdjustmentsMenu;
