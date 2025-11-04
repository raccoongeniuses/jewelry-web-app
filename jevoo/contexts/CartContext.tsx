'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartContextType } from '../types/product';
import { cartService, cartItemToAddRequest } from '../services/cartService';
import { CartItemResponse, CartResponse } from '../types/cart';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import SuccessModal from '../components/ui/SuccessModal';
import { useAuth } from './AuthContext';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  showConfirmationModal: boolean;
  confirmationMessage: string;
  confirmationItemName: string;
  pendingRemoveItem: string | null;
  showSuccessModal: boolean;
  successMessage: string;
  sessionId: string | null;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { uniqueId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CART_FROM_API'; payload: CartItemResponse[] }
  | { type: 'SHOW_CONFIRMATION_MODAL'; payload: { message: string; itemName: string; uniqueId: string } }
  | { type: 'HIDE_CONFIRMATION_MODAL' }
  | { type: 'SHOW_SUCCESS_MODAL'; payload: string }
  | { type: 'HIDE_SUCCESS_MODAL' }
  | { type: 'SET_SESSION_ID'; payload: string };

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
      const convertedItems = action.payload.map((apiItem) => {
        // Helper function to construct full image URL (same as in product components)
        const getFullImageUrl = (imageUrl: string | undefined) => {
          if (!imageUrl) return '/placeholder-product.jpg';
          // If URL already starts with http, return as is
          if (imageUrl.startsWith('http')) return imageUrl;

          const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
          // If image URL starts with /api and base URL ends with /api, remove /api from image URL
          if (imageUrl.startsWith('/api') && baseUrl.endsWith('/api')) {
            return `${baseUrl}${imageUrl.replace('/api', '')}`;
          }
          // Otherwise, prepend the API base URL
          return `${baseUrl}${imageUrl}`;
        };

        const product = apiItem.product as any; // Type assertion to handle dynamic API response

        return {
          ...apiItem,
          id: apiItem.product.id,
          selectedSize: apiItem.productAttributes?.selectedSize,
          selectedColor: apiItem.productAttributes?.selectedColor,
          uniqueId: `${apiItem.product.id}-${apiItem.id}`, // Format: productId-cartItemId
          cartItemId: apiItem.id, // Store the cart item ID separately for easy access
          // Add required fields that might not be in API response
          name: typeof product.name === 'string' ? product.name : product.name?.name || 'Product Name',
          slug: typeof product.slug === 'string' ? product.slug : product.slug?.slug || 'product-slug',
          url: `/product-details?slug=${typeof product.slug === 'string' ? product.slug : product.slug?.slug || 'product-slug'}`,
          image: getFullImageUrl(product.productImage?.url || product.image),
          images: product.galleries?.map((gallery: any) => getFullImageUrl(gallery.image.url)) || product.images || [],
          colors: product.colors || [],
          sizes: product.sizes || [],
          // Copy other potential fields from product if they exist
          brand: product.brand,
          category: product.category,
          price: parseFloat(String(product.price)) || 0, // Ensure price is a number
          quantity: parseInt(String(apiItem.quantity)) || 1, // Ensure quantity is a number
          description: product.description,
          shortDescription: product.shortDescription,
          inStock: product.inStock,
          isNew: product.isNew,
          isSale: product.isSale,
          isOnSale: product.isOnSale,
          discount: product.discount,
          rating: product.rating,
          reviewCount: product.reviewCount,
          sku: product.sku,
          status: product.status,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        };
      });
      return {
        ...state,
        items: convertedItems,
        loading: false,
        error: null
      };

    case 'SHOW_CONFIRMATION_MODAL':
      return {
        ...state,
        showConfirmationModal: true,
        confirmationMessage: action.payload.message,
        confirmationItemName: action.payload.itemName,
        pendingRemoveItem: action.payload.uniqueId,
      };

    case 'HIDE_CONFIRMATION_MODAL':
      return {
        ...state,
        showConfirmationModal: false,
        confirmationMessage: '',
        confirmationItemName: '',
        pendingRemoveItem: null,
      };

    case 'SHOW_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: true,
        successMessage: action.payload,
      };

    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
        successMessage: '',
      };

    case 'SET_SESSION_ID':
      return {
        ...state,
        sessionId: action.payload,
      };

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: false,
    error: null,
    showConfirmationModal: false,
    confirmationMessage: '',
    confirmationItemName: '',
    pendingRemoveItem: null,
    showSuccessModal: false,
    successMessage: '',
    sessionId: null
  });

  // Handle cart clearing on logout
  useEffect(() => {
    // If user logs out (isAuthenticated becomes false), clear the cart
    if (!isAuthenticated && state.items.length > 0) {
      dispatch({ type: 'CLEAR_CART' });
      localStorage.removeItem('coranoCart');
    }
  }, [isAuthenticated]);

  // Load cart from API on mount, fallback to localStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        // Check if user is authenticated before calling API
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          // User not authenticated, skip API call and load from localStorage
          const savedCart = localStorage.getItem('coranoCart');
          if (savedCart) {
            try {
              const cartItems = JSON.parse(savedCart);
              dispatch({ type: 'LOAD_CART', payload: cartItems });
            } catch (error) {
              console.error('Error loading cart from localStorage:', error);
            }
          }
          dispatch({ type: 'SET_LOADING', payload: false });
          return;
        }

        const response = await cartService.getCart();

        // Handle different response formats
        let apiItems: CartItemResponse[] | null = null;

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
  }, [isAuthenticated]); // Reload cart when authentication state changes

  // Generate guest session ID for cart transfer purposes
  const ensureGuestSessionId = () => {
    if (!isAuthenticated) {
      let sessionId = localStorage.getItem('guestSessionId');
      if (!sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
        localStorage.setItem('guestSessionId', sessionId);
      }
      return sessionId;
    }
    return null;
  };

  // Save cart to localStorage whenever items change (for offline functionality)
  useEffect(() => {
    localStorage.setItem('coranoCart', JSON.stringify(state.items));

    // Ensure guest session ID exists when guest has items in cart
    if (!isAuthenticated && state.items.length > 0) {
      ensureGuestSessionId();
    }
  }, [state.items, isAuthenticated]);

  const addToCart = async (item: CartItem) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      // First add to local state for immediate UI feedback
      dispatch({ type: 'ADD_TO_CART', payload: item });

      // Call API for both guests and authenticated users to get sessionId
      try {
        const request = cartItemToAddRequest(item);
        const response = await cartService.addToCart(request);

        // Store sessionId from API response
        if (response && response.cart && response.cart.sessionId) {
          dispatch({ type: 'SET_SESSION_ID', payload: response.cart.sessionId });
          localStorage.setItem('guestSessionId', response.cart.sessionId);
        }

        // Only sync cart items for authenticated users
        if (isAuthenticated) {
          // Handle different response formats
          let apiItems: CartItemResponse[] | null = null;
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
        }
      } catch (apiError) {
        console.error('API error adding item to cart:', apiError);
        // Don't show error to user for guest users, just continue with local state
        dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to sync with server' : null });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      // Don't show errors for guest users since they're expected to work offline
      dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to add item to cart' : null });
    }
  };

  const removeFromCart = async (uniqueId: string) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      // Find the item to get its details
      const item = state.items.find(item => item.uniqueId === uniqueId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      // Show confirmation modal
      const itemName = typeof item.name === 'string' ? item.name : 'Product Name';
      dispatch({
        type: 'SHOW_CONFIRMATION_MODAL',
        payload: {
          message: 'Are you sure you want to delete',
          itemName: itemName,
          uniqueId: uniqueId
        }
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    }
  };

  const confirmRemoveFromCart = async () => {
    try {
      if (!state.pendingRemoveItem) return;

      // Find the item to get its cart item ID (from API response)
      const item = state.items.find(item => item.uniqueId === state.pendingRemoveItem);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      // First remove from local state for immediate UI feedback
      dispatch({ type: 'REMOVE_FROM_CART', payload: state.pendingRemoveItem });

      // Only call API if user is authenticated and item has cartItemId
      if (isAuthenticated && item.cartItemId) {
        try {
          const response = await cartService.removeFromCart(item.cartItemId);

          // Handle different response formats to sync with server
          let apiItems: CartItemResponse[] | null = null;
          if (response && response.cart && response.cart.items) {
            apiItems = response.cart.items;
          } else if (response && response.items && Array.isArray(response.items)) {
            apiItems = response.items;
          } else if (Array.isArray(response)) {
            apiItems = response;
          } else if (response && response.data && response.data.items && Array.isArray(response.data.items)) {
            apiItems = response.data.items;
          }

          if (apiItems && Array.isArray(apiItems)) {
            dispatch({ type: 'SET_CART_FROM_API', payload: apiItems });
          }
        } catch (apiError) {
          console.error('API error removing item from cart:', apiError);
          dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to sync with server' : null });
        }
      }

      // Show success modal regardless of API response format
      // The item has already been removed from local state
      dispatch({
        type: 'SHOW_SUCCESS_MODAL',
        payload: 'Item successfully removed from cart!'
      });
    } catch (error) {
      console.error('Error removing item from cart:', error);
      // Still show success modal since item was removed from local state
      dispatch({
        type: 'SHOW_SUCCESS_MODAL',
        payload: 'Item removed from cart!'
      });
    }
  };

  const updateQuantity = async (uniqueId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      // Find the item to get its cart item ID (from API response)
      const item = state.items.find(item => item.uniqueId === uniqueId);
      if (!item) {
        throw new Error('Item not found in cart');
      }

      // First update local state for immediate UI feedback
      dispatch({ type: 'UPDATE_QUANTITY', payload: { uniqueId, quantity } });

      // Only call API if user is authenticated and item has cartItemId
      if (isAuthenticated && item.cartItemId) {
        try {
          const response = await cartService.updateQuantity(item.cartItemId, quantity);

          // Handle different response formats
          let apiItems: CartItemResponse[] | null = null;
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
        } catch (apiError) {
          console.error('API error updating item quantity:', apiError);
          dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to sync with server' : null });
        }
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to update item quantity' : null });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      // First clear local state for immediate UI feedback
      dispatch({ type: 'CLEAR_CART' });

      // Only call API if user is authenticated
      if (isAuthenticated) {
        try {
          const response = await cartService.clearCart();

          // Handle different response formats - should be empty array
          let apiItems: CartItemResponse[] = [];
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
        } catch (apiError) {
          console.error('API error clearing cart:', apiError);
          dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to sync with server' : null });
        }
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: isAuthenticated ? 'Failed to clear cart' : null });
    }
  };

  const refreshCart = async () => {
    try {
      dispatch({ type: 'SET_ERROR', payload: null });

      const response = await cartService.getCart();

      // Handle different response formats
      let apiItems: CartItemResponse[] | null = null;
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
    getTotalItems,
    confirmRemoveFromCart,
    showConfirmationModal: state.showConfirmationModal,
    confirmationMessage: state.confirmationMessage,
    confirmationItemName: state.confirmationItemName,
    cancelConfirmation: () => dispatch({ type: 'HIDE_CONFIRMATION_MODAL' })
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <ConfirmationModal
        isOpen={state.showConfirmationModal}
        onClose={() => dispatch({ type: 'HIDE_CONFIRMATION_MODAL' })}
        onConfirm={confirmRemoveFromCart}
        message={state.confirmationMessage}
        itemName={state.confirmationItemName}
      />
      <SuccessModal
        isOpen={state.showSuccessModal}
        onClose={() => dispatch({ type: 'HIDE_SUCCESS_MODAL' })}
        message={state.successMessage}
      />
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
