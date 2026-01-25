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
    .find(loc => loc.id === id);

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
  // Markdown description (fetch + render)
  // -------------------------
  const descEl = document.getElementById("description");

  // If you switch #description from <p> to <div>, this works great
  // (recommended so headings/lists render properly)
  try {
    if (selectedLocation.descriptionMd) {
      const md = await loadMarkdown(selectedLocation.descriptionMd);
      descEl.innerHTML = markdownToHtml(md);
      descEl.classList.add("markdown");
    } else if (selectedLocation.descriptionHtml) {
      // Optional: if you ever want to store HTML directly
      descEl.innerHTML = selectedLocation.descriptionHtml;
      descEl.classList.add("markdown");
    } else if (selectedLocation.description) {
      // Plain text fallback
      descEl.textContent = selectedLocation.description;
    } else {
      descEl.innerHTML = "<p>More details coming soon.</p>";
    }
  } catch (err) {
    console.warn("Description load failed:", err);
    descEl.innerHTML = "<p>More details coming soon.</p>";
  }

  // -------------------------
  // Itinerary
  // -------------------------
  const itineraryEl = document.getElementById("itinerary");
  if (selectedLocation.itinerary?.length) {
    selectedLocation.itinerary.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      itineraryEl.appendChild(li);
    });
  } else {
    itineraryEl.innerHTML = "<li>No itinerary added yet.</li>";
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
        <span class="journal-date">${journal.date ?? ""}</span>
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
  } else {
    document.querySelector(".location-carousel-section")?.remove();
  }
}

main();

/* =========================
   Markdown helpers
========================= */

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
  html = html.replace(/(?:<li>.*<\/li>\n?)+/g, match => `<ul>${match}</ul>`);

  // paragraphs: split on blank lines
  html = html
    .split("\n\n")
    .map(block => {
      const t = block.trim();
      if (!t) return "";
      if (t.startsWith("<h") || t.startsWith("<ul")) return t;
      return `<p>${t.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  return html;
}
