import locations from "./locations-data.js";
import standaloneRoutes from "./routes-data.js";
import { initMenu } from "./js/menu.js";
import { haversineMeters, loadMarkdown, markdownToHtml } from "./js/utils.js";

const ABOUT_CONTENT = {
  who: "descriptions/about/who-i-am.md",
  why: "descriptions/about/why-this-exists.md",
  how: "descriptions/about/how-i-travel.md",
  next: "descriptions/about/whats-next.md",
};

initMenu();
renderStats();
renderRouteStats();
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

async function renderRouteStats() {
  const milesEl = document.getElementById("stat-miles");
  const gainEl = document.getElementById("stat-elevation-gain");
  if (!milesEl && !gainEl) return;

  const allLocations = Object.values(locations).flat();
  const files = new Set([
    ...allLocations.map((loc) => loc.routeGeoJson).filter(Boolean),
    ...standaloneRoutes.map((route) => route.file),
  ]);

  const results = await Promise.all(
    Array.from(files).map(async (file) => {
      try {
        const res = await fetch(file);
        if (!res.ok) return { distance: 0, gain: 0 };
        const geojson = await res.json();
        const features = geojson.type === "FeatureCollection" ? geojson.features : [geojson];

        let distance = 0;
        let gain = 0;
        for (const feature of features) {
          const coords = feature.geometry?.coordinates;
          if (feature.geometry?.type !== "LineString" || !coords?.[0] || coords[0].length < 3) continue;

          for (let i = 1; i < coords.length; i++) {
            const [lng1, lat1, ele1] = coords[i - 1];
            const [lng2, lat2, ele2] = coords[i];
            distance += haversineMeters(lat1, lng1, lat2, lng2);
            if (ele2 > ele1) gain += ele2 - ele1;
          }
        }
        return { distance, gain };
      } catch (err) {
        console.warn(`Failed to load route: ${file}`, err);
        return { distance: 0, gain: 0 };
      }
    })
  );

  const totalDistanceMeters = results.reduce((sum, r) => sum + r.distance, 0);
  const totalGainMeters = results.reduce((sum, r) => sum + r.gain, 0);

  const totalMiles = totalDistanceMeters / 1609.344;
  const totalGainFeet = totalGainMeters * 3.28084;

  if (milesEl) milesEl.textContent = `${Math.round(totalMiles).toLocaleString()} mi`;
  if (gainEl) gainEl.textContent = `${Math.round(totalGainFeet).toLocaleString()} ft`;
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

