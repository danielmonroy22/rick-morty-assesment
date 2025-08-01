

import SideBar from '../components/SideBar';

const Home = () => {
  

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
        {/* sidebar */}
        <SideBar />
      {/* end of sidebar */}

      {/* content */}
      <div style={{ flex: 1, padding: '1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>Rick and Morty Characters</h1>
        <p>Explore the universe of Rick and Morty!</p>
        </div>
      </div>
      {/* end of content */}
    </div>
  );
};

export default Home;
