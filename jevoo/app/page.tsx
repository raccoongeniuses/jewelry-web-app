"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";
import FeaturedProducts from "./components/product/FeaturedProducts";
import Testimonials from "./components/Testimonials";
import GroupProducts from "./components/GroupProducts";
import Blog from "./components/Blog";

export default function Home() {
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const [sliderInitialized, setSliderInitialized] = useState(false);

  useEffect(() => {
    // Initialize hero slider after scripts load
    let retries = 0;
    const maxRetries = 20;
    const tryInit = () => {
      const hasJQ = typeof window !== 'undefined' && (window as any).$;
      const hasSlick = hasJQ && (window as any).$.fn && typeof (window as any).$.fn.slick === 'function';
      if (!heroSliderRef.current) return false;
      if (hasSlick) {
        if ((window as any).$(heroSliderRef.current).hasClass('slick-initialized')) {
          (window as any).$(heroSliderRef.current).slick('unslick');
        }
        try {
          (window as any).$(heroSliderRef.current).slick({
            fade: true,
            speed: 1000,
            dots: false,
            autoplay: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
            responsive: [{
              breakpoint: 992,
              settings: {
                arrows: false,
                dots: true
              }
            }]
          });
          // Mark slider as initialized
          setSliderInitialized(true);
        } catch (error) {
          console.error('Error initializing hero slider:', error);
        }
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (tryInit() || retries++ >= maxRetries) clearInterval(interval);
    }, 200);

    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined' && (window as any).$ && heroSliderRef.current) {
        const $ = (window as any).$;
        if ($(heroSliderRef.current).hasClass('slick-initialized')) {
          $(heroSliderRef.current).slick('unslick');
        }
      }
    };
  }, []);

  return (
    <>
      <Header />

      <main>
        {/* hero slider area start */}
        <section className="slider-area" style={{ position: 'relative' }}>
          <div 
            ref={heroSliderRef}
            className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style"
            style={{ 
              opacity: sliderInitialized ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          >
            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div className="hero-slider-item" style={{ position: 'relative' }}>
                <Image
                  src="/assets/img/banner-gold.png"
                  alt="Family Jewelry Collection"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-1">
                        <h2 className="slide-title">
                          Family Jewelry <span>Collection</span>
                        </h2>
                        <h4 className="slide-desc" style={{
                          color: '#FFD700',
                          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)'
                        }}>
                          Designer Jewelry Necklaces-Bracelets-Earings
                        </h4>
                        <a href="/our-products" className="btn btn-hero">
                          View Products
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item end */}

            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div className="hero-slider-item" style={{ position: 'relative' }}>
                <Image
                  src="/assets/img/banner-gold.png"
                  alt="Diamonds Jewelry Collection"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-2 float-md-end float-none">
                        <h2 className="slide-title">
                          Diamonds Jewelry<span>Collection</span>
                        </h2>
                        <h4 className="slide-desc" style={{
                          color: '#FFD700',
                          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)'
                        }}>
                          Shukra Yogam & Silver Power Silver Saving Schemes.
                        </h4>
                        <a href="/our-products" className="btn btn-hero">
                          View Products
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item end */}

            {/* single slider item start */}
            <div className="hero-single-slide hero-overlay">
              <div className="hero-slider-item" style={{ position: 'relative' }}>
                <Image
                  src="/assets/img/banner-gold.png"
                  alt="Grace Designer Jewelry"
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-3">
                        <h2 className="slide-title">
                          Grace Designer<span>Jewelry</span>
                        </h2>
                        <h4 className="slide-desc" style={{
                          color: '#FFD700',
                          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)'
                        }}>
                          Rings, Occasion Pieces, Pandora & More.
                        </h4>
                        <a href="/our-products" className="btn btn-hero">
                          View Products
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* single slider item end */}
          </div>
          
          {/* Loading state - show first slide while initializing */}
          {!sliderInitialized && (
            <div className="hero-single-slide hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <div className="hero-slider-item" style={{ position: 'relative' }}>
                <Image
                  src="/assets/img/banner-gold.png"
                  alt="Family Jewelry Collection"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="hero-slider-content slide-1">
                        <h2 className="slide-title">
                          Family Jewelry <span>Collection</span>
                        </h2>
                        <h4 className="slide-desc" style={{
                          color: '#FFD700',
                          textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 0 5px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)'
                        }}>
                          Designer Jewelry Necklaces-Bracelets-Earrings
                        </h4>
                        <a href="/our-products" className="btn btn-hero">
                          View Products
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        {/* hero slider area end */}

        {/* service policy area start */}
        <div className="service-policy section-padding">
          <div className="container">
            <div className="row mtn-30">
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-plane"></i>
                  </div>
                  <div className="policy-content">
                    <h6>Free Shipping</h6>
                    <p>Free shipping all order</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-help2"></i>
                  </div>
                  <div className="policy-content">
                    <h6>Support 24/7</h6>
                    <p>Support 24 hours a day</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-back"></i>
                  </div>
                  <div className="policy-content">
                    <h6>Money Return</h6>
                    <p>30 days for free return</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="policy-item">
                  <div className="policy-icon">
                    <i className="pe-7s-credit"></i>
                  </div>
                  <div className="policy-content">
                    <h6>100% Payment Secure</h6>
                    <p>We ensure secure payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* service policy area end */}

        {/* product area start */}
        <section className="product-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* section title start */}
                <div className="section-title text-center">
                  <h2 className="title">Our products</h2>
                  <p className="sub-title">Add our products to weekly lineup</p>
                </div>
                {/* section title end */}
              </div>
            </div>
          </div>
        </section>
        {/* product area end */}

        {/* draggable marquee area start */}
        <Marquee />
        {/* draggable marquee area end */}

        {/* featured product area start */}
        <FeaturedProducts />
        {/* featured product area end */}

        {/* testimonial area start (below featured products) */}
        <Testimonials />
        {/* testimonial area end */}

        {/* group product area (best seller + on-sale) */}
        <GroupProducts />

        {/* latest blog area start */}
        <Blog />
        {/* latest blog area end */}
      </main>

      <Footer />
    </>
  );
}
