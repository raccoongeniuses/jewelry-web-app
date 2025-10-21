'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../types/product';
import CartButton from '../cart/CartButton';

interface ProductInfoProps {
  product: Product & {
    images: string[];
    colors: string[];
    sizes: string[];
    stockCount: number;
    rating: number;
    reviewCount: number;
    sku: string;
    categories: string[];
    tags: string[];
  };
  onQuickView: () => void;
}

export default function ProductInfo({ product, onQuickView }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const renderRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'good' : ''}>
        <i className={`fa fa-star${index >= rating ? '-o' : ''}`}></i>
      </span>
    ));
  };

  return (
    <div className="product-details-des">
      {/* Manufacturer Name */}
      <div className="manufacturer-name">
        <Link href="/product-details">{product.brand}</Link>
      </div>

      {/* Product Name */}
      <h3 className="product-name">{product.name}</h3>

      {/* Rating */}
      <div className="ratings d-flex">
        {renderRating(product.rating)}
        <div className="pro-review">
          <span>{product.reviewCount} Reviews</span>
        </div>
      </div>

      {/* Price */}
      <div className="price-box">
        <span className="price-regular">${product.price.toFixed(2)}</span>
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="price-old">
            <del>${product.originalPrice.toFixed(2)}</del>
          </span>
        )}
      </div>

      {/* Offer Countdown */}
      {product.isSale && (
        <>
          <h5 className="offer-text">
            <strong>Hurry up</strong>! offer ends in:
          </h5>
          <div className="product-countdown" data-countdown="2025/12/20"></div>
        </>
      )}

      {/* Stock Availability */}
      <div className="availability">
        <i className="fa fa-check-circle"></i>
        <span>{product.stockCount} in stock</span>
      </div>

      {/* Description */}
      <p className="pro-desc">{product.description}</p>

      {/* Quantity and Add to Cart */}
      <div className="quantity-cart-box d-flex align-items-center">
        <h6 className="option-title">qty:</h6>
        <div className="quantity">
          <div className="pro-qty">
            <input
              type="text"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
            />
          </div>
        </div>
        <div className="action_link">
          <CartButton
            product={{ ...product, quantity }}
            className="btn btn-cart2"
          >
            Add to cart
          </CartButton>
        </div>
      </div>

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="pro-size">
          <h6 className="option-title">size :</h6>
          <select
            className="nice-select"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Color Selection */}
      {product.colors && product.colors.length > 0 && (
        <div className="color-option">
          <h6 className="option-title">color :</h6>
          <ul className="color-categories">
            {product.colors.map((color, index) => (
              <li key={index}>
                <a
                  className={`c-${color.toLowerCase().replace(/\s+/g, '')}${
                    selectedColor === color ? ' active' : ''
                  }`}
                  href="#"
                  title={color}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color);
                  }}
                ></a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Useful Links */}
      <div className="useful-links">
        <a href="#" data-bs-toggle="tooltip" title="Compare">
          <i className="pe-7s-refresh-2"></i>compare
        </a>
        <a href="#" data-bs-toggle="tooltip" title="Wishlist">
          <i className="pe-7s-like"></i>wishlist
        </a>
      </div>

      {/* Social Share */}
      <div className="like-icon">
        <a className="facebook" href="#">
          <i className="fa fa-facebook"></i>like
        </a>
        <a className="twitter" href="#">
          <i className="fa fa-twitter"></i>tweet
        </a>
        <a className="pinterest" href="#">
          <i className="fa fa-pinterest"></i>save
        </a>
        <a className="google" href="#">
          <i className="fa fa-google-plus"></i>share
        </a>
      </div>
    </div>
  );
}