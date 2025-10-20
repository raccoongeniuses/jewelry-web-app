'use client';

import React, { useEffect } from 'react';
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
  }
];

export default function FeaturedProducts() {
  useEffect(() => {
    // Initialize slick slider for product carousel
    const initSlider = () => {
      if (typeof window !== 'undefined' && (window as any).$) {
        (window as any).$('.product-carousel-4_2').slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: true,
          prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
          nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        });
      }
    };

    // Wait for jQuery to be available
    const timer = setTimeout(initSlider, 100);
    return () => clearTimeout(timer);
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
            <div className="product-carousel-4_2 slick-row-10 slick-arrow-style">
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
