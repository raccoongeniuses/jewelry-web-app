'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from '../types/product';

type GroupItem = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  url: string;
};



function GroupList({ items, appendRef, onSlideChange, sliderRef }: {
  items: GroupItem[];
  appendRef: React.RefObject<HTMLDivElement | null>;
  onSlideChange?: (slideIndex: number) => void;
  sliderRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 20;
    const init = () => {
      const hasJQ = typeof window !== 'undefined' && (window as any).$;
      const hasSlick = hasJQ && (window as any).$.fn && typeof (window as any).$.fn.slick === 'function';
      if (!listRef.current) return false;
      if (hasSlick) {
        try {
          const $ = (window as any).$;
          if ($(listRef.current).hasClass('slick-initialized')) {
            $(listRef.current).slick('unslick');
          }
          $(listRef.current).slick({
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1,
            rows: 4,
            slidesPerRow: 1,
            infinite: true,
            autoplay: true,
            arrows: true,
            appendArrows: appendRef.current,
            prevArrow: '<button type="button" class="slick-prev"><i class="pe-7s-angle-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="pe-7s-angle-right"></i></button>',
            beforeChange: (event: any, slick: any, currentSlide: number, nextSlide: number) => {
              if (onSlideChange) {
                onSlideChange(nextSlide);
              }
            }
          });
        } catch (e) {
          console.error(e);
        }
        return true;
      }
      return false;
    };
    const interval = setInterval(() => {
      if (init() || retries++ >= maxRetries) clearInterval(interval);
    }, 200);
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined' && (window as any).$ && listRef.current) {
        const $ = (window as any).$;
        if ($(listRef.current).hasClass('slick-initialized')) {
          $(listRef.current).slick('unslick');
        }
      }
    };
  }, [appendRef, onSlideChange]);

  // Assign the ref to the external ref if provided
  useEffect(() => {
    if (sliderRef && listRef.current) {
      (sliderRef as any).current = listRef.current;
    }
  }, [sliderRef]);

  return (
    <div className="group-list-item-wrapper">
      <div ref={listRef} className="group-list-carousel" data-react-component="true">
        {items.map((item) => (
          <div className="group-slide-item" key={item.id}>
            <div className="group-item">
              <div className="group-item-thumb">
                <a href={item.url}>
                  <img src={item.image} alt="" />
                </a>
              </div>
              <div className="group-item-desc">
                <h5 className="group-product-name">
                  <a href={item.url}>{item.name}</a>
                </h5>
                <div className="price-box">
                  <span className="price-regular">${item.price.toFixed(2)}</span>
                  {item.oldPrice != null && (
                    <span className="price-old">
                      <del>${item.oldPrice.toFixed(2)}</del>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GroupProducts() {
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const bestSellerAppendRef = useRef<HTMLDivElement>(null);
  const onSaleAppendRef = useRef<HTMLDivElement>(null);
  const bestSellerSliderRef = useRef<HTMLDivElement>(null);
  const onSaleSliderRef = useRef<HTMLDivElement>(null);

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

  // Transform API product to GroupItem format
  const transformToGroupItem = (product: Product): GroupItem => ({
    id: product.id,
    name: product.name,
    price: product.salePrice || product.price,
    oldPrice: product.isOnSale ? product.price : undefined,
    image: product.image,
    url: `/products/${product.slug}`
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Fetch Best Seller products
        const bestSellerResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/products?pagination=true&limit=100&trash=false&sort=-price&where[isBestSeller][equals]=true`
        );

        if (!bestSellerResponse.ok) {
          throw new Error('Failed to fetch best seller products');
        }

        const bestSellerData = await bestSellerResponse.json();

        // Fetch On-Sale products
        const onSaleResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || ''}/products?pagination=true&limit=100&trash=false&sort=-price&where[isOnSale][equals]=true`
        );

        if (!onSaleResponse.ok) {
          throw new Error('Failed to fetch on-sale products');
        }

        const onSaleData = await onSaleResponse.json();

        // Transform API response to Product type (same as FeaturedProducts)
        const transformProduct = (item: any): Product => ({
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
        });

        const transformedBestSeller = bestSellerData.docs.map(transformProduct);
        const transformedOnSale = onSaleData.docs.map(transformProduct);

        setBestSellerProducts(transformedBestSeller);
        setOnSaleProducts(transformedOnSale);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBestSellerSlideChange = (slideIndex: number) => {
    if (onSaleSliderRef.current && typeof window !== 'undefined' && (window as any).$) {
      const $ = (window as any).$;
      if ($(onSaleSliderRef.current).hasClass('slick-initialized')) {
        $(onSaleSliderRef.current).slick('slickGoTo', slideIndex);
      }
    }
  };

  const handleOnSaleSlideChange = (slideIndex: number) => {
    if (bestSellerSliderRef.current && typeof window !== 'undefined' && (window as any).$) {
      const $ = (window as any).$;
      if ($(bestSellerSliderRef.current).hasClass('slick-initialized')) {
        $(bestSellerSliderRef.current).slick('slickGoTo', slideIndex);
      }
    }
  };

  return (
    <section className="group-product-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="group-product-banner">
              <figure className="banner-statistics">
                <a href="#">
                  <img src="/assets/img/banner-gold.png" alt="product banner" />
                </a>
                <div className="banner-content banner-content_style3 text-center">
                  <h6 className="banner-text1">BEAUTIFUL</h6>
                  <h2 className="banner-text2">Wedding Rings</h2>
                  <a href="/shop" className="btn btn-text">Shop Now</a>
                </div>
              </figure>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="categories-group-wrapper">
              <div className="section-title-append">
                <h4>best seller product</h4>
                <div ref={bestSellerAppendRef} className="slick-append"></div>
              </div>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading best seller products...</span>
                  </div>
                </div>
              ) : (
                <GroupList
                  items={bestSellerProducts.map(transformToGroupItem)}
                  appendRef={bestSellerAppendRef}
                  onSlideChange={handleBestSellerSlideChange}
                  sliderRef={bestSellerSliderRef}
                />
              )}
            </div>
          </div>
          <div className="col-lg-3">
            <div className="categories-group-wrapper">
              <div className="section-title-append">
                <h4>on-sale product</h4>
                <div ref={onSaleAppendRef} className="slick-append"></div>
              </div>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading on-sale products...</span>
                  </div>
                </div>
              ) : (
                <GroupList
                  items={onSaleProducts.map(transformToGroupItem)}
                  appendRef={onSaleAppendRef}
                  onSlideChange={handleOnSaleSlideChange}
                  sliderRef={onSaleSliderRef}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



