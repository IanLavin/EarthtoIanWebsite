// js/carousel.js

export function initCarousel(containerId, images) {
  if (!images || images.length === 0) return;

  let index = 0;
  const container = document.getElementById(containerId);

  container.innerHTML = `
    <button class="carousel-btn prev">‹</button>
    <img class="carousel-image" src="${images[0]}" />
    <button class="carousel-btn next">›</button>
  `;

  const img = container.querySelector(".carousel-image");
  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");

  prev.onclick = () => {
    index = (index - 1 + images.length) % images.length;
    img.src = images[index];
  };

  next.onclick = () => {
    index = (index + 1) % images.length;
    img.src = images[index];
  };
}
