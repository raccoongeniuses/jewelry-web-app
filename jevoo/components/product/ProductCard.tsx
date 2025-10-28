'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../types/product';
import CartButton from '../cart/CartButton';
import QuickViewModal from '../modals/QuickViewModal';

interface ProductCardProps {
  product: Product;
  disableLinks?: boolean;
}

export default function ProductCard({ product, disableLinks = false }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  return (
    <div className="product-item">
      <figure className="product-thumb">
        {disableLinks ? (
          <>
            <Image
              className="pri-img"
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
            />
            <Image
              className="sec-img"
              src={product.secondaryImage || product.image}
              alt={product.name}
              width={300}
              height={300}
            />
          </>
        ) : (
          <Link href={product.slug ? `/products/${product.slug}` : '/products'}>
            <Image
              className="pri-img"
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
            />
            <Image
              className="sec-img"
              src={product.secondaryImage || product.image}
              alt={product.name}
              width={300}
              height={300}
            />
          </Link>
        )}
        
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
        
        <div className="cart-hover" onClick={(e) => e.stopPropagation()}>
          <CartButton product={product} />
        </div>
      </figure>
      
      <div className="product-caption text-center">
        <div className="product-identity">
          <p className="manufacturer-name">
            {disableLinks ? (
              <span>{product.category || 'Uncategorized'}</span>
            ) : (
              <Link href={product.slug ? `/products/${product.slug}` : '/products'}>{product.category || 'Uncategorized'}</Link>
            )}
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
          {disableLinks ? (
            <span>{product.name}</span>
          ) : (
            <Link href={product.slug ? `/products/${product.slug}` : '/products'}>{product.name}</Link>
          )}
        </h6>
        
        <div className="price-box">
          <span className="price-regular">${product.salePrice ? product.salePrice.toFixed(2) : product.price.toFixed(2)}</span>
          {product.salePrice && product.salePrice < product.price && (
            <span className="price-old">
              <del>${product.price.toFixed(2)}</del>
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
