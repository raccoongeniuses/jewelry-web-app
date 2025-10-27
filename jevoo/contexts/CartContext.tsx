'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartContextType } from '../types/product';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { uniqueId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // For items without size/color variants (like marquee items), group by id
      // For items with size/color variants, group by id, size, and color
      const existingItem = state.items.find(item =>
        action.payload.selectedSize || action.payload.selectedColor
          ? item.id === action.payload.id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
          : item.id === action.payload.id &&
            !item.selectedSize &&
            !item.selectedColor
      );

      if (existingItem) {
        // Update existing item quantity
        return {
          ...state,
          items: state.items.map(item =>
            (action.payload.selectedSize || action.payload.selectedColor)
              ? item.id === action.payload.id &&
                item.selectedSize === action.payload.selectedSize &&
                item.selectedColor === action.payload.selectedColor
                ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                : item
              : item.id === action.payload.id &&
                !item.selectedSize &&
                !item.selectedColor
                ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
                : item
          )
        };
      } else {
        // Add new item with uniqueId
        const uniqueId = `${action.payload.id}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
        const cartItemWithUniqueId = {
          ...action.payload,
          uniqueId: action.payload.uniqueId || uniqueId,
          quantity: action.payload.quantity || 1
        };
        return {
          ...state,
          items: [...state.items, cartItemWithUniqueId]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.uniqueId !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.uniqueId !== action.payload.uniqueId)
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.uniqueId === action.payload.uniqueId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      // Ensure all loaded items have uniqueId for backward compatibility
      const itemsWithUniqueId = action.payload.map((item, index) => ({
        ...item,
        uniqueId: item.uniqueId || `${item.id}-${index}-${Date.now()}`
      }));
      return {
        ...state,
        items: itemsWithUniqueId
      };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('coranoCart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    } else {
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('coranoCart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (item: CartItem) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (uniqueId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: uniqueId });
  };

  const updateQuantity = (uniqueId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { uniqueId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
