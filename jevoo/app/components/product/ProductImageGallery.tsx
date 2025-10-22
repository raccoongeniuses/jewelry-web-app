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

  return (
    <>
      {/* Main Image Slider */}
      <div className="product-large-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`pro-large-img img-zoom ${index === currentSlide ? 'slick-active' : ''}`}
          >
            <Image
              src={image}
              alt={`Product image ${index + 1}`}
              width={500}
              height={500}
              className="img-fluid"
            />
          </div>
        ))}
      </div>

      {/* Thumbnail Navigation */}
      <div className="pro-nav slick-row-10 slick-arrow-style">
        {images.map((image, index) => (
          <div
            key={index}
            className={`pro-nav-thumb ${index === currentSlide ? 'slick-current' : ''}`}
            onClick={() => {
              setCurrentSlide(index);
              onImageSelect(index);
            }}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="img-fluid"
            />
          </div>
        ))}
      </div>
    </>
  );
}