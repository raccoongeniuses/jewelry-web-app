'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/product';

// Sample product data for marquee
const marqueeProducts: Product[] = [
  {
    id: 'marquee-1',
    name: 'Golden Ring',
    price: 300.00,
    image: '/assets/draggable-grid-public/ring-2.png',
    url: '/product-details'
  },
  {
    id: 'marquee-2',
    name: 'Diamond Ring',
    price: 450.00,
    image: '/assets/draggable-grid-public/ring-3.png',
    url: '/product-details'
  },
  {
    id: 'marquee-3',
    name: 'Silver Ring',
    price: 250.00,
    image: '/assets/draggable-grid-public/ring-4.png',
    url: '/product-details'
  },
  {
    id: 'marquee-4',
    name: 'Earring Collection',
    price: 180.00,
    image: '/assets/draggable-grid-public/earring-1.png',
    url: '/product-details'
  },
  {
    id: 'marquee-5',
    name: 'Premium Ring',
    price: 350.00,
    image: '/assets/draggable-grid-public/ring-5.png',
    url: '/product-details'
  },
  {
    id: 'marquee-6',
    name: 'Luxury Ring',
    price: 500.00,
    image: '/assets/draggable-grid-public/ring-7.png',
    url: '/product-details'
  }
];

export default function Marquee() {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const detailsOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize marquee animation and functionality
    const initMarquee = () => {
      const grid = gridRef.current;
      if (!grid) return;

      // Remove any existing CSS animation
      grid.style.animation = 'none';

      // Add click handlers to marquee items
      const marqueeItems = grid.querySelectorAll('.marquee-item');
      marqueeItems.forEach((item: Element) => {
        const img = item.querySelector('img');
        if (img) {
          const productId = img.getAttribute('data-product-id');
          const product = marqueeProducts.find(p => p.id === productId);
          
          if (product) {
            item.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              showProductDetails(product, item as HTMLElement);
            });
          }
        }
      });

      // Wait for GSAP to be available, then initialize marquee
      let gsapRetryCount = 0;
      const maxRetries = 50; // 5 seconds max wait
      
      const waitForGSAP = () => {
        if (typeof window !== 'undefined' && (window as any).gsap) {
          console.log('GSAP found, initializing marquee animation');
          initializeInfiniteMarquee();
        } else if (gsapRetryCount < maxRetries) {
          gsapRetryCount++;
          console.log(`GSAP not ready, retrying in 100ms (attempt ${gsapRetryCount}/${maxRetries})`);
          setTimeout(waitForGSAP, 100);
        } else {
          console.log('GSAP failed to load, using CSS fallback animation');
          // Add CSS fallback class
          grid.classList.add('css-fallback');
        }
      };

      // Start checking for GSAP availability
      waitForGSAP();
    };

    // Wait for component to mount
    const timer = setTimeout(initMarquee, 200);
    return () => clearTimeout(timer);
  }, []);

  // Initialize infinite marquee with GSAP
  const initializeInfiniteMarquee = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const { gsap } = window as any;

    // Clean up any existing clones and timelines
    const existingClone = document.querySelector('.grid-clone');
    if (existingClone && existingClone.parentNode) {
      existingClone.parentNode.removeChild(existingClone);
    }

    if ((window as any).infiniteMarqueeTimeline) {
      (window as any).infiniteMarqueeTimeline.kill();
    }

    // Store the clone
    const gridClone = grid.cloneNode(true) as HTMLElement;
    gridClone.classList.add('grid-clone');
    gridClone.setAttribute('aria-hidden', 'true');
    grid.parentNode?.appendChild(gridClone);

    // Get grid width
    const gridWidth = grid.offsetWidth;
    console.log('Grid width:', gridWidth);

    // Set initial positions using GSAP
    gsap.set(grid, { x: 0 });
    gsap.set(gridClone, { x: gridWidth });

    // Create infinite marquee with seamless looping
    const duration = 180; // Faster duration for visible movement

    const marqueeTimeline = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        // Wrap positions for seamless loop
        const gridX = gsap.getProperty(grid, "x");
        const cloneX = gsap.getProperty(gridClone, "x");

        // When grid moves completely off left, position it to the right of the clone
        if (gridX <= -gridWidth) {
          gsap.set(grid, { x: cloneX + gridWidth });
        }

        // When clone moves completely off left, position it to the right of the grid
        if (cloneX <= -gridWidth) {
          gsap.set(gridClone, { x: gridX + gridWidth });
        }
      },
    });

    // Animate both grids moving left continuously
    marqueeTimeline.to(
      [grid, gridClone],
      {
        x: `-=${gridWidth}`, // Move both grids by their width
        duration: duration,
        ease: "none",
      },
      0
    );

    // Store timeline reference
    (window as any).infiniteMarqueeTimeline = marqueeTimeline;
    
    // Add class to indicate GSAP is initialized
    grid.classList.add('gsap-initialized');
    console.log('Marquee animation started');

    // Handle resize
    const handleResize = () => {
      if ((window as any).infiniteMarqueeTimeline) {
        (window as any).infiniteMarqueeTimeline.kill();
      }

      // Remove clone if it exists
      const existingClone = document.querySelector('.grid-clone');
      if (existingClone && existingClone.parentNode) {
        existingClone.parentNode.removeChild(existingClone);
      }

      // Restart after resize
      setTimeout(() => {
        initializeInfiniteMarquee();
      }, 100);
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', debouncedResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if ((window as any).infiniteMarqueeTimeline) {
        (window as any).infiniteMarqueeTimeline.kill();
      }
    };
  };

  const showProductDetails = (product: Product, element: HTMLElement) => {
    setSelectedProduct(product);
    setIsDetailsOpen(true);
    
    // Add GSAP animation if available
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const { gsap } = window as any;
      
      // Animate details panel in
      gsap.fromTo(detailsPanelRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  };

  const hideProductDetails = () => {
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const { gsap } = window as any;
      
      // Animate details panel out
      gsap.to(detailsPanelRef.current, 
        { opacity: 0, y: 50, duration: 0.3, ease: "power2.in", 
          onComplete: () => {
            setIsDetailsOpen(false);
            setSelectedProduct(null);
          }
        }
      );
    } else {
      setIsDetailsOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      hideProductDetails();
    }
  };

  // Generate the exact same column structure as the original Corano template
  const generateColumns = () => {
    const columns: React.ReactElement[] = [];
    let columnIndex = 0;

    // First set of columns (7 columns)
    const firstSetPatterns = [
      [0, 1, 2], // ring-2, ring-3, ring-5
      [3, 0, 2], // earring-1, ring-2, ring-5
      [0, 1, 4], // ring-2, ring-3, ring-7
      [4, 2, 3], // ring-7, ring-5, earring-1
      [1, 0, 4], // ring-3, ring-2, ring-7
      [3, 2, 1], // earring-1, ring-5, ring-3
      [0, 4, 3], // ring-2, ring-7, earring-1
    ];

    firstSetPatterns.forEach((pattern, setIndex) => {
      columns.push(
        <div key={`col${columnIndex + 1}`} className="column">
          {pattern.map((productIndex, itemIndex) => (
            <div key={`col${columnIndex + 1}-${itemIndex}`} className="marquee-item">
              <Image
                src={marqueeProducts[productIndex].image}
                alt={marqueeProducts[productIndex].name}
                width={200}
                height={200}
                data-product-id={marqueeProducts[productIndex].id}
              />
            </div>
          ))}
        </div>
      );
      columnIndex++;
    });

    // Duplicate set for seamless loop (7 columns)
    const duplicateSetPatterns = [
      [2, 0, 1], // ring-5, ring-2, ring-3
      [3, 4, 0], // earring-1, ring-7, ring-2
      [2, 0, 4], // ring-5, ring-2, ring-7
      [0, 3, 1], // ring-2, earring-1, ring-3
      [1, 0, 4], // ring-3, ring-2, ring-7
      [3, 2, 1], // earring-1, ring-5, ring-3
      [0, 4, 3], // ring-2, ring-7, earring-1
    ];

    duplicateSetPatterns.forEach((pattern, setIndex) => {
      columns.push(
        <div key={`col${columnIndex + 1}`} className="column">
          {pattern.map((productIndex, itemIndex) => (
            <div key={`col${columnIndex + 1}-${itemIndex}`} className="marquee-item">
              <Image
                src={marqueeProducts[productIndex].image}
                alt={marqueeProducts[productIndex].name}
                width={200}
                height={200}
                data-product-id={marqueeProducts[productIndex].id}
              />
            </div>
          ))}
        </div>
      );
      columnIndex++;
    });

    // Additional set for large screens (1920px+) - 15 more columns
    const additionalSetPatterns = [
      [1, 2, 0], // ring-3, ring-5, ring-2
      [3, 4, 2], // earring-1, ring-7, ring-5
      [0, 1, 4], // ring-2, ring-3, ring-7
      [2, 3, 1], // ring-5, earring-1, ring-3
      [4, 0, 2], // ring-7, ring-2, ring-5
      [3, 1, 4], // earring-1, ring-3, ring-7
      [2, 0, 3], // ring-5, ring-2, earring-1
      [1, 4, 2], // ring-3, ring-7, ring-5
      [0, 3, 1], // ring-2, earring-1, ring-3
      [4, 2, 0], // ring-7, ring-5, ring-2
      [3, 1, 4], // earring-1, ring-3, ring-7
      [2, 0, 3], // ring-5, ring-2, earring-1
      [1, 4, 2], // ring-3, ring-7, ring-5
      [0, 3, 1], // ring-2, earring-1, ring-3
      [4, 2, 0], // ring-7, ring-5, ring-2
    ];

    additionalSetPatterns.forEach((pattern, setIndex) => {
      columns.push(
        <div key={`col${columnIndex + 1}`} className="column">
          {pattern.map((productIndex, itemIndex) => (
            <div key={`col${columnIndex + 1}-${itemIndex}`} className="marquee-item">
              <Image
                src={marqueeProducts[productIndex].image}
                alt={marqueeProducts[productIndex].name}
                width={200}
                height={200}
                data-product-id={marqueeProducts[productIndex].id}
              />
            </div>
          ))}
        </div>
      );
      columnIndex++;
    });

    return columns;
  };

  return (
    <>
      {/* Draggable Marquee Section */}
      <section className="draggable-product-marquee">
        <div className="marquee-wrapper">
          <div className="grid" ref={gridRef}>
            {generateColumns()}
          </div>
        </div>
      </section>

      {/* Product Details Overlay */}
      {isDetailsOpen && selectedProduct && (
        <>
          <div 
            className="vase-details-overlay" 
            ref={detailsOverlayRef}
            onClick={hideProductDetails}
          />
          <div className="vase-details-panel" ref={detailsPanelRef}>
            <button 
              className="vase-details-close"
              onClick={hideProductDetails}
            >
              ×
            </button>
            <div className="vase-details-content">
              <h3 className="vase-details-title">{selectedProduct.name}</h3>
              <div className="vase-details-thumb">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  width={300}
                  height={300}
                />
              </div>
              <div className="vase-details-info">
                <div className="vase-details-price">${selectedProduct.price.toFixed(2)}</div>
                <div className="vase-details-description">
                  Generous in size and striking in presence, the {selectedProduct.name.toLowerCase()}
                  makes a bold decorative statement. Its smooth curves and premium materials
                  are perfect for special occasions. Both functional and eye-catching, it brings
                  vitality and a contemporary edge to your jewelry collection.
                </div>
                <button 
                  className="vase-details-add-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
