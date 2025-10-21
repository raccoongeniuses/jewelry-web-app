'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScriptLoader from '../components/ScriptLoader';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode.trim());
      // Here you would normally validate the coupon with an API
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: 'Cart', url: '/cart' }
  ];

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateEcoTax = () => {
    return calculateSubtotal() * 0.02; // 2% Eco Tax
  };

  const calculateVAT = () => {
    return calculateSubtotal() * 0.20; // 20% VAT
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const ecoTax = calculateEcoTax();
    const vat = calculateVAT();
    const discount = appliedCoupon ? subtotal * 0.10 : 0; // 10% discount for demo
    return subtotal + ecoTax + vat - discount;
  };

  const handleScriptsLoaded = () => {
    // Scripts are loaded, cart functionality should initialize automatically
  };

  return (
    <>
      <ScriptLoader onScriptsLoaded={handleScriptsLoaded} />
      <div className="wrapper">
        <Header />

        <main>
          {/* Breadcrumb Area */}
          <div className="breadcrumb-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-wrap">
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        {breadcrumbData.map((item, index) => (
                          <li
                            key={index}
                            className={`breadcrumb-item${index === breadcrumbData.length - 1 ? ' active' : ''}`}
                            aria-current={index === breadcrumbData.length - 1 ? 'page' : undefined}
                          >
                            {index === 0 ? (
                              <Link href={item.url}>
                                <i className="fa fa-home"></i>
                              </Link>
                            ) : index === breadcrumbData.length - 1 ? (
                              item.name
                            ) : (
                              <Link href={item.url}>{item.name}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cart Main Wrapper */}
          <div className="cart-main-wrapper section-padding">
            <div className="container">
              <div className="section-bg-color">
                <div className="row">
                  <div className="col-lg-12">
                    {/* Cart Table Area */}
                    {items.length > 0 ? (
                      <>
                        <div className="cart-table table-responsive">
                          <table className="table table-bordered" style={{ width: '100%', marginBottom: '20px' }}>
                            <thead style={{ backgroundColor: '#c29958 !important', color: '#ffffff !important' }}>
                              <tr>
                                <th className="pro-number" style={{ padding: '12px', textAlign: 'center', border: '1px solid #c29958', color: '#ffffff !important', fontWeight: '600', backgroundColor: '#c29958 !important' }}>No.</th>
                                <th className="pro-thumbnail" style={{ padding: '12px', textAlign: 'center', border: '1px solid #c29958', color: '#ffffff !important', fontWeight: '600', backgroundColor: '#c29958 !important' }}>Model</th>
                                <th className="pro-title" style={{ padding: '12px', textAlign: 'center', border: '1px solid #c29958', color: '#ffffff !important', fontWeight: '600', backgroundColor: '#c29958 !important' }}>Name</th>
                                <th className="pro-quantity" style={{ padding: '12px', textAlign: 'center', border: '1px solid #c29958', color: '#ffffff !important', fontWeight: '600', backgroundColor: '#c29958 !important' }}>Quantity</th>
                                <th className="pro-price" style={{ padding: '12px', textAlign: 'center', border: '1px solid #c29958', color: '#ffffff !important', fontWeight: '600', backgroundColor: '#c29958 !important' }}>Price</th>
                                <th className="pro-remove" style={{ padding: '12px', textAlign: 'center', border: '1px solid #c29958', color: '#ffffff !important', fontWeight: '600', backgroundColor: '#c29958 !important' }}>Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {items.map((item, index) => (
                                <CartItem
                                  key={item.id}
                                  item={item}
                                  index={index + 1}
                                  onQuantityChange={(quantity) => updateQuantity(item.id, quantity)}
                                  onRemove={() => removeFromCart(item.id)}
                                />
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Cart Update Option */}
                        <div className="cart-update-option d-block d-md-flex justify-content-between">
                          <div className="apply-coupon-wrapper">
                            {!appliedCoupon ? (
                              <form onSubmit={handleApplyCoupon} className="d-block d-md-flex">
                                <input
                                  type="text"
                                  placeholder="Enter Your Coupon Code"
                                  value={couponCode}
                                  onChange={(e) => setCouponCode(e.target.value)}
                                  required
                                />
                                <button type="submit" className="btn btn-sqr">Apply Coupon</button>
                              </form>
                            ) : (
                              <div className="coupon-applied d-block d-md-flex align-items-center">
                                <span className="badge bg-success me-3">Coupon Applied: {appliedCoupon}</span>
                                <button onClick={handleRemoveCoupon} className="btn btn-sm btn-outline-danger">
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="empty-cart text-center py-5">
                        <div className="empty-cart-icon mb-4">
                          <i className="pe-7s-shopbag" style={{ fontSize: '60px', color: '#ddd' }}></i>
                        </div>
                        <h3 className="mb-3">Your cart is empty</h3>
                        <p className="mb-4">Looks like you haven't added any items to your cart yet.</p>
                        <Link href="/" className="btn btn-sqr">
                          <i className="fa fa-arrow-left me-2"></i>
                          Continue Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {items.length > 0 && (
                  <div className="row">
                    <div className="col-lg-5 ml-auto">
                      {/* Cart Calculation Area */}
                      <CartSummary
                        subtotal={calculateSubtotal()}
                        ecoTax={calculateEcoTax()}
                        vat={calculateVAT()}
                        total={calculateTotal()}
                        discount={appliedCoupon ? calculateSubtotal() * 0.10 : 0}
                        couponCode={appliedCoupon}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        .cart-table thead {
          display: table-header-group !important;
          background-color: #c29958 !important;
        }
        .cart-table thead th {
          background-color: #c29958 !important;
          border-color: #c29958 !important;
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        .table th, .table td {
          border-color: #dee2e6 !important;
        }
      `}</style>
    </>
  );
}