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
  const [originalNextSibling, setOriginalNextSibling] = useState<Node | null>(null);
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

      // Clean up any leftover placeholders
      const placeholders = document.querySelectorAll('.product-placeholder[data-placeholder="true"]');
      placeholders.forEach(placeholder => placeholder.remove());
    };
  }, [isShowingDetails, selectedProductData]);

  const showDetails = (element: HTMLElement, product: Product) => {
    if (isShowingDetails) return;
    setIsShowingDetails(true);
    setSelectedProductData(product);

    const { gsap, Flip } = window as any;

    // Store references for cleanup
    const originalParent = element.parentNode as HTMLElement;
    const nextSibling = element.nextSibling;

    // Create a simple placeholder to maintain space
    const placeholder = document.createElement("div");
    placeholder.style.height = element.offsetHeight + "px";
    placeholder.style.width = element.offsetWidth + "px";
    placeholder.style.visibility = "hidden";
    placeholder.dataset.placeholder = "true";
    // Copy only the essential margin to maintain spacing
    placeholder.style.marginBottom = getComputedStyle(element).marginBottom;

    // Insert placeholder in the exact same position
    if (nextSibling) {
      originalParent.insertBefore(placeholder, nextSibling);
    } else {
      originalParent.appendChild(placeholder);
    }

    // Store references
    setCurrentProduct(element);
    setOriginalParent(originalParent);
    setOriginalNextSibling(nextSibling);

    // Get state before moving
    const state = Flip.getState(element);

    // Pause the marquee animation
    if ((window as any).infiniteMarqueeTimeline) {
      (window as any).infiniteMarqueeTimeline.pause();
    }

    // Show details panel
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

    // Pre-position the details thumb for precise centering
    if (detailsThumbRef.current) {
      detailsThumbRef.current.innerHTML = ''; // Clear any previous content

      // Create a wrapper element for better control
      const wrapper = document.createElement('div');
      wrapper.style.position = 'absolute';
      wrapper.style.top = '50%';
      wrapper.style.left = '50%';
      wrapper.style.transform = 'translate(-50%, -50%)';
      wrapper.style.width = '100%';
      wrapper.style.height = '100%';
      wrapper.style.display = 'flex';
      wrapper.style.alignItems = 'center';
      wrapper.style.justifyContent = 'center';

      detailsThumbRef.current.appendChild(wrapper);
      wrapper.appendChild(element);

      // Set initial styles on the element
      element.style.position = 'relative';
      element.style.transform = 'none';
      element.style.maxWidth = '90%';
      element.style.maxHeight = '90%';
      element.style.width = 'auto';
      element.style.height = 'auto';
    }

    // Flip animation from original position to details
    Flip.from(state, {
      absolute: true,
      targets: element,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        // Ensure element stays perfectly centered after animation
        if (detailsThumbRef.current) {
          const { gsap } = window as any;

          // Brief corrective animation to snap to perfect center
          gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.1,
            ease: "power2.out",
            onComplete: () => {
              // Ensure final positioning is locked
              element.style.transform = 'none';
            }
          });
        }
      }
    });
  };

  const hideDetails = () => {
    if (!isShowingDetails || !currentProduct || !originalParent) return;
    setIsShowingDetails(false);

    const { gsap } = window as any;

    // Animate details panel content out first
    gsap.to(".vase-details-title", {
      y: 50,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(".vase-details-info > *", {
      y: 30,
      opacity: 0,
      duration: 0.2,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        // Apply the original draggable-grid approach
        const { Flip } = window as any;
        const state = Flip.getState(currentProduct);

        const finalRect = originalParent.getBoundingClientRect();
        const currentRect = currentProduct.getBoundingClientRect();
        const detailsThumbRect = detailsThumbRef.current!.getBoundingClientRect();

        // Set absolute positioning for precise animation
        gsap.set(currentProduct, {
          position: "absolute",
          top: currentRect.top - detailsThumbRect.top + "px",
          left: currentRect.left - detailsThumbRect.left + "px",
          width: currentRect.width + "px",
          height: currentRect.height + "px",
          zIndex: 10000,
        });

        // Animate back to the original parent position
        gsap.to(currentProduct, {
          top: finalRect.top - detailsThumbRect.top + "px",
          left: finalRect.left - detailsThumbRect.left + "px",
          width: finalRect.width + "px",
          height: finalRect.height + "px",
          duration: 1.2,
          delay: 0.3,
          ease: "power3.inOut",
          onComplete: () => {
            // Find and replace the placeholder with the original product
            const placeholder = originalParent.querySelector('[data-placeholder="true"]');
            if (placeholder) {
              placeholder.replaceWith(currentProduct);
            } else {
              // Fallback: return to original position using stored next sibling
              if (originalNextSibling && originalNextSibling.parentNode === originalParent) {
                originalParent.insertBefore(currentProduct, originalNextSibling);
              } else {
                originalParent.appendChild(currentProduct);
              }
            }

            // Reset all styles
            gsap.set(currentProduct, {
              position: "",
              top: "",
              left: "",
              width: "",
              height: "",
              zIndex: "",
            });

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
            gsap.set(".vase-details-title", { y: 0, opacity: 1 });
            gsap.set(".vase-details-info > *", { y: 0, opacity: 1 });
            gsap.set(".vase-details-thumb", { scale: 1, opacity: 1 });

            // Reset references
            setCurrentProduct(null);
            setOriginalParent(null);
            setOriginalNextSibling(null);
            setSelectedProductData(null);

            // Resume the marquee animation
            if ((window as any).infiniteMarqueeTimeline) {
              (window as any).infiniteMarqueeTimeline.resume();
            }
          }
        });
      }
    });
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