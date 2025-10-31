'use client';

import { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import { useWishlist } from './WishlistProvider';
import './Wishlist.css';

interface WishlistButtonProps {
  product: Product;
  className?: string;
  showText?: boolean;
}

export default function WishlistButton({ product, className = '', showText = false }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isInWishlistState, setIsInWishlistState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsInWishlistState(isInWishlist(product.id));
  }, [product.id, isInWishlist]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);

    try {
      if (isInWishlistState) {
        removeFromWishlist(product.id);
        setIsInWishlistState(false);
      } else {
        addToWishlist(product);
        setIsInWishlistState(true);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      data-bs-toggle="tooltip"
      data-bs-placement="left"
      title={isInWishlistState ? 'Remove from wishlist' : 'Add to wishlist'}
      className={className}
      style={{
        color: isInWishlistState ? '#e74c3c' : 'inherit',
        textDecoration: 'none'
      }}
    >
      <i className={`pe-7s-like ${isInWishlistState ? 'filled' : ''}`}></i>
      {showText && (
        <span style={{ fontSize: '14px', marginLeft: '5px' }}>
          {isInWishlistState ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </span>
      )}
    </a>
  );
}