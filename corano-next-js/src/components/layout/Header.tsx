'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header-area header-wide">
      {/* Header Top */}
      <div className="header-top bdr-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="welcome-message">
                <p>Welcome to Jevoo Jewellery Online Store</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="header-top-right">
                <div className="header-top-links">
                  <Link href="/account">My Account</Link>
                  <Link href="/wishlist">Wishlist</Link>
                  <Link href="/cart">Cart</Link>
                  <Link href="/checkout">Checkout</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2">
              <div className="logo">
                <Link href="/">
                  <img src="/images/logo.png" alt="Jevoo Jewellery" />
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li className="dropdown">
                      <Link href="/shop">Shop</Link>
                      <ul className="sub-menu">
                        <li><Link href="/shop">Shop Grid</Link></li>
                        <li><Link href="/shop/list">Shop List</Link></li>
                        <li><Link href="/products">Product Details</Link></li>
                      </ul>
                    </li>
                    <li><Link href="/blog">Blog</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/contact">Contact Us</Link></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="header-action">
                <div className="search-wrapper">
                  <button className="search-toggle">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <div className="cart-wrapper">
                  <Link href="/cart" className="cart-icon">
                    <i className="fa fa-shopping-bag"></i>
                    <span className="cart-count">0</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="mobile-header d-block d-lg-none">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="mobile-logo">
                <Link href="/">
                  <img src="/images/logo.png" alt="Jevoo Jewellery" />
                </Link>
              </div>
            </div>
            <div className="col-6">
              <div className="mobile-action">
                <div className="mobile-search">
                  <button className="search-toggle">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
                <div className="mobile-cart">
                  <Link href="/cart">
                    <i className="fa fa-shopping-bag"></i>
                    <span className="cart-count">0</span>
                  </Link>
                </div>
                <div className="mobile-menu-button">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="mobile-menu-toggle"
                  >
                    <i className={`fa ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu">
            <nav>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/account">My Account</Link></li>
                <li><Link href="/wishlist">Wishlist</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}