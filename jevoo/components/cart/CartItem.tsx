'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '../../types/product';

interface CartItemProps {
  item: CartItemType;
  index: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItemComponent({ item, index, onQuantityChange, onRemove }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    }
  };

  return (
    <tr>
      <td className="pro-number">{index}</td>
      <td className="pro-thumbnail">
        <Link href={`/product-details?slug=${item.slug || 'product-slug'}`}>
          <Image
            src={item.image || '/placeholder-product.jpg'}
            alt={typeof item.name === 'string' ? item.name : 'Product'}
            width={100}
            height={100}
            className="img-fluid"
          />
        </Link>
      </td>
      <td className="pro-title">
        <Link href={`/product-details?slug=${item.slug || 'product-slug'}`}>
          {typeof item.name === 'string' ? item.name : 'Product Name'}
        </Link>
        {item.brand && (
          <div className="manufacturer-name">
            <small>Brand: {typeof item.brand === 'string' ? item.brand : item.brand?.name || 'Unknown'}</small>
          </div>
        )}
        {item.selectedColor && (
          <div className="color-options mt-1">
            <small>Color: {typeof item.selectedColor === 'string' ? item.selectedColor : item.selectedColor?.name || 'Selected'}</small>
          </div>
        )}
        {item.selectedSize && (
          <div className="size-options mt-1">
            <small>Size: {item.selectedSize}</small>
          </div>
        )}
      </td>
      <td className="pro-quantity">
        <div className="quantity d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="qty-plus btn btn-outline-secondary btn-sm me-2"
            onClick={handleIncrement}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              cursor: 'pointer',
              borderRadius: '4px',
              padding: '5px 10px',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            +
          </button>
          <input
            type="text"
            value={quantity || 1}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (!isNaN(val) && val > 0) {
                handleQuantityChange(val);
              }
            }}
            min="1"
            style={{
              width: '50px',
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '5px',
              fontSize: '14px'
            }}
          />
          <button
            type="button"
            className="qty-minus btn btn-outline-secondary btn-sm ms-2"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
              borderRadius: '4px',
              padding: '5px 10px',
              fontSize: '16px',
              fontWeight: 'bold',
              color: quantity <= 1 ? '#ccc' : '#333'
            }}
          >
            -
          </button>
        </div>
      </td>
      <td className="pro-price">
        <span className="amount">${(parseFloat(String(item.price || 0)) * item.quantity).toFixed(2)}</span>
        {item.originalPrice && parseFloat(String(item.originalPrice)) > parseFloat(String(item.price || 0)) && (
          <small className="text-muted d-block">
            <del>${(parseFloat(String(item.originalPrice)) * item.quantity).toFixed(2)}</del>
          </small>
        )}
      </td>
      <td className="pro-remove">
        <button
          onClick={onRemove}
          className="remove-item"
          style={{
            background: 'none',
            border: 'none',
            color: '#dc3545',
            cursor: 'pointer',
            fontSize: '18px'
          }}
          title="Remove item"
        >
          <i className="pe-7s-close"></i>
        </button>
      </td>
    </tr>
  );
}