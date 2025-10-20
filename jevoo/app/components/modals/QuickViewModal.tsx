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
    <div className="modal fade" id="quick_view" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-5 col-md-5 col-12">
                  <div className="modal_tab">
                    <div className="tab-content product-details-large">
                      <div className="tab-pane fade show active" id="tab1">
                        <div className="modal_tab_img">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={400}
                            height={400}
                          />
                        </div>
                      </div>
                      {product.secondaryImage && (
                        <div className="tab-pane fade" id="tab2">
                          <div className="modal_tab_img">
                            <Image
                              src={product.secondaryImage}
                              alt={product.name}
                              width={400}
                              height={400}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="modal_tab_button">
                      <ul className="nav product_navactive" role="tablist">
                        <li>
                          <a 
                            className="nav-link active" 
                            data-bs-toggle="tab" 
                            href="#tab1" 
                            role="tab" 
                            aria-controls="tab1" 
                            aria-selected="false"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={100}
                              height={100}
                            />
                          </a>
                        </li>
                        {product.secondaryImage && (
                          <li>
                            <a 
                              className="nav-link" 
                              data-bs-toggle="tab" 
                              href="#tab2" 
                              role="tab" 
                              aria-controls="tab2" 
                              aria-selected="false"
                            >
                              <Image
                                src={product.secondaryImage}
                                alt={product.name}
                                width={100}
                                height={100}
                              />
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-7 col-12">
                  <div className="modal_right">
                    <div className="modal_title mb-10">
                      <h2>{product.name}</h2>
                    </div>
                    <div className="modal_price mb-10">
                      <span className="new_price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="old_price">${product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="modal_description mb-15">
                      <p>{product.description || 'Premium quality jewelry with excellent craftsmanship and attention to detail.'}</p>
                    </div>
                    <div className="variants_selects">
                      {product.colors && product.colors.length > 0 && (
                        <div className="variants_size">
                          <h2>color</h2>
                          <ul className="color variant">
                            {product.colors.map((color, index) => (
                              <li key={index}>
                                <a href="#" className={`color-${color.toLowerCase()}`} title={color}>
                                  <span style={{ backgroundColor: color.toLowerCase() }}></span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="variants_size">
                          <h2>size</h2>
                          <ul className="size variant">
                            {product.sizes.map((size, index) => (
                              <li key={index}>
                                <a href="#" title={size}>{size}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="modal_add_to_cart">
                      <form action="#">
                        <input min="1" max="100" step="2" defaultValue="1" type="number" />
                        <CartButton product={product} className="btn btn-primary" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
