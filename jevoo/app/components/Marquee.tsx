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
  const gridRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const detailsOverlayRef = useRef<HTMLDivElement>(null);
  const detailsCloseRef = useRef<HTMLButtonElement>(null);
  const addCartBtnRef = useRef<HTMLButtonElement>(null);
  const detailsThumbRef = useRef<HTMLDivElement>(null);

  const [currentProduct, setCurrentProduct] = useState<HTMLElement | null>(null);
  const [originalParent, setOriginalParent] = useState<HTMLElement | null>(null);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState<Product | null>(null);

  useEffect(() => {
    // Initialize marquee animation and functionality
    const initMarquee = () => {
      const grid = gridRef.current;
      const detailsOverlay = detailsOverlayRef.current;
      const detailsClose = detailsCloseRef.current;
      const addCartBtn = addCartBtnRef.current;

      if (!grid) return;

      // Register GSAP plugins if available
      if (typeof window !== 'undefined' && (window as any).gsap) {
        const { gsap } = window as any;
        if (gsap && gsap.registerPlugin && (window as any).Flip) {
          gsap.registerPlugin((window as any).Flip);
        }
      }

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
              showDetails(item as HTMLElement, product);
            });

            // Add hover effects with scaling (keeping same base size)
            item.addEventListener('mouseenter', function(this: HTMLElement) {
              this.style.zIndex = "10";
            });

            item.addEventListener('mouseleave', function(this: HTMLElement) {
              this.style.zIndex = "1";
            });
          }
        }
      });

      // Close button event
      if (detailsClose) {
        detailsClose.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          hideDetails();
        });
      }

      // Overlay click to close
      if (detailsOverlay) {
        detailsOverlay.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          hideDetails();
        });
      }

      // Add to cart button event
      if (addCartBtn) {
        addCartBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (selectedProductData) {
            addToCart(selectedProductData);

            // Simple feedback animation
            addCartBtn.textContent = "Added!";
            addCartBtn.style.background = "#27ae60";

            setTimeout(() => {
              if (addCartBtn) {
                addCartBtn.textContent = "Add to Cart";
                addCartBtn.style.background = "#2c3e50";
              }
            }, 1500);

            // On mobile, close details panel after adding to cart
            const isMobileDevice = window.innerWidth <= 768;
            if (isMobileDevice) {
              hideDetails();
            }
          }
        });
      }

      // Wait for GSAP to be available, then initialize marquee
      let gsapRetryCount = 0;
      const maxRetries = 50;

      const waitForGSAP = () => {
        if (typeof window !== 'undefined' && (window as any).gsap) {
          initializeInfiniteMarquee();
        } else if (gsapRetryCount < maxRetries) {
          gsapRetryCount++;
          setTimeout(waitForGSAP, 100);
        } else {
          // Add CSS fallback class
          grid.classList.add('css-fallback');
        }
      };

      // Start checking for GSAP availability
      waitForGSAP();
    };

    // Wait for component to mount
    const timer = setTimeout(initMarquee, 200);

    // Add keyboard support for closing details panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isShowingDetails) {
        hideDetails();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isShowingDetails, selectedProductData]);

  const showDetails = (element: HTMLElement, product: Product) => {
    if (isShowingDetails) return;
    setIsShowingDetails(true);
    setSelectedProductData(product);

    // Get the element's exact position and dimensions before any DOM changes
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Store original position for animation
    const originalPosition = {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height
    };

    // Clone the element instead of moving it to preserve marquee layout
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.position = "fixed";
    clonedElement.style.zIndex = "9999";
    clonedElement.style.margin = "0";

    // Add clone to body
    document.body.appendChild(clonedElement);

    // Show details panel first
    if (detailsPanelRef.current) {
      detailsPanelRef.current.classList.add("active");
    }
    if (detailsOverlayRef.current) {
      detailsOverlayRef.current.classList.add("active");
    }
    document.body.style.overflow = "hidden";

    // Update details panel content
    if (detailsPanelRef.current) {
      const title = detailsPanelRef.current.querySelector('.vase-details-title');
      const price = detailsPanelRef.current.querySelector('.vase-details-price');
      const description = detailsPanelRef.current.querySelector('.vase-details-description');

      if (title) {
        title.textContent = product.name;
      }
      if (price) {
        price.textContent = `$${product.price.toFixed(2)}`;
      }
      if (description) {
        description.textContent = `Generous in size and striking in presence, the ${product.name.toLowerCase()} makes a bold decorative statement. Its smooth curves and premium materials are perfect for special occasions. Both functional and eye-catching, it brings vitality and a contemporary edge to your jewelry collection.`;
      }
    }

    // Move clone to details thumb
    if (detailsThumbRef.current) {
      detailsThumbRef.current.appendChild(clonedElement);
    }

    // Store reference to the clone for cleanup
    setCurrentProduct(clonedElement);
    setOriginalParent(document.body); // Clone parent is body

    // Animate from original position to details thumb using regular GSAP
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const { gsap } = window as any;

      // Set initial position to match original location
      gsap.set(clonedElement, {
        position: "fixed",
        top: originalPosition.top,
        left: originalPosition.left,
        width: originalPosition.width,
        height: originalPosition.height,
        margin: 0
      });

      // Animate to the center of the details thumb position
      const detailsThumb = detailsThumbRef.current;
      if (detailsThumb) {
        const thumbRect = detailsThumb.getBoundingClientRect();

        // Animate to center of thumb
        gsap.to(clonedElement, {
          position: "fixed",
          top: thumbRect.top + (thumbRect.height - originalPosition.height) / 2,
          left: thumbRect.left + (thumbRect.width - originalPosition.width) / 2,
          scale: 1.1,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => {
            // Center it perfectly in the thumb
            gsap.set(clonedElement, {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "auto",
              height: "auto",
              maxWidth: "90%",
              maxHeight: "90%"
            });
          }
        });
      }
    }
  };

  const hideDetails = () => {
    if (!isShowingDetails || !currentProduct) return;
    setIsShowingDetails(false);

    if (typeof window !== 'undefined' && (window as any).gsap) {
      const { gsap } = window as any;

      // Animate details panel content out first
      const title = document.querySelector(".vase-details-title");
      const infoItems = document.querySelectorAll(".vase-details-info > *");

      if (title) {
        gsap.to(title, {
          y: 50,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }

      if (infoItems.length > 0) {
        gsap.to(infoItems, {
          y: 30,
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
          ease: "power2.in",
        });
      }

      // Animate the cloned element out
      gsap.to(currentProduct, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          // Remove the cloned element
          if (currentProduct.parentNode) {
            currentProduct.parentNode.removeChild(currentProduct);
          }

          // Clear the details thumb
          if (detailsThumbRef.current) {
            detailsThumbRef.current.innerHTML = "";
          }

          // Hide details panel
          if (detailsPanelRef.current) {
            detailsPanelRef.current.classList.remove('active');
          }
          if (detailsOverlayRef.current) {
            detailsOverlayRef.current.classList.remove('active');
          }
          document.body.style.overflow = "";

          // Reset opacity and transform values for next time
          if (title) gsap.set(title, { y: 0, opacity: 1 });
          if (infoItems.length > 0) gsap.set(infoItems, { y: 0, opacity: 1 });

          // Reset references
          setCurrentProduct(null);
          setOriginalParent(null);
          setSelectedProductData(null);
        }
      });
    } else {
      // Fallback: simple removal
      const title = document.querySelector(".vase-details-title");
      const infoItems = document.querySelectorAll(".vase-details-info > *");

      if (title) {
        (title as HTMLElement).style.opacity = '0';
      }
      if (infoItems.length > 0) {
        infoItems.forEach(item => {
          (item as HTMLElement).style.opacity = '0';
        });
      }

      // Remove the cloned element
      if (currentProduct.parentNode) {
        currentProduct.parentNode.removeChild(currentProduct);
      }

      // Clear the details thumb
      if (detailsThumbRef.current) {
        detailsThumbRef.current.innerHTML = "";
      }

      // Hide details panel
      if (detailsPanelRef.current) {
        detailsPanelRef.current.classList.remove('active');
      }
      if (detailsOverlayRef.current) {
        detailsOverlayRef.current.classList.remove('active');
      }
      document.body.style.overflow = "";

      // Reset styles
      if (title) (title as HTMLElement).style.opacity = '1';
      if (infoItems.length > 0) {
        infoItems.forEach(item => {
          (item as HTMLElement).style.opacity = '1';
        });
      }

      // Reset references
      setCurrentProduct(null);
      setOriginalParent(null);
      setSelectedProductData(null);
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

    firstSetPatterns.forEach((pattern) => {
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

    duplicateSetPatterns.forEach((pattern) => {
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

    additionalSetPatterns.forEach((pattern) => {
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

      {/* Vase Details Panel - Always present in DOM */}
      <div className="vase-details-overlay" ref={detailsOverlayRef}></div>
      <div className="vase-details-panel" ref={detailsPanelRef}>
        <button className="vase-details-close" ref={detailsCloseRef}>×</button>
        <div className="vase-details-content">
          <h3 className="vase-details-title">Golden Ring</h3>
          <div className="vase-details-thumb" ref={detailsThumbRef}></div>
          <div className="vase-details-info">
            <div className="vase-details-price">$300.00</div>
            <div className="vase-details-description">
              Generous in size and striking in presence, the golden ring makes a bold decorative statement. Its smooth curves and sunny shade are perfect for standing on the floor or dressing up a wide console. Both functional and eye-catching, it brings vitality and a contemporary edge to your interior design.
            </div>
            <button className="vase-details-add-cart" ref={addCartBtnRef}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}