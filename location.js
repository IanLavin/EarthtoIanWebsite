import locations from "./locations-data.js";
import galleryManifest from "./gallery-manifest.js";
import { initCarousel } from "./js/carousel.js";
import journals from "./journals/index.js";

const IMAGE_FALLBACK = "Pictures/Icons/camera-circle.svg";

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

  document.getElementById("location-title").textContent = selectedLocation.name;

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
    initCarousel("location-carousel", gallery);
  }
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

async function loadMarkdown(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Could not load markdown: ${path}`);
  return await res.text();
}

function markdownToHtml(md) {
  let html = md
    .replace(/\r\n/g, "\n")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(?:<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  html = html
    .split("\n\n")
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (t.startsWith("<h") || t.startsWith("<ul")) return t;
      return `<p>${t.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  return html;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function getVideoAspectClass(video) {
  return video?.aspect === "landscape" ? "landscape" : "portrait";
}
