
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img.lazy");

  const loadImg = (img) => {
    const src = img.dataset.src;
    if (!src) return;

    img.src = src;
    img.onload = () => img.classList.add("loaded");
  };

  if (!("IntersectionObserver" in window)) {
    lazyImages.forEach(loadImg);
    return;
  }
  const options = { threshold: 0.1 };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImg(entry.target);
        obs.unobserve(entry.target); 
      }
    });
  }, options);

  lazyImages.forEach((img) => observer.observe(img));
});
