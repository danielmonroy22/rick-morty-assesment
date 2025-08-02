import React from "react";

interface CharacterProps {
  id: string;
  name: string;
  image: string;
  species: string;
  handleStarClick: () => void;
  isStarred?: boolean;
  handleSelectCharacter: () => void;
  selectedCharacter?: string | null;
}

const CharacterCard: React.FC<CharacterProps> = ({
  id,
  name,
  image,
  species,
  handleStarClick,
  isStarred = false,
  handleSelectCharacter,
  selectedCharacter,
}) => {
  const isSelected = selectedCharacter === id;

  return (
    <div
      onClick={handleSelectCharacter}
      className={`h-[74px] w-full cursor-pointer ${
        isSelected ? "bg-[#DDD6F3]" : "hover:bg-[#EEE3FF]"
      }`}
      style={{ borderRadius: "8px" }}
    >
      <div
        className="h-full flex justify-between items-center gap-[16px] border-t-2 border-[#E5E7EB]"
        style={{ padding: "16px 20px" }}
      >
        <img
          style={{ borderRadius: "50%" }}
          src={image}
          alt={name}
          width={32}
          height={32}
        />
        <div className="w-[207px] h-[42px]">
          <h3 className="text-[16px] font-semibold text-[#111827]">{name}</h3>
          <p className="text-[#6B7280] text-[16px] font-normal">{species}</p>
        </div>
        <div className="p-[4px]">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent selecting character when starring
              handleStarClick();
            }}
            className="text-gray-400 btn hover:bg-gray-200 hover:text-gray-600 rounded-full p-2 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isStarred ? "#63D838" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke={isStarred ? "#63D838" : "currentColor"}
              className="w-[18px] h-[15.36px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
