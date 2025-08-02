import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_BY_ID } from "../graphql/queries";
import Loader from "./Loader";

interface CharacterInfoProps {
  characterSelected?: string | null;
  closecharacterinfo?: () => void;
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({ characterSelected, closecharacterinfo }) => {
  const { loading, error, data } = useQuery(GET_CHARACTER_BY_ID, {
    variables: { id: characterSelected },
    skip: !characterSelected, 
  });

  if (!characterSelected) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="text-center px-4 py-6 bg-gray-100 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">No character selected</h2>
          <p className="text-sm text-gray-500 mt-2">Please click on a character from the list to view their details.</p>
        </div>
      </div>
    );
  }
//   loader
  if (loading){
    return <div className="h-full w-full flex justify-center items-center">
   <Loader />
    </div>;
  } 
//   end of loader
  if (error) return <p>Something went wrong. Try again.</p>;

  const character = data.character;

  return (
    <div
  className="w-full h-full px-10 pt-6 pb-4 lg:px-[100px] lg:pt-[40px] lg:pb-[16px]"
>
    {/* mobile view arrow button */}
    <button className="pb-5 lg:hidden" onClick={closecharacterinfo}>
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

      {/* profile pic and name */}
      <div className="w-full flex flex-col " style={{ gap: "8px" }}>
        {/* profile pic */}
        <div className="relative w-[75px] h-[75px]">
          <img
            src={character.image}
            alt={character.name}
            height={75}
            width={75}
            className="rounded-full"
          />

          <div className="absolute bottom-0 right-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#4CD137"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="none"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.998 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.09C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.45 1.31z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h2 className="font-bold text-[24px]">{character.name}</h2>
      </div>
      {/* end profile pic and name */}
      {/* character details */}
      <div >
        {/* List */}
        <li className="flex flex-col  py-3 " style={{gap:"3px"}}>
            <h2 className="font-semibold" style={{fontSize : "16px"}}>Specie</h2>
            <p className="font-medium text-gray-500" style={{fontSize : "16px"}}>{character.species}</p>
        </li>
        <li className="flex flex-col border-t border-gray-300 py-3 " style={{gap:"3px"}}>
            <h2 className="font-semibold" style={{fontSize : "16px"}}>Status</h2>
            <p className="font-medium text-gray-500" style={{fontSize : "16px"}}>{character.status}</p>
        </li>
        <li className="flex flex-col border-t border-gray-300 py-3 " style={{gap:"3px"}}>
            <h2 className="font-semibold" style={{fontSize : "16px"}}>Type</h2>
            <p className="font-medium text-gray-500" style={{fontSize : "16px"}}>{character.type}</p>
        </li>
        <li className="flex flex-col border-t border-gray-300 py-3 " style={{gap:"3px"}}>
            <h2 className="font-semibold" style={{fontSize : "16px"}}>Gender</h2>
            <p className="font-medium text-gray-500" style={{fontSize : "16px"}}>{character.gender}</p>
        </li>
      </div>
      {/* end character details */}
    </div>
  );
};

export default CharacterInfo;
