'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ScriptLoader from './ScriptLoader';

// Type declarations for jQuery
declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

type Testimonial = {
  id: string;
  name: string;
  content: string;
  image: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Lindsy Niloms',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-1.jpg',
    rating: 5
  },
  {
    id: 'testimonial-2',
    name: 'Daisy Millan',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-2.jpg',
    rating: 5
  },
  {
    id: 'testimonial-3',
    name: 'Anamika Lusy',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-3.jpg',
    rating: 5
  },
  {
    id: 'testimonial-4',
    name: 'Maria Mora',
    content: 'Vivamus a lobortis ipsum, vel condimentum magna. Etiam id turpis tortor. Nunc scelerisque, nisi a blandit varius, nunc purus venenatis ligula, sed venenatis orci augue nec sapien. Cum sociis natoque',
    image: '/assets/img/testimonial/testimonials-3.jpg',
    rating: 5
  }
];

const Testimonials = () => {
  const thumbCarouselRef = useRef<HTMLDivElement>(null);
  const contentCarouselRef = useRef<HTMLDivElement>(null);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  // Initialize carousels when scripts are loaded
  const initializeCarousels = () => {
    if (!thumbCarouselRef.current || !contentCarouselRef.current) return;

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
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  };

  useEffect(() => {
    if (scriptsLoaded) {
      initializeCarousels();
    }
  }, [scriptsLoaded]);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index}>
        <i className="fa fa-star-o"></i>
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
            <div className="testimonial-thumb-wrapper">
              <div
                ref={thumbCarouselRef}
                className="testimonial-thumb-carousel"
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-thumb">
                    <Image
                      src={testimonial.image}
                      alt="testimonial-thumb"
                      width={100}
                      height={100}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        width: '100px',
                        height: '100px'
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
              >
                {testimonials.map((testimonial) => (
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
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Testimonials;