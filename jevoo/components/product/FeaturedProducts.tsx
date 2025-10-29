'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/products?pagination=true&limit=100&trash=false&sort=-price&where[isFeatured][equals]=true`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }

        const data = await response.json();

        // Helper function to construct full image URL (same as our-products page)
        const getFullImageUrl = (imageUrl: string | undefined) => {
          if (!imageUrl) return '/placeholder-product.jpg';
          // If URL already starts with http, return as is
          if (imageUrl.startsWith('http')) return imageUrl;

          const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
          // If image URL starts with /api and base URL ends with /api, remove /api from image URL
          if (imageUrl.startsWith('/api') && baseUrl.endsWith('/api')) {
            return `${baseUrl}${imageUrl.replace('/api', '')}`;
          }
          // Otherwise, prepend the API base URL
          return `${baseUrl}${imageUrl}`;
        };

        // Transform API response to Product type (same as our-products page)
        const transformedProducts: Product[] = data.docs.map((item: any) => ({
          id: item.id,
          name: item.name,
          slug: item.slug,
          description: item.description,
          shortDescription: item.shortDescription || '',
          price: item.price,
          salePrice: item.finalPrice,
          originalPrice: item.isOnSale ? item.price : undefined,
          isOnSale: item.isOnSale,
          isSale: item.isOnSale,
          category: item.categories?.name || 'uncategorized',
          brand: item.brand?.name || '',
          image: getFullImageUrl(item.productImage?.url),
          secondaryImage: item.galleries?.[1]?.image?.url ? getFullImageUrl(item.galleries[1].image.url) : getFullImageUrl(item.productImage?.url),
          images: item.galleries?.map((gallery: any) => getFullImageUrl(gallery.image?.url)).filter(Boolean) || [],
          stockStatus: item.stockStatus,
          isFeatured: item.isFeatured,
          isBestSeller: item.isBestSeller,
          status: item.status,
          colors: [], // Not provided in API response
          sizes: [], // Not provided in API response
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        }));

        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Initialize slider after products are loaded and scripts are available
    if (loading || products.length === 0) return;

    // Initialize slider after scripts load; retry until slick is available
    let retries = 0;
    const maxRetries = 20;
    const tryInit = () => {
      const hasJQ = typeof window !== 'undefined' && (window as any).$;
      const hasSlick = hasJQ && (window as any).$.fn && typeof (window as any).$.fn.slick === 'function';
      if (!sliderRef.current) return false;
      if (hasSlick) {
        if ((window as any).$(sliderRef.current).hasClass('slick-initialized')) {
          (window as any).$(sliderRef.current).slick('unslick');
        }
        try {
          (window as any).$(sliderRef.current).slick({
            speed: 1000,
            slidesToShow: 4,
            slidesToScroll: 1,
            rows: 2,
            autoplay: true,
            infinite: products.length > 4, // Only infinite if we have enough products
            prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
            responsive: [
              {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                  arrows: false,
                  rows: 1
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                  rows: 1
                }
              }
            ]
          });
        } catch (error) {
          console.error('Error initializing slider:', error);
        }
        return true;
      }
      return false;
    };

    const interval = setInterval(() => {
      if (tryInit() || retries++ >= maxRetries) {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      if (typeof window !== 'undefined' && (window as any).$ && sliderRef.current) {
        if ((window as any).$(sliderRef.current).hasClass('slick-initialized')) {
          (window as any).$(sliderRef.current).slick('unslick');
        }
      }
      clearInterval(interval);
    };
  }, [loading, products]);

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
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading featured products...</span>
                </div>
                <p className="mt-3">Loading featured products...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="text-center py-5">
                <p>No featured products available at the moment.</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div
                ref={sliderRef}
                className="product-carousel-4_2 slick-row-10 slick-arrow-style"
                data-react-component="true"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
