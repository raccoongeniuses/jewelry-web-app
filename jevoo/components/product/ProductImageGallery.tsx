'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductImageGalleryProps {
  images: string[];
  selectedImageIndex: number;
  onImageSelect: (index: number) => void;
}

export default function ProductImageGallery({
  images,
  selectedImageIndex,
  onImageSelect
}: ProductImageGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCurrentSlide(selectedImageIndex);
  }, [selectedImageIndex]);

  // Take only the first 5 images (1 main + 4 thumbnails)
  const displayImages = images.slice(0, 5);
  const mainImage = displayImages[currentSlide] || displayImages[0];

  return (
    <>
      {/* Main Large Image - Single Image Display */}
      <div className="product-large-slider">
        <div className="pro-large-img img-zoom">
          <Image
            src={mainImage}
            alt="product-details"
            width={500}
            height={500}
            className="img-fluid"
          />
        </div>
      </div>

      {/* Thumbnail Navigation - 4 Small Images Below in Single Row */}
      <div className="pro-nav slick-row-10 slick-arrow-style" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={`pro-nav-thumb ${index === currentSlide ? 'slick-current' : ''}`}
            onClick={() => {
              setCurrentSlide(index);
              onImageSelect(index);
            }}
            style={{ 
              cursor: 'pointer',
              flex: '1',
              maxWidth: '100px',
              border: index === currentSlide ? '2px solid #d4af37' : '2px solid transparent',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <Image
              src={image}
              alt="product-details"
              width={100}
              height={100}
              className="img-fluid"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </>
  );
}