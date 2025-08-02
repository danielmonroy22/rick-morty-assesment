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
    <div className="bg-white lg:w-[330px] w-full h-full top-0 lg:top-36 left-0 lg:left-4 rounded-md shadow-md p-6 absolute mb-4 lg:h-[278px] flex flex-col gap-6">
      {/* filters text for mobile view */}
      <div className="w-full lg:hidden text-center relative" onClick={() => setOpenAdjustments(!openAdjustments)}>
      <button className="pb-5 absolute left-0 top-0" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="#8054C7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>
      {/* end of filter text in mobile view */}
        
        Filters
        
      </div>
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
      <div className="flex flex-col justify-end lg:justify-start w-full h-full">
      <button
        onClick={handleFilterClick}
        className={`text-white w-full font-medium rounded-lg py-2 transition-colors duration-300 bg-primary-600 cursor-pointer`}
      >
        Filter
      </button>
      </div>
    </div>
  );
};

export default AdjustmentsMenu;
