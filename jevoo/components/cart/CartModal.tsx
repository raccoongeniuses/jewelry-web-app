'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import './CartModal.css';

// Extend Window interface to include openCartModal
declare global {
  interface Window {
    openCartModal?: () => void;
  }
}

export default function CartModal() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, loading, error } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Debug logging - remove in production

  // Expose the openCart function globally so other components can trigger it
  React.useEffect(() => {
    window.openCartModal = () => setIsOpen(true);
    return () => {
      delete window.openCartModal;
    };
  }, []);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      // Click on overlay should close cart (handled by onClick on overlay element)
      if (isOpen && target.classList.contains('offcanvas-overlay')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when cart is open
      document.body.style.overflow = 'hidden';
      // Add class to body to control z-index of other elements
      document.body.classList.add('cart-modal-open');
    } else {
      document.body.style.overflow = 'unset';
      // Remove class from body
      document.body.classList.remove('cart-modal-open');
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('cart-modal-open');
    };
  }, [isOpen]);

  const handleQuantityChange = async (uniqueId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeFromCart(uniqueId);
    } else {
      await updateQuantity(uniqueId, newQuantity);
    }
  };

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        className="minicart-btn react-cart-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label="Shopping cart"
      >
        <i className="pe-7s-shopbag"></i>
        <div className="notification">{getTotalItems()}</div>
      </button>

      {/* Cart Modal - Following original minicart structure */}
      <div
        className={`offcanvas-minicart-wrapper ${isOpen ? 'show' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
          }
          e.stopPropagation();
        }}
      >
        <div className="minicart-inner">
          {/* Overlay */}
          <div
            className="offcanvas-overlay"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Content Panel */}
          <div className="minicart-inner-content">
            {/* Close button */}
            <div className="minicart-close">
              <i className="pe-7s-close"></i>
            </div>

            {/* Cart Content Box */}
            <div className="minicart-content-box">
              {items.length === 0 ? (
                <div className="empty-cart-message">
                  <div className="empty-cart-icon">
                    <i className="pe-7s-shopbag"></i>
                  </div>
                  <div className="empty-cart-title">Your cart is empty</div>
                  <div className="empty-cart-text">Looks like you haven&apos;t added any items to your cart yet.</div>
                </div>
              ) : (
                <>
                  {/* Cart Items Wrapper */}
                  <div className="minicart-item-wrapper">
                    {items.map((item) => {
                      return (
                        <div key={item.uniqueId} className="minicart-item">
                            {/* Product Thumbnail */}
                            <div className="minicart-thumb">
                              <Link href={item.url || '/product-details'}>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={85}
                                  height={85}
                                  style={{
                                    objectFit: 'cover'
                                  }}
                                />
                              </Link>
                            </div>

                            {/* Product Content */}
                            <div className="minicart-content">
                              <div className="product-header">
                                <div className="product-name">
                                  {item.name}
                                </div>
                                <button
                                  className="minicart-remove"
                                  onClick={() => removeFromCart(item.uniqueId!)}
                                  aria-label="Remove item"
                                >
                                  <i className="pe-7s-close"></i>
                                </button>
                              </div>

                              {/* Size and Color Info */}
                              {(item.selectedSize || item.selectedColor) && (
                                <div className="cart-variants">
                                  {item.selectedSize && (
                                    <span>Size: <strong>{item.selectedSize}</strong></span>
                                  )}
                                  {item.selectedColor && (
                                    <span>Color: <strong>{item.selectedColor}</strong></span>
                                  )}
                                </div>
                              )}

                              <div className="cart-details">
                                {/* Quantity Controls */}
                                <div className="pro-qty">
                                  <button
                                    type="button"
                                    className="qtybtn dec"
                                    onClick={() => handleQuantityChange(item.uniqueId!, (item.quantity || 1) - 1)}
                                  >
                                    −
                                  </button>
                                  <input
                                    type="text"
                                    value={item.quantity || 1}
                                    onChange={(e) => handleQuantityChange(item.uniqueId!, parseInt(e.target.value) || 1)}
                                  />
                                  <button
                                    type="button"
                                    className="qtybtn inc"
                                    onClick={() => handleQuantityChange(item.uniqueId!, (item.quantity || 1) + 1)}
                                  >
                                    +
                                  </button>
                                </div>

                                {/* Price */}
                                <span className="cart-price">
                                  ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                                </span>
                              </div>
                            </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Loading indicator */}
                  {loading && (
                    <div className="cart-loading">
                      <div className="spinner"></div>
                      <span>Updating cart...</span>
                    </div>
                  )}

                  {/* Error message */}
                  {error && (
                    <div className="cart-error">
                      <span>{error}</span>
                    </div>
                  )}

                  {/* Pricing Box */}
                  <div className="minicart-pricing-box">
                    <div className="pricing-item total">
                      <span>Total</span>
                      <span><strong>${getTotalPrice().toFixed(2)}</strong></span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="minicart-button">
                    <Link
                      href="/cart"
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa fa-shopping-cart"></i> View Cart
                    </Link>
                    <Link
                      href="/checkout"
                      onClick={() => setIsOpen(false)}
                    >
                      <i className="fa fa-share"></i> Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
