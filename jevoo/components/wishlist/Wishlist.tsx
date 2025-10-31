'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WishlistItem } from '../../types/wishlist';
import './Wishlist.css';

interface WishlistProps {
  items?: WishlistItem[];
  onRemove?: (id: string) => void;
  onAddToCart?: (item: WishlistItem) => void;
}

export default function Wishlist({ items = [], onRemove, onAddToCart }: WishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(items);

  useEffect(() => {
    setWishlistItems(items);
  }, [items]);

  const handleRemove = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-main-wrapper section-padding">
        <div className="container">
          <div className="section-bg-color">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center py-5">
                  <i className="pe-7s-like" style={{ fontSize: '48px', color: '#ccc' }}></i>
                  <h3 className="mt-3">Your wishlist is empty</h3>
                  <p className="text-muted">Add items to your wishlist to see them here</p>
                  <Link href="/shop" className="btn btn-primary mt-3">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-main-wrapper section-padding">
      <div className="container">
        <div className="section-bg-color">
          <div className="row">
            <div className="col-lg-12">
              {/* Wishlist Table Area */}
              <div className="cart-table table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="pro-thumbnail">Thumbnail</th>
                      <th className="pro-title">Product</th>
                      <th className="pro-price">Price</th>
                      <th className="pro-quantity">Stock Status</th>
                      <th className="pro-subtotal">Add to Cart</th>
                      <th className="pro-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistItems.map((item) => (
                      <tr key={item.id}>
                        <td className="pro-thumbnail">
                          <Link href={`/product/${item.slug}`}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="img-fluid"
                            />
                          </Link>
                        </td>
                        <td className="pro-title">
                          <Link href={`/product/${item.slug}`}>
                            {item.name}
                          </Link>
                          {item.brand && (
                            <div className="manufacturer-name">
                              <small>Brand: {item.brand}</small>
                            </div>
                          )}
                        </td>
                        <td className="pro-price">
                          <span>
                            ${item.isSale && item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                          </span>
                          {item.isSale && item.salePrice && item.salePrice < item.price && (
                            <small className="text-muted d-block">
                              <del>${item.price.toFixed(2)}</del>
                            </small>
                          )}
                        </td>
                        <td className="pro-quantity">
                          <span className={item.inStock ? "text-success" : "text-danger"}>
                            {item.inStock ? "In Stock" : "Stock Out"}
                          </span>
                        </td>
                        <td className="pro-subtotal">
                          <button
                            className={`btn btn-sqr ${!item.inStock ? 'disabled' : ''}`}
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                            style={{
                              opacity: !item.inStock ? 0.6 : 1,
                              cursor: !item.inStock ? 'not-allowed' : 'pointer'
                            }}
                          >
                            Add to Cart
                          </button>
                        </td>
                        <td className="pro-remove">
                          <button
                            onClick={() => handleRemove(item.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#dc3545',
                              cursor: 'pointer',
                              fontSize: '16px'
                            }}
                            title="Remove from wishlist"
                          >
                            <i className="fa fa-trash-o"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}