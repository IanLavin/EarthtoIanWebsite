import locations from "./locations-data.js";
import { initCarousel } from "./js/carousel.js";
import journals from "./journals/index.js";

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

document.getElementById("description").textContent =
  selectedLocation.description || "More details coming soon.";

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
  // No images at all → remove the section
  document.querySelector(".location-carousel-section")?.remove();
}

