'use client';

import React, { useEffect, useRef } from 'react';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';

// Sample product data - in a real app, this would come from an API
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Perfect Diamond Jewelry',
    price: 60.00,
    originalPrice: 70.00,
    image: '/assets/img/product/gold-ring.jpg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    url: '/product-details',
    brand: 'Gold',
    isNew: true,
    discount: 10,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '2',
    name: 'Handmade Golden Necklace',
    price: 50.00,
    originalPrice: 80.00,
    image: '/assets/img/product/mony-ring.jpeg',
    secondaryImage: '/assets/img/product/mony-rings.jpg',
    url: '/product-details',
    brand: 'mony',
    isSale: true,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '3',
    name: 'Perfect Diamond Jewelry',
    price: 99.00,
    image: '/assets/img/product/diamond-ring.jpg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    url: '/product-details',
    brand: 'Diamond',
    isNew: true,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '4',
    name: 'Silver Ring Collection',
    price: 75.00,
    originalPrice: 90.00,
    image: '/assets/img/product/silver-ring.jpg',
    secondaryImage: '/assets/img/product/silver-rings.jpg',
    url: '/product-details',
    brand: 'Silver',
    isSale: true,
    discount: 15,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '5',
    name: 'Citygold Exclusive Ring',
    price: 60.00,
    originalPrice: 70.00,
    image: '/assets/img/product/gold-ring.jpg',
    secondaryImage: '/assets/img/product/gold-rings.jpeg',
    url: '/product-details',
    brand: 'mony',
    isNew: true,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '6',
    name: 'Diamond Collection',
    price: 120.00,
    originalPrice: 150.00,
    image: '/assets/img/product/diamond-ring.jpg',
    secondaryImage: '/assets/img/product/diamond-rings.jpeg',
    url: '/product-details',
    brand: 'Diamond',
    isSale: true,
    discount: 20,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '7',
    name: 'Golden Necklace Set',
    price: 85.00,
    image: '/assets/img/product/mony-ring.jpeg',
    secondaryImage: '/assets/img/product/mony-rings.jpg',
    url: '/product-details',
    brand: 'Gold',
    isNew: true,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  },
  {
    id: '8',
    name: 'Silver Bracelet',
    price: 45.00,
    originalPrice: 60.00,
    image: '/assets/img/product/silver-ring.jpg',
    secondaryImage: '/assets/img/product/silver-rings.jpg',
    url: '/product-details',
    brand: 'Silver',
    isSale: true,
    discount: 25,
    colors: ['lightblue', 'darktan', 'grey', 'brown']
  }
];

export default function FeaturedProducts() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize slider after component mounts
    const initSlider = () => {
      if (typeof window !== 'undefined' && (window as any).$ && sliderRef.current) {
        console.log('Initializing slider...', sliderRef.current);
        
        // Destroy any existing slider first
        if ((window as any).$(sliderRef.current).hasClass('slick-initialized')) {
          console.log('Destroying existing slider...');
          (window as any).$(sliderRef.current).slick('unslick');
        }
        
        // Initialize the slider
        try {
          (window as any).$(sliderRef.current).slick({
            speed: 1000,
            slidesToShow: 4,
            autoplay: true,
            infinite: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  arrows: false
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  arrows: false
                }
              }
            ]
          });
          console.log('Slider initialized successfully');
        } catch (error) {
          console.error('Error initializing slider:', error);
        }
      } else {
        console.log('jQuery or slider ref not available');
      }
    };

    // Wait for DOM to be ready
    const timer = setTimeout(initSlider, 500);
    return () => {
      clearTimeout(timer);
      // Cleanup on unmount
      if (typeof window !== 'undefined' && (window as any).$ && sliderRef.current) {
        if ((window as any).$(sliderRef.current).hasClass('slick-initialized')) {
          (window as any).$(sliderRef.current).slick('unslick');
        }
      }
    };
  }, []);

  return (
    <section className="feature-product section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* section title start */}
            <div className="section-title text-center">
              <h2 className="title">featured products</h2>
              <p className="sub-title">Add featured products to weekly lineup</p>
            </div>
            {/* section title end */}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div 
              ref={sliderRef}
              className="product-carousel-4_2 slick-row-10 slick-arrow-style"
              data-react-component="true"
            >
              {sampleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
