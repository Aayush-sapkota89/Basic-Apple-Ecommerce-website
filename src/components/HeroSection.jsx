import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { iphones } from '../data/iphones';

const HeroSection = () => {
  const featuredPhones = iphones.filter(phone => phone.featured);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredPhones.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredPhones.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPhones.length) % featuredPhones.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPhones.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentPhone = featuredPhones[currentSlide];

  if (!currentPhone) return null;

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-white via-apple-gray to-gray-100 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {featuredPhones.map((phone, index) => (
          <div
            key={phone.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-20' 
                : 'opacity-0'
            }`}
          >
            <img
              src={phone.heroImage}
              alt={phone.name}
              className="w-full h-full object-cover scale-110 blur-sm"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center pt-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-12">
            
            {/* Left Column - Text Content */}
            <div className="text-left lg:text-left space-y-8">
              <div className="transition-all duration-700 ease-in-out transform">
                {/* Main Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-apple-dark mb-6 tracking-tight leading-none">
                  {currentPhone.name}
                </h1>
                <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-apple-dark mb-8 leading-tight">
                  {currentPhone.tagline}
                </h2>
                
                {/* Subheading */}
                <p className="text-lg md:text-xl lg:text-2xl text-apple-light-gray max-w-2xl leading-relaxed mb-12">
                  {currentPhone.description}
                </p>

                {/* Price */}
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-apple-dark mb-8">
                  From ${currentPhone.price.toLocaleString()}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link
                    to={`/store/${currentPhone.id}`}
                    className="bg-apple-blue hover:bg-blue-700 text-white font-semibold py-4 px-8 lg:py-5 lg:px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-base lg:text-lg shadow-lg hover:shadow-xl"
                  >
                    Buy Now
                  </Link>
                  <Link
                    to="/store"
                    className="border-2 border-apple-blue text-apple-blue hover:bg-apple-blue hover:text-white font-semibold py-4 px-8 lg:py-5 lg:px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-base lg:text-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Product Image */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full h-80 md:h-96 lg:h-[500px] xl:h-[600px]">
                {featuredPhones.map((phone, index) => (
                  <div
                    key={phone.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 transform scale-100 rotate-0' 
                        : 'opacity-0 transform scale-90 rotate-3'
                    }`}
                  >
                    <img
                      src={phone.heroImage}
                      alt={phone.name}
                      className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 pointer-events-auto bg-white/90 hover:bg-white text-apple-dark p-3 lg:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 pointer-events-auto bg-white/90 hover:bg-white text-apple-dark p-3 lg:p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="flex space-x-3 lg:space-x-4 bg-white/80 backdrop-blur-sm rounded-full px-4 lg:px-6 py-2 lg:py-3 shadow-lg">
            {featuredPhones.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-apple-blue scale-125 shadow-lg' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-8 lg:bottom-12 right-4 lg:right-8 pointer-events-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 lg:px-4 py-1 lg:py-2 shadow-lg">
            <span className="text-apple-dark font-medium text-sm lg:text-base">
              {currentSlide + 1} / {featuredPhones.length}
            </span>
          </div>
        </div>
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-20 lg:top-8 right-4 lg:right-8 z-20">
        <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
          isAutoPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
        }`} title={isAutoPlaying ? 'Auto-playing' : 'Paused'} />
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 z-20">
        <div 
          className="h-full bg-apple-blue transition-all duration-300 ease-linear"
          style={{ 
            width: `${((currentSlide + 1) / featuredPhones.length) * 100}%` 
          }}
        />
      </div>
    </section>
  );
};

export default HeroSection;