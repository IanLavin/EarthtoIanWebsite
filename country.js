import locations from "./locations-data.js";
import { countryName, createFlagIcon } from "./country-names.js";
import { initCarousel } from "./js/carousel.js";
import { initMenu } from "./js/menu.js";
import { setPageMeta } from "./js/utils.js";

const params = new URLSearchParams(window.location.search);
const countryCode = params.get("country");

if (!countryCode) {
  document.body.innerHTML = "<h2>Country not found</h2>";
  throw new Error("Missing country param");
}

const name = countryName(countryCode);
const titleEl = document.getElementById("country-title");
titleEl.textContent = "";
const flag = createFlagIcon(countryCode, "country-title-flag");
if (flag) titleEl.appendChild(flag);
titleEl.appendChild(document.createTextNode(name));

document.getElementById("breadcrumb-country-name").textContent = name;

const allLocations = Object.values(locations).flat();
const countryLocations = allLocations.filter((loc) => loc.country === countryCode);

if (!countryLocations.length) {
  document.body.innerHTML = "<h2>No locations found for this country</h2>";
  throw new Error("No locations for country");
}

setPageMeta({
  title: name,
  description: `Explore Ian's adventures in ${name} — national parks, hikes, and travel highlights.`,
  image: countryLocations[0]?.img,
});

/* =====================
   CAROUSEL
===================== */

const images = countryLocations.map((loc) => loc.img).filter(Boolean);
initCarousel("country-carousel", images, { altText: name, random: false });
initMenu();

/* =====================
   LOCATION LIST
===================== */

const regions = new Map();
countryLocations.forEach((loc) => {
  const region = loc.region || "Other";
  if (!regions.has(region)) regions.set(region, []);
  regions.get(region).push(loc);
});

const container = document.getElementById("country-locations");
container.innerHTML = "";

Array.from(regions.keys())
  .sort((a, b) => a.localeCompare(b))
  .forEach((region) => {
    const section = document.createElement("li");

    const heading = document.createElement("h3");
    heading.textContent = region;
    section.appendChild(heading);

    const regionList = document.createElement("ul");
    regions
      .get(region)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((loc) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `location.html?id=${loc.id}`;
        link.textContent = loc.name;
        li.appendChild(link);
        regionList.appendChild(li);
      });

    section.appendChild(regionList);
    container.appendChild(section);
  });
