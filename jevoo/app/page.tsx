"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Marquee from "../components/Marquee";
import FeaturedProducts from "../components/product/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import GroupProducts from "../components/GroupProducts";
import Blog from "../components/Blog";
import LoaderSpinner, { LuxuryJewelryLoader } from "../components/LoaderSpinner";

interface BannerImage {
  createdAt: string;
  updatedAt: string;
  alt: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  id: string;
  url: string;
  thumbnailURL: null;
}

interface Banner {
  createdAt: string;
  updatedAt: string;
  title: string;
  subtitle: string;
  image: BannerImage;
  buttonText: string;
  buttonUrl: string;
  order: number;
  status: string;
  id: string;
}

interface BannerResponse {
  docs: Banner[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}

const getFullImageUrl = (imageUrl: string | undefined) => {
  if (!imageUrl) return '/placeholder-product.jpg';
  if (imageUrl.startsWith('http')) return imageUrl;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  // If image URL starts with /api and base URL ends with /api, remove /api from image URL
  if (imageUrl.startsWith('/api') && baseUrl.endsWith('/api')) {
    return `${baseUrl}${imageUrl.replace('/api', '')}`;
  }
  // Otherwise, prepend the API base URL
  return `${baseUrl}${imageUrl}`;
};

export default function Home() {
  const heroSliderRef = useRef<HTMLDivElement>(null);
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [bannersLoading, setBannersLoading] = useState(true);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners');
        if (response.ok) {
          const data: BannerResponse = await response.json();
          // Sort banners by order field
          const sortedBanners = data.docs.sort((a, b) => a.order - b.order);
          setBanners(sortedBanners);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setBannersLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    // Only initialize when banners are loaded and we have data
    if (bannersLoading || banners.length === 0) return;

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
          // Mark slider as initialized after a short delay to ensure slick is ready
          setTimeout(() => {
            setSliderInitialized(true);
          }, 100);
        } catch (error) {
          console.error('Error initializing hero slider:', error);
        }
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (tryInit() || retries++ >= maxRetries) {
        clearInterval(interval);
        // If we couldn't initialize after max retries, still show the banners
        if (retries >= maxRetries) {
          setSliderInitialized(true);
        }
      }
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
  }, [bannersLoading, banners.length]);

  return (
    <>
      <Header />

      <main>
        {/* hero slider area start */}
        <section className="slider-area" style={{ position: 'relative', minHeight: '600px' }}>
          {/* Initial loading state - show jewelry loader while fetching banners */}
          {bannersLoading && (
            <div className="hero-single-slide hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 2, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="hero-slider-content text-center" style={{ paddingTop: '150px' }}>
                      <LuxuryJewelryLoader
                        size="large"
                        message="Loading beautiful jewelry collections..."
                        className="animate-fade-in"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {banners.length > 0 && (
            <>
              {/* Always show the first banner as a static banner */}
              <div
                className="hero-single-slide hero-overlay"
                style={{
                  position: 'relative',
                  opacity: sliderInitialized ? 0 : 1,
                  transition: 'opacity 0.3s ease-in-out',
                  pointerEvents: sliderInitialized ? 'none' : 'auto'
                }}
              >
                <div className="hero-slider-item" style={{ position: 'relative' }}>
                  <Image
                    src={getFullImageUrl(banners[0].image.url)}
                    alt={banners[0].image.alt || banners[0].title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="hero-slider-content slide-1">
                          <h2 className="slide-title golden-text">
                            {banners[0].title}
                          </h2>
                          <h4 className="slide-desc" style={{ color: '#ffffff' }}>
                            {banners[0].subtitle}
                          </h4>
                          <a href={banners[0].buttonUrl} className="btn btn-hero">
                            {banners[0].buttonText}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hidden slick slider that initializes in the background */}
              <div
                ref={heroSliderRef}
                className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: sliderInitialized ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                  pointerEvents: sliderInitialized ? 'auto' : 'none'
                }}
              >
                {/* Dynamic banner slides */}
                {banners.map((banner, index) => (
                  <div key={banner.id} className="hero-single-slide hero-overlay">
                    <div className="hero-slider-item" style={{ position: 'relative' }}>
                      <Image
                        src={getFullImageUrl(banner.image.url)}
                        alt={banner.image.alt || banner.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div className={`hero-slider-content slide-${index + 1} ${index === 1 ? 'float-md-end float-none' : ''}`}>
                              <h2 className="slide-title golden-text">
                                {banner.title}
                              </h2>
                              <h4 className="slide-desc" style={{ color: '#ffffff' }}>
                                {banner.subtitle}
                              </h4>
                              <a href={banner.buttonUrl} className="btn btn-hero">
                                {banner.buttonText}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Error state - if no banners loaded */}
          {!bannersLoading && banners.length === 0 && (
            <div className="hero-single-slide hero-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' }}>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="hero-slider-content text-center" style={{ paddingTop: '150px' }}>
                      <h2 className="slide-title golden-text mb-4">
                        Welcome to Our Jewelry Collection
                      </h2>
                      <h4 className="slide-desc" style={{ color: '#ffffff', marginBottom: '30px' }}>
                        Discover exquisite pieces crafted with precision and passion
                      </h4>
                      <a href="/our-products" className="btn btn-hero me-3">
                        Explore Collection
                      </a>
                      <button
                        onClick={() => window.location.reload()}
                        className="btn btn-outline-light"
                      >
                        Try Again
                      </button>
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

        <Marquee />
 
        <FeaturedProducts />
    
        <Testimonials />

        <GroupProducts />
 
        <Blog />
      </main>

      <Footer />
    </>
  );
}
