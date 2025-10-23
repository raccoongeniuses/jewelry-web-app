'use client';

import Link from 'next/link';
import CartModal from './cart/CartModal';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { getTotalItems } = useCart();
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
                      <img src="/assets/img/icon/en.png" alt="flag" /> English
                      <i className="fa fa-angle-down"></i>
                      <div className="dropdown-list">
                        <a href="#"><img src="/assets/img/icon/en.png" alt="flag" /> english</a>
                        <a href="#"><img src="/assets/img/icon/fr.png" alt="flag" /> french</a>
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
                    <img src="/assets/img/jevoo-bespoke.jpg" alt="Brand Logo" style={{maxHeight: '100px', width: 'auto', paddingLeft: '20%'}} />
                  </Link>
                </div>
              </div>
              {/* start logo area */}

              {/* main menu area start */}
              <div className="col-lg-6 position-static">
                <div className="main-menu-area">
                  <div className="main-menu">
                    {/* main menu navbar start */}
                    <nav className="desktop-menu">
                      <ul>
                        <li><Link href="/">Home</Link></li>
                        <li className="active"><Link href="/our-products">Our Products</Link></li>
                        <li className="active"><Link href="/about-us">About Us</Link></li>
                        <li className="active"><Link href="/our-promises">Our Promises</Link></li>
                        <li className="active"><Link href="/our-services">Our Services</Link></li>
                        <li className="active"><Link href="/our-philosophy">Our Philosophy</Link></li>
                      </ul>
                    </nav>
                    {/* main menu navbar end */}
                  </div>
                </div>
              </div>
              {/* main menu area end */}

              {/* mini cart area start */}
              <div className="col-lg-4">
                <div className="header-right d-flex align-items-center justify-content-xl-between justify-content-lg-end">
                  <div className="header-search-container">
                    <button className="search-trigger d-xl-none d-lg-block"><i className="pe-7s-search"></i></button>
                    <form className="header-search-box d-lg-none d-xl-block">
                      <input type="text" placeholder="Search entire store hire" className="header-search-field" />
                      <button className="header-search-btn"><i className="pe-7s-search"></i></button>
                    </form>
                  </div>
                  <div className="header-configure-area">
                    <ul className="nav justify-content-end">
                      <li className="user-hover">
                        <a href="#">
                          <i className="pe-7s-user"></i>
                        </a>
                        <ul className="dropdown-list">
                          <li><a href="/login-register">login</a></li>
                          <li><a href="/login-register">register</a></li>
                          <li><a href="/my-account">my account</a></li>
                        </ul>
                      </li>
                      <li>
                        <a href="/wishlist">
                          <i className="pe-7s-like"></i>
                          <div className="notification">0</div>
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
                    <img src="/assets/img/jevoo-bespoke.jpg" alt="Brand Logo" style={{maxHeight: '100px', width: 'auto', paddingLeft: '20%'}} />
                  </Link>
                </div>
                <div className="mobile-menu-toggler">
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
                  <li><Link href="/">Home</Link></li>
                  <li className="active"><Link href="/about-us">About Us</Link></li>
                  <li className="active"><Link href="/our-promises">Our Promises</Link></li>
                  <li className="active"><Link href="/our-services">Our Services</Link></li>
                  <li className="active"><Link href="/our-philosophy">Our Philosophy</Link></li>
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
                      My Account
                      <i className="fa fa-angle-down"></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="myaccount">
                      <a className="dropdown-item" href="/my-account">my account</a>
                      <a className="dropdown-item" href="/login-register">login</a>
                      <a className="dropdown-item" href="/login-register">register</a>
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
