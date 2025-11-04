'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { Product } from '../../types/product';
import { fetchRelatedProducts, RelatedProductItem } from '../../utils/relatedProductsApi';

interface RelatedProductsProps {
  slug: string;
}

export default function RelatedProducts({ slug }: RelatedProductsProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to construct full image URL
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

  // Transform API data to Product interface
  const transformRelatedProduct = (item: RelatedProductItem): Product => {
    const relatedProduct = item.relatedProduct;

    // Get gallery images with full URLs
    const galleryImages = relatedProduct.galleries.map(gallery => getFullImageUrl(gallery.image.url));
    const primaryImage = getFullImageUrl(relatedProduct.productImage.url);

    // Use the API pricing data directly as requested
    // price: Original price from API
    // salePrice: Sale price from API (if exists)
    const originalPrice = relatedProduct.price;
    const salePrice = relatedProduct.salePrice;

    return {
      id: relatedProduct.id,
      name: relatedProduct.name,
      slug: relatedProduct.slug,
      price: originalPrice, // Original price from API
      salePrice: salePrice, // Sale price from API (if exists)
      originalPrice: salePrice ? originalPrice : undefined,
      image: primaryImage,
      secondaryImage: galleryImages.length > 0 ? galleryImages[0] : undefined,
      images: galleryImages,
      brand: relatedProduct.brand.name,
      category: relatedProduct.categories.name,
      isNew: relatedProduct.isNew,
      isSale: salePrice ? true : false, // Show as sale if salePrice exists
      isOnSale: salePrice ? true : false, // Show as on sale if salePrice exists
      discount: salePrice && originalPrice > salePrice
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : undefined,
      url: `/products/${relatedProduct.slug}`,
      colors: [],
      sizes: [],
    };
  };

  // Fetch related products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchRelatedProducts(slug);
        const transformedProducts = response.docs.map(transformRelatedProduct);
        setRelatedProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError('Failed to load related products');
        // Set empty array to prevent infinite loading
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  useEffect(() => {
    // Initialize Slick carousel exactly like corano
    if (typeof window !== 'undefined' && carouselRef.current && relatedProducts.length > 0) {
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
  }, [relatedProducts]); // Re-initialize when products change

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
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading related products...</span>
                </div>
                <p className="mt-3">Loading related products...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-5">
                <div className="alert alert-warning">
                  <p>{error}</p>
                </div>
              </div>
            )}

            {!loading && !error && relatedProducts.length === 0 && (
              <div className="text-center py-5">
                <p className="text-muted">No related products found.</p>
              </div>
            )}

            {!loading && !error && relatedProducts.length > 0 && (
              /* Use the exact same structure and classes as corano */
              <div
                ref={carouselRef}
                className="product-carousel-4 slick-row-10 slick-arrow-style"
              >
                {relatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-item"
                    onClick={() => router.push(product.url || '/our-products')}
                  >
                    <ProductCard product={product} disableLinks={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}