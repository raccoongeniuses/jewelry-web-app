// Vase Marquee for Corano Theme - Scattered Organic Layout
document.addEventListener("DOMContentLoaded", function () {
  const marqueeItems = document.querySelectorAll(".marquee-item");
  const detailsPanel = document.getElementById("vaseDetailsPanel");
  const detailsOverlay = document.getElementById("vaseDetailsOverlay");
  const detailsClose = document.getElementById("vaseDetailsClose");
  const addCartBtn = document.querySelector(".vase-details-add-cart");

  // Add click event to all vase items
  marqueeItems.forEach((item, index) => {
    item.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      showVaseDetails();
    });

    // Add hover effects with scaling (keeping same base size)
    item.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    item.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });

  // Show vase details panel
  function showVaseDetails() {
    detailsPanel.classList.add("active");
    detailsOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  }

  // Hide vase details panel
  function hideVaseDetails() {
    detailsPanel.classList.remove("active");
    detailsOverlay.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling
  }

  // Close button event
  detailsClose.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    hideVaseDetails();
  });

  // Overlay click to close
  detailsOverlay.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    hideVaseDetails();
  });

  // Add to cart button event
  addCartBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Simple feedback animation
    this.textContent = "Added!";
    this.style.background = "#27ae60";

    setTimeout(() => {
      this.textContent = "Add to Cart";
      this.style.background = "#2c3e50";
      hideVaseDetails();
    }, 1500);
  });

  // Close panel on Escape key
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && detailsPanel.classList.contains("active")) {
      hideVaseDetails();
    }
  });
});
