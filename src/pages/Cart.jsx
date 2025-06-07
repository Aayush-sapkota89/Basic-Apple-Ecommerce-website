import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-apple-light-gray mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-apple-dark mb-4">Your cart is empty</h1>
            <p className="text-apple-light-gray text-lg mb-8">
              Start shopping and add some amazing iPhones to your cart.
            </p>
            <Link
              to="/store"
              className="inline-flex items-center bg-apple-blue hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-apple-dark mb-2">Shopping Cart</h1>
          <p className="text-apple-light-gray">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
              const storagePrice = item.storagePrice[item.selectedStorage] || 0;
              const itemTotal = (item.price + storagePrice) * item.quantity;
              const selectedColorObj = item.colors.find(c => c.name === item.selectedColor);

              return (
                <div key={item.cartId} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 bg-apple-gray rounded-xl overflow-hidden">
                      <img
                        src={item.images[item.selectedColor]?.[0] || item.heroImage}
                        alt={`${item.name} in ${item.selectedColor}`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-apple-dark mb-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-apple-light-gray mb-3">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: selectedColorObj?.hex }}
                          />
                          <span>{item.selectedColor}</span>
                        </div>
                        <span>•</span>
                        <span>{item.selectedStorage}GB</span>
                      </div>
                      <div className="text-lg font-semibold text-apple-dark">
                        ${itemTotal.toLocaleString()}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-apple-blue transition-colors duration-200"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-apple-dark">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-apple-blue transition-colors duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-2 text-apple-light-gray hover:text-red-500 transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-medium transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-apple-gray rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-apple-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-apple-dark">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-apple-dark">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-apple-dark">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-apple-dark">
                    <span>Total</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-apple-blue hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-105 mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/store"
                className="block text-center text-apple-blue hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;