'use client';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { CartItem } from '../../types/product';

interface CartButtonProps {
  product: CartItem;
  className?: string;
  children?: React.ReactNode;
  onAddToCart?: () => void; // Optional callback to trigger cart modal
}

export default function CartButton({ product, className = 'btn btn-cart', children, onAddToCart }: CartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);

    // Trigger cart modal open callback if provided
    if (onAddToCart) {
      onAddToCart();
    } else {
      // Auto-open cart modal when item is added
      setTimeout(() => {
        if (window.openCartModal) {
          window.openCartModal();
        }
      }, 300);
    }

    // Reset button state after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <button
      className={`${className} ${isAdded ? 'added' : ''}`}
      onClick={handleAddToCart}
      disabled={isAdded}
      style={{
        background: isAdded ? '#27ae60' : undefined,
        cursor: isAdded ? 'default' : 'pointer'
      }}
    >
      {isAdded ? 'Added!' : children || 'Add to Cart'}
    </button>
  );
}
