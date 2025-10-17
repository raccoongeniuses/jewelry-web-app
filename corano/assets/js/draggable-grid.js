document.addEventListener("DOMContentLoaded", function () {
  // Initialize GSAP and register plugins
  gsap.registerPlugin(Flip);

  const marqueeItems = document.querySelectorAll(".marquee-item");
  const grid = document.querySelector(".grid");
  const detailsPanel = document.getElementById("vaseDetailsPanel");
  const detailsOverlay = document.getElementById("vaseDetailsOverlay");
  const detailsClose = document.getElementById("vaseDetailsClose");
  const addCartBtn = document.querySelector(".vase-details-add-cart");
  const detailsThumb = document.getElementById("vaseDetailsThumb");

  let currentProduct = null;
  let originalParent = null;
  let isShowingDetails = false;

  // Add click event to all vase items
  marqueeItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      showDetails(this);
    });

    // Add hover effects with scaling (keeping same base size)
    item.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    item.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });

  function showDetails(product) {
    if (isShowingDetails) return;
    isShowingDetails = true;

    const productImg = product.querySelector("img");

    // Record original parent
    currentProduct = product;
    originalParent = product.parentNode;

    // Create a placeholder to maintain the space
    const placeholder = document.createElement("div");
    placeholder.style.height = product.offsetHeight + "px";
    placeholder.style.width = product.offsetWidth + "px";
    placeholder.style.visibility = "hidden";
    placeholder.className = "product-placeholder";

    // Insert placeholder before the product
    product.parentNode.insertBefore(placeholder, product);

    // Get state before moving
    const state = Flip.getState(product);

    // Show details panel
    detailsPanel.classList.add("active");
    detailsOverlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Move product to details thumb
    detailsThumb.appendChild(product);

    // Flip animation from original position to details
    Flip.from(state, {
      absolute: true,
      duration: 1.2,
      ease: "power3.inOut",
    });
  }

  // Hide vase details panel
  function hideDetails() {
    if (!isShowingDetails || !currentProduct || !originalParent) return;
    isShowingDetails = false;

    // Find the placeholder
    const placeholder = originalParent.querySelector('.product-placeholder');

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
          // After content fades out, start the vase animation
          const placeholderRect = placeholder.getBoundingClientRect();
          const currentRect = currentProduct.getBoundingClientRect();

          // Calculate the distance to travel
          const deltaX = placeholderRect.left - currentRect.left;
          const deltaY = placeholderRect.top - currentRect.top;
          const currentScale = parseFloat(gsap.getProperty(currentProduct, "scale")) || 1;
          const targetScale = placeholderRect.width / (currentRect.width / currentScale);

          // Animate the vase flying back to its original position
          gsap.to(currentProduct, {
            x: deltaX,
            y: deltaY,
            scale: targetScale,
            opacity: 1,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: () => {
              // Replace placeholder with product
              originalParent.replaceChild(currentProduct, placeholder);

              // Reset transforms smoothly
              gsap.set(currentProduct, { x: 0, y: 0, scale: 1, opacity: 1 });

              // Clear the details thumb
              detailsThumb.innerHTML = "";

              // Hide details panel
              detailsPanel.classList.remove("active");
              detailsOverlay.classList.remove("active");
              document.body.style.overflow = "";

              // Reset opacity and transform values for next time
              gsap.set(".vase-details-title", { y: 0, opacity: 1 });
              gsap.set(".vase-details-info > *", { y: 0, opacity: 1 });
              gsap.set(".vase-details-thumb", { scale: 1, opacity: 1 });

              // Reset references
              currentProduct = null;
              originalParent = null;
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
          detailsThumb.innerHTML = "";
          detailsPanel.classList.remove("active");
          detailsOverlay.classList.remove("active");
          document.body.style.overflow = "";
          gsap.set(".vase-details-title", { y: 0, opacity: 1 });
          gsap.set(".vase-details-info > *", { y: 0, opacity: 1 });
          gsap.set(".vase-details-thumb", { scale: 1, opacity: 1 });
          currentProduct = null;
          originalParent = null;
        },
      });
    }
  }

  // Close button event
  detailsClose.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideDetails();
  });

  // Overlay click to close
  detailsOverlay.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideDetails();
  });

  // Function to check if mobile device
  function isMobileDevice() {
    return window.innerWidth <= 768;
  }

  // Function to get product info from current marquee item
  function getMarqueeProductInfo() {
    if (!currentProduct) {
      // Fallback if no current product
      return {
        id: 'marquee-golden-ring',
        name: 'Golden Ring Decor',
        image: 'assets/img/product/marquee-golden-ring.jpg',
        price: 300.00,
        url: 'product-details.html'
      };
    }

    // Get actual image from the current marquee item
    const productImg = currentProduct.querySelector('img');

    // Extract actual image source
    const imageSrc = productImg ? productImg.src : 'assets/img/product/marquee-golden-ring.jpg';

    // Generate product name based on image filename
    let productName = 'Golden Ring Decor';
    let productId = 'marquee-golden-ring';

    if (productImg && productImg.src) {
      const filename = productImg.src.split('/').pop().toLowerCase();

      if (filename.includes('ring-2')) {
        productName = 'Diamond Ring';
        productId = 'marquee-diamond-ring';
      } else if (filename.includes('ring-3')) {
        productName = 'Wedding Ring';
        productId = 'marquee-wedding-ring';
      } else if (filename.includes('ring-5')) {
        productName = 'Golden Ring Decor';
        productId = 'marquee-golden-ring';
      } else if (filename.includes('ring-7')) {
        productName = 'Silver Ring';
        productId = 'marquee-silver-ring';
      } else if (filename.includes('earring-1')) {
        productName = 'Diamond Earrings';
        productId = 'marquee-diamond-earrings';
      } else {
        productName = 'Fine Jewelry';
        productId = 'marquee-fine-jewelry';
      }
    }

    return {
      id: productId,
      name: productName,
      image: imageSrc,
      price: 300.00,
      url: 'product-details.html'
    };
  }

  // Add to cart button event
  addCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Get product information with actual image
    const productInfo = getMarqueeProductInfo();

    // Use global cart functionality if available
    if (window.coranoCart) {
      window.coranoCart.addToCart(productInfo);
    }

    // Simple feedback animation
    this.textContent = "Added!";
    this.style.background = "#27ae60";

    setTimeout(() => {
      this.textContent = "Add to Cart";
      this.style.background = "#2c3e50";

      // On mobile, close the details panel after adding to cart
      if (isMobileDevice()) {
        hideDetails();
      }
      // On desktop, keep panel open as requested earlier
    }, 1500);
  });

  // Function to center details panel when cart is opened
  function centerDetailsPanel() {
    if (!isShowingDetails || !detailsPanel || isMobileDevice()) return;

    // Add class to center the panel
    detailsPanel.classList.add("cart-open-centered");

    // Animate to center position
    gsap.to(detailsPanel, {
      x: "-50%",
      left: "50%",
      top: "50%",
      y: "-50%",
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        // Adjust overlay for better visual hierarchy
        if (detailsOverlay) {
          detailsOverlay.style.zIndex = "100";
          detailsPanel.style.zIndex = "101";
        }
      }
    });
  }

  // Function to restore details panel position when cart is closed
  function restoreDetailsPanelPosition() {
    if (!isShowingDetails || !detailsPanel || isMobileDevice()) return;

    // Remove centered class and restore original position
    detailsPanel.classList.remove("cart-open-centered");

    // Animate back to original position
    gsap.to(detailsPanel, {
      x: "0%",
      left: "0%",
      top: "0%",
      y: "0%",
      duration: 0.4,
      ease: "power2.out",
      onComplete: () => {
        // Restore original z-index
        if (detailsOverlay) {
          detailsOverlay.style.zIndex = "";
          detailsPanel.style.zIndex = "";
        }
      }
    });
  }

  // Monitor cart state to reposition details panel
  function monitorCartState() {
    const minicartInner = document.querySelector(".minicart-inner");
    if (!minicartInner) return;

    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isCartOpen = minicartInner.classList.contains('show');

          if (isCartOpen && isShowingDetails) {
            // Cart opened and details are showing - center the details
            centerDetailsPanel();
          } else if (!isCartOpen && isShowingDetails) {
            // Cart closed and details are still showing - restore position
            restoreDetailsPanelPosition();
          }
        }
      });
    });

    observer.observe(minicartInner, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // Close panel on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isShowingDetails) {
      hideDetails();
    }
  });

  // Initialize infinite marquee
  initializeInfiniteMarquee();

  // Start monitoring cart state
  monitorCartState();
});

function initializeInfiniteMarquee() {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  // Remove CSS animation if present
  grid.style.animation = 'none';

  // Clean up any existing clones and timelines
  const existingClone = document.querySelector('.grid-clone');
  if (existingClone && existingClone.parentNode) {
    existingClone.parentNode.removeChild(existingClone);
  }

  if (window.infiniteMarqueeTimeline) {
    window.infiniteMarqueeTimeline.kill();
  }

  // Store the clone
  const gridClone = grid.cloneNode(true);
  gridClone.classList.add('grid-clone');
  gridClone.setAttribute('aria-hidden', 'true');
  grid.parentNode.appendChild(gridClone);

  // Get grid width
  const gridWidth = grid.offsetWidth;

  // Set initial positions using GSAP
  gsap.set(grid, { x: 0 });
  gsap.set(gridClone, { x: gridWidth });

  // Create infinite marquee with seamless looping
  const duration = 120; // Slower duration as requested

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
      x: `-=${gridWidth * 2}`, // Move both grids by twice their width to cover the full loop
      duration: duration * 2, // Double the duration to maintain same speed
      ease: "none",
    },
    0
  );

  // Store timeline reference
  window.infiniteMarqueeTimeline = marqueeTimeline;

  // Handle resize
  function handleResize() {
    if (window.infiniteMarqueeTimeline) {
      window.infiniteMarqueeTimeline.kill();
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
  }

  // Debounced resize handler
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 250);
  });
}
