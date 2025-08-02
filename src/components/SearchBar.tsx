import React from "react";

interface SearchBarProps {

  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openAdjustments: boolean;
  setOpenAdjustments: (value: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  
  onSearchChange,
  openAdjustments,
  setOpenAdjustments,
}) => {
  return (
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
  
        onChange={onSearchChange}
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
        style={{ cursor: "pointer" }}
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
  );
};

export default SearchBar;
