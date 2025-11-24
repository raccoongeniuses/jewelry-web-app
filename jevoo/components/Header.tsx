"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import CartModal from './cart/CartModal';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from './wishlist/WishlistProvider';
import { useCompare } from '../contexts/CompareContext';

export default function Header() {
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { getWishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const router = useRouter();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const pathname = usePathname();

  const desktopNavItems = [
    { href: "/", label: "Home" },
    { href: "/our-products", label: "Our Products" },
    { href: "/about-us", label: "About Us" },
    { href: "/our-promises", label: "Our Promises" },
    { href: "/our-services", label: "Our Services" },
    { href: "/our-philosophy", label: "Our Philosophy" },
  ];

  const mobileNavItems = [
    { href: "/", label: "Home" },
    { href: "/our-products", label: "Our Products" },
    { href: "/about-us", label: "About Us" },
    { href: "/our-promises", label: "Our Promises" },
    { href: "/our-services", label: "Our Services" },
    { href: "/our-philosophy", label: "Our Philosophy" },
  ];

  // Handle body class for account dropdown z-index
  useEffect(() => {
    if (isAccountDropdownOpen) {
      document.body.classList.add('account-dropdown-open');
    } else {
      document.body.classList.remove('account-dropdown-open');
    }

    // Cleanup function
    return () => {
      document.body.classList.remove('account-dropdown-open');
    };
  }, [isAccountDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const userDropdown = document.querySelector('.user-hover');

      if (isAccountDropdownOpen && userDropdown && !userDropdown.contains(target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    if (isAccountDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    return user?.email?.split('@')[0] || 'User';
  };
  return (
    <header className="header-area header-wide">
      {/* main header start */}
      <div className="main-header d-none d-lg-block">
        {/* header top start */}
        <div className="header-top bdr-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="welcome-message">
                  <p>Welcome to Jevoo Jewellery Online Store</p>
                </div>
              </div>
              <div className="col-lg-6 text-right">
                <div className="header-top-settings">
                  <div className="nav align-items-center justify-content-end flex-nowrap">
                    <div className="curreny-wrap">
                      $ Currency
                      <i className="fa fa-angle-down"></i>
                      <div className="dropdown-list curreny-list">
                        <a href="#">$ USD</a>
                        <a href="#">€ EURO</a>
                      </div>
                    </div>
                    <div className="language">
                      <Image src="/assets/img/icon/en.png" alt="flag" width={20} height={14} style={{display: 'inline', marginRight: '4px'}} /> English
                      <i className="fa fa-angle-down"></i>
                      <div className="dropdown-list">
                        <a href="#">
                          <Image src="/assets/img/icon/en.png" alt="flag" width={20} height={14} style={{display: 'inline', marginRight: '4px'}} />
                          english
                        </a>
                        <a href="#">
                          <Image src="/assets/img/icon/fr.png" alt="flag" width={20} height={14} style={{display: 'inline', marginRight: '4px'}} />
                          french
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header top end */}

        {/* header middle area start */}
        <div className="header-main-area sticky">
          <div className="container">
            <div className="row align-items-center position-relative">
              {/* start logo area */}
              <div className="col-lg-2">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src="/assets/img/jevoo-bespoke.jpg"
                      alt="Brand Logo"
                      width={200}
                      height={100}
                      style={{height: '100px', width: 'auto', paddingLeft: '20%'}}
                    />
                  </Link>
                </div>
              </div>
              {/* start logo area */}

              {/* main menu area start */}
              <div className="col-lg-6 position-static">
                <div className="main-menu-area">
                  <div className="main-menu">
                    <nav className="desktop-menu">
                      <ul>
                        {desktopNavItems.map((item) => (
                          <li key={item.href} className={pathname === item.href ? "active" : ""}>
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    {/* main menu navbar end */}
                  </div>
                </div>
              </div>
              {/* main menu area end */}

              {/* mini cart area start */}
              <div className="col-lg-4">
                <div className="header-right d-flex align-items-center justify-content-end">
                  <div className="header-configure-area">
                    <ul className="nav justify-content-end">
                      <li className="user-hover">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsAccountDropdownOpen(!isAccountDropdownOpen);
                          }}
                          style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px'}}
                        >
                          {isAuthenticated ? (
                            <span className="user-name" style={{fontSize: '14px', textTransform: 'capitalize'}}>{getUserDisplayName()}</span>
                          ) : (
                            <span className="user-login-text" style={{fontSize: '14px', fontWeight: '500'}}>Log in to your account</span>
                          )}
                          <i className="pe-7s-user" style={{fontSize: '18px'}}></i>
                        </a>
                        <ul
                          className={`dropdown-list ${isAccountDropdownOpen ? 'show' : ''}`}
                          style={{zIndex: '9999', display: isAccountDropdownOpen ? 'block' : 'none'}}
                        >
                          {isAuthenticated ? (
                            <>
                              <li><a href="/my-account">my account</a></li>
                              <li><a href="#" onClick={handleLogout}>logout</a></li>
                            </>
                          ) : (
                            <>
                              <li><Link href="/login">login</Link></li>
                              <li><Link href="/register">register</Link></li>
                            </>
                          )}
                        </ul>
                      </li>
                      <li>
                        <a href="/wishlist">
                          <i className="pe-7s-like"></i>
                          <div className="notification">{getWishlistCount()}</div>
                        </a>
                      </li>
                      <li>
                        <a href="/compare">
                          <i className="pe-7s-refresh-2"></i>
                          <div className="notification">{compareCount}</div>
                        </a>
                      </li>
                      <li>
                        <CartModal />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* mini cart area end */}
            </div>
          </div>
        </div>
        {/* header middle area end */}
      </div>
      {/* main header end */}

      {/* mobile header start */}
      <div className="mobile-header d-lg-none d-md-block sticky">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="mobile-main-header">
                <div className="mobile-logo">
                  <Link href="/">
                    <Image
                      src="/assets/img/jevoo-bespoke.jpg"
                      alt="Brand Logo"
                      width={200}
                      height={100}
                      quality={75}
                      style={{height: '100px', width: 'auto', paddingLeft: '20%'}}
                    />
                  </Link>
                </div>
                <div className="mobile-menu-toggler">
                  <div className="mini-cart-wrap">
                    <Link href="/compare">
                      <i className="pe-7s-refresh-2"></i>
                      <div className="notification">{compareCount}</div>
                    </Link>
                  </div>
                  <div className="mini-cart-wrap">
                    <Link href="/cart">
                      <i className="pe-7s-shopbag"></i>
                      <div className="notification">{getTotalItems()}</div>
                    </Link>
                  </div>
                  <button className="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile header end */}

      {/* offcanvas mobile menu start */}
      <aside className="off-canvas-wrapper">
        <div className="off-canvas-overlay"></div>
        <div className="off-canvas-inner-content">
          <div className="btn-close-off-canvas">
            <i className="pe-7s-close"></i>
          </div>

          <div className="off-canvas-inner">
            {/* search box start */}
            <div className="search-box-offcanvas">
              <form>
                <input type="text" placeholder="Search Here..." />
                <button className="search-btn"><i className="pe-7s-search"></i></button>
              </form>
            </div>
            {/* search box end */}

            {/* mobile menu start */}
            <div className="mobile-navigation">
              <nav>
                <ul className="mobile-menu">
                  {mobileNavItems.map((item) => (
                    <li key={item.href} className={pathname === item.href ? "active" : ""}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* mobile menu end */}

            <div className="mobile-settings">
              <ul className="nav">
                <li>
                  <div className="dropdown mobile-top-dropdown">
                    <a href="#" className="dropdown-toggle" id="currency" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Currency
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="currency">
                      <a className="dropdown-item" href="#">$ USD</a>
                      <a className="dropdown-item" href="#">$ EURO</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="dropdown mobile-top-dropdown">
                    <a href="#" className="dropdown-toggle" id="myaccount" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {isAuthenticated ? getUserDisplayName() : 'My Account'}
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="myaccount">
                      {isAuthenticated ? (
                        <>
                          <a className="dropdown-item" href="/my-account">my account</a>
                          <a className="dropdown-item" href="#" onClick={handleLogout}>logout</a>
                        </>
                      ) : (
                        <>
                          <Link className="dropdown-item" href="/login">login</Link>
                          <Link className="dropdown-item" href="/register">register</Link>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* offcanvas widget area start */}
            <div className="offcanvas-widget-area">
              <div className="off-canvas-contact-widget">
                <ul>
                  <li><i className="fa fa-mobile"></i>
                    <a href="#">0123456789</a>
                  </li>
                  <li><i className="fa fa-envelope-o"></i>
                    <a href="#">info@yourdomain.com</a>
                  </li>
                </ul>
              </div>
              <div className="off-canvas-social-widget">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-pinterest-p"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-youtube-play"></i></a>
              </div>
            </div>
            {/* offcanvas widget area end */}
          </div>
        </div>
      </aside>
      {/* offcanvas mobile menu end */}
    </header>
  );
}
