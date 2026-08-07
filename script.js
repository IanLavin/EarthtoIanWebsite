import locations from "./locations-data.js";
import icons from "./icons.js";
import standaloneRoutes from "./routes-data.js";
import travelPaths from "./travel-paths-data.js";
import { initMenu } from "./js/menu.js";
import { escapeHtml, IMAGE_FALLBACK } from "./js/utils.js";

/* =====================
   CONFIG
===================== */

const DEFAULT_VIEW = { center: [37.8283, -95.5795], zoom: 5 };
const WORLD_VIEW = { center: [10.8283, -9.5795], zoom: 3 };
const MOBILE_WORLD_VIEW = { center: [20, -90], zoom: 3 };
const CATEGORIES = ["park", "mountain", "adventure", "sightseeing"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/* =====================
   MAP SETUP
===================== */

const WORLD_BOUNDS = L.latLngBounds(
  L.latLng(-85, -180),
  L.latLng(85, 180)
);

const isMobileViewport = window.matchMedia("(max-width: 980px)").matches;
const initialView = isMobileViewport ? MOBILE_WORLD_VIEW : WORLD_VIEW;

const map = L.map("map", {
  maxBounds: WORLD_BOUNDS,
  maxBoundsViscosity: 1.0,
}).setView(initialView.center, initialView.zoom);

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
const tripsToggleBtn = document.getElementById("tripsToggle");
const yearFilterEl = document.getElementById("year-filter");
const monthFilterEl = document.getElementById("month-filter");
const filtersToggleBtn = document.getElementById("filters-toggle-btn");
const filtersBadge = document.getElementById("filters-badge");
const filtersModal = document.getElementById("filters-modal");
const filtersBackdrop = document.getElementById("filters-backdrop");
const filtersModalClose = document.getElementById("filters-modal-close");
const filtersClearBtn = document.getElementById("filters-clear-btn");
const sidebarEl = document.getElementById("sidebar");
const sidebarDrawerToggle = document.getElementById("sidebar-drawer-toggle");
const sidebarBackdrop = document.getElementById("sidebar-backdrop");
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
let activeMonthFilter = "all";
let searchTerm = "";
let lastRandomLocationId = null;
let routesAlwaysVisible = false;
let travelPathsVisible = false;
let tripDotSeq = 0;
let closeTripOverlay = null; // cleanup fn for the currently pinned trip (mobile tap or desktop click)
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
const travelPathLayers = [];

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
  updateFiltersBadge();
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
  applyMarkerFilters();
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

function matchesActiveFilters(place) {
  if (activeYearFilter !== "all" && !place.dateVisited?.startsWith(activeYearFilter)) {
    return false;
  }
  if (activeMonthFilter !== "all" && !place.bestMonths?.includes(Number(activeMonthFilter))) {
    return false;
  }
  return true;
}

function getPlacesForSidebar() {
  const source = sortedByCategory[activeCategory] || [];
  let result = searchTerm ? source.filter((place) => place.searchName.includes(searchTerm)) : source;
  return result.filter(matchesActiveFilters);
}

function applyMarkerFilters() {
  allLocations.forEach((place) => {
    const marker = markerById.get(place.id);
    if (!marker) return;
    const matches = matchesActiveFilters(place);
    marker.setOpacity(matches ? 1 : 0);
    if (marker._icon) marker._icon.style.pointerEvents = matches ? "" : "none";
  });
  applyTripLayerFilters();
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

      if (shouldAutoScrollToMap()) {
        closeSidebarDrawer();
        window.setTimeout(() => map.invalidateSize(), 340);
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
    interactive: false,
  });
  const line = L.geoJSON(geojson, {
    style: { color: "#ff7a3d", weight: 3.5, opacity: 1, dashArray: "10, 6", lineCap: "round", lineJoin: "round" },
    interactive: false,
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
   TRAVEL PATHS
===================== */

const YEAR_COLORS = {
  "2023": "#22d3ee",
  "2024": "#a855f7",
  "2025": "#facc15",
  "2026": "#4ade80",
  default: "#94a3b8",
};

function highlightTripMarkers(locationIds, on) {
  (locationIds || []).forEach((id) => {
    const marker = markerById.get(id);
    const el = marker?.getElement();
    if (el) el.classList.toggle("marker-trip-highlight", on);
  });
}

function buildTravelPathLayer(geojson, color, name, locationIds = []) {
  const halo = L.geoJSON(geojson, {
    style: { color: "#000", weight: 6, opacity: 0.3, lineCap: "round", lineJoin: "round" },
    interactive: false,
  });
  const line = L.geoJSON(geojson, {
    style: { color, weight: 3, opacity: 0.9, lineCap: "round", lineJoin: "round" },
    interactive: false,
  });
  // Invisible wide hit area — catches hover for tooltip, absorbs clicks.
  const hit = L.geoJSON(geojson, {
    style: { color, weight: 16, opacity: 0, lineCap: "round", lineJoin: "round" },
    bubblingMouseEvents: false,
  });
  hit.on("add", function () {
    hit.eachLayer(function (fl) {
      if (fl._path) fl._path.style.pointerEvents = "stroke";
    });
  });
  const svgNS = "http://www.w3.org/2000/svg";
  let activeDot = null;

  function showTripDot() {
    if (activeDot) return;
    line.eachLayer(function (fl) {
      if (!fl._path || activeDot) return;
      if (!fl._path.id) fl._path.id = "tp-" + (++tripDotSeq);

      const dot = document.createElementNS(svgNS, "circle");
      dot.setAttribute("r", "5");
      dot.setAttribute("fill", color);
      dot.setAttribute("stroke", "rgba(255,255,255,0.85)");
      dot.setAttribute("stroke-width", "2");
      dot.setAttribute("pointer-events", "none");

      const anim = document.createElementNS(svgNS, "animateMotion");
      anim.setAttribute("dur", "20s");
      anim.setAttribute("repeatCount", "indefinite");
      anim.setAttribute("rotate", "auto");

      const mpath = document.createElementNS(svgNS, "mpath");
      mpath.setAttribute("href", "#" + fl._path.id);
      mpath.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + fl._path.id);

      anim.appendChild(mpath);
      dot.appendChild(anim);
      fl._path.parentNode.appendChild(dot);
      activeDot = dot;
    });
  }

  function hideTripDot() {
    if (activeDot) { activeDot.remove(); activeDot = null; }
  }

  if (name) {
    // Manage tooltip manually — avoids bindTooltip which on touch-capable browsers
    // (Windows 11 reports maxTouchPoints > 0) wires click→openTooltip on every
    // feature layer, causing the stuck empty box on click.
    const tooltip = L.tooltip({ className: "trip-tooltip", direction: "top", offset: [0, -8] }).setContent(name);
    let pinnedByClick = false;

    function openOverlay(latlng) {
      tooltip.setLatLng(latlng);
      if (!map.hasLayer(tooltip)) tooltip.addTo(map);
      highlightTripMarkers(locationIds, true);
      showTripDot();
    }

    function closeOverlay() {
      tooltip.remove();
      highlightTripMarkers(locationIds, false);
      hideTripDot();
      pinnedByClick = false;
      if (closeTripOverlay === closeOverlay) closeTripOverlay = null;
    }

    // Desktop: hover shows/hides transiently (only when not pinned by click).
    hit.on("mouseover", function (e) {
      if (!pinnedByClick) openOverlay(e.latlng);
    });
    hit.on("mousemove", function (e) {
      if (!pinnedByClick) tooltip.setLatLng(e.latlng);
    });
    hit.on("mouseout", function () {
      if (!pinnedByClick) closeOverlay();
    });

    // Click / tap: pin the overlay so it stays after the finger lifts.
    // Works as the primary interaction on mobile (no hover events).
    // On desktop it toggles a persistent state; tapping the map dismisses.
    hit.on("click", function (e) {
      if (pinnedByClick) {
        closeOverlay();
        return;
      }
      if (closeTripOverlay) closeTripOverlay(); // dismiss any other pinned trip
      openOverlay(e.latlng);
      pinnedByClick = true;
      closeTripOverlay = closeOverlay;
    });

    hit.on("remove", closeOverlay);
  }
  return L.layerGroup([halo, line, hit]);
}

// Ramer-Douglas-Peucker simplification on raw [lng, lat] coordinate arrays.
// Reduces tens-of-thousands of GPS-precision points to a few hundred while
// remaining visually identical at the zoom levels used for travel routes.
function rdpSimplify(coords, tol) {
  if (coords.length <= 2) return coords;
  let maxD = 0, idx = 0;
  const [x1, y1] = coords[0], [x2, y2] = coords[coords.length - 1];
  const dx = x2 - x1, dy = y2 - y1, len2 = dx * dx + dy * dy;
  for (let i = 1; i < coords.length - 1; i++) {
    const [px, py] = coords[i];
    const t = len2 ? Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / len2)) : 0;
    const d = Math.hypot(px - x1 - t * dx, py - y1 - t * dy);
    if (d > maxD) { maxD = d; idx = i; }
  }
  if (maxD > tol) {
    const l = rdpSimplify(coords.slice(0, idx + 1), tol);
    const r = rdpSimplify(coords.slice(idx), tol);
    return [...l.slice(0, -1), ...r];
  }
  return [coords[0], coords[coords.length - 1]];
}

function simplifyGeoJson(geojson) {
  const tol = 0.0005; // ~55 m — imperceptible at travel-route zoom levels
  const features = geojson.type === "FeatureCollection" ? geojson.features : [geojson];
  features.forEach((f) => {
    if (f.geometry.type === "LineString") {
      f.geometry.coordinates = rdpSimplify(f.geometry.coordinates, tol);
    } else if (f.geometry.type === "MultiLineString") {
      f.geometry.coordinates = f.geometry.coordinates.map((line) => rdpSimplify(line, tol));
    }
  });
  return geojson;
}

let tripsLoaded = false;

async function loadTravelPaths() {
  for (const path of travelPaths) {
    try {
      const res = await fetch(path.file);
      if (!res.ok) continue;
      const year = path.date ? path.date.split("-")[0] : null;
      const color = YEAR_COLORS[year] ?? YEAR_COLORS.default;
      travelPathLayers.push({
        layer: buildTravelPathLayer(simplifyGeoJson(await res.json()), color, path.name, path.locations),
        year,
      });
    } catch (err) {
      console.warn("Travel path load failed:", path.file, err);
    }
  }
  tripsLoaded = true;
  renderTripLegend();
  applyTripLayerFilters();
}

function applyTripLayerFilters() {
  travelPathLayers.forEach(({ layer, year }) => {
    const yearMatches = activeYearFilter === "all" || year === activeYearFilter;
    if (travelPathsVisible && yearMatches) layer.addTo(map);
    else map.removeLayer(layer);
  });
}

function renderTripLegend() {
  const existing = document.getElementById("trip-legend");
  if (existing) existing.remove();

  const years = [...new Set(travelPaths.map((p) => p.date?.split("-")[0]).filter(Boolean))].sort();
  if (!years.length) return;

  const legend = document.createElement("div");
  legend.id = "trip-legend";
  legend.className = "trip-legend";
  legend.hidden = !travelPathsVisible;

  years.forEach((year) => {
    const color = YEAR_COLORS[year] ?? YEAR_COLORS.default;
    const item = document.createElement("span");
    item.className = "trip-legend-item";
    item.innerHTML = `<span class="trip-legend-dot" style="background:${color}"></span>${year}`;
    legend.appendChild(item);
  });

  tripsToggleBtn?.parentElement.after(legend);
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
  const view = shouldAutoScrollToMap() ? MOBILE_WORLD_VIEW : WORLD_VIEW;
  map.setView(view.center, view.zoom);
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

tripsToggleBtn?.addEventListener("click", () => {
  travelPathsVisible = !travelPathsVisible;
  tripsToggleBtn.classList.toggle("active", travelPathsVisible);
  const legend = document.getElementById("trip-legend");
  if (legend) legend.hidden = !travelPathsVisible;
  if (travelPathsVisible && !tripsLoaded) {
    loadTravelPaths(); // lazy: first toggle triggers the fetch + render
  } else {
    applyTripLayerFilters();
  }
});

/* =====================
   SIDEBAR DRAWER (mobile)
===================== */

let drawerOpenedAt = 0;

function openSidebarDrawer() {
  sidebarEl?.classList.add("drawer-open");
  sidebarBackdrop?.classList.add("active");
  document.body.style.overflow = "hidden";
  drawerOpenedAt = Date.now();
}

function closeSidebarDrawer() {
  if (Date.now() - drawerOpenedAt < 350) return; // guard against iOS 300ms synthetic click
  sidebarEl?.classList.remove("drawer-open");
  sidebarBackdrop?.classList.remove("active");
  document.body.style.overflow = "";
}

sidebarDrawerToggle?.addEventListener("click", openSidebarDrawer);
sidebarBackdrop?.addEventListener("click", closeSidebarDrawer);

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
      applyMarkerFilters();
      renderSidebarList();
      updateFiltersBadge();
    });
    return btn;
  });

  yearFilterEl.append(...buttons);
}

/* =====================
   MONTH FILTER
===================== */

function initMonthFilter() {
  if (!monthFilterEl) return;

  const buttons = ["all", ...MONTH_NAMES.map((_, i) => String(i + 1))].map((month) => {
    const btn = document.createElement("button");
    btn.className = "month-btn" + (month === "all" ? " active" : "");
    btn.dataset.month = month;
    btn.textContent = month === "all" ? "Anytime" : MONTH_NAMES[Number(month) - 1];
    btn.addEventListener("click", () => {
      activeMonthFilter = month;
      monthFilterEl.querySelectorAll(".month-btn").forEach((b) =>
        b.classList.toggle("active", b.dataset.month === month)
      );
      applyMarkerFilters();
      renderSidebarList();
      updateFiltersBadge();
    });
    return btn;
  });

  monthFilterEl.append(...buttons);
}

/* =====================
   FILTERS MODAL
===================== */

function updateFiltersBadge() {
  if (!filtersBadge || !filtersToggleBtn) return;

  let count = 0;
  if (activeCategory !== "all") count++;
  if (activeYearFilter !== "all") count++;
  if (activeMonthFilter !== "all") count++;

  filtersBadge.textContent = String(count);
  filtersBadge.hidden = count === 0;
  filtersToggleBtn.classList.toggle("has-active", count > 0);
}

function openFiltersModal() {
  filtersModal?.classList.add("active");
  filtersBackdrop?.classList.add("active");
}

function closeFiltersModal() {
  filtersModal?.classList.remove("active");
  filtersBackdrop?.classList.remove("active");
}

filtersToggleBtn?.addEventListener("click", openFiltersModal);
filtersModalClose?.addEventListener("click", closeFiltersModal);
filtersBackdrop?.addEventListener("click", closeFiltersModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && filtersModal?.classList.contains("active")) {
    closeFiltersModal();
  }
});

filtersClearBtn?.addEventListener("click", () => {
  activeYearFilter = "all";
  activeMonthFilter = "all";

  yearFilterEl?.querySelectorAll(".year-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.year === "all")
  );
  monthFilterEl?.querySelectorAll(".month-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.month === "all")
  );

  setActiveTab("all");
});

/* =====================
   INIT
===================== */

loadMarkers();
loadRoutes();
// Travel paths are lazy-loaded on first Trips toggle click (see tripsToggleBtn handler).
// Tapping the map (not on a trip path) dismisses any pinned trip overlay.
map.on("click", function () { if (closeTripOverlay) closeTripOverlay(); });
initYearFilter();
initMonthFilter();
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
