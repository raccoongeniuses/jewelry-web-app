'use client';

import { useEffect, useRef } from 'react';

type GroupItem = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  url: string;
};

const bestSeller: GroupItem[] = [
  {
    id: 'bs-1',
    name: 'Diamond Exclusive Ring',
    price: 50.0,
    oldPrice: 29.99,
    image: '/assets/img/product/diamond-ring.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-2',
    name: 'Handmade Golden Ring',
    price: 55.0,
    oldPrice: 30.0,
    image: '/assets/img/product/gold-handmade.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-3',
    name: 'Exclusive Gold Jewelry',
    price: 45.0,
    oldPrice: 25.0,
    image: '/assets/img/product/gold-jewelry.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-4',
    name: 'Perfect Diamond Earring',
    price: 50.0,
    oldPrice: 29.99,
    image: '/assets/img/product/diamond-earring.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-5',
    name: 'Handmade Golden Necklace',
    price: 90.0,
    oldPrice: 100.0,
    image: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-6',
    name: 'Handmade Golden Necklace',
    price: 20.0,
    oldPrice: 30.0,
    image: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-7',
    name: 'Handmade Golden Ring',
    price: 55.0,
    oldPrice: 30.0,
    image: '/assets/img/product/gold-handmade.jpeg',
    url: '/product-details',
  },
  {
    id: 'bs-8',
    name: 'Exclusive Gold Jewelry',
    price: 45.0,
    oldPrice: 25.0,
    image: '/assets/img/product/gold-jewelry.jpeg',
    url: '/product-details',
  },
];

const onSale: GroupItem[] = [
  {
    id: 'os-1',
    name: 'Handmade Golden Necklace',
    price: 50.0,
    oldPrice: 29.99,
    image: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-2',
    name: 'Handmade Golden Necklaces',
    price: 55.0,
    oldPrice: 30.0,
    image: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-3',
    name: 'Exclusive Silver Top Bracelet',
    price: 45.0,
    oldPrice: 25.0,
    image: '/assets/img/product/gold-necklace.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-4',
    name: 'Top Perfect Diamond Necklace',
    price: 50.0,
    oldPrice: 29.99,
    image: '/assets/img/product/diamond-necklace.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-5',
    name: 'Diamond Exclusive Earrings',
    price: 90.0,
    oldPrice: 100.0,
    image: '/assets/img/product/diamond-earring.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-6',
    name: 'Jevoo Top Exclusive Jewelry',
    price: 20.0,
    oldPrice: 30.0,
    image: '/assets/img/product/gold-jewelry.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-7',
    name: 'Handmade Golden Ring',
    price: 55.0,
    oldPrice: 30.0,
    image: '/assets/img/product/gold-handmade.jpeg',
    url: '/product-details',
  },
  {
    id: 'os-8',
    name: 'Exclusive Gold Jewelry',
    price: 45.0,
    oldPrice: 25.0,
    image: '/assets/img/product/gold-jewelry.jpeg',
    url: '/product-details',
  },
];

function GroupList({ items, appendRef, onSlideChange, sliderRef }: { 
  items: GroupItem[]; 
  appendRef: React.RefObject<HTMLDivElement>;
  onSlideChange?: (slideIndex: number) => void;
  sliderRef?: React.RefObject<HTMLDivElement>;
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
  const bestSellerAppendRef = useRef<HTMLDivElement>(null);
  const onSaleAppendRef = useRef<HTMLDivElement>(null);
  const bestSellerSliderRef = useRef<HTMLDivElement>(null);
  const onSaleSliderRef = useRef<HTMLDivElement>(null);

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
              <GroupList 
                items={bestSeller} 
                appendRef={bestSellerAppendRef} 
                onSlideChange={handleBestSellerSlideChange}
                sliderRef={bestSellerSliderRef}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="categories-group-wrapper">
              <div className="section-title-append">
                <h4>on-sale product</h4>
                <div ref={onSaleAppendRef} className="slick-append"></div>
              </div>
              <GroupList 
                items={onSale} 
                appendRef={onSaleAppendRef} 
                onSlideChange={handleOnSaleSlideChange}
                sliderRef={onSaleSliderRef}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



