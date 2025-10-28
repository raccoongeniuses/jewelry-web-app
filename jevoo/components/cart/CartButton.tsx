'use client';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product, CartItem } from '../../types/product';

interface CartButtonProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
  onAddToCart?: () => void; // Optional callback to trigger cart modal
}

export default function CartButton({ product, className = 'btn btn-cart', children, onAddToCart }: CartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // Convert Product to CartItem by adding required quantity
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      uniqueId: `${product.id}-${Date.now()}`, // Generate unique ID for cart
    };

    addToCart(cartItem);
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
