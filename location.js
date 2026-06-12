import locations from "./locations-data.js";
import galleryManifest from "./gallery-manifest.js";
import { initCarousel } from "./js/carousel.js";
import journals from "./journals/index.js";
import { initMenu } from "./js/menu.js";
import { escapeHtml, IMAGE_FALLBACK, loadMarkdown, markdownToHtml, setPageMeta } from "./js/utils.js";
import { countryName, createFlagIcon } from "./country-names.js";
import hikeStats, { computeWeightedScore, getDifficultyLabel } from "./hike-stats-data.js";
import nationalParksData from "./national-parks-data.js";

const parkRatingByLocationId = Object.fromEntries(
  nationalParksData
    .filter((p) => p.locationId && p.rating != null)
    .map((p) => [p.locationId, p.rating])
);

const MAX_RELATED = 6;

async function main() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const selectedLocation = Object.values(locations)
    .flat()
    .find((loc) => loc.id === id);

  if (!selectedLocation) {
    document.body.innerHTML = "<h1>Location not found</h1>";
    throw new Error("Invalid location ID");
  }

  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "image";
  preload.href = selectedLocation.img;
  document.head.appendChild(preload);

  document.getElementById("location-title").textContent = selectedLocation.name;
  setPageMeta({
    title: selectedLocation.name,
    description: `Explore Ian's adventure at ${selectedLocation.name} — photos, trip details, and travel notes.`,
    image: selectedLocation.img,
  });

  const breadcrumbCountryLink = document.getElementById("breadcrumb-country-link");
  if (breadcrumbCountryLink) {
    if (selectedLocation.country) {
      breadcrumbCountryLink.href = `country.html?country=${selectedLocation.country}`;
      breadcrumbCountryLink.textContent = countryName(selectedLocation.country);
    } else {
      breadcrumbCountryLink.closest("li").remove();
    }
  }
  document.getElementById("breadcrumb-location-name").textContent = selectedLocation.name;

  const subtitleEl = document.getElementById("location-subtitle");
  if (subtitleEl) {
    const parts = [selectedLocation.region, selectedLocation.country].filter(Boolean);
    subtitleEl.textContent = "";
    const flag = createFlagIcon(selectedLocation.country, "location-subtitle-flag");
    if (flag) subtitleEl.appendChild(flag);
    subtitleEl.appendChild(document.createTextNode(parts.join(" - ")));
  }

  const dateVisitedEl = document.getElementById("location-date-visited");
  if (dateVisitedEl && selectedLocation.dateVisited) {
    const formatted = formatVisitDate(selectedLocation.dateVisited);
    const relative = relativeTime(selectedLocation.dateVisited);
    dateVisitedEl.textContent = `First visited ${formatted} · ${relative}`;
    dateVisitedEl.style.display = "";
  }

  const parkRatingEl = document.getElementById("location-park-rating");
  const parkRating = parkRatingByLocationId[selectedLocation.id];
  if (parkRatingEl && parkRating != null) {
    parkRatingEl.textContent = `Personal Rating: ${parkRating} / 10`;
    parkRatingEl.style.display = "";
  }

  const heroImg = document.getElementById("hero-image");
  heroImg.src = selectedLocation.img;
  heroImg.alt = selectedLocation.name;
  heroImg.onerror = () => (heroImg.src = IMAGE_FALLBACK);

  await renderMarkdownSection({
    el: document.getElementById("description"),
    mdPath: selectedLocation.descriptionMd,
    fallbackHtml: "<p>More details coming soon.</p>",
  });

  const logisticsEl = document.getElementById("logistics");
  if (selectedLocation.logisticsMd) {
    await renderMarkdownSection({
      el: logisticsEl,
      mdPath: selectedLocation.logisticsMd,
      fallbackHtml: "<p>No logistics added yet.</p>",
    });
  } else if (Array.isArray(selectedLocation.itinerary) && selectedLocation.itinerary.length) {
    logisticsEl.innerHTML = `<ul>${selectedLocation.itinerary
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ul>`;
  } else {
    logisticsEl.innerHTML = "<p>No logistics added yet.</p>";
  }

  const notesSection = document.querySelector(".location-notes");
  const notesEl = document.getElementById("notes-container");
  if (selectedLocation.notesMd) {
    await renderMarkdownSection({
      el: notesEl,
      mdPath: selectedLocation.notesMd,
      fallbackHtml: "<p>No notes yet.</p>",
    });
  } else {
    notesSection?.remove();
  }

  renderRelatedLocations(selectedLocation);

  const journalSection = document.querySelector(".location-journal");
  const journal = journals?.[selectedLocation.id];
  if (selectedLocation.category !== "mountain" || !journal) {
    journalSection?.remove();
  } else {
    journalSection.querySelector("h2").textContent = journal.title ?? "Journal";
    document.getElementById("journal-container").innerHTML = `
      <div class="journal-meta">
        <span class="journal-date">${escapeHtml(journal.date ?? "")}</span>
      </div>
      <article class="journal-entry">
        ${journal.content ?? ""}
      </article>
    `;
  }

  const videoSection = document.querySelector(".location-video");
  const videoContainer = document.getElementById("video-container");
  const video = selectedLocation.video;

  if (!video || !videoContainer) {
    videoSection?.remove();
  } else if (video.provider === "vimeo" && video.id) {
    const title = escapeHtml(video.title ?? selectedLocation.name);
    const hash = video.hash ? `?h=${encodeURIComponent(video.hash)}` : "";
    const aspectClass = getVideoAspectClass(video);
    videoContainer.innerHTML = `
      <div class="video-embed ${aspectClass}">
        <iframe
          src="https://player.vimeo.com/video/${encodeURIComponent(video.id)}${hash}"
          title="${title}"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    `;
  } else if (video.provider === "youtube" && video.id) {
    const title = escapeHtml(video.title ?? selectedLocation.name);
    const aspectClass = getVideoAspectClass(video);
    videoContainer.innerHTML = `
      <div class="video-embed ${aspectClass}">
        <iframe
          src="https://www.youtube.com/embed/${encodeURIComponent(video.id)}"
          title="${title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
    `;
  } else {
    videoSection?.remove();
  }

  const gallery = getGalleryForLocation(selectedLocation);

  if (gallery.length) {
    initCarousel("location-carousel", gallery, { altText: selectedLocation.name });
  }

  renderHikeStats(selectedLocation.id);
  renderElevationProfile(selectedLocation);
  initShareButton(selectedLocation.name);
  initMiniNav();
  initBackToTop();
  initMenu();
}

main();

async function renderMarkdownSection({ el, mdPath, fallbackHtml }) {
  if (!el) return;

  if (!mdPath) {
    el.innerHTML = fallbackHtml ?? "";
    return;
  }

  try {
    const md = await loadMarkdown(mdPath);
    el.innerHTML = markdownToHtml(md);
    el.classList.add("markdown");
  } catch (err) {
    console.warn("Markdown load failed:", mdPath, err);
    el.innerHTML = fallbackHtml ?? "";
  }
}

function getGalleryForLocation(location) {
  if (Array.isArray(location.gallery) && location.gallery.length) {
    return location.gallery;
  }

  if (location.galleryDir) {
    const normalizedDir = location.galleryDir.replace(/\/+$/, "");
    const fromManifest = galleryManifest[normalizedDir];
    if (Array.isArray(fromManifest) && fromManifest.length) {
      return fromManifest;
    }
  }

  return location.img ? [location.img] : [];
}

const DIFFICULTY_COLORS = {
  "Very Easy": "#66bb6a",
  Easy: "#4caf50",
  Moderate: "#8bc34a",
  Hard: "#ff9800",
  "Very Hard": "#ff5722",
  Extreme: "#e53935",
};

function buildStatsCard(stats) {
  const score = computeWeightedScore(stats);
  const label = getDifficultyLabel(score);
  const scoreOutOf10 = ((score / 6.5) * 10).toFixed(1);
  const color = DIFFICULTY_COLORS[label] ?? "#4aa3ff";

  const bar = (value) => `
    <div class="stats-bar-track">
      <div class="stats-bar-fill" style="width:${value * 10}%; background:${color}"></div>
    </div>`;

  const row = (rowLabel, value) => `
    <div class="stats-bar-row">
      <span class="stats-bar-label">${rowLabel}</span>
      ${bar(value)}
      <span class="stats-bar-value">${value} / 10</span>
    </div>`;

  const enjoymentStars = Math.round(stats.enjoyment / 2);
  const stars = "★".repeat(enjoymentStars) + "☆".repeat(5 - enjoymentStars);

  return `
    <div class="stats-card">
      <div class="stats-header">
        <span class="stats-trail-name">${escapeHtml(stats.hike)}</span>
        <span class="stats-difficulty-badge" style="background:${color}22; color:${color}; border-color:${color}55">${label}</span>
      </div>
      <div class="stats-bars">
        ${row("Length", stats.length)}
        ${row("Elevation Gain", stats.elevationGain)}
        ${row("Technicality", stats.technicality)}
        ${row("External Factors", stats.externalFactors)}
        <div class="stats-divider"></div>
        ${row("Overall Score", parseFloat(scoreOutOf10))}
      </div>
      <div class="stats-enjoyment">
        <span class="stats-bar-label">Enjoyment</span>
        <span class="stats-stars">${stars}</span>
        <span class="stats-bar-value">${stats.enjoyment} / 10</span>
      </div>
    </div>`;
}

function renderHikeStats(locationId) {
  const rawData = hikeStats[locationId];
  const section = document.getElementById("hike-stats");
  const container = document.getElementById("hike-stats-container");
  if (!rawData || !section || !container) return;

  const statsList = Array.isArray(rawData) ? rawData : [rawData];
  container.innerHTML = statsList.map(buildStatsCard).join("");
  container.classList.toggle("stats-multi", statsList.length > 1);
  section.style.display = "";
}

function formatVisitDate(dateStr) {
  const parts = dateStr.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  if (!month) return String(year);
  return new Date(year, month - 1, 1).toLocaleString("en-US", { month: "long" }) + ` ${year}`;
}

function relativeTime(dateStr) {
  const parts = dateStr.split("-").map(Number);
  const visited = new Date(parts[0], (parts[1] ?? 7) - 1, parts[2] ?? 15);
  const diffDays = Math.floor((Date.now() - visited.getTime()) / 86400000);
  if (diffDays < 1) return "today";
  if (diffDays < 60) return `${diffDays} days ago`;
  const months = Math.round(diffDays / 30.44);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (remMonths >= 6) return `${years}½ years ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

function getVideoAspectClass(video) {
  return video?.aspect === "landscape" ? "landscape" : "portrait";
}

function initMiniNav() {
  const nav = document.getElementById("location-mini-nav");
  if (!nav) return;

  const links = Array.from(nav.querySelectorAll("a[href^=\"#\"]"));
  links.forEach((link) => {
    const targetId = link.getAttribute("href")?.slice(1);
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (!target) {
      link.remove();
      return;
    }

    const isVisible = target.offsetParent !== null;
    if (!isVisible) link.remove();
  });

  if (!nav.querySelector("a")) nav.remove();
}

let elevationProfileData = null;
let elevationUnit = localStorage.getItem("elevationUnit") || "imperial";

function computeElevationProfile(coords) {
  const MAX_PTS = 400;
  const step = Math.ceil(coords.length / MAX_PTS);
  const sampled = coords.filter((_, i) => i % step === 0);
  if (sampled[sampled.length - 1] !== coords[coords.length - 1]) {
    sampled.push(coords[coords.length - 1]);
  }

  const pts = [];
  let cumDist = 0;
  for (let i = 0; i < sampled.length; i++) {
    if (i > 0) {
      const [lng1, lat1] = sampled[i - 1];
      const [lng2, lat2] = sampled[i];
      cumDist += haversineMeters(lat1, lng1, lat2, lng2);
    }
    pts.push({ dist: cumDist, ele: sampled[i][2] });
  }

  const elevations = pts.map((p) => p.ele);
  const minEle = Math.min(...elevations);
  const maxEle = Math.max(...elevations);
  const totalDist = pts[pts.length - 1].dist;
  let gain = 0, loss = 0;
  for (let i = 1; i < pts.length; i++) {
    const diff = pts[i].ele - pts[i - 1].ele;
    if (diff > 0) gain += diff; else loss -= diff;
  }

  return { pts, minEle, maxEle, totalDist, gain, loss };
}

async function renderElevationProfile(location) {
  if (!location.routeGeoJson) return;
  const section = document.getElementById("elevation-profile");
  if (!section) return;

  try {
    const res = await fetch(location.routeGeoJson);
    if (!res.ok) return;
    const geojson = await res.json();

    const features = geojson.type === "FeatureCollection" ? geojson.features : [geojson];
    const routes = features
      .filter((feature) => feature.geometry?.type === "LineString" && feature.geometry.coordinates?.[0]?.length >= 3)
      .map((feature, i) => ({
        name: feature.properties?.name || `Route ${i + 1}`,
        profile: computeElevationProfile(feature.geometry.coordinates),
      }));

    if (!routes.length) return;

    section.style.display = "";

    const selectWrap = document.getElementById("elevation-route-select-wrap");
    const select = document.getElementById("elevation-route-select");
    if (routes.length > 1) {
      selectWrap.hidden = false;
      select.innerHTML = routes
        .map((route, i) => `<option value="${i}">${escapeHtml(route.name)}</option>`)
        .join("");
      select.addEventListener("change", () => {
        elevationProfileData = routes[select.value].profile;
        renderElevationDisplay();
      });
    } else {
      selectWrap.hidden = true;
    }

    elevationProfileData = routes[0].profile;
    renderElevationDisplay();

    Array.from(document.querySelectorAll(".unit-btn")).forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.unit === elevationUnit);
      btn.addEventListener("click", () => {
        elevationUnit = btn.dataset.unit;
        localStorage.setItem("elevationUnit", elevationUnit);
        document.querySelectorAll(".unit-btn").forEach((b) =>
          b.classList.toggle("active", b.dataset.unit === elevationUnit)
        );
        renderElevationDisplay();
      });
    });
  } catch (err) {
    console.warn("Elevation profile failed:", err);
  }
}

function renderElevationDisplay() {
  if (!elevationProfileData) return;
  const { pts, minEle, maxEle, totalDist, gain, loss } = elevationProfileData;
  const imperial = elevationUnit === "imperial";

  const toEle = (m) => imperial ? m * 3.28084 : m;
  const toDist = (m) => imperial ? m / 1609.344 : m / 1000;
  const eleUnit = imperial ? "ft" : "m";
  const distUnit = imperial ? "mi" : "km";
  const fmtE = (m) => Math.round(toEle(m)).toLocaleString();
  const fmtD = (m) => toDist(m).toFixed(1);

  document.getElementById("elevation-stats").innerHTML = `
    <span class="elev-stat">↑ ${fmtE(gain)} ${eleUnit} gain</span>
    <span class="elev-stat">↓ ${fmtE(loss)} ${eleUnit} loss</span>
    <span class="elev-stat">↔ ${fmtD(totalDist)} ${distUnit}</span>
    <span class="elev-stat">⬍ ${fmtE(minEle)}–${fmtE(maxEle)} ${eleUnit}</span>
  `;
  document.getElementById("elevation-svg-container").innerHTML =
    buildElevationSvg(pts, minEle, maxEle, totalDist, imperial);
}

function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;
  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildElevationSvg(pts, minEle, maxEle, totalDist, imperial = false) {
  const W = 800, H = 160;
  const PAD = { top: 10, right: 10, bottom: 28, left: 58 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const eleRange = maxEle - minEle || 1;

  const x = (d) => PAD.left + (d / totalDist) * cW;
  const y = (e) => PAD.top + (1 - (e - minEle) / eleRange) * cH;
  const baseY = PAD.top + cH;

  const coordStr = pts.map((p) => `${x(p.dist).toFixed(1)},${y(p.ele).toFixed(1)}`).join(" ");
  const areaPath = `M ${x(0).toFixed(1)},${baseY} L ${coordStr.replace(/ /g, " L ")} L ${x(totalDist).toFixed(1)},${baseY} Z`;

  const toEle = (m) => imperial ? m * 3.28084 : m;
  const toDist = (m) => imperial ? m / 1609.344 : m / 1000;
  const eleUnit = imperial ? "ft" : "m";
  const distUnit = imperial ? "mi" : "km";

  // Y-axis grid + labels (4 levels)
  const yLines = [0, 1, 2, 3].map((i) => {
    const ele = minEle + (eleRange * i) / 3;
    const yp = y(ele).toFixed(1);
    const label = `${Math.round(toEle(ele)).toLocaleString()}${eleUnit}`;
    return `
      <line x1="${PAD.left}" y1="${yp}" x2="${W - PAD.right}" y2="${yp}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>
      <text x="${PAD.left - 6}" y="${(parseFloat(yp) + 4).toFixed(1)}" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="11">${label}</text>`;
  }).join("");

  // X-axis labels
  const xLabels = [0, 0.5, 1].map((t) => {
    const dist = totalDist * t;
    const xp = x(dist).toFixed(1);
    const anchor = t === 0 ? "start" : t === 1 ? "end" : "middle";
    return `<text x="${xp}" y="${H - 5}" text-anchor="${anchor}" fill="rgba(255,255,255,0.4)" font-size="11">${toDist(dist).toFixed(1)} ${distUnit}</text>`;
  }).join("");

  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block" aria-label="Elevation profile">
  <defs>
    <linearGradient id="elev-fill-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4aa3ff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#4aa3ff" stop-opacity="0.03"/>
    </linearGradient>
  </defs>
  ${yLines}
  <path d="${areaPath}" fill="url(#elev-fill-grad)"/>
  <polyline points="${coordStr}" fill="none" stroke="#4aa3ff" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
  ${xLabels}
</svg>`;
}

function initShareButton(locationName) {
  const btn = document.getElementById("share-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const url = window.location.href;
    const title = `${locationName} — Earth to Ian`;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // user cancelled — no action needed
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }

    const original = btn.textContent;
    btn.textContent = "Copied!";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
    }, 2000);
  });
}

function initBackToTop() {
  const button = document.getElementById("back-to-top");
  if (!button) return;

  const toggle = () => {
    button.classList.toggle("show", window.scrollY > 500);
  };

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

function renderRelatedLocations(currentLocation) {
  const section = document.querySelector(".location-related");
  const listEl = document.getElementById("related-locations");
  if (!section || !listEl) return;

  const all = Object.values(locations).flat();
  const related = all
    .filter((loc) => loc.id !== currentLocation.id)
    .map((loc) => ({ loc, score: scoreRelatedLocation(currentLocation, loc) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.loc.name.localeCompare(b.loc.name);
    })
    .slice(0, MAX_RELATED)
    .map((entry) => entry.loc);

  if (!related.length) {
    section.remove();
    return;
  }

  listEl.innerHTML = "";
  related.forEach((loc) => {
    const item = document.createElement("li");
    item.className = "related-location-item";

    const link = document.createElement("a");
    link.href = `location.html?id=${encodeURIComponent(loc.id)}`;
    link.textContent = loc.name;

    const meta = document.createElement("span");
    meta.className = "related-location-meta";
    const flag = createFlagIcon(loc.country, "related-location-flag");
    if (flag) meta.appendChild(flag);
    meta.appendChild(document.createTextNode([loc.region, loc.country].filter(Boolean).join(" - ")));

    item.appendChild(link);
    item.appendChild(meta);
    listEl.appendChild(item);
  });
}

function scoreRelatedLocation(currentLocation, candidate) {
  let score = 0;

  if (currentLocation.region && candidate.region && currentLocation.region === candidate.region) {
    score += 4;
  }

  if (currentLocation.country && candidate.country && currentLocation.country === candidate.country) {
    score += 3;
  }

  if (currentLocation.category && candidate.category && currentLocation.category === candidate.category) {
    score += 2;
  }

  return score;
}
