import locations from './locations-data.js';
import icons from './icons.js';

/* =====================
   CONFIG
===================== */

const DEFAULT_VIEW = { center: [35.8283, -95.5795], zoom: 5 };
const WORLD_VIEW   = { center: [10.8283, -9.5795], zoom: 2 };

const CATEGORIES = ['park', 'mountain', 'adventure', 'sightseeing'];

/* =====================
   MAP SETUP
===================== */

const map = L.map('map').setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom);

L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  { attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics' }
).addTo(map);

/* =====================
   DOM REFERENCES
===================== */

const locationLists = {
  park: document.getElementById('parks-list'),
  mountain: document.getElementById('highpoints-list'),
  adventure: document.getElementById('adventures-list'),
  sightseeing: document.getElementById('sightseeing-list')
};

const checkboxes = {
  park: document.getElementById('toggleParks'),
  mountain: document.getElementById('toggleHighpoints'),
  adventure: document.getElementById('toggleAdventures'),
  sightseeing: document.getElementById('toggleSightseeing')
};

/* =====================
   MARKER LAYERS
===================== */

const markerLayers = Object.fromEntries(
  CATEGORIES.map(cat => [cat, L.layerGroup().addTo(map)])
);

/* =====================
   HELPERS
===================== */

function createPopup(place, category) {
  return `
    <div class="popup">
      <b>${place.name}</b><br>
      <a href="country.html?country=${place.country}">
        <img
          src="${place.img}"
          alt="${place.name}"
          width="200"
          class="popup-image"
          onerror="this.onerror=null; this.src='fallback.jpg';"
        >
      </a>
      <br>
      <i>${place.country} • ${place.region ?? category}</i>
    </div>
  `;
}

function createListItem(place, marker) {
  const li = document.createElement('li');
  li.textContent = place.name;
  li.addEventListener('click', () => {
    map.setView([place.lat, place.lng], 12);
    marker.openPopup();
  });
  return li;
}

/* =====================
   LOAD MARKERS
===================== */

function loadMarkers() {
  CATEGORIES.forEach(category => {
    locations[category].forEach(place => {
      const marker = L.marker([place.lat, place.lng], {
        icon: icons[category]
      }).bindPopup(`
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
      <span>${place.region ?? ""}</span>
    </div>

    <!-- Country page -->
    <a
      class="country-link"
      href="country.html?country=${place.country}"
      title="View all locations in this country"
    >
      🌍 ${place.country}
    </a>
  </div>
`);


      markerLayers[category].addLayer(marker);
      locationLists[category].appendChild(createListItem(place, marker));
    });
  });
}

/* =====================
   UI CONTROLS
===================== */

function toggleCategories() {
  CATEGORIES.forEach(cat => {
    map[checkboxes[cat].checked ? 'addLayer' : 'removeLayer'](markerLayers[cat]);
  });
}

document.getElementById('filter-container')
  .addEventListener('change', e => e.target.type === 'checkbox' && toggleCategories());

document.getElementById('homeButton')
  .addEventListener('click', () => map.setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom));

document.getElementById('worldButton')
  .addEventListener('click', () => map.setView(WORLD_VIEW.center, WORLD_VIEW.zoom));

/* =====================
   SEARCH
===================== */

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

document.getElementById('searchBox').addEventListener(
  'input',
  debounce(e => {
    const term = e.target.value.toLowerCase();
    CATEGORIES.forEach(cat => {
      [...locationLists[cat].children].forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  })
);

/* =====================
   RANDOM LOCATION
===================== */

const allLocations = Object.values(locations).flat();

function showRandomLocation() {
  const loc = allLocations[Math.floor(Math.random() * allLocations.length)];
  document.getElementById('random-location-name').textContent = loc.name;

  const img = document.getElementById('random-location-img');
  img.src = loc.img;
  img.onerror = () => (img.src = 'fallback.jpg');
}

setInterval(showRandomLocation, 10000);

/* =====================
   INIT
===================== */

loadMarkers();
showRandomLocation();
