'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types/product';
import { gsap } from 'gsap';
import { Flip } from 'gsap/dist/Flip';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Flip);
}

// API response type for products
interface ApiProduct {
  id: string;
  name: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  finalPrice: number;
  productImage: {
    url: string;
    alt: string;
  };
}

// Interface for button element with custom handler property
interface HTMLButtonElementWithHandler extends HTMLButtonElement {
  _cartHandler?: (e: Event) => void;
}

// Helper function to construct full image URLs
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

export default function Marquee() {
  const { addToCart } = useCart();
  const gridRef = useRef<HTMLDivElement>(null);
  const detailsPanelRef = useRef<HTMLDivElement>(null);
  const detailsOverlayRef = useRef<HTMLDivElement>(null);
  const detailsCloseRef = useRef<HTMLButtonElement>(null);
  const addCartBtnRef = useRef<HTMLButtonElement>(null);
  const detailsThumbRef = useRef<HTMLDivElement>(null);
  const infiniteMarqueeTimeline = useRef<gsap.core.Timeline | null>(null);

  const [currentProduct, setCurrentProduct] = useState<HTMLElement | null>(null);
  const [originalParent, setOriginalParent] = useState<HTMLElement | null>(null);
  const [placeholderElement, setPlaceholderElement] = useState<HTMLElement | null>(null);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState<Product | null>(null);
  const [marqueeProducts, setMarqueeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Use refs to store stable function references
  const showDetailsRef = useRef<(element: HTMLElement, product: Product) => void>(() => {});
  const hideDetailsRef = useRef<() => void>(() => {});

  useEffect(() => {
    let isMounted = true;
    let marqueeTimelineCleanup: (() => void) | null = null;
    let cartObserver: MutationObserver | null = null;

    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const response = await fetch(`${apiUrl}/products?pagination=true&limit=100&trash=false&sort=-price&select[name]=true&select[productImage]=true&select[price]=true&select[salePrice]=true&select[shortDescription]=true`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        // Transform API response to Product type
        const transformedProducts: Product[] = data.docs.map((item: ApiProduct) => ({
          id: item.id,
          name: item.name,
          price: item.finalPrice,
          image: getFullImageUrl(item.productImage?.url),
          shortDescription: item.shortDescription,
          url: `/products/${item.id}`
        }));

        // Ensure we have at least 6 products for the original patterns by repeating if needed
        const finalProducts: Product[] = [];
        for (let i = 0; i < 6; i++) {
          finalProducts.push(transformedProducts[i % transformedProducts.length]);
        }

        if (isMounted) {
          setMarqueeProducts(finalProducts);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching marquee products:', error);
        // Fallback to empty array if API fails
        if (isMounted) {
          setMarqueeProducts([]);
          setLoading(false);
        }
      }
    };

    // Define showDetails function inside useEffect to maintain closure access
    const showDetails = (element: HTMLElement, product: Product) => {
      if (isShowingDetails) return;
      setIsShowingDetails(true);
      setSelectedProductData(product);

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

      // Store references including the exact placeholder element
      setCurrentProduct(element);
      setOriginalParent(originalParent);
      setPlaceholderElement(placeholder);

      // Get state before moving
      const state = Flip.getState(element);

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
          description.textContent = product.shortDescription || `Beautiful ${product.name.toLowerCase()} for your jewelry collection.`;
        }
      }

      // Move product to details thumb (simpler approach like vanilla JS)
      if (detailsThumbRef.current) {
        detailsThumbRef.current.innerHTML = ''; // Clear any previous content
        detailsThumbRef.current.appendChild(element);
      }

      // Flip animation from original position to details (simpler like vanilla JS)
      Flip.from(state, {
        absolute: true,
        duration: 1.2,
        ease: "power3.inOut",
      });
    };

    // Define hideDetails function inside useEffect to maintain closure access
    const hideDetails = () => {
      if (!isShowingDetails || !currentProduct || !originalParent) return;
      setIsShowingDetails(false);

      // Use the stored placeholder element for accurate positioning
      const placeholder = placeholderElement;

      if (placeholder) {
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
            // After content fades out, start the product animation back to original position
            const placeholderRect = placeholder.getBoundingClientRect();
            const currentRect = currentProduct.getBoundingClientRect();

            // Calculate the distance to travel (like vanilla JS)
            const deltaX = placeholderRect.left - currentRect.left;
            const deltaY = placeholderRect.top - currentRect.top;
            const currentScale = parseFloat(gsap.getProperty(currentProduct, "scale") as string) || 1;
            const targetScale = placeholderRect.width / (currentRect.width / currentScale);

            // Animate the product flying back to its original position
            gsap.to(currentProduct, {
              x: deltaX,
              y: deltaY,
              scale: targetScale,
              opacity: 1,
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => {
                // Replace placeholder with product
                placeholder.replaceWith(currentProduct);

                // Reset transforms smoothly
                gsap.set(currentProduct, { x: 0, y: 0, scale: 1, opacity: 1 });

                // Clear the details thumb
                if (detailsThumbRef.current) {
                  detailsThumbRef.current.innerHTML = "";
                }

                // Hide details panel and clean up state classes
                if (detailsPanelRef.current) {
                  detailsPanelRef.current.classList.remove('active', 'cart-open-centered');
                }
                if (detailsOverlayRef.current) {
                  detailsOverlayRef.current.classList.remove('active', 'cart-open-centered');
                }
                document.body.style.overflow = "";

                // Reset opacity and transform values for next time
                gsap.set(".vase-details-title", { y: 0, opacity: 1 });
                gsap.set(".vase-details-info > *", { y: 0, opacity: 1 });
                gsap.set(".vase-details-thumb", { scale: 1, opacity: 1 });

                // Reset references
                setCurrentProduct(null);
                setOriginalParent(null);
                setPlaceholderElement(null);
                setSelectedProductData(null);
              },
            });
          },
        });
      } else {
        // Fallback: simple fade out if placeholder not found
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
        });

        gsap.to(currentProduct, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            originalParent.appendChild(currentProduct);
            gsap.set(currentProduct, { opacity: 1, scale: 1 });

            if (detailsThumbRef.current) {
              detailsThumbRef.current.innerHTML = "";
            }

            if (detailsPanelRef.current) {
              detailsPanelRef.current.classList.remove('active', 'cart-open-centered');
            }
            if (detailsOverlayRef.current) {
              detailsOverlayRef.current.classList.remove('active', 'cart-open-centered');
            }
            document.body.style.overflow = "";

            gsap.set(".vase-details-title", { y: 0, opacity: 1 });
            gsap.set(".vase-details-info > *", { y: 0, opacity: 1 });
            gsap.set(".vase-details-thumb", { scale: 1, opacity: 1 });

            setCurrentProduct(null);
            setOriginalParent(null);
            setPlaceholderElement(null);
            setSelectedProductData(null);
          },
        });
      }
    };

    // Store function references in refs for external access
    showDetailsRef.current = showDetails;
    hideDetailsRef.current = hideDetails;

    // Initialize marquee once products are loaded
    const initializeMarquee = () => {
      const grid = gridRef.current;
      const detailsOverlay = detailsOverlayRef.current;
      const detailsClose = detailsCloseRef.current;
      const addCartBtn = addCartBtnRef.current;

      if (!grid || marqueeProducts.length === 0) return;

      // Remove any existing CSS animation
      grid.style.animation = 'none';

      // Clear previous event listeners
      const marqueeItems = grid.querySelectorAll('.marquee-item');
      marqueeItems.forEach((item: Element) => {
        const clonedItem = item.cloneNode(true);
        item.parentNode?.replaceChild(clonedItem, item);
      });

      // Add click handlers to fresh marquee items
      const freshMarqueeItems = grid.querySelectorAll('.marquee-item');
      freshMarqueeItems.forEach((item: Element) => {
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
        const handleAddToCart = function (e: Event) {
          e.preventDefault();
          e.stopPropagation();

          if (selectedProductData) {
            // Convert Product to CartItem by adding quantity property
            const cartItem = {
              ...selectedProductData,
              quantity: 1
            };
            addToCart(cartItem);

            // Simple feedback animation
            addCartBtn.textContent = "Added!";
            addCartBtn.style.background = "#27ae60";

            setTimeout(() => {
              if (addCartBtn) {
                addCartBtn.textContent = "Add to Cart";
                addCartBtn.style.background = "#2c3e50";
              }
            }, 1500);

            // Check if mobile or desktop
            const isMobileDevice = window.innerWidth <= 768;

            if (isMobileDevice) {
              // On mobile, close details panel after adding to cart
              setTimeout(() => {
                hideDetails();
              }, 500); // Small delay to show "Added!" feedback
            } else {
              // On desktop, open the cart modal next to the details panel
              setTimeout(() => {
                if (window.openCartModal) {
                  window.openCartModal();
                }
              }, 500); // Small delay to show "Added!" feedback
            }
          }
        };

        // Remove any existing listener before adding new one
        addCartBtn.removeEventListener("click", handleAddToCart);
        addCartBtn.addEventListener("click", handleAddToCart);

        // Store the handler reference for cleanup
        (addCartBtn as HTMLButtonElementWithHandler)._cartHandler = handleAddToCart;
      }

      // Initialize the infinite marquee
      marqueeTimelineCleanup = initializeInfiniteMarquee() || (() => {});
    };

    // Add keyboard support for closing details panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isShowingDetails) {
        hideDetails();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Monitor cart modal state to center the details panel on desktop
    const observeCartModal = () => {
      cartObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const target = mutation.target as HTMLElement;
            const cartModal = target.closest('.offcanvas-minicart-wrapper');

            if (cartModal && detailsPanelRef.current && detailsOverlayRef.current) {
              const isCartOpen = cartModal.classList.contains('show');

              if (isCartOpen && isShowingDetails) {
                // Cart opened - center the details panel
                detailsPanelRef.current.classList.add('cart-open-centered');
                detailsOverlayRef.current.classList.add('cart-open-centered');
              } else {
                // Cart closed - remove centering
                detailsPanelRef.current.classList.remove('cart-open-centered');
                detailsOverlayRef.current.classList.remove('cart-open-centered');
              }
            }
          }
        });
      });

      // Start observing the body for class changes on cart modal
      cartObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true
      });
    };

    // Start the process
    fetchProducts();

    // Initialize marquee when products are ready
    if (!loading && marqueeProducts.length > 0) {
      const timer = setTimeout(initializeMarquee, 200);
      observeCartModal();

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      isMounted = false;
      document.removeEventListener('keydown', handleKeyDown);

      if (cartObserver) {
        cartObserver.disconnect();
      }

      if (marqueeTimelineCleanup) {
        marqueeTimelineCleanup();
      }

      // Clean up the add to cart event listener
      const cartBtn = document.querySelector('.vase-details-add-cart') as HTMLButtonElementWithHandler;
      if (cartBtn && cartBtn._cartHandler) {
        cartBtn.removeEventListener("click", cartBtn._cartHandler);
        delete cartBtn._cartHandler;
      }

      // Clean up any leftover placeholders
      const placeholders = document.querySelectorAll('.product-placeholder[data-placeholder="true"]');
      placeholders.forEach(placeholder => placeholder.remove());
    };
  }, [loading, marqueeProducts.length, isShowingDetails, currentProduct, originalParent, placeholderElement]); // Include all necessary dependencies

  // Export functions for external access via refs
  const showDetails = (element: HTMLElement, product: Product) => {
    if (showDetailsRef.current) {
      showDetailsRef.current(element, product);
    }
  };

  const hideDetails = () => {
    if (hideDetailsRef.current) {
      hideDetailsRef.current();
    }
  };

  // Generate the exact same column structure as the original Corano template
  const generateColumns = () => {
    const columns: React.ReactElement[] = [];
    let columnIndex = 0;

    // First set of columns (7 columns) - EXACT SAME PATTERNS AS ORIGINAL
    const firstSetPatterns = [
      [0, 1, 2], // product0, product1, product2
      [3, 0, 2], // product3, product0, product2
      [0, 1, 4], // product0, product1, product4
      [4, 2, 3], // product4, product2, product3
      [1, 0, 4], // product1, product0, product4
      [3, 2, 1], // product3, product2, product1
      [0, 4, 3], // product0, product4, product3
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

    // Duplicate set for seamless loop (7 columns) - EXACT SAME PATTERNS AS ORIGINAL
    const duplicateSetPatterns = [
      [2, 0, 1], // product2, product0, product1
      [3, 4, 0], // product3, product4, product0
      [2, 0, 4], // product2, product0, product4
      [0, 3, 1], // product0, product3, product1
      [1, 0, 4], // product1, product0, product4
      [3, 2, 1], // product3, product2, product1
      [0, 4, 3], // product0, product4, product3
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

    // Additional set for large screens (1920px+) - 15 more columns - EXACT SAME PATTERNS AS ORIGINAL
    const additionalSetPatterns = [
      [1, 2, 0], // product1, product2, product0
      [3, 4, 2], // product3, product4, product2
      [0, 1, 4], // product0, product1, product4
      [2, 3, 1], // product2, product3, product1
      [4, 0, 2], // product4, product0, product2
      [3, 1, 4], // product3, product1, product4
      [2, 0, 3], // product2, product0, product3
      [1, 4, 2], // product1, product4, product2
      [0, 3, 1], // product0, product3, product1
      [4, 2, 0], // product4, product2, product0
      [3, 1, 4], // product3, product1, product4
      [2, 0, 3], // product2, product0, product3
      [1, 4, 2], // product1, product4, product2
      [0, 3, 1], // product0, product3, product1
      [4, 2, 0], // product4, product2, product0
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
  const initializeInfiniteMarquee = (): (() => void) => {
    const grid = gridRef.current;
    if (!grid) return () => {};

    // Clean up any existing clones and timelines
    const existingClone = document.querySelector('.grid-clone') as HTMLElement | null;
    if (existingClone) {
      // Check if element is still connected to DOM
      if (existingClone.isConnected) {
        // Prefer native remove when available to avoid parent/child mismatches
        if (typeof existingClone.remove === 'function') {
          existingClone.remove();
        } else if (existingClone.parentNode) {
          existingClone.parentNode.removeChild(existingClone);
        }
      }
    }

    if (infiniteMarqueeTimeline.current) {
      infiniteMarqueeTimeline.current.kill();
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
    const duration = 120; // Original duration from vanilla JS

    const marqueeTimeline = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        // Wrap positions for seamless loop
        const gridX = parseFloat(gsap.getProperty(grid, "x") as string);
        const cloneX = parseFloat(gsap.getProperty(gridClone, "x") as string);

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

    // Animate both grids moving left continuously (like vanilla JS)
    marqueeTimeline.to(
      [grid, gridClone],
      {
        x: `-=${gridWidth * 2}`, // Move both grids by twice their width
        duration: duration * 2, // Double the duration to maintain same speed
        ease: "none",
      },
      0
    );

    // Store timeline reference
    infiniteMarqueeTimeline.current = marqueeTimeline;

    // Handle resize
    const handleResize = () => {
      if (infiniteMarqueeTimeline.current) {
        infiniteMarqueeTimeline.current.kill();
      }

      // Remove clone if it exists
      const existingClone = document.querySelector('.grid-clone') as HTMLElement | null;
      if (existingClone) {
        // Check if element is still connected to DOM
        if (existingClone.isConnected) {
          if (typeof existingClone.remove === 'function') {
            existingClone.remove();
          } else if (existingClone.parentNode) {
            existingClone.parentNode.removeChild(existingClone);
          }
        }
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
      if (infiniteMarqueeTimeline.current) {
        infiniteMarqueeTimeline.current.kill();
      }
    };
  };

  return (
    <>
      {/* Draggable Marquee Section */}
      <section className="draggable-product-marquee">
        <div className="marquee-wrapper">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#666' }}>
              <p>Loading beautiful jewelry...</p>
            </div>
          ) : (
            <div className="grid" ref={gridRef}>
              {generateColumns()}
            </div>
          )}
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
              Product description will be displayed here when you select an item.
            </div>
            <button className="vase-details-add-cart" ref={addCartBtnRef}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}