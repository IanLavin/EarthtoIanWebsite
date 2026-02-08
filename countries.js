import locations from "./locations-data.js";
import { countryName } from "./country-names.js";

const listEl = document.getElementById("countries-list");
const allLocations = Object.values(locations).flat();

const byCountry = new Map();
allLocations.forEach((location) => {
  if (!location.country) return;
  const entry = byCountry.get(location.country) ?? { total: 0 };
  entry.total += 1;
  byCountry.set(location.country, entry);
});

const countries = Array.from(byCountry.entries())
  .map(([country, meta]) => ({ country, total: meta.total }))
  .sort((a, b) => countryName(a.country).localeCompare(countryName(b.country)));

if (!countries.length) {
  const li = document.createElement("li");
  li.textContent = "No countries found.";
  listEl.appendChild(li);
} else {
  countries.forEach(({ country, total }) => {
    const li = document.createElement("li");
    li.className = "countries-item";

    const link = document.createElement("a");
    link.href = `country.html?country=${country}`;

    const name = document.createElement("span");
    name.className = "countries-name";
    name.textContent = countryName(country);

    const count = document.createElement("span");
    count.className = "countries-count";
    count.textContent = String(total);

    link.appendChild(name);
    link.appendChild(count);
    li.appendChild(link);
    listEl.appendChild(li);
  });
}
