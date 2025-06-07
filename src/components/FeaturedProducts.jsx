import React from 'react';
import ProductCard from './ProductCard';
import { iphones } from '../data/iphones';

const FeaturedProducts = () => {
  const featuredProducts = iphones.filter(phone => phone.featured);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-dark mb-4">
            Which iPhone is right for you?
          </h2>
          <p className="text-xl text-apple-light-gray max-w-3xl mx-auto leading-relaxed">
            Compare our most popular iPhone models and find the perfect one that matches your lifestyle and needs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <a
            href="/store"
            className="inline-flex items-center text-apple-blue hover:text-blue-700 font-semibold text-lg transition-colors duration-200"
          >
            View all iPhone models
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;