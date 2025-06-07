import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, className = '' }) => {
  const defaultColor = product.colors[0];
  const defaultImage = product.images[defaultColor.name]?.[0] || product.heroImage;

  return (
    <div className={`group ${className}`}>
      <div className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
        {/* Product Image */}
        <div className="aspect-square bg-apple-gray p-8">
          <img
            src={defaultImage}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-apple-dark mb-2 group-hover:text-apple-blue transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-apple-light-gray text-sm mb-4 leading-relaxed">
              {product.tagline}
            </p>
            
            {/* Color Swatches */}
            <div className="flex justify-center space-x-2 mb-4">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            <p className="text-lg font-medium text-apple-dark mb-6">
              From ${product.price.toLocaleString()}
            </p>

            <Link
              to={`/store/${product.id}`}
              className="inline-flex items-center justify-center w-full bg-apple-blue hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;