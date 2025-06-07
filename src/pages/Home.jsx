import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
};

export default Home;