'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';

interface RelatedProductsProps {
  currentProductId: string;
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  // Sample related products data - in a real app this would come from an API
  const relatedProducts: Product[] = [
    {
      id: '2',
      name: 'Perfect Diamond Jewelry',
      price: 60.00,
      originalPrice: 70.00,
      image: '/assets/img/product/gold-necklace.jpeg',
      secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
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
      image: '/assets/img/product/gold-necklace.jpeg',
      secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
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
      image: '/assets/img/product/gold-necklace.jpeg',
      secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
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
      image: '/assets/img/product/gold-necklace.jpeg',
      secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
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
            <div className="product-carousel-4 slick-row-10 slick-arrow-style">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}