import locations from "../locations-data.js";
import galleryManifest from "../gallery-manifest.js";
import { countryName } from "../country-names.js";
import { initMenu } from "../js/menu.js";

const CATEGORY_LABELS = {
  park: "Park",
  mountain: "Highpoint",
  adventure: "Adventure",
  sightseeing: "Sightseeing",
};

const IMAGE_FALLBACK = "../Pictures/Icons/camera-circle.svg";

// Prefix site-root-relative paths for use from this subfolder
const siteImg = (path) => path ? `../${path}` : IMAGE_FALLBACK;

function getCardImage(loc) {
  if (loc.galleryDir) {
    const dir = loc.galleryDir.replace(/\/+$/, "");
    const images = galleryManifest[dir];
    if (Array.isArray(images) && images.length) return siteImg(images[0]);
  }
  return siteImg(loc.img);
}

// Flatten all locations and attach their category
const allLocations = Object.entries(locations).flatMap(([category, locs]) =>
  locs.map((loc) => ({ ...loc, category }))
);

let activeCategory = "all";
let searchTerm = "";

const grid = document.getElementById("gallery-grid");
const countEl = document.getElementById("gallery-count");
const searchBox = document.getElementById("gallery-search");
const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));

function getFiltered() {
  return allLocations.filter((loc) => {
    const matchesCategory = activeCategory === "all" || loc.category === activeCategory;
    const matchesSearch = !searchTerm || loc.name.toLowerCase().includes(searchTerm);
    return matchesCategory && matchesSearch;
  });
}

function render() {
  const filtered = getFiltered();
  countEl.textContent = `${filtered.length} location${filtered.length !== 1 ? "s" : ""}`;

  grid.innerHTML = filtered.map((loc) => {
    const img = getCardImage(loc);
    const meta = [loc.region, countryName(loc.country)].filter(Boolean).join(" · ");
    const label = CATEGORY_LABELS[loc.category] ?? "";

    return `
      <a href="../location.html?id=${encodeURIComponent(loc.id)}" class="gallery-card">
        <div class="gallery-card-img-wrap">
          <img src="${img}" alt="${loc.name}" loading="lazy"
               onerror="this.src='${IMAGE_FALLBACK}'" />
          <span class="gallery-card-category">${label}</span>
        </div>
        <div class="gallery-card-info">
          <span class="gallery-card-name">${loc.name}</span>
          <span class="gallery-card-meta">${meta}</span>
        </div>
      </a>`;
  }).join("");
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;
    filterBtns.forEach((b) => b.classList.toggle("active", b.dataset.category === activeCategory));
    render();
  });
});

let debounceTimer;
searchBox.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchTerm = searchBox.value.trim().toLowerCase();
    render();
  }, 200);
});

render();
initMenu();
