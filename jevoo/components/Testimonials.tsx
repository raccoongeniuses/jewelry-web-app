'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScriptLoader from './ScriptLoader';
import JewelryLoader from './LoaderSpinner';

// Type declarations for jQuery
declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

// API Response Types
type TestimonialImage = {
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
  thumbnailURL: string | null;
};

type APITestimonial = {
  createdAt: string;
  updatedAt: string;
  name: string;
  testimony: string;
  rating: number;
  image: TestimonialImage;
  order: number;
  status: string;
  id: string;
};

type TestimonialResponse = {
  docs: APITestimonial[];
  totalPages: number;
  page: number;
  limit: number;
  totalDocs: number;
};

type Testimonial = {
  id: string;
  name: string;
  content: string;
  image: string;
  rating: number;
};


const Testimonials = () => {
  const thumbCarouselRef = useRef<HTMLDivElement>(null);
  const contentCarouselRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [testimonialsData, setTestimonialsData] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isSlickReady, setIsSlickReady] = useState(false);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      setIsLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        if (!apiUrl) {
          console.error('NEXT_PUBLIC_API_URL is not defined');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${apiUrl}/testimonials?pagination=true&page=1&limit=10&depth=1`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data: TestimonialResponse = await response.json();

        // Convert API testimonials to component format
        if (data.docs && data.docs.length > 0) {
          const apiTestimonials: Testimonial[] = data.docs.map((item) => ({
            id: item.id,
            name: item.name,
            content: item.testimony,
            image: item.image.url.startsWith('/api')
              ? `https://api.jevoo-jewellery.com${item.image.url}`
              : `https://api.jevoo-jewellery.com/api${item.image.url}`,
            rating: item.rating || 5
          }));
          setTestimonialsData(apiTestimonials);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        // Keep empty array if API fails
      } finally {
        setIsLoading(false);
        // Add delay to give slick time to start initializing
        setTimeout(() => {
          setShowContent(true);
        }, 300); // delay for testimonials
      }
    };

    fetchTestimonials();
  }, []);

  // Initialize carousels when scripts are loaded
  const initializeCarousels = () => {
    if (!thumbCarouselRef.current || !contentCarouselRef.current || !showContent) return;

    const $ = window.jQuery;
    if (!$ || !$.fn.slick) return;

    // Destroy existing carousels if they exist
    if ($(contentCarouselRef.current).hasClass('slick-initialized')) {
      $(contentCarouselRef.current).slick('unslick');
    }
    if ($(thumbCarouselRef.current).hasClass('slick-initialized')) {
      $(thumbCarouselRef.current).slick('unslick');
    }

    // Initialize content carousel
    $(contentCarouselRef.current).slick({
      arrows: false,
      asNavFor: '.testimonial-thumb-carousel',
      fade: true,
      adaptiveHeight: true
    });

    // Initialize thumb carousel
    $(thumbCarouselRef.current).slick({
      slidesToShow: 3,
      asNavFor: '.testimonial-content-carousel',
      centerMode: true,
      arrows: false,
      centerPadding: 0,
      focusOnSelect: true
    });

    // Mark slick as ready
    setIsSlickReady(true);
  };

  useEffect(() => {
    if (scriptsLoaded && testimonialsData.length > 0 && showContent) {
      initializeCarousels();
    }
  }, [scriptsLoaded, testimonialsData, showContent]);

  // Re-initialize when page becomes visible (route changes)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && scriptsLoaded) {
        setTimeout(initializeCarousels, 50);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [scriptsLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.jQuery && window.jQuery.fn.slick) {
        const $ = window.jQuery;
        if (contentCarouselRef.current && $(contentCarouselRef.current).hasClass('slick-initialized')) {
          $(contentCarouselRef.current).slick('unslick');
        }
        if (thumbCarouselRef.current && $(thumbCarouselRef.current).hasClass('slick-initialized')) {
          $(thumbCarouselRef.current).slick('unslick');
        }
      }
    };
  }, []);

  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index}>
        <i className={`fa ${index < rating ? 'fa-star' : 'fa-star-o'}`}></i>
      </span>
    ));
  };

  return (
    <>
      <ScriptLoader onScriptsLoaded={() => setScriptsLoaded(true)} />
      <section
        className="testimonial-area section-padding"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '600px',
          backgroundColor: 'transparent'
        }}
      >
        {/* Background image overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('/assets/img/testimonial/testimonials-bg.jpg')",
            zIndex: -1
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="row">
          <div className="col-12">
            {/* Section title */}
            <div className="section-title text-center">
              <h2 className="title">testimonials</h2>
              <p className="sub-title">What they say</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {isLoading || !showContent ? (
              <div className="text-center" style={{ padding: '60px 0' }}>
                <JewelryLoader size="medium" message="Loading testimonials..." />
              </div>
            ) : testimonialsData.length === 0 ? (
              <div className="text-center" style={{ padding: '60px 0' }}>
                <p>No testimonials available at the moment.</p>
              </div>
            ) : (
              <>
                <div className="testimonial-thumb-wrapper">
                  <div
                    ref={thumbCarouselRef}
                    className="testimonial-thumb-carousel"
                    style={{
                      opacity: isSlickReady ? 1 : 0,
                      visibility: isSlickReady ? 'visible' : 'hidden',
                      minHeight: isSlickReady ? 'auto' : '150px',
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  >
                    {testimonialsData.map((testimonial) => (
                      <div key={testimonial.id} className="testimonial-thumb">
                        <Image
                          src={testimonial.image}
                          alt="testimonial-thumb"
                          width={120}
                          height={120}
                          style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            width: '100px',
                            height: '100px',
                            border: '3px solid #fff',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="testimonial-content-wrapper">
                  <div
                    ref={contentCarouselRef}
                    className="testimonial-content-carousel"
                    style={{
                      opacity: isSlickReady ? 1 : 0,
                      visibility: isSlickReady ? 'visible' : 'hidden',
                      minHeight: isSlickReady ? 'auto' : '200px',
                      transition: 'opacity 0.3s ease-in-out'
                    }}
                  >
                    {testimonialsData.map((testimonial) => (
                      <div key={testimonial.id} className="testimonial-content">
                        <p>{testimonial.content}</p>
                        <div className="ratings">
                          {renderStars(testimonial.rating)}
                        </div>
                        <h5 className="testimonial-author">{testimonial.name}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Testimonials;