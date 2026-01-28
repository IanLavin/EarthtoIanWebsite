import locations from "./locations-data.js";
import { initCarousel } from "./js/carousel.js";
import journals from "./journals/index.js";

async function main() {
  // -------------------------
  // Load selected location from URL
  // -------------------------
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const selectedLocation = Object.values(locations)
    .flat()
    .find((loc) => loc.id === id);

  if (!selectedLocation) {
    document.body.innerHTML = "<h1>Location not found</h1>";
    throw new Error("Invalid location ID");
  }

  // -------------------------
  // Basic page content
  // -------------------------
  document.getElementById("location-title").textContent = selectedLocation.name;

  const subtitleEl = document.getElementById("location-subtitle");
  if (subtitleEl) {
    const parts = [selectedLocation.region, selectedLocation.country].filter(Boolean);
    subtitleEl.textContent = parts.join(" • ");
  }

  const heroImg = document.getElementById("hero-image");
  heroImg.src = selectedLocation.img;
  heroImg.alt = selectedLocation.name;
  heroImg.onerror = () => (heroImg.src = "fallback.jpg");

  // -------------------------
  // Overview (markdown)
  // -------------------------
  await renderMarkdownSection({
    el: document.getElementById("description"),
    mdPath: selectedLocation.descriptionMd,
    fallbackHtml: "<p>More details coming soon.</p>",
  });

  // -------------------------
  // Logistics (markdown, with itinerary fallback)
  // -------------------------
  const logisticsEl = document.getElementById("logistics");

  if (selectedLocation.logisticsMd) {
    await renderMarkdownSection({
      el: logisticsEl,
      mdPath: selectedLocation.logisticsMd,
      fallbackHtml: "<p>No logistics added yet.</p>",
    });
  } else if (Array.isArray(selectedLocation.itinerary) && selectedLocation.itinerary.length) {
    // Backward compatible: render old itinerary array as a list inside Logistics
    logisticsEl.innerHTML = `<ul>${selectedLocation.itinerary
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("")}</ul>`;
  } else {
    logisticsEl.innerHTML = "<p>No logistics added yet.</p>";
  }

  // -------------------------
  // Notes (markdown)
  // -------------------------
  const notesSection = document.querySelector(".location-notes");
  const notesEl = document.getElementById("notes-container");

  if (selectedLocation.notesMd) {
    await renderMarkdownSection({
      el: notesEl,
      mdPath: selectedLocation.notesMd,
      fallbackHtml: "<p>No notes yet.</p>",
    });
  } else {
    // If you’d rather always show the Notes section, replace this with:
    // notesEl.innerHTML = "<p>No notes yet.</p>";
    notesSection?.remove();
  }

  // -------------------------
  // Journal logic (mountain + journal must exist)
  // -------------------------
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

  // -------------------------
  // Image carousel
  // -------------------------
  const gallery =
    Array.isArray(selectedLocation.gallery) && selectedLocation.gallery.length
      ? selectedLocation.gallery
      : selectedLocation.img
        ? [selectedLocation.img]
        : [];

  if (gallery.length) {
    initCarousel("location-carousel", gallery);
  }
}

main();

/* =========================
   Markdown helpers
========================= */

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

// Lightweight markdown renderer:
// - headings (#, ##, ###)
// - bold/italics
// - unordered lists (- item)
// - paragraphs
function markdownToHtml(md) {
  let html = md
    .replace(/\r\n/g, "\n")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // unordered lists
  html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(?:<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // paragraphs: split on blank lines
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

// Prevent accidental HTML injection when rendering fallback lists/dates
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
