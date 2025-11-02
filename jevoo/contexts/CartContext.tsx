'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartContextType } from '../types/product';
import { cartService, cartItemToAddRequest } from '../services/cartService';
import { CartItemResponse, CartResponse } from '../types/cart';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { uniqueId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART_FROM_API'; payload: CartItemResponse[] };

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

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'SET_CART_FROM_API':
      // Convert API response items to CartItem format
      const convertedItems = action.payload.map((apiItem) => ({
        ...apiItem,
        id: apiItem.product.id,
        selectedSize: apiItem.productAttributes?.selectedSize,
        selectedColor: apiItem.productAttributes?.selectedColor,
        uniqueId: `${apiItem.product.id}-${apiItem.id}`, // Format: productId-cartItemId
        cartItemId: apiItem.id, // Store the cart item ID separately for easy access
        // Add required fields that might not be in API response
        name: apiItem.product.name || 'Product Name', // Try to get from API or use default
        slug: apiItem.product.slug || 'product-slug', // Try to get from API or use default
        image: apiItem.product.image || '', // Try to get from API or use default
        images: apiItem.product.images || [], // Try to get from API or use default
        colors: apiItem.product.colors || [],
        sizes: apiItem.product.sizes || [],
        // Copy other potential fields from product if they exist
        brand: apiItem.product.brand,
        category: apiItem.product.category,
        description: apiItem.product.description,
        shortDescription: apiItem.product.shortDescription,
        inStock: apiItem.product.inStock,
        isNew: apiItem.product.isNew,
        isSale: apiItem.product.isSale,
        isOnSale: apiItem.product.isOnSale,
        discount: apiItem.product.discount,
        rating: apiItem.product.rating,
        reviewCount: apiItem.product.reviewCount,
        sku: apiItem.product.sku,
        status: apiItem.product.status,
        createdAt: apiItem.product.createdAt,
        updatedAt: apiItem.product.updatedAt,
      }));
      return {
        ...state,
        items: convertedItems,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], loading: false, error: null });

  // Load cart from API on mount, fallback to localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await cartService.getCart();

        console.log('API Response:', response); // Debug log

        // Handle different response formats
        let apiItems = null;

        if (response && response.cart && response.cart.items) {
          // Format: { cart: { items: [...] } }
          apiItems = response.cart.items;
        } else if (response && response.items) {
          // Format: { items: [...] }
          apiItems = response.items;
        } else if (Array.isArray(response)) {
          // Format: [...]
          apiItems = response;
        } else if (response && response.data && response.data.items) {
          // Format: { data: { items: [...] } }
          apiItems = response.data.items;
        } else {
          console.warn('Unexpected API response format:', response);
        }

        if (apiItems && Array.isArray(apiItems) && apiItems.length > 0) {
          dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
          // Also save to localStorage for offline functionality
          localStorage.setItem('coranoCart', JSON.stringify(apiItems));
        } else {
          // Fallback to localStorage if API returns empty cart or invalid response
          const savedCart = localStorage.getItem('coranoCart');
          if (savedCart) {
            try {
              const cartItems = JSON.parse(savedCart);
              dispatch({ type: 'LOAD_CART', payload: cartItems });
            } catch (error) {
              console.error('Error loading cart from localStorage:', error);
            }
          }
        }
        dispatch({ type: 'SET_ERROR', payload: null });
      } catch (error) {
        console.error('Error loading cart from API:', error);
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart from server' });

        // Fallback to localStorage on API error
        const savedCart = localStorage.getItem('coranoCart');
        if (savedCart) {
          try {
            const cartItems = JSON.parse(savedCart);
            dispatch({ type: 'LOAD_CART', payload: cartItems });
          } catch (error) {
            console.error('Error loading cart from localStorage:', error);
          }
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever items change (for offline functionality)
  useEffect(() => {
    localStorage.setItem('coranoCart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = async (item: CartItem) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // First add to local state for immediate UI feedback
      dispatch({ type: 'ADD_TO_CART', payload: item });

      // Then call API to persist
      const request = cartItemToAddRequest(item);
      const response = await cartService.addToCart(request);

      console.log('Add to cart response:', response); // Debug log

      // Handle different response formats
      let apiItems = null;
      if (response && response.cart && response.cart.items) {
        apiItems = response.cart.items;
      } else if (response && response.items) {
        apiItems = response.items;
      } else if (Array.isArray(response)) {
        apiItems = response;
      } else if (response && response.data && response.data.items) {
        apiItems = response.data.items;
      }

      if (apiItems && Array.isArray(apiItems)) {
        dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
      // Keep local state changes on API error so user doesn't lose their action
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeFromCart = async (uniqueId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Find the item to get its ID
      const item = state.items.find(item => item.uniqueId === uniqueId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      // First remove from local state for immediate UI feedback
      dispatch({ type: 'REMOVE_FROM_CART', payload: uniqueId });

      // Then call API to persist
      const response = await cartService.removeFromCart(item.id, {
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });

      console.log('Remove from cart response:', response); // Debug log

      // Handle different response formats
      let apiItems = null;
      if (response && response.cart && response.cart.items) {
        apiItems = response.cart.items;
      } else if (response && response.items) {
        apiItems = response.items;
      } else if (Array.isArray(response)) {
        apiItems = response;
      } else if (response && response.data && response.data.items) {
        apiItems = response.data.items;
      }

      if (apiItems && Array.isArray(apiItems)) {
        dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
      // Keep local state changes on API error so user doesn't lose their action
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateQuantity = async (uniqueId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Find the item to get its cart item ID (from API response)
      const item = state.items.find(item => item.uniqueId === uniqueId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      // Use the cart item ID directly if available (from API response)
      // Fallback to parsing from uniqueId for backward compatibility
      const cartItemId = item.cartItemId || item.uniqueId?.split('-').pop();
      if (!cartItemId) {
        throw new Error('Cart item ID not found');
      }

      // First update local state for immediate UI feedback
      dispatch({ type: 'UPDATE_QUANTITY', payload: { uniqueId, quantity } });

      // Then call API to persist using cart item ID
      const response = await cartService.updateQuantity(cartItemId, quantity);

      console.log('Update quantity response:', response); // Debug log

      // Handle different response formats
      let apiItems = null;
      if (response && response.cart && response.cart.items) {
        apiItems = response.cart.items;
      } else if (response && response.items) {
        apiItems = response.items;
      } else if (Array.isArray(response)) {
        apiItems = response;
      } else if (response && response.data && response.data.items) {
        apiItems = response.data.items;
      }

      if (apiItems && Array.isArray(apiItems)) {
        dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update item quantity' });
      // Keep local state changes on API error so user doesn't lose their action
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // First clear local state for immediate UI feedback
      dispatch({ type: 'CLEAR_CART' });

      // Then call API to persist
      const response = await cartService.clearCart();

      console.log('Clear cart response:', response); // Debug log

      // Handle different response formats - should be empty array
      let apiItems = [];
      if (response && response.cart && response.cart.items) {
        apiItems = response.cart.items;
      } else if (response && response.items) {
        apiItems = response.items;
      } else if (Array.isArray(response)) {
        apiItems = response;
      } else if (response && response.data && response.data.items) {
        apiItems = response.data.items;
      }

      dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
      // Keep local state changes on API error so user doesn't lose their action
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const refreshCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await cartService.getCart();
      console.log('Refresh cart response:', response); // Debug log

      // Handle different response formats
      let apiItems = null;
      if (response && response.cart && response.cart.items) {
        apiItems = response.cart.items;
      } else if (response && response.items) {
        apiItems = response.items;
      } else if (Array.isArray(response)) {
        apiItems = response;
      } else if (response && response.data && response.data.items) {
        apiItems = response.data.items;
      }

      if (apiItems && Array.isArray(apiItems)) {
        dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
      }
    } catch (error) {
      console.error('Error refreshing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to refresh cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items: state.items,
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
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
