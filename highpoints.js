import data from "./highpoints-data.js";
import locations from "./locations-data.js";
import { initMenu } from "./js/menu.js";

const dateByLocationId = Object.fromEntries(
  Object.values(locations).flat()
    .filter((loc) => loc.dateVisited)
    .map((loc) => [loc.id, loc.dateVisited.split("-")[0]])
);

const completedCount = data.filter((d) => d.locationId).length;
const total = data.length;

document.getElementById("tracker-count").textContent = `${completedCount} / ${total} Summited`;
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

function renderGrid() {
  const grid = document.getElementById("tracker-grid");
  const filtered = data.filter((d) => {
    if (activeFilter === "completed") return !!d.locationId;
    if (activeFilter === "remaining") return !d.locationId;
    return true;
  });

  grid.innerHTML = filtered.map((item) => {
    const done = !!item.locationId;
    const inner = `
      <span class="tracker-status">${done ? "✓" : "○"}</span>
      <div class="tracker-info">
        <span class="tracker-state">${item.state}</span>
        <span class="tracker-name">${item.name}</span>
        <span class="tracker-meta">${item.elevation.toLocaleString()} ft${done && dateByLocationId[item.locationId] ? ` · ${dateByLocationId[item.locationId]}` : ""}</span>
      </div>
    `;
    return done
      ? `<a href="location.html?id=${item.locationId}" class="tracker-card completed">${inner}</a>`
      : `<div class="tracker-card remaining">${inner}</div>`;
  }).join("");
}

renderGrid();
initMenu();
