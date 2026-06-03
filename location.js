import locations from "./locations-data.js";
import galleryManifest from "./gallery-manifest.js";
import { initCarousel } from "./js/carousel.js";
import journals from "./journals/index.js";
import { initMenu } from "./js/menu.js";
import { escapeHtml, IMAGE_FALLBACK, loadMarkdown, markdownToHtml, setPageMeta } from "./js/utils.js";
import hikeStats, { computeWeightedScore, getDifficultyLabel } from "./hike-stats-data.js";

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

  const subtitleEl = document.getElementById("location-subtitle");
  if (subtitleEl) {
    const parts = [selectedLocation.region, selectedLocation.country].filter(Boolean);
    subtitleEl.textContent = parts.join(" - ");
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
    meta.textContent = [loc.region, loc.country].filter(Boolean).join(" - ");

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
