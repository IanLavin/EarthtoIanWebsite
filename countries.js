import locations from "./locations-data.js";

const listEl = document.getElementById("countries-list");

const allLocations = Object.values(locations).flat();

const byCountry = new Map();
allLocations.forEach((loc) => {
  if (!loc.country) return;
  const entry = byCountry.get(loc.country) ?? { total: 0 };
  entry.total += 1;
  byCountry.set(loc.country, entry);
});

const countries = Array.from(byCountry.entries())
  .map(([country, meta]) => ({ country, total: meta.total }))
  .sort((a, b) => a.country.localeCompare(b.country));

if (!countries.length) {
  const li = document.createElement("li");
  li.textContent = "No countries found.";
  listEl.appendChild(li);
} else {
  countries.forEach(({ country, total }) => {
    const li = document.createElement("li");
    li.className = "countries-item";
    li.innerHTML = `
      <a href="country.html?country=${country}">
        <span class="countries-name">${country}</span>
        <span class="countries-count">${total}</span>
      </a>
    `;
    listEl.appendChild(li);
  });
}
