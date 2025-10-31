'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScriptLoader from '../../components/ScriptLoader';
import { useWishlist } from '../../components/wishlist/WishlistProvider';
import { useCart } from '../../contexts/CartContext';
import { WishlistItem } from '../../types/wishlist';

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeFromWishlist(id);
    showNotification('Item removed from wishlist', 'success');
  };

  const handleAddToCart = (item: WishlistItem) => {
    // Convert wishlist item to cart item
    const cartItem = {
      ...item,
      quantity: 1,
      uniqueId: `${item.id}-${Date.now()}`
    };

    addToCart(cartItem);
    showNotification(`${item.name} added to cart`, 'success');
  };

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: 'Wishlist', url: '/wishlist' }
  ];

  const handleScriptsLoaded = () => {
    // Scripts are loaded, wishlist functionality initialize
  };

  return (
    <>
      <ScriptLoader onScriptsLoaded={handleScriptsLoaded} />
      <div className="wrapper">
        <Header />

        <main>
          {/* Notification */}
          {notification.show && (
            <div
              className={`wishlist-notification ${notification.type}`}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                padding: '12px 20px',
                borderRadius: '4px',
                color: 'white',
                backgroundColor: notification.type === 'success' ? '#28a745' : '#dc3545',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease'
              }}
            >
              {notification.message}
            </div>
          )}

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

          {/* Wishlist Main Wrapper */}
          <div className="wishlist-main-wrapper section-padding">
            <div className="container">
              <div className="section-bg-color">
                <div className="row">
                  <div className="col-lg-12">
                    {wishlistItems.length > 0 ? (
                      <>
                        <div className="cart-table table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th className="pro-thumbnail">Thumbnail</th>
                                <th className="pro-title">Product</th>
                                <th className="pro-price">Price</th>
                                <th className="pro-subtotal">Add to Cart</th>
                                <th className="pro-remove">Remove</th>
                              </tr>
                            </thead>
                            <tbody>
                              {wishlistItems.map((item) => (
                                <tr key={item.id}>
                                  <td className="pro-thumbnail">
                                    <Link href={`/products/${item.slug}`}>
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="img-fluid"
                                        style={{ borderRadius: '6px' }}
                                      />
                                    </Link>
                                  </td>
                                  <td className="pro-title">
                                    <Link href={`/products/${item.slug}`} style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>
                                      {item.name}
                                    </Link>
                                    {item.brand && (
                                      <div className="manufacturer-name">
                                        <small style={{ color: '#666' }}>Brand: {item.brand}</small>
                                      </div>
                                    )}
                                  </td>
                                  <td className="pro-price">
                                    <span style={{ fontWeight: '600' }}>
                                      ${item.isSale && item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                                    </span>
                                    {item.isSale && item.salePrice && item.salePrice < item.price && (
                                      <small className="text-muted d-block">
                                        <del>${item.price.toFixed(2)}</del>
                                      </small>
                                    )}
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
                                      onClick={() => handleRemoveFromWishlist(item.id)}
                                      style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#dc3545',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        transition: 'all 0.3s ease'
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
                      </>
                    ) : (
                      <div className="empty-wishlist text-center py-5">
                        <div className="empty-wishlist-icon mb-4">
                          <i className="pe-7s-like" style={{ fontSize: '60px', color: '#ddd' }}></i>
                        </div>
                        <h3 className="mb-3">Your wishlist is empty</h3>
                        <p className="mb-4">Add items to your wishlist to see them here</p>
                        <Link href="/" className="btn btn-sqr">
                          <i className="fa fa-arrow-left me-2"></i>
                          Continue Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx global>{`
        .wishlist-main-wrapper .table thead th {
          background-color: #c29958 !important;
          border-color: #c29958 !important;
          color: #ffffff !important;
          font-weight: 600 !important;
        }
        .wishlist-main-wrapper .table tbody tr:hover {
          background-color: #fafafa;
        }
        .wishlist-main-wrapper .btn-sqr {
          background-color: #333;
          border: none;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .wishlist-main-wrapper .btn-sqr:hover:not(.disabled) {
          background-color: #e74c3c;
          transform: translateY(-1px);
        }
        .wishlist-main-wrapper .btn-sqr.disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .wishlist-main-wrapper .pro-remove button:hover {
          background-color: #fff5f5;
          transform: scale(1.1);
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .wishlist-notification {
          animation: slideIn 0.3s ease;
        }
      `}</style>
    </>
  );
}