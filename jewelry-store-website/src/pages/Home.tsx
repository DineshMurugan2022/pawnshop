import React from 'react';
import BrowseButton from '../components/BrowseButton';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Our Jewelry Store</h1>
      <p>Explore our exquisite collection of jewelry.</p>
      <BrowseButton />
    </div>
  );
};

export default Home;