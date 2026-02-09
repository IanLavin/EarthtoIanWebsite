import locations from "./locations-data.js";
import icons from "./icons.js";
import { initMenu } from "./js/menu.js";

/* =====================
   CONFIG
===================== */

const DEFAULT_VIEW = { center: [37.8283, -95.5795], zoom: 5 };
const WORLD_VIEW = { center: [10.8283, -9.5795], zoom: 3 };
const CATEGORIES = ["park", "mountain", "adventure", "sightseeing"];
const IMAGE_FALLBACK = "Pictures/Icons/camera-circle.svg";

/* =====================
   MAP SETUP
===================== */

const map = L.map("map").setView(WORLD_VIEW.center, WORLD_VIEW.zoom);

L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics" }
).addTo(map);

/* =====================
   DOM
===================== */

const sidebarList = document.getElementById("sidebar-list");
const searchBox = document.getElementById("searchBox");
const tabs = Array.from(document.querySelectorAll(".tab"));
const homeButton = document.getElementById("homeButton");
const worldButton = document.getElementById("worldButton");
const randomName = document.getElementById("random-location-name");
const randomImg = document.getElementById("random-location-img");

/* =====================
   STATE
===================== */

let activeCategory = "all";
let searchTerm = "";
let lastRandomLocationId = null;

/* =====================
   DATA INDEXES
===================== */

const allLocations = Object.values(locations).flat();
allLocations.forEach((place) => {
  place.searchName = place.name.toLowerCase();
});

const sortedByCategory = {
  all: [...allLocations].sort((a, b) => a.name.localeCompare(b.name)),
};

CATEGORIES.forEach((category) => {
  sortedByCategory[category] = [...(locations[category] || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
});

/* =====================
   MARKERS
===================== */

const markerLayers = Object.fromEntries(CATEGORIES.map((cat) => [cat, L.layerGroup().addTo(map)]));
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

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setActiveTab(category) {
  activeCategory = category;

  tabs.forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  applyCategoryToMap();
  renderSidebarList();
}

function applyCategoryToMap() {
  if (activeCategory === "all") {
    CATEGORIES.forEach((cat) => map.addLayer(markerLayers[cat]));
    return;
  }

  CATEGORIES.forEach((cat) => {
    if (cat === activeCategory) map.addLayer(markerLayers[cat]);
    else map.removeLayer(markerLayers[cat]);
  });
}

function createPopup(place) {
  const placeName = escapeHtml(place.name);
  const country = escapeHtml(place.country ?? "");
  const region = escapeHtml(place.region ?? "");

  return `
    <div class="popup">
      <h3>${placeName}</h3>
      <a href="location.html?id=${place.id}">
        <img
          src="${place.img}"
          alt="${placeName}"
          width="260"
          class="popup-image"
        />
      </a>
      <div class="popup-meta">
        <span>${country}${region ? " - " + region : ""}</span>
      </div>
      <a class="country-link" href="country.html?country=${place.country}" title="View all locations in this country">
        World: ${country}
      </a>
    </div>
  `;
}

function getPlacesForSidebar() {
  const source = sortedByCategory[activeCategory] || [];
  if (!searchTerm) return source;
  return source.filter((place) => place.searchName.includes(searchTerm));
}

function renderSidebarList() {
  sidebarList.innerHTML = "";
  const places = getPlacesForSidebar();

  if (!places.length) {
    const li = document.createElement("li");
    li.className = "sidebar-empty";
    li.textContent = "No matches.";
    sidebarList.appendChild(li);
    return;
  }

  places.forEach((place) => {
    const li = document.createElement("li");
    li.className = "sidebar-item";
    li.textContent = place.name;

    li.addEventListener("click", () => {
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
  CATEGORIES.forEach((category) => {
    (locations[category] || []).forEach((place) => {
      const marker = L.marker([place.lat, place.lng], { icon: icons[category] }).bindPopup(
        createPopup(place)
      );

      marker.on("popupopen", (event) => {
        const popupEl = event.popup.getElement();
        const popupImg = popupEl?.querySelector(".popup-image");
        if (!popupImg) return;
        popupImg.addEventListener(
          "error",
          () => {
            popupImg.src = IMAGE_FALLBACK;
          },
          { once: true }
        );
      });

      markerLayers[category].addLayer(marker);
      markerById.set(place.id, marker);
    });
  });
}

/* =====================
   RANDOM HIGHLIGHT
===================== */

function showRandomLocation() {
  if (!allLocations.length || document.hidden) return;

  let loc = allLocations[Math.floor(Math.random() * allLocations.length)];
  if (allLocations.length > 1 && loc.id === lastRandomLocationId) {
    let attempts = 0;
    while (loc.id === lastRandomLocationId && attempts < 5) {
      loc = allLocations[Math.floor(Math.random() * allLocations.length)];
      attempts += 1;
    }
  }

  lastRandomLocationId = loc.id;
  randomName.textContent = loc.name;

  randomImg.src = loc.img;
  randomImg.onerror = () => (randomImg.src = IMAGE_FALLBACK);
}

setInterval(showRandomLocation, 10000);

/* =====================
   EVENTS
===================== */

tabs.forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.category));
});

searchBox.addEventListener(
  "input",
  debounce((event) => {
    searchTerm = event.target.value.trim().toLowerCase();
    renderSidebarList();
  })
);

homeButton.addEventListener("click", () => {
  map.setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom);
});

worldButton.addEventListener("click", () => {
  map.setView(WORLD_VIEW.center, WORLD_VIEW.zoom);
});

/* =====================
   INIT
===================== */

loadMarkers();
setActiveTab("all");
showRandomLocation();
initMenu();
