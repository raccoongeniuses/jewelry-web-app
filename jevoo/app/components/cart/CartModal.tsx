'use client';

import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartModal() {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <button 
        className="minicart-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="pe-7s-shopbag"></i>
        <div className="notification">{items.length}</div>
      </button>

      {/* Cart Modal */}
      {isOpen && (
        <div className="minicart-inner">
          <div className="minicart-item-wrapper">
            {items.length === 0 ? (
              <div className="text-center p-3">Your cart is empty</div>
            ) : (
              <ul>
                {items.map((item) => (
                  <li key={item.id} className="minicart-item">
                    <div className="minicart-thumb">
                      <Link href={item.url || '/product-details'}>
                        <Image 
                          src={item.image} 
                          alt={item.name}
                          width={80}
                          height={80}
                        />
                      </Link>
                    </div>
                    <div className="minicart-content">
                      <div className="minicart-header">
                        <h3 className="product-name">
                          <Link href={item.url || '/product-details'}>{item.name}</Link>
                        </h3>
                        <button 
                          className="minicart-remove"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <i className="pe-7s-close"></i>
                        </button>
                      </div>
                      <div className="minicart-details">
                        <div className="pro-qty">
                          <button 
                            type="button" 
                            className="qtybtn dec"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            −
                          </button>
                          <input 
                            type="text" 
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                            className="quantity-input"
                          />
                          <button 
                            type="button" 
                            className="qtybtn inc"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <p className="cart-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {items.length > 0 && (
            <div className="minicart-footer">
              <div className="minicart-total">
                <div className="subtotal">
                  <span className="label">Subtotal:</span>
                  <span className="ammount">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
              <div className="minicart-button">
                <Link href="/cart" className="btn btn-primary">
                  View Cart
                </Link>
                <Link href="/checkout" className="btn btn-secondary">
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
