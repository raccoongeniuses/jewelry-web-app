import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize jQuery plugins after component mounts
    if (typeof window !== 'undefined') {
      import('jquery').then(() => {
        // Initialize any jQuery-dependent functionality
        // For example: slick sliders, animations, etc.
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>Jevoo Jewellery - Jewelry Shop eCommerce Bootstrap 5 Template</title>
        <meta name="description" content="Jevoo Jewellery - Premium Jewelry Shop with Custom Draggable Grid" />
      </Head>

      <div className="body-wrapper">
        <Header currentPage="home" />

        {/* Hero Section */}
        <section className="hero-slider-area">
          <div className="hero-slider-active slick-initialized slick-slider">
            <div className="slick-list draggable">
              <div className="slick-track">
                {/* Hero Slide 1 */}
                <div className="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false">
                  <div className="hero-single-slide hero-overlay bg-img" style={{backgroundImage: 'url(/assets/img/hero/1.jpg)'}}>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="hero-slide-content text-center">
                            <h2 className="hero-slide-title">New Collection</h2>
                            <h1 className="hero-slide-main-title">Jewelry 2024</h1>
                            <p className="hero-slide-desc">Discover our latest collection of exquisite jewelry pieces</p>
                            <a href="#" className="hero-slide-btn">Shop Now</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="featured-product-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2>Featured Products</h2>
                  <p>Discover our most popular pieces</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="featured-product-active slick-initialized slick-slider">
                  <div className="slick-list draggable">
                    <div className="slick-track">
                      {/* Product Item 1 */}
                      <div className="product-item text-center">
                        <div className="product-thumb">
                          <a href="product-details.html">
                            <img src="/assets/img/product/product-1.jpg" alt="Product" />
                          </a>
                          <div className="product-action">
                            <a href="#"><i className="pe-7s-like"></i></a>
                            <a href="#"><i className="pe-7s-shopbag"></i></a>
                            <a href="#"><i className="pe-7s-look"></i></a>
                          </div>
                        </div>
                        <div className="product-info">
                          <h4 className="product-title">
                            <a href="product-details.html">Diamond Ring</a>
                          </h4>
                          <div className="product-rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <div className="product-price">
                            <span className="new-price">$299.00</span>
                            <span className="old-price">$399.00</span>
                          </div>
                        </div>
                      </div>

                      {/* Add more product items here */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Draggable Grid Section */}
        <section className="draggable-grid-section section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2>Custom Jewelry Collection</h2>
                  <p>Drag and arrange your favorite pieces</p>
                </div>
              </div>
            </div>
            <div className="draggable-grid-container">
              <div className="gridster">
                <ul>
                  <li data-row="1" data-col="1" data-sizex="1" data-sizey="1">
                    <div className="grid-item">
                      <img src="/assets/img/jevoo-bespoke.jpg" alt="Custom Jewelry" />
                      <div className="grid-item-info">
                        <h4>Bespoke Design</h4>
                        <p>Custom crafted just for you</p>
                      </div>
                    </div>
                  </li>
                  {/* Add more draggable grid items */}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="category-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center">
                  <h2>Shop by Category</h2>
                  <p>Find exactly what you're looking for</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="category-item">
                  <div className="category-thumb">
                    <a href="#">
                      <img src="/assets/img/category/rings.jpg" alt="Rings" />
                    </a>
                  </div>
                  <div className="category-info">
                    <h4 className="category-title">
                      <a href="#">Rings</a>
                    </h4>
                    <span className="category-count">15 Products</span>
                  </div>
                </div>
              </div>
              {/* Add more category items */}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-area section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="newsletter-content text-center">
                  <h2>Subscribe to Our Newsletter</h2>
                  <p>Get the latest updates on new products and upcoming sales</p>
                  <form className="newsletter-form">
                    <input type="email" placeholder="Enter your email address" />
                    <button type="submit">Subscribe</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default HomePage