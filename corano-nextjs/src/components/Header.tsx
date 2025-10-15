import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'

interface HeaderProps {
  currentPage?: string
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home' }) => {
  useEffect(() => {
    // Initialize any jQuery plugins for header if needed
  }, [])

  const getActiveClass = (page: string) => {
    return currentPage === page ? 'active' : ''
  }

  return (
    <>
      {/* Start Header Area */}
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
                    <ul className="nav align-items-center justify-content-end">
                      <li className="curreny-wrap">
                        $ Currency
                        <i className="fa fa-angle-down"></i>
                        <ul className="dropdown-list curreny-list">
                          <li><a href="#">$ USD</a></li>
                          <li><a href="#">€ EURO</a></li>
                        </ul>
                      </li>
                      <li className="language">
                        <img src="/assets/img/icon/en.png" alt="flag" /> English
                        <i className="fa fa-angle-down"></i>
                        <ul className="dropdown-list">
                          <li><a href="#"><img src="/assets/img/icon/en.png" alt="flag" /> english</a></li>
                          <li><a href="#"><img src="/assets/img/icon/fr.png" alt="flag" /> french</a></li>
                        </ul>
                      </li>
                    </ul>
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
                      <img src="/assets/img/jevoo-bespoke.jpg" alt="Brand Logo" style={{maxHeight: "100px", width: "auto", paddingLeft: "20%"}} />
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
                          <li className={getActiveClass('home')}><Link href="/">Home</Link></li>
                          <li className={getActiveClass('about')}><Link href="/about-us">About Us</Link></li>
                          <li className={getActiveClass('promises')}><Link href="/our-promises">Our Promises</Link></li>
                          <li className={getActiveClass('services')}><Link href="/our-services">Our Services</Link></li>
                          <li className={getActiveClass('philosophy')}><Link href="/our-philosophy">Our Philosophy</Link></li>
                        </ul>
                      </nav>
                      {/* main menu navbar end */}
                    </div>
                  </div>
                </div>
                {/* main menu area end */}

                {/* header right area start */}
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
                            <li><Link href="/login-register">login</Link></li>
                            <li><Link href="/login-register">register</Link></li>
                            <li><Link href="/my-account">my account</Link></li>
                          </ul>
                        </li>
                        <li>
                          <Link href="/wishlist">
                            <i className="pe-7s-like"></i>
                            <div className="notification">0</div>
                          </Link>
                        </li>
                        <li>
                          <a href="#" className="minicart-btn">
                            <i className="pe-7s-shopbag"></i>
                            <div className="notification">2</div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* mini cart area end */}
                {/* header right area end */}

                {/* mobile menu area start */}
                <div className="col-12 d-block d-lg-none">
                  <div className="mobile-menu-area">
                    <div className="mobile-logo">
                      <Link href="/">
                        <img src="/assets/img/jevoo-bespoke.jpg" alt="Brand Logo" style={{maxHeight: "100px", width: "auto", paddingLeft: "20%"}} />
                      </Link>
                    </div>
                    <div className="mobile-menu-toggler">
                      <button className="mobile-menu-toggle">
                        <i className="pe-7s-menu"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* mobile menu area end */}

              </div>
            </div>
          </div>
          {/* header middle area end */}
        </div>
        {/* main header end */}
      </header>
      {/* End Header Area */}

      {/* off-canvas menu start */}
      <aside className="off-canvas-wrapper">
        <div className="off-canvas-overlay"></div>
        <div className="off-canvas-inner-content">
          <div className="btn-close-off-canvas">
            <i className="pe-7s-close"></i>
          </div>

          <div className="off-canvas-inner">
            {/* mobile menu start */}
            <div className="mobile-navigation">
              {/* mobile menu navigation start */}
              <nav>
                <ul className="mobile-menu">
                  <li className={getActiveClass('home')}><Link href="/">Home</Link></li>
                  <li className={getActiveClass('about')}><Link href="/about-us">About Us</Link></li>
                  <li className={getActiveClass('promises')}><Link href="/our-promises">Our Promises</Link></li>
                  <li className={getActiveClass('services')}><Link href="/our-services">Our Services</Link></li>
                  <li className={getActiveClass('philosophy')}><Link href="/our-philosophy">Our Philosophy</Link></li>
                </ul>
              </nav>
              {/* mobile menu navigation end */}
            </div>
            {/* mobile menu end */}

            {/* mobile menu bottom start */}
            <div className="mobile-menu-bottom">
              {/* mobile settings start */}
              <div className="mobile-settings">
                <div className="mobile-settings-item">
                  <div className="mobile-settings-title">
                    <h6>My Account</h6>
                  </div>
                  <div className="mobile-settings-content">
                    <ul>
                      <li><Link href="/my-account">My Account</Link></li>
                      <li><Link href="/login-register">Login / Register</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* mobile settings end */}
            </div>
            {/* mobile menu bottom end */}

          </div>
        </div>
      </aside>
      {/* off-canvas menu end */}
    </>
  )
}

export default Header