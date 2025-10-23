'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/product';
import CartButton from '../cart/CartButton';
import QuickViewModal from '../modals/QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <div className="product-item">
      <figure className="product-thumb">
        <Link href={product.url || '/product-details'}>
          <Image 
            className="pri-img" 
            src={product.image} 
            alt={product.name}
            width={300}
            height={300}
          />
          {product.secondaryImage && (
            <Image 
              className="sec-img" 
              src={product.secondaryImage} 
              alt={product.name}
              width={300}
              height={300}
            />
          )}
        </Link>
        
        <div className="product-badge">
          {product.isNew && (
            <div className="product-label new">
              <span>new</span>
            </div>
          )}
          {product.isSale && product.discount && (
            <div className="product-label discount">
              <span>{product.discount}%</span>
            </div>
          )}
        </div>
        
        <div className="button-group">
          <a href="/wishlist" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to wishlist">
            <i className="pe-7s-like"></i>
          </a>
          <a href="/compare" data-bs-toggle="tooltip" data-bs-placement="left" title="Add to Compare">
            <i className="pe-7s-refresh-2"></i>
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); setIsQuickViewOpen(true); }}>
            <span data-bs-toggle="tooltip" data-bs-placement="left" title="Quick View">
              <i className="pe-7s-search"></i>
            </span>
          </a>
        </div>
        
        <div className="cart-hover">
          <CartButton product={product} />
        </div>
      </figure>
      
      <div className="product-caption text-center">
        <div className="product-identity">
          <p className="manufacturer-name">
            <Link href={product.url || '/product-details'}>{product.brand || 'Brand'}</Link>
          </p>
        </div>
        
        {product.colors && (
          <ul className="color-categories">
            {product.colors.map((color, index) => (
              <li key={index}>
                <a className={`c-${color.toLowerCase()}`} href="#" title={color}></a>
              </li>
            ))}
          </ul>
        )}
        
        <h6 className="product-name">
          <Link href={product.url || '/product-details'}>{product.name}</Link>
        </h6>
        
        <div className="price-box">
          <span className="price-regular">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-old">
              <del>${product.originalPrice.toFixed(2)}</del>
            </span>
          )}
        </div>
      </div>
      
      <QuickViewModal 
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
}
