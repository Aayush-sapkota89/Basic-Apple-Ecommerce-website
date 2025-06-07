import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Apple } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const cartItemsCount = getCartItemsCount();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Apple className="h-6 w-6 text-apple-dark group-hover:text-apple-blue transition-colors duration-200" />
              <span className="text-xl font-semibold text-apple-dark group-hover:text-apple-blue transition-colors duration-200">
                Hamro Apple Store
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/store"
              className={`text-sm font-medium transition-colors duration-200 hover:text-apple-blue ${
                isActive('/store') ? 'text-apple-blue' : 'text-apple-dark'
              }`}
            >
              Store
            </Link>
            <Link
              to="/store"
              className={`text-sm font-medium transition-colors duration-200 hover:text-apple-blue ${
                location.pathname.includes('/store') ? 'text-apple-blue' : 'text-apple-dark'
              }`}
            >
              iPhone
            </Link>
            <span className="text-sm font-medium text-apple-light-gray cursor-not-allowed">
              Mac
            </span>
            <span className="text-sm font-medium text-apple-light-gray cursor-not-allowed">
              Watch
            </span>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Search className="h-5 w-5 text-apple-dark" />
            </button>
            
            <Link 
              to="/cart" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
            >
              <ShoppingBag className="h-5 w-5 text-apple-dark group-hover:text-apple-blue transition-colors duration-200" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-apple-blue text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;