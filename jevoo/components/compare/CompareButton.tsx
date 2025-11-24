'use client';

import React from 'react';
import { useCompare } from '../../contexts/CompareContext';
import { Product } from '../../types/product';

interface CompareButtonProps {
  product: Product;
}

export default function CompareButton({ product }: CompareButtonProps) {
  const { addToCompare, isProductInCompare } = useCompare();

  const isInCompare = isProductInCompare(product.slug || '');

  const handleAddToCompare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.slug) {
      alert('Product slug is required for comparison.');
      return;
    }

    await addToCompare(product.slug);
  };

  // If product is already in compare, show link to compare page
  if (isInCompare) {
    return (
      <a
        href="/compare"
        data-bs-toggle="tooltip"
        data-bs-placement="left"
        title="View in Compare"
        style={{ color: '#28a745' }}
      >
        <i className="pe-7s-refresh-2"></i>
      </a>
    );
  }

  // Otherwise, show add to compare button (reverting to original style)
  return (
    <a
      href="#"
      onClick={handleAddToCompare}
      data-bs-toggle="tooltip"
      data-bs-placement="left"
      title="Add to Compare"
    >
      <i className="pe-7s-refresh-2"></i>
    </a>
  );
}