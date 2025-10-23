'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../../types/product';
import CartButton from '../cart/CartButton';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal" id="quick_view" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button 
              type="button" 
              className="close" 
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            {/* Product Details Inner - matching original HTML structure */}
            <div className="product-details-inner">
              <div className="row">
                <div className="col-lg-5">
                  <div className="product-large-slider">
                    <div className="pro-large-img img-zoom">
                      <Image
                        src={product.image}
                        alt="product-details"
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                  <div className="pro-nav slick-row-10 slick-arrow-style" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <div className="pro-nav-thumb" style={{ flex: '1', maxWidth: '100px', border: '2px solid transparent', borderRadius: '4px', overflow: 'hidden' }}>
                      <Image
                        src={product.image}
                        alt="product-details"
                        width={100}
                        height={100}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    {product.secondaryImage && (
                      <div className="pro-nav-thumb" style={{ flex: '1', maxWidth: '100px', border: '2px solid transparent', borderRadius: '4px', overflow: 'hidden' }}>
                        <Image
                          src={product.secondaryImage}
                          alt="product-details"
                          width={100}
                          height={100}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                    )}
                    <div className="pro-nav-thumb" style={{ flex: '1', maxWidth: '100px', border: '2px solid transparent', borderRadius: '4px', overflow: 'hidden' }}>
                      <Image
                        src={product.image}
                        alt="product-details"
                        width={100}
                        height={100}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="pro-nav-thumb" style={{ flex: '1', maxWidth: '100px', border: '2px solid transparent', borderRadius: '4px', overflow: 'hidden' }}>
                      <Image
                        src={product.image}
                        alt="product-details"
                        width={100}
                        height={100}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="product-details-des">
                    <div className="manufacturer-name">
                      <a href="product-details.html">{product.brand}</a>
                    </div>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="ratings d-flex">
                      <span><i className="fa fa-star-o"></i></span>
                      <span><i className="fa fa-star-o"></i></span>
                      <span><i className="fa fa-star-o"></i></span>
                      <span><i className="fa fa-star-o"></i></span>
                      <span><i className="fa fa-star-o"></i></span>
                      <div className="pro-review">
                        <span>1 Reviews</span>
                      </div>
                    </div>
                    <div className="price-box">
                      <span className="price-regular">${product.price.toFixed(2)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="price-old"><del>${product.originalPrice.toFixed(2)}</del></span>
                      )}
                    </div>
                    <h5 className="offer-text"><strong>Hurry up</strong>! offer ends in:</h5>
                    <div className="product-countdown" data-countdown="2025/12/20"></div>
                    <div className="availability">
                      <i className="fa fa-check-circle"></i>
                      <span>200 in stock</span>
                    </div>
                    <p className="pro-desc">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.
                    </p>
                    <div className="quantity-cart-box d-flex align-items-center">
                      <h6 className="option-title">qty:</h6>
                      <div className="quantity">
                        <div className="pro-qty"><input type="text" defaultValue="1" /></div>
                      </div>
                      <div className="action_link">
                        <CartButton product={product} className="btn btn-cart2">
                          Add to cart
                        </CartButton>
                      </div>
                    </div>
                    <div className="useful-links">
                      <a href="#" data-bs-toggle="tooltip" title="Compare">
                        <i className="pe-7s-refresh-2"></i>compare
                      </a>
                      <a href="#" data-bs-toggle="tooltip" title="Wishlist">
                        <i className="pe-7s-like"></i>wishlist
                      </a>
                    </div>
                    <div className="like-icon">
                      <a className="facebook" href="#"><i className="fa fa-facebook"></i>like</a>
                      <a className="twitter" href="#"><i className="fa fa-twitter"></i>tweet</a>
                      <a className="pinterest" href="#"><i className="fa fa-pinterest"></i>save</a>
                      <a className="google" href="#"><i className="fa fa-google-plus"></i>share</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Details Inner End */}
          </div>
        </div>
      </div>
    </div>
  );
}
