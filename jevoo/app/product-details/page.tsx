'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScriptLoader from '../components/ScriptLoader';
import CartButton from '../components/cart/CartButton';
import QuickViewModal from '../components/modals/QuickViewModal';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductInfo from '../components/product/ProductInfo';

export default function ProductDetails() {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample product data - in a real app this would come from an API
  const product = {
    id: '1',
    name: 'Handmade Golden Necklace Full Family Package',
    price: 70.00,
    originalPrice: 90.00,
    image: '/assets/img/product/gold-necklace.jpeg',
    secondaryImage: '/assets/img/product/gold-necklace-details-1.jpeg',
    brand: 'HasTech',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. Phasellus id nisi quis justo tempus mollis sed et dui. In hac habitasse platea dictumst.',
    images: [
      '/assets/img/product/gold-necklace.jpeg',
      '/assets/img/product/gold-necklace-details-1.jpeg',
      '/assets/img/product/gold-necklace-details-1.jpeg',
      '/assets/img/product/gold-necklace-details-1.jpeg',
      '/assets/img/product/gold-necklace-details-1.jpeg'
    ],
    colors: ['LightSteelblue', 'Darktan', 'Grey', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    stockCount: 200,
    isNew: true,
    isSale: true,
    discount: 22,
    rating: 5,
    reviewCount: 1,
    sku: 'JEWEL-GOLD-001',
    categories: ['Jewelry', 'Necklaces', 'Gold'],
    tags: ['handmade', 'gold', 'family', 'necklace']
  };

  const breadcrumbData = [
    { name: 'Home', url: '/' },
    { name: 'Shop', url: '/shop' },
    { name: 'Product Details', url: '/product-details' }
  ];

  return (
    <>
      <ScriptLoader />
      <div className="wrapper">
        <Header />

        <main>
          {/* Breadcrumb Area */}
          <div className="breadcrumb-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="breadcrumb-wrap">
                    <nav aria-label="breadcrumb">
                      <ul className="breadcrumb">
                        {breadcrumbData.map((item, index) => (
                          <li
                            key={index}
                            className={`breadcrumb-item${index === breadcrumbData.length - 1 ? ' active' : ''}`}
                            aria-current={index === breadcrumbData.length - 1 ? 'page' : undefined}
                          >
                            {index === 0 ? (
                              <Link href={item.url}>
                                <i className="fa fa-home"></i>
                              </Link>
                            ) : index === breadcrumbData.length - 1 ? (
                              item.name
                            ) : (
                              <Link href={item.url}>{item.name}</Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Main Wrapper */}
          <div className="shop-main-wrapper section-padding pb-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 order-1 order-lg-2">
                  <div className="product-details-inner">
                    <div className="row">
                      {/* Product Image Gallery */}
                      <div className="col-lg-5">
                        <ProductImageGallery
                          images={product.images}
                          selectedImageIndex={selectedImageIndex}
                          onImageSelect={setSelectedImageIndex}
                        />
                      </div>

                      {/* Product Information */}
                      <div className="col-lg-7">
                        <ProductInfo
                          product={product}
                          onQuickView={() => setIsQuickViewOpen(true)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Reviews Section */}
          <ProductReviews product={product} />

          {/* Related Products Section */}
          <RelatedProducts currentProductId={product.id} />
        </main>

        <Footer />
      </div>

      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}