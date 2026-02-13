import locations from "./locations-data.js";
import { initMenu } from "./js/menu.js";

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

async function loadMarkdown(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load markdown: ${path}`);
  return response.text();
}

function markdownToHtml(markdown) {
  let html = markdown
    .replace(/\r\n/g, "\n")
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");
  html = html.replace(/(?:<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  return html
    .split("\n\n")
    .map((block) => {
      const text = block.trim();
      if (!text) return "";
      if (text.startsWith("<h") || text.startsWith("<ul")) return text;
      return `<p>${text.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");
}
