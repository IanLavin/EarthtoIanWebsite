let overlay = null;
let lightboxImages = [];
let lightboxIndex = 0;

function getOverlay() {
  if (overlay) return overlay;

  overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>
    <img class="lightbox-img" alt="" />
    <button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>
  `;
  document.body.appendChild(overlay);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });
  overlay.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  overlay.querySelector(".lightbox-prev").addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(-1);
  });
  overlay.querySelector(".lightbox-next").addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(1);
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowRight") navigate(1);
    else if (e.key === "ArrowLeft") navigate(-1);
  });

  return overlay;
}

function navigate(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  render();
}

function render() {
  const img = overlay.querySelector(".lightbox-img");
  img.src = lightboxImages[lightboxIndex];
  const hasMultiple = lightboxImages.length > 1;
  overlay.querySelector(".lightbox-prev").style.display = hasMultiple ? "" : "none";
  overlay.querySelector(".lightbox-next").style.display = hasMultiple ? "" : "none";
}

function closeLightbox() {
  overlay?.classList.remove("active");
  document.body.style.overflow = "";
}

export function openLightbox(images, startIndex = 0) {
  lightboxImages = Array.isArray(images) ? images : [images];
  lightboxIndex = startIndex;
  const ol = getOverlay();
  render();
  ol.classList.add("active");
  document.body.style.overflow = "hidden";
}
