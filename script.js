import locations from './locations-data.js';
import icons from './icons.js';

/* =====================
   CONFIG
===================== */

const DEFAULT_VIEW = { center: [37.8283, -95.5795], zoom: 5 };
const WORLD_VIEW   = { center: [10.8283, -9.5795], zoom: 3 };

const CATEGORIES = ['park', 'mountain', 'adventure', 'sightseeing'];

/* =====================
   MAP SETUP
===================== */

const map = L.map('map').setView(WORLD_VIEW.center, WORLD_VIEW.zoom);

L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics' }
).addTo(map);

/* =====================
   DOM
===================== */

const sidebarList = document.getElementById('sidebar-list');
const searchBox = document.getElementById('searchBox');
const tabs = Array.from(document.querySelectorAll('.tab'));

const homeButton = document.getElementById('homeButton');
const worldButton = document.getElementById('worldButton');

const randomName = document.getElementById('random-location-name');
const randomImg = document.getElementById('random-location-img');

/* =====================
   STATE
===================== */

let activeCategory = 'all';
let searchTerm = '';

/* =====================
   MARKERS
===================== */

const markerLayers = Object.fromEntries(
  CATEGORIES.map(cat => [cat, L.layerGroup().addTo(map)])
);

// Used for list click -> open popup
const markerById = new Map();

/* =====================
   HELPERS
===================== */

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function setActiveTab(category) {
  activeCategory = category;

  tabs.forEach(btn => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  applyCategoryToMap();
  renderSidebarList();
}

function applyCategoryToMap() {
  // Show all layers if "all"
  if (activeCategory === 'all') {
    CATEGORIES.forEach(cat => map.addLayer(markerLayers[cat]));
    return;
  }

  // Otherwise show just one layer
  CATEGORIES.forEach(cat => {
    if (cat === activeCategory) map.addLayer(markerLayers[cat]);
    else map.removeLayer(markerLayers[cat]);
  });
}

function createPopup(place, category) {
  return `
    <div class="popup">
      <h3>${place.name}</h3>

      <!-- Location page -->
      <a href="location.html?id=${place.id}">
        <img
          src="${place.img}"
          alt="${place.name}"
          width="200"
          class="popup-image"
          onerror="this.onerror=null; this.src='fallback.jpg';"
        />
      </a>

      <div class="popup-meta">
        <span>${place.country ?? ""}${place.region ? " - " + place.region : ""}</span>
      </div>

      <!-- Country page -->
      <a class="country-link" href="country.html?country=${place.country}" title="View all locations in this country">
        World: ${place.country}
      </a>
    </div>
  `;
}

function getPlacesForSidebar() {
  const all = Object.values(locations).flat();

  const byCategory =
    activeCategory === 'all'
      ? all
      : (locations[activeCategory] || []);

  const filtered = byCategory.filter(p =>
    p.name.toLowerCase().includes(searchTerm)
  );

  // A stable sort makes the list nicer to scan
  filtered.sort((a, b) => a.name.localeCompare(b.name));
  return filtered;
}

function renderSidebarList() {
  sidebarList.innerHTML = '';

  const places = getPlacesForSidebar();

  if (!places.length) {
    const li = document.createElement('li');
    li.className = 'sidebar-empty';
    li.textContent = 'No matches.';
    sidebarList.appendChild(li);
    return;
  }

  places.forEach(place => {
    const li = document.createElement('li');
    li.className = 'sidebar-item';
    li.textContent = place.name;

    li.addEventListener('click', () => {
      map.setView([place.lat, place.lng], 12);

      const marker = markerById.get(place.id);
      if (marker) marker.openPopup();
    });

    sidebarList.appendChild(li);
  });
}

/* =====================
   LOAD MARKERS
===================== */

function loadMarkers() {
  CATEGORIES.forEach(category => {
    (locations[category] || []).forEach(place => {
      const marker = L.marker([place.lat, place.lng], { icon: icons[category] })
        .bindPopup(createPopup(place, category));

      markerLayers[category].addLayer(marker);
      markerById.set(place.id, marker);
    });
  });
}

/* =====================
   RANDOM HIGHLIGHT
===================== */

const allLocations = Object.values(locations).flat();

function showRandomLocation() {
  const loc = allLocations[Math.floor(Math.random() * allLocations.length)];
  randomName.textContent = loc.name;

  randomImg.src = loc.img;
  randomImg.onerror = () => (randomImg.src = 'fallback.jpg');
}

setInterval(showRandomLocation, 10000);

/* =====================
   EVENTS
===================== */

tabs.forEach(btn => {
  btn.addEventListener('click', () => setActiveTab(btn.dataset.category));
});

searchBox.addEventListener(
  'input',
  debounce(e => {
    searchTerm = e.target.value.trim().toLowerCase();
    renderSidebarList();
  })
);

homeButton.addEventListener('click', () => {
  map.setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom);
});

worldButton.addEventListener('click', () => {
  map.setView(WORLD_VIEW.center, WORLD_VIEW.zoom);
});

/* =====================
   INIT
===================== */

loadMarkers();
setActiveTab('all');
showRandomLocation();

// Hamburger menu toggle
const menuContainer = document.querySelector(".menu-container");
const menuToggle = document.getElementById("menu-toggle");

menuToggle.addEventListener("click", () => {
  menuContainer.classList.toggle("open");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!menuContainer.contains(e.target)) {
    menuContainer.classList.remove("open");
  }
});


