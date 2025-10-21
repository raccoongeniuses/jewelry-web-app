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
  const [quantity, setQuantity] = useState(item.quantity);

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
        <Link href="/product-details">
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="img-fluid"
          />
        </Link>
      </td>
      <td className="pro-title">
        <Link href="/product-details">{item.name}</Link>
        {item.brand && (
          <div className="manufacturer-name">
            <small>Brand: {item.brand}</small>
          </div>
        )}
        {item.colors && item.colors.length > 0 && (
          <div className="color-options mt-1">
            <small>Color: {item.colors[0]}</small>
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
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
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
        <span className="amount">${(item.price * item.quantity).toFixed(2)}</span>
        {item.originalPrice && item.originalPrice > item.price && (
          <small className="text-muted d-block">
            <del>${(item.originalPrice * item.quantity).toFixed(2)}</del>
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