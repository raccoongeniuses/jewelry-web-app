// Vase Marquee for Corano Theme - Scattered Organic Layout
document.addEventListener("DOMContentLoaded", function () {
  const marqueeTrack = document.querySelector(".marquee-track");
  if (!marqueeTrack) return;

  // Create multiple copies to ensure no gaps during scrolling
  const originalContent = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = originalContent + originalContent + originalContent;

  // Add more dramatic random positioning for scattered effect (no rotation, same size)
  const marqueeItems = marqueeTrack.querySelectorAll(".marquee-item");
  marqueeItems.forEach((item, index) => {
    // Add more dramatic random horizontal offsets for scattered effect within columns
    const randomX = (Math.random() - 0.5) * 80; // -40px to +40px for column-based scattering

    const currentTransform = item.style.transform || "";
    item.style.transform = currentTransform + ` translateX(${randomX}px)`;

    // Add hover effects with scaling (keeping same base size)
    item.addEventListener("mouseenter", function () {
      const currentTransform = this.style.transform;
      this.style.transform = currentTransform + " scale(1.1)";
      this.style.zIndex = "10";
    });

    item.addEventListener("mouseleave", function () {
      const currentTransform = this.style.transform;
      this.style.transform = currentTransform.replace(" scale(1.1)", "");
      this.style.zIndex = "1";
    });
  });

  // Ensure truly infinite scrolling with no resets
  let animationPosition = 0;
  const animationSpeed = 0.8; // Slightly slower for better viewing

  function animateMarquee() {
    animationPosition -= animationSpeed;

    // Reset position when we've scrolled through one complete set
    if (Math.abs(animationPosition) >= marqueeTrack.offsetWidth / 3) {
      animationPosition = 0;
    }

    marqueeTrack.style.transform = `translateX(${animationPosition}px)`;
    requestAnimationFrame(animateMarquee);
  }

  // Start the animation
  animateMarquee();
});
