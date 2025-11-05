'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../../types/product';
import { WishlistItem, WishlistContextType } from '../../types/wishlist';
import { useAuth } from '../../contexts/AuthContext';
import { wishlistService } from '../../services/wishlistService';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ show: boolean; message: string; product?: string } | null>(null);
  const { isAuthenticated, getValidToken } = useAuth();

  // Load wishlist from API when user is authenticated
  useEffect(() => {
    const loadWishlist = async () => {
      if (isAuthenticated) {
        // Get valid token (will auto-logout if expired)
        const token = getValidToken();
        if (!token) {
          console.log('Wishlist: No valid token available');
          return; // User will be logged out automatically
        }

        try {
          setLoading(true);
          setError(null);
          const wishlistItems = await wishlistService.getWishlist(token);

          // Remove duplicates based on product ID
          const uniqueItems = Array.isArray(wishlistItems) ?
            wishlistItems.filter((item, index, arr) =>
              arr.findIndex(i => i.id === item.id) === index
            ) : [];

          setItems(uniqueItems);
        } catch (err: any) {
          console.error('Error loading wishlist from API:', err);
          setError(err.message || 'Failed to load wishlist');
          // Set empty array on error to prevent undefined issues
          setItems([]);
        } finally {
          setLoading(false);
        }
      } else {
        // Clear wishlist when user is not authenticated
        setItems([]);
      }
    };

    loadWishlist();
  }, [isAuthenticated, getValidToken]);

  const addToWishlist = async (product: Product) => {
    if (!isAuthenticated) {
      setError('Please login to add items to your wishlist');
      return;
    }

    // Get valid token (will auto-logout if expired)
    const token = getValidToken();
    if (!token) {
      setError('Your session has expired. Please login again.');
      return;
    }

    // Check if item already exists in wishlist
    if (isInWishlist(product.id)) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const apiResponse = await wishlistService.addToWishlist(product, token);
      // Create a proper WishlistItem by merging product data with API response
      const newItem: WishlistItem = {
        ...product,
        dateAdded: new Date().toISOString(),
        ...apiResponse // Merge any additional fields from API response
      };

      // Prevent duplicates by replacing existing item or adding new one
      setItems(prevItems => {
        const existingIndex = prevItems.findIndex(item => item.id === product.id);
        if (existingIndex >= 0) {
          // Replace existing item
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = newItem;
          return updatedItems;
        } else {
          // Add new item
          return [...prevItems, newItem];
        }
      });

      // Refresh the wishlist to ensure we have the latest data
      setTimeout(async () => {
        try {
          const validToken = getValidToken();
          if (!validToken) return; // User was logged out due to expired token
          const refreshedItems = await wishlistService.getWishlist(validToken);

          // Remove duplicates from refreshed data
          const uniqueRefreshedItems = Array.isArray(refreshedItems) ?
            refreshedItems.filter((item, index, arr) =>
              arr.findIndex(i => i.id === item.id) === index
            ) : [];

          setItems(uniqueRefreshedItems);
        } catch (error) {
          console.error('Failed to refresh wishlist:', error);
        }
      }, 500); // Small delay to ensure API has processed the addition

      // Show success notification
      setNotification({
        show: true,
        message: `${product.name} has been successfully added to wishlist!`,
        product: product.name
      });

      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (err: any) {
      console.error('Error adding item to wishlist:', err);
      setError(err.message || 'Failed to add item to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!isAuthenticated) {
      setError('Please login to remove items from your wishlist');
      return;
    }

    // Get valid token (will auto-logout if expired)
    const token = getValidToken();
    if (!token) {
      setError('Your session has expired. Please login again.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await wishlistService.removeFromWishlist(id, token);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err: any) {
      console.error('Error removing item from wishlist:', err);
      setError(err.message || 'Failed to remove item from wishlist');
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (id: string): boolean => {
    return Array.isArray(items) ? items.some(item => item.id === id) : false;
  };

  const clearWishlist = async () => {
    if (!isAuthenticated) {
      setError('Please login to clear your wishlist');
      return;
    }

    // Get valid token (will auto-logout if expired)
    const token = getValidToken();
    if (!token) {
      setError('Your session has expired. Please login again.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Remove all items one by one since the API doesn't seem to have a bulk delete endpoint
      if (Array.isArray(items) && items.length > 0) {
        for (const item of items) {
          await wishlistService.removeFromWishlist(item.id, token);
        }
      }
      setItems([]);
    } catch (err: any) {
      console.error('Error clearing wishlist:', err);
      setError(err.message || 'Failed to clear wishlist');
    } finally {
      setLoading(false);
    }
  };

  const getWishlistCount = (): number => {
    return Array.isArray(items) ? items.length : 0;
  };

  const value: WishlistContextType = {
    items: Array.isArray(items) ? items : [],
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount,
    loading
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
      {notification && notification.show && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: '500',
            animation: 'slideIn 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fa fa-check-circle"></i>
          {notification.message}
        </div>
      )}
      {error && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 9999,
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: '500',
            animation: 'slideIn 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <i className="fa fa-exclamation-circle"></i>
          {error}
          <button
            onClick={() => setError(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              marginLeft: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}