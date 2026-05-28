import locations from "./locations-data.js";
import { initMenu } from "./js/menu.js";
import { loadMarkdown, markdownToHtml } from "./js/utils.js";

const ABOUT_CONTENT = {
  who: "descriptions/about/who-i-am.md",
  why: "descriptions/about/why-this-exists.md",
  how: "descriptions/about/how-i-travel.md",
  next: "descriptions/about/whats-next.md",
};

initMenu();
renderStats();
loadAboutContent();

function renderStats() {
  const highpointsCount = locations.mountain?.length ?? 0;
  const parksCount = locations.park?.length ?? 0;
  const allLocations = Object.values(locations).flat();
  const countriesCount = new Set(allLocations.map((loc) => loc.country).filter(Boolean)).size;

  const highpointsEl = document.getElementById("stat-highpoints");
  const parksEl = document.getElementById("stat-parks");
  const countriesEl = document.getElementById("stat-countries");

  if (highpointsEl) highpointsEl.textContent = String(highpointsCount);
  if (parksEl) parksEl.textContent = String(parksCount);
  if (countriesEl) countriesEl.textContent = String(countriesCount);
}

async function loadAboutContent() {
  await Promise.all([
    renderMarkdownSection("about-who", ABOUT_CONTENT.who, "<p>Tell visitors who you are.</p>"),
    renderMarkdownSection("about-why", ABOUT_CONTENT.why, "<p>Explain the purpose of this site.</p>"),
    renderMarkdownSection("about-how", ABOUT_CONTENT.how, "<p>Describe how you plan and travel.</p>"),
    renderMarkdownSection("about-next", ABOUT_CONTENT.next, "<p>Share what is coming next.</p>"),
  ]);
}

async function renderMarkdownSection(elementId, path, fallbackHtml) {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const markdown = await loadMarkdown(path);
    element.innerHTML = markdownToHtml(markdown);
    element.classList.add("markdown");
  } catch (error) {
    console.warn(`Failed to load markdown: ${path}`, error);
    element.innerHTML = fallbackHtml;
  }
}

