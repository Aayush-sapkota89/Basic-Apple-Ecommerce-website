import React from 'react';
import { Apple } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-apple-gray mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Apple className="h-6 w-6 text-apple-dark" />
              <span className="text-xl font-semibold text-apple-dark">
                Hamro Apple Store
              </span>
            </div>
            <p className="text-apple-light-gray text-sm leading-relaxed max-w-md">
              Your trusted destination for the latest iPhone models. Experience the future of technology with our carefully curated selection of Apple products.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-apple-dark font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="/store" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  All Products
                </a>
              </li>
              <li>
                <a href="/store" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  iPhone 15 Pro
                </a>
              </li>
              <li>
                <a href="/store" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  iPhone 15
                </a>
              </li>
              <li>
                <a href="/store" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  iPhone 14
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-apple-dark font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-apple-light-gray text-sm">
              © 2024 Hamro Apple Store. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-apple-light-gray hover:text-apple-blue text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;