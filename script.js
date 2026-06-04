import locations from "./locations-data.js";
import icons from "./icons.js";
import standaloneRoutes from "./routes-data.js";
import { initMenu } from "./js/menu.js";
import { escapeHtml, IMAGE_FALLBACK } from "./js/utils.js";

/* =====================
   CONFIG
===================== */

const DEFAULT_VIEW = { center: [37.8283, -95.5795], zoom: 5 };
const WORLD_VIEW = { center: [10.8283, -9.5795], zoom: 3 };
const CATEGORIES = ["park", "mountain", "adventure", "sightseeing"];
/* =====================
   MAP SETUP
===================== */

const WORLD_BOUNDS = L.latLngBounds(
  L.latLng(-85, -180),
  L.latLng(85, 180)
);

const map = L.map("map", {
  maxBounds: WORLD_BOUNDS,
  maxBoundsViscosity: 1.0,
}).setView(WORLD_VIEW.center, WORLD_VIEW.zoom);

const satelliteLayer = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution: "&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics",
    noWrap: true,
    bounds: WORLD_BOUNDS,
  }
);

const terrainLayer = L.tileLayer(
  "https://tile.opentopomap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; <a href='https://opentopomap.org'>OpenTopoMap</a> contributors",
    noWrap: true,
    bounds: WORLD_BOUNDS,
    maxZoom: 17,
  }
);

satelliteLayer.addTo(map);
let activeMapStyle = "satellite";

/* =====================
   DOM
===================== */

const sidebarList = document.getElementById("sidebar-list");
const searchBox = document.getElementById("searchBox");
const tabs = Array.from(document.querySelectorAll(".tab"));
const homeButton = document.getElementById("homeButton");
const worldButton = document.getElementById("worldButton");
const mapStyleBtns = Array.from(document.querySelectorAll(".map-style-btn"));
const routesToggleBtn = document.getElementById("routesToggle");
const yearFilterEl = document.getElementById("year-filter");
const mapArea = document.querySelector(".map-area");
const randomName = document.getElementById("random-location-name");
const randomImg = document.getElementById("random-location-img");
const randomLink = document.getElementById("random-location-link");
const surpriseMeBtn = document.getElementById("surprise-me-btn");

/* =====================
   STATE
===================== */

let activeCategory = "all";
let activeYearFilter = "all";
let searchTerm = "";
let lastRandomLocationId = null;
let routesAlwaysVisible = false;
let openPopupLocationId = null;
let pendingOpenId = null;

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
const routeLayerById = new Map();
const standaloneRouteLayers = [];

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

function shouldAutoScrollToMap() {
  return window.matchMedia("(max-width: 980px)").matches;
}

function syncStateToUrl() {
  const params = new URLSearchParams(window.location.search);

  if (activeCategory && activeCategory !== "all") params.set("category", activeCategory);
  else params.delete("category");

  if (searchTerm) params.set("q", searchTerm);
  else params.delete("q");

  const query = params.toString();
  const target = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState(null, "", target);
}

function restoreStateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const q = params.get("q");

  if (category && (category === "all" || CATEGORIES.includes(category))) {
    activeCategory = category;
  }

  if (q) {
    searchTerm = q.trim().toLowerCase();
    searchBox.value = q;
  }

  const openId = params.get("open");
  if (openId) pendingOpenId = openId;
}

function setActiveTab(category) {
  activeCategory = category;
  document.body?.setAttribute("data-active-category", category);

  tabs.forEach((btn) => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  applyCategoryToMap();
  renderSidebarList();
  syncStateToUrl();
}

function applyCategoryToMap() {
  if (activeCategory === "all") {
    CATEGORIES.forEach((cat) => map.addLayer(markerLayers[cat]));
  } else {
    CATEGORIES.forEach((cat) => {
      if (cat === activeCategory) map.addLayer(markerLayers[cat]);
      else map.removeLayer(markerLayers[cat]);
    });
  }
  applyYearFilter();
}

function createPopup(place) {
  const placeName = escapeHtml(place.name);
  const country = escapeHtml(place.country ?? "");
  const region = escapeHtml(place.region ?? "");

  return `
    <div class="popup">
      <h3 class="popup-title">
        <a href="location.html?id=${place.id}">${placeName}</a>
      </h3>
      <a href="location.html?id=${place.id}">
        <img
          src="${place.img}"
          alt="${placeName}"
          width="260"
          class="popup-image"
        />
      </a>
      <a class="popup-cta" href="location.html?id=${place.id}">View Details</a>
      <p class="popup-hint">Tap the photo or button for the full location page.</p>
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
  let result = searchTerm ? source.filter((place) => place.searchName.includes(searchTerm)) : source;
  if (activeYearFilter !== "all") {
    result = result.filter((place) => place.dateVisited?.startsWith(activeYearFilter));
  }
  return result;
}

function applyYearFilter() {
  allLocations.forEach((place) => {
    const marker = markerById.get(place.id);
    if (!marker) return;
    const matches = activeYearFilter === "all" ||
      (place.dateVisited && place.dateVisited.startsWith(activeYearFilter));
    marker.setOpacity(matches ? 1 : 0);
    if (marker._icon) marker._icon.style.pointerEvents = matches ? "" : "none";
  });
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
      const targetLatLng = L.latLng(place.lat, place.lng);
      const targetZoom = 12;
      const size = map.getSize();
      const targetPoint = map.project(targetLatLng, targetZoom);
      const adjustedCenterPoint = L.point(targetPoint.x, targetPoint.y - size.y / 4);
      const adjustedCenter = map.unproject(adjustedCenterPoint, targetZoom);

      map.setView(adjustedCenter, targetZoom);
      const marker = markerById.get(place.id);
      if (marker) marker.openPopup();

      if (shouldAutoScrollToMap() && mapArea) {
        mapArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => map.invalidateSize(), 260);
      }
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
        if (popupImg) {
          popupImg.addEventListener("error", () => { popupImg.src = IMAGE_FALLBACK; }, { once: true });
        }
        openPopupLocationId = place.id;
        routeLayerById.get(place.id)?.addTo(map);
        const p = new URLSearchParams(window.location.search);
        p.set("open", place.id);
        window.history.replaceState(null, "", `${window.location.pathname}?${p.toString()}`);
      });

      marker.on("popupclose", () => {
        openPopupLocationId = null;
        if (!routesAlwaysVisible) {
          const routeLayer = routeLayerById.get(place.id);
          if (routeLayer) map.removeLayer(routeLayer);
        }
        const p = new URLSearchParams(window.location.search);
        p.delete("open");
        const qs = p.toString();
        window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname);
      });

      markerLayers[category].addLayer(marker);
      markerById.set(place.id, marker);
    });
  });
}

/* =====================
   ROUTES
===================== */

function buildRouteLayer(geojson) {
  const halo = L.geoJSON(geojson, {
    style: { color: "#000", weight: 6, opacity: 0.35, lineCap: "round", lineJoin: "round" },
  });
  const line = L.geoJSON(geojson, {
    style: { color: "#ff7a3d", weight: 3.5, opacity: 1, dashArray: "10, 6", lineCap: "round", lineJoin: "round" },
  });
  return L.layerGroup([halo, line]);
}

async function loadRoutes() {
  const routeLocations = allLocations.filter((loc) => loc.routeGeoJson);
  for (const loc of routeLocations) {
    try {
      const res = await fetch(loc.routeGeoJson);
      if (!res.ok) continue;
      routeLayerById.set(loc.id, buildRouteLayer(await res.json()));
    } catch (err) {
      console.warn("Route load failed:", loc.routeGeoJson, err);
    }
  }

  for (const route of standaloneRoutes) {
    try {
      const res = await fetch(route.file);
      if (!res.ok) continue;
      standaloneRouteLayers.push(buildRouteLayer(await res.json()));
    } catch (err) {
      console.warn("Standalone route load failed:", route.file, err);
    }
  }
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
  if (randomLink) randomLink.href = `location.html?id=${encodeURIComponent(loc.id)}`;
}

setInterval(showRandomLocation, 10000);

surpriseMeBtn?.addEventListener("click", () => {
  const loc = allLocations[Math.floor(Math.random() * allLocations.length)];
  window.location.href = `location.html?id=${encodeURIComponent(loc.id)}`;
});

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
    syncStateToUrl();
  })
);

homeButton.addEventListener("click", () => {
  map.setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom);
});

worldButton.addEventListener("click", () => {
  map.setView(WORLD_VIEW.center, WORLD_VIEW.zoom);
});

mapStyleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const style = btn.dataset.style;
    if (style === activeMapStyle) return;
    activeMapStyle = style;
    if (style === "terrain") {
      map.removeLayer(satelliteLayer);
      terrainLayer.addTo(map);
    } else {
      map.removeLayer(terrainLayer);
      satelliteLayer.addTo(map);
    }
    mapStyleBtns.forEach((b) => b.classList.toggle("active", b.dataset.style === style));
  });
});

routesToggleBtn?.addEventListener("click", () => {
  routesAlwaysVisible = !routesAlwaysVisible;
  routesToggleBtn.classList.toggle("active", routesAlwaysVisible);
  routeLayerById.forEach((layer, id) => {
    if (routesAlwaysVisible) {
      layer.addTo(map);
    } else if (id !== openPopupLocationId) {
      map.removeLayer(layer);
    }
  });
  standaloneRouteLayers.forEach((layer) => {
    if (routesAlwaysVisible) layer.addTo(map);
    else map.removeLayer(layer);
  });
});

/* =====================
   YEAR FILTER
===================== */

function initYearFilter() {
  if (!yearFilterEl) return;

  const years = [...new Set(
    allLocations
      .filter((loc) => loc.dateVisited)
      .map((loc) => loc.dateVisited.split("-")[0])
  )].sort();

  if (!years.length) return;

  const buttons = ["all", ...years].map((year) => {
    const btn = document.createElement("button");
    btn.className = "year-btn" + (year === "all" ? " active" : "");
    btn.dataset.year = year;
    btn.textContent = year === "all" ? "All Years" : year;
    btn.addEventListener("click", () => {
      activeYearFilter = year;
      yearFilterEl.querySelectorAll(".year-btn").forEach((b) =>
        b.classList.toggle("active", b.dataset.year === year)
      );
      applyYearFilter();
      renderSidebarList();
    });
    return btn;
  });

  yearFilterEl.append(...buttons);
}

/* =====================
   INIT
===================== */

loadMarkers();
loadRoutes();
initYearFilter();
restoreStateFromUrl();
setActiveTab(activeCategory);
showRandomLocation();
initMenu();

if (pendingOpenId) {
  const marker = markerById.get(pendingOpenId);
  const place = allLocations.find((loc) => loc.id === pendingOpenId);
  if (marker && place) {
    map.setView([place.lat, place.lng], Math.max(map.getZoom(), 9));
    marker.openPopup();
  }
}
