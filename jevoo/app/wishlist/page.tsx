'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScriptLoader from '../../components/ScriptLoader';
import LoaderSpinner from '../../components/LoaderSpinner';
import Wishlist from '../../components/wishlist/Wishlist';
import { useWishlist } from '../../components/wishlist/WishlistProvider';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { WishlistItem } from '../../types/wishlist';

export default function WishlistPage() {
  const { items: wishlistItems, removeFromWishlist, isInWishlist, loading: wishlistLoading } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleRemoveFromWishlist = async (id: string) => {
    try {
      setIsLoading(true);
      await removeFromWishlist(id);
      showNotification('Item removed from wishlist', 'success');
    } catch (error) {
      console.error('Failed to remove item from wishlist:', error);
      showNotification('Failed to remove item from wishlist', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    // Convert wishlist item to cart item
    const cartItem = {
      ...item,
      quantity: 1,
      uniqueId: `${item.id}-${Date.now()}`
    };

    try {
      setAddingToCart(item.id);
      await addToCart(cartItem);
      showNotification(`${item.name} added to cart`, 'success');
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      showNotification('Failed to add item to cart', 'error');
    } finally {
      setAddingToCart(null);
    }
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
          <Wishlist
            items={wishlistItems}
            loading={authLoading || wishlistLoading || isLoading}
            onRemove={handleRemoveFromWishlist}
            onAddToCart={handleAddToCart}
          />
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
        .wishlist-main-wrapper .btn-sqr:hover:not(.disabled) {
          background-color: #b88a4f !important;
          border-color: #b88a4f !important;
          transform: translateY(-1px);
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
        .gold-price {
          color: #c29958 !important;
        }
        .loader-container {
          min-height: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
}