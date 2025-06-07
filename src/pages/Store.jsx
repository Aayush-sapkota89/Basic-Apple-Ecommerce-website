import React from 'react';
import ProductCard from '../components/ProductCard';
import { iphones } from '../data/iphones';

const Store = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-apple-dark mb-6">
            Shop iPhone
          </h1>
          <p className="text-xl text-apple-light-gray max-w-3xl mx-auto leading-relaxed">
            Discover the complete iPhone lineup. From the latest iPhone 15 Pro to the reliable iPhone 14, 
            find the perfect iPhone that fits your world.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {iphones.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-20 bg-apple-gray rounded-3xl p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-apple-dark mb-4">
              Need help choosing?
            </h2>
            <p className="text-apple-light-gray text-lg mb-8 max-w-2xl mx-auto">
              Get personalized recommendations based on how you plan to use your new iPhone.
            </p>
            <button className="bg-apple-blue hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105">
              Get Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;