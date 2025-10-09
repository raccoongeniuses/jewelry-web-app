// Vase Marquee for Corano Theme
document.addEventListener("DOMContentLoaded", function () {
  const marqueeTrack = document.querySelector(".marquee-track");
  if (!marqueeTrack) return;

  // Create seamless infinite loop by duplicating the entire track
  const originalContent = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = originalContent + originalContent;

  // Add random positioning for more scattered effect
  const marqueeItems = marqueeTrack.querySelectorAll(".marquee-item");
  marqueeItems.forEach((item, index) => {
    // Add random vertical offset for scattered effect
    const randomOffset = (Math.random() - 0.5) * 40; // -20px to +20px
    const currentTransform = item.style.transform || "";
    item.style.transform = currentTransform + ` translateY(${randomOffset}px)`;

    // Add hover effects
    item.addEventListener("mouseenter", function () {
      const currentTransform = this.style.transform;
      this.style.transform = currentTransform + " scale(1.1)";
    });

    item.addEventListener("mouseleave", function () {
      const currentTransform = this.style.transform;
      this.style.transform = currentTransform.replace(" scale(1.1)", "");
    });
  });

  // Ensure seamless loop by resetting position when animation completes
  marqueeTrack.addEventListener("animationiteration", function () {
    // Animation automatically loops due to CSS infinite property
  });
});
