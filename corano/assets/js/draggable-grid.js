document.addEventListener("DOMContentLoaded", function () {
  const marqueeItems = document.querySelectorAll(".marquee-item");
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

    // Animate details panel content out
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

    // Fade out the vase in place and hide panel
    gsap.to(currentProduct, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        // Move back to original parent (invisible)
        originalParent.appendChild(currentProduct);

        // Reset opacity for next interaction
        gsap.set(currentProduct, { opacity: 1, scale: 1 });

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

  // Add to cart button event
  addCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Simple feedback animation
    this.textContent = "Added!";
    this.style.background = "#27ae60";

    setTimeout(() => {
      this.textContent = "Add to Cart";
      this.style.background = "#2c3e50";
      hideDetails();
    }, 1500);
  });

  // Close panel on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isShowingDetails) {
      hideDetails();
    }
  });
});
