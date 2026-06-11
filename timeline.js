import locations from "./locations-data.js";
import { escapeHtml, IMAGE_FALLBACK } from "./js/utils.js";
import { initMenu } from "./js/menu.js";

const TRIP_GAP_DAYS = 7;

const PROJECT_START = {
  id: "project-start",
  name: "Earth to Ian Begins",
  dateVisited: "2023-02-17",
  isMilestone: true,
};

// Collect all locations with a dateVisited
const dated = Object.values(locations)
  .flat()
  .filter((loc) => loc.dateVisited)
  .concat(PROJECT_START)
  .map((loc) => ({ ...loc, _date: new Date(loc.dateVisited) }))
  .sort((a, b) => b._date - a._date); // newest first

// Group into trips: consecutive locations within TRIP_GAP_DAYS of each other
function groupIntoTrips(locs) {
  const trips = [];
  let current = [];

  for (const loc of locs) {
    if (!current.length) {
      current.push(loc);
    } else {
      const prev = current[current.length - 1];
      const diffDays = (prev._date - loc._date) / 86400000;
      if (diffDays <= TRIP_GAP_DAYS) {
        current.push(loc);
      } else {
        trips.push(current);
        current = [loc];
      }
    }
  }
  if (current.length) trips.push(current);
  return trips;
}

function formatDate(dateStr) {
  const parts = dateStr.split("-").map(Number);
  const d = new Date(parts[0], (parts[1] ?? 1) - 1, parts[2] ?? 1);
  if (parts.length === 1) return String(parts[0]);
  if (parts.length === 2) return d.toLocaleString("en-US", { month: "long", year: "numeric" });
  return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatTripDateRange(trip) {
  const dates = trip.map((loc) => loc._date);
  const earliest = new Date(Math.min(...dates));
  const latest = new Date(Math.max(...dates));
  if (earliest.toDateString() === latest.toDateString()) {
    return formatDate(trip[0].dateVisited);
  }
  const fmtShort = (d) => d.toLocaleString("en-US", { month: "short", day: "numeric" });
  const year = latest.getFullYear();
  return `${fmtShort(earliest)} – ${fmtShort(latest)}, ${year}`;
}

const trips = groupIntoTrips(dated);

// Group trips by year (of the most recent location in each trip)
const byYear = new Map();
for (const trip of trips) {
  const year = String(trip[0]._date.getFullYear());
  if (!byYear.has(year)) byYear.set(year, []);
  byYear.get(year).push(trip);
}

const container = document.getElementById("timeline-container");

for (const [year, yearTrips] of byYear) {
  const yearSection = document.createElement("section");
  yearSection.className = "timeline-year";

  const yearHeading = document.createElement("h2");
  yearHeading.className = "timeline-year-heading";
  yearHeading.textContent = year;
  yearSection.appendChild(yearHeading);

  for (const trip of yearTrips) {
    const tripEl = document.createElement("div");
    tripEl.className = `timeline-trip${trip.length > 1 ? " timeline-trip--multi" : ""}`;

    const dateRange = formatTripDateRange(trip);
    const header = document.createElement("div");
    header.className = "timeline-trip-header";
    header.innerHTML = `<span class="timeline-trip-date">${escapeHtml(dateRange)}</span>`;
    tripEl.appendChild(header);

    const items = document.createElement("div");
    items.className = "timeline-items";

    for (const loc of trip) {
      if (loc.isMilestone) {
        const item = document.createElement("div");
        item.className = "timeline-item timeline-milestone";

        const icon = document.createElement("div");
        icon.className = "timeline-milestone-icon";

        const info = document.createElement("div");
        info.className = "timeline-item-info";
        info.innerHTML = `
          <span class="timeline-item-name">${escapeHtml(loc.name)}</span>
          <span class="timeline-item-meta">The journey starts here</span>
        `;

        item.appendChild(icon);
        item.appendChild(info);
        items.appendChild(item);
        continue;
      }

      const item = document.createElement("a");
      item.href = `location.html?id=${encodeURIComponent(loc.id)}`;
      item.className = "timeline-item";

      const img = document.createElement("img");
      img.src = loc.img;
      img.alt = loc.name;
      img.loading = "lazy";
      img.onerror = () => { img.src = IMAGE_FALLBACK; };

      const info = document.createElement("div");
      info.className = "timeline-item-info";
      const meta = [loc.region, loc.country].filter(Boolean).join(" · ");
      info.innerHTML = `
        <span class="timeline-item-name">${escapeHtml(loc.name)}</span>
        <span class="timeline-item-meta">${escapeHtml(meta)}</span>
      `;

      item.appendChild(img);
      item.appendChild(info);
      items.appendChild(item);
    }

    tripEl.appendChild(items);
    yearSection.appendChild(tripEl);
  }

  container.appendChild(yearSection);
}

initMenu();
