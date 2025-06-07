import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, Plus, Minus } from 'lucide-react';
import { iphones } from '../data/iphones';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = iphones.find(p => p.id === parseInt(productId));
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0] || 128);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-apple-dark mb-4">Product not found</h1>
          <button 
            onClick={() => navigate('/store')}
            className="bg-apple-blue text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const currentImages = product.images[selectedColor] || [product.heroImage];
  const storagePrice = product.storagePrice[selectedStorage] || 0;
  const totalPrice = product.price + storagePrice;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        selectedColor,
        selectedStorage,
      });
    }
    
    // Show success feedback (you could add a toast notification here)
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-square bg-apple-gray rounded-3xl p-8 overflow-hidden">
              <img
                src={currentImages[currentImageIndex]}
                alt={`${product.name} in ${selectedColor}`}
                className="w-full h-full object-contain transition-all duration-500"
              />
            </div>
            
            {currentImages.length > 1 && (
              <div className="flex space-x-4 justify-center">
                {currentImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      currentImageIndex === index 
                        ? 'border-apple-blue shadow-lg' 
                        : 'border-gray-200 hover:border-apple-blue'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-apple-dark mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-apple-light-gray mb-6">
                {product.tagline}
              </p>
              <p className="text-apple-dark leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-gray-200 pt-8">
              <div className="text-3xl font-semibold text-apple-dark">
                ${totalPrice.toLocaleString()}
                {storagePrice > 0 && (
                  <span className="text-lg text-apple-light-gray ml-2">
                    (${storagePrice} for {selectedStorage}GB)
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-apple-dark mb-4">
                Color: {selectedColor}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setCurrentImageIndex(0);
                    }}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-apple-blue bg-blue-50'
                        : 'border-gray-200 hover:border-apple-blue'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-medium text-apple-dark">{color.name}</span>
                    {selectedColor === color.name && (
                      <Check className="w-5 h-5 text-apple-blue ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-apple-dark mb-4">
                Storage: {selectedStorage}GB
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {product.storage.map((storage) => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                      selectedStorage === storage
                        ? 'border-apple-blue bg-blue-50'
                        : 'border-gray-200 hover:border-apple-blue'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-apple-dark">{storage}GB</div>
                      {product.storagePrice[storage] > 0 && (
                        <div className="text-sm text-apple-light-gray">
                          +${product.storagePrice[storage]}
                        </div>
                      )}
                    </div>
                    {selectedStorage === storage && (
                      <Check className="w-5 h-5 text-apple-blue" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="border-t border-gray-200 pt-8 space-y-6">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-apple-dark">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-apple-blue transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-apple-dark">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-apple-blue transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-apple-blue hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                Add to Cart - ${(totalPrice * quantity).toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;