import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(
        item => 
          item.id === action.payload.id && 
          item.selectedColor === action.payload.selectedColor &&
          item.selectedStorage === action.payload.selectedStorage
      );
      
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id && 
          item.selectedColor === action.payload.selectedColor &&
          item.selectedStorage === action.payload.selectedStorage
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...state, { ...action.payload, quantity: 1 }];
    }
    
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.cartId !== action.payload);
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.cartId === action.payload.cartId
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
    
    case 'CLEAR_CART':
      return [];
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    const cartId = `${product.id}-${product.selectedColor}-${product.selectedStorage}`;
    dispatch({ 
      type: 'ADD_TO_CART', 
      payload: { ...product, cartId } 
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: cartId });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { cartId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const storagePrice = item.storagePrice[item.selectedStorage] || 0;
      return total + (item.price + storagePrice) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};