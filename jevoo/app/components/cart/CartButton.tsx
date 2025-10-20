'use client';

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types/product';

interface CartButtonProps {
  product: Product;
  className?: string;
  children?: React.ReactNode;
}

export default function CartButton({ product, className = 'btn btn-cart', children }: CartButtonProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // You can add a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <button 
      className={className}
      onClick={handleAddToCart}
    >
      {children || 'Add to Cart'}
    </button>
  );
}
