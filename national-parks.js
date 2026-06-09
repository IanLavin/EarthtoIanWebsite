import data from "./national-parks-data.js";
import locations from "./locations-data.js";
import { initMenu } from "./js/menu.js";

const dateByLocationId = Object.fromEntries(
  Object.values(locations).flat()
    .filter((loc) => loc.dateVisited)
    .map((loc) => [loc.id, loc.dateVisited.split("-")[0]])
);

const completedCount = data.filter((d) => d.locationId).length;
const total = data.length;

document.getElementById("tracker-count").textContent = `${completedCount} / ${total} US Parks Visited`;
document.getElementById("tracker-progress-fill").style.width = `${(completedCount / total) * 100}%`;

let activeFilter = "all";

const filterBtns = Array.from(document.querySelectorAll(".filter-btn"));
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    filterBtns.forEach((b) => b.classList.toggle("active", b.dataset.filter === activeFilter));
    renderGrid();
  });
});

function scoreColor(rating) {
  if (rating >= 9) return "#4caf50";
  if (rating >= 7) return "#8bc34a";
  if (rating >= 5) return "#ff9800";
  return "#f44336";
}

function renderGrid() {
  const grid = document.getElementById("tracker-grid");

  if (activeFilter === "rankings") {
    grid.className = "park-rankings";
    const ranked = data
      .filter((d) => d.locationId && d.rank != null)
      .sort((a, b) => a.rank - b.rank);

    grid.innerHTML = ranked.map((item) => {
      const color = scoreColor(item.rating);
      const year = dateByLocationId[item.locationId] ? ` · ${dateByLocationId[item.locationId]}` : "";
      return `
        <a href="location.html?id=${item.locationId}" class="rank-item">
          <span class="rank-num${item.rank <= 3 ? ` rank-top-${item.rank}` : ""}">#${item.rank}</span>
          <div class="rank-info">
            <span class="rank-name">${item.name}</span>
            <span class="rank-meta">${item.state}${year}</span>
          </div>
          <div class="rank-score" style="color:${color}; border-color:${color}40; background:${color}14">
            <span class="rank-score-val">${item.rating}</span>
            <span class="rank-score-denom">/10</span>
          </div>
        </a>`;
    }).join("");
    return;
  }

  grid.className = "tracker-grid";
  const filtered = data.filter((d) => {
    if (activeFilter === "completed") return !!d.locationId;
    if (activeFilter === "remaining") return !d.locationId;
    return true;
  });

  grid.innerHTML = filtered.map((item) => {
    const done = !!item.locationId;
    const year = done && dateByLocationId[item.locationId] ? ` · ${dateByLocationId[item.locationId]}` : "";
    const ratingChip = done && item.rating != null
      ? `<span class="tracker-rating" style="color:${scoreColor(item.rating)}">${item.rating}/10</span>`
      : "";
    const inner = `
      <span class="tracker-status">${done ? "✓" : "○"}</span>
      <div class="tracker-info">
        <span class="tracker-name">${item.name}</span>
        <span class="tracker-meta">${item.state}${year}</span>
        ${ratingChip}
      </div>
    `;
    return done
      ? `<a href="location.html?id=${item.locationId}" class="tracker-card completed">${inner}</a>`
      : `<div class="tracker-card remaining">${inner}</div>`;
  }).join("");
}

renderGrid();
initMenu();
