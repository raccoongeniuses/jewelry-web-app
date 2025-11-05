'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WishlistItem } from '../../types/wishlist';
import { useAuth } from '../../contexts/AuthContext';
import LoaderSpinner from '../LoaderSpinner';
import './Wishlist.css';

interface WishlistProps {
  items?: WishlistItem[];
  onRemove?: (id: string) => Promise<void>;
  onAddToCart?: (item: WishlistItem) => Promise<void>;
}

export default function Wishlist({ items = [], onRemove, onAddToCart, loading = false }: WishlistProps & { loading?: boolean }) {
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Track initial load - once we have items or auth is resolved, mark initial load as complete
  useEffect(() => {
    if (!loading && !authLoading && isAuthenticated !== undefined) {
      // Small delay to ensure data is fully settled
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, authLoading, isAuthenticated]);

  // Show loading spinner while any data is still loading, auth state is uncertain, or during initial load
  if (loading || authLoading || isAuthenticated === undefined || isInitialLoad) {
    return (
      <div className="wishlist-main-wrapper section-padding">
        <div className="container">
          <div className="section-bg-color">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center py-5">
                  <div className="loader-container">
                    <LoaderSpinner size="large" />
                    <p className="mt-3 text-muted">Loading your wishlist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleRemove = async (id: string) => {
    if (onRemove) {
      // Track which item is being removed
      setRemovingItems(prev => new Set(prev).add(id));

      try {
        await onRemove(id);
        // No need to update local state since we're using items prop directly
      } catch (error) {
        console.error('Failed to remove item from wishlist:', error);
      } finally {
        // Remove from tracking set
        setRemovingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    if (onAddToCart) {
      await onAddToCart(item);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="wishlist-main-wrapper section-padding">
        <div className="container">
          <div className="section-bg-color">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center py-5">
                  <i className="pe-7s-like" style={{ fontSize: '48px', color: '#ccc' }}></i>
                  <h3 className="mt-3">Please login to view your wishlist</h3>
                  <p className="text-muted">You need to be logged in to manage your wishlist items</p>
                  <Link href="/login" className="btn btn-sqr mt-3">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state only when auth is complete, user is authenticated, and there are definitely no items
  if (isAuthenticated && items.length === 0) {
    return (
      <div className="wishlist-main-wrapper section-padding">
        <div className="container">
          <div className="section-bg-color">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center py-5">
                  <i className="pe-7s-like" style={{ fontSize: '48px', color: '#ccc' }}></i>
                  <h3 className="mt-3">Your wishlist is empty</h3>
                  <p className="text-muted">Add items to your wishlist to see them here</p>
                  <Link href="/our-products" className="btn btn-sqr mt-3">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-main-wrapper section-padding">
      <div className="container">
        <div className="section-bg-color">
          <div className="row">
            <div className="col-lg-12">
              {/* Wishlist Table Area */}
              <div className="cart-table table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="pro-preview">Preview</th>
                      <th className="pro-title">Product</th>
                      <th className="pro-price">Price</th>
                      <th className="pro-subtotal">Add to Cart</th>
                      <th className="pro-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="pro-preview">
                          <Link href={`/product/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="img-fluid"
                            />
                          </Link>
                        </td>
                        <td className="pro-title">
                          <Link href={`/product/${item.slug}`}>
                            {item.name}
                          </Link>
                          {item.brand && (
                            <div className="manufacturer-name">
                              <small>Brand: {item.brand}</small>
                            </div>
                          )}
                        </td>
                        <td className="pro-price">
                          <span>
                            ${item.isSale && item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                          </span>
                          {item.isSale && item.salePrice && item.salePrice < item.price && (
                            <small className="text-muted d-block">
                              <del>${item.price.toFixed(2)}</del>
                            </small>
                          )}
                        </td>
                        <td className="pro-subtotal">
                          <button
                            className="btn btn-sqr"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                        </td>
                        <td className="pro-remove">
                          <button
                            onClick={() => handleRemove(item.id)}
                            disabled={removingItems.has(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: removingItems.has(item.id) ? '#999' : '#dc3545',
                              cursor: removingItems.has(item.id) ? 'not-allowed' : 'pointer',
                              fontSize: '16px',
                              opacity: removingItems.has(item.id) ? 0.6 : 1
                            }}
                            title="Remove from wishlist"
                          >
                            {removingItems.has(item.id) ? (
                              <i className="fa fa-spinner fa-spin"></i>
                            ) : (
                              <i className="fa fa-trash-o"></i>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}