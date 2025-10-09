// Vase Marquee for Corano Theme
document.addEventListener("DOMContentLoaded", function () {
  const marqueeTrack = document.querySelector(".marquee-track");
  if (!marqueeTrack) return;

  // Create duplicate items for seamless loop
  const originalItems = marqueeTrack.innerHTML;
  marqueeTrack.innerHTML = originalItems + originalItems + originalItems;

  // Add smooth hover effects
  const marqueeItems = marqueeTrack.querySelectorAll(".marquee-item");
  marqueeItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.05)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});
