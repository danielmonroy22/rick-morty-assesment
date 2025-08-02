import React from "react";
import CharacterInfo from "../components/CharacterInfo";
import SideBar from "../components/SideBar";

const Home = () => {
  const [characterSelected, setCharacterSelected] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar - full width on mobile, 1/3 on desktop */}
      <div className="w-full lg:w-[375px] border-b lg:border-b-0 lg:border-r">
        <SideBar
          characterSelected={characterSelected}
          onCharacterSelect={(id) => setCharacterSelected(id)}
        />
      </div>

      {/* Content - full width on mobile, 2/3 on desktop */}
      <div className="w-full lg:w-2/3">
        <CharacterInfo characterSelected={characterSelected} />
      </div>
    </div>
  );
};

export default Home;

