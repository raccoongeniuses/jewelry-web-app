'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ }: RelatedProductsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Related products data from corano/product-details.html (exact match including the 5th product)
  const relatedProducts: Product[] = [
    {
      id: '2',
      name: 'Perfect Diamond Jewelry',
      price: 60.00,
      originalPrice: 70.00,
      image: '/assets/img/product/diamond-ring.jpg',
      secondaryImage: '/assets/img/product/diamond-rings.jpeg',
      brand: 'Gold',
      colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'],
      isNew: true,
      discount: 10,
      url: '/product-details'
    },
    {
      id: '3',
      name: 'Handmade Golden Necklace',
      price: 50.00,
      originalPrice: 80.00,
      image: '/assets/img/product/mony-ring.jpeg',
      secondaryImage: '/assets/img/product/mony-rings.jpg',
      brand: 'mony',
      colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'],
      isNew: true,
      isSale: true,
      discount: 38,
      url: '/product-details'
    },
    {
      id: '4',
      name: 'Perfect Diamond Jewelry',
      price: 99.00,
      image: '/assets/img/product/diamond-earring.jpeg',
      secondaryImage: '/assets/img/product/diamond-necklace.jpeg',
      brand: 'Diamond',
      colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'],
      isNew: true,
      url: '/product-details'
    },
    {
      id: '5',
      name: 'Diamond Exclusive Ornament',
      price: 55.00,
      originalPrice: 75.00,
      image: '/assets/img/product/diamond-ring.jpeg',
      secondaryImage: '/assets/img/product/diamond-ring-1.jpeg',
      brand: 'silver',
      colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'],
      isSale: true,
      discount: 15,
      url: '/product-details'
    },
    {
      id: '6',
      name: 'Citygold Exclusive Ring',
      price: 60.00,
      originalPrice: 70.00,
      image: '/assets/img/product/gold-necklace.jpeg',
      secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
      brand: 'mony',
      colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'],
      isNew: true,
      discount: 20,
      url: '/product-details'
    }
  ];

  useEffect(() => {
    // Initialize Slick carousel exactly like corano
    if (typeof window !== 'undefined' && carouselRef.current) {
      const initSlickCarousel = () => {
        const $ = (window as any).$;
        if ($ && $.fn && $.fn.slick) {
          const carousel = $(carouselRef.current);

          // Destroy existing carousel if it exists
          if (carousel.hasClass('slick-initialized')) {
            carousel.slick('unslick');
          }

          // Initialize Slick carousel with corano-style settings
          carousel.slick({
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
            prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
            responsive: [
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 576,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          });
        }
      };

      // Check if jQuery and Slick are already loaded
      if ((window as any).$ && (window as any).$.fn.slick) {
        initSlickCarousel();
      } else {
        // Wait for scripts to load (handled by ScriptLoader)
        const checkInterval = setInterval(() => {
          if ((window as any).$ && (window as any).$.fn.slick) {
            clearInterval(checkInterval);
            initSlickCarousel();
          }
        }, 100);

        // Cleanup after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
      }
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined' && carouselRef.current) {
        const $ = (window as any).$;
        if ($ && $.fn && $.fn.slick && $(carouselRef.current).hasClass('slick-initialized')) {
          $(carouselRef.current).slick('unslick');
        }
      }
    };
  }, []);

  return (
    <section className="related-products section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Section Title */}
            <div className="section-title text-center">
              <h2 className="title">Related Products</h2>
              <p className="sub-title">Add related products to weekly lineup</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {/* Use the exact same structure and classes as corano */}
            <div
              ref={carouselRef}
              className="product-carousel-4 slick-row-10 slick-arrow-style"
            >
              {relatedProducts.map((product) => (
                <div key={product.id} className="product-item" onClick={() => router.push('/our-products')}>
                  <ProductCard product={product} disableLinks={true} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}