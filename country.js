import locations from "./locations-data.js";
import { countryName } from "./country-names.js";

const IMAGE_FALLBACK = "Pictures/Icons/camera-circle.svg";

const params = new URLSearchParams(window.location.search);
const countryCode = params.get("country");

if (!countryCode) {
  document.body.innerHTML = "<h2>Country not found</h2>";
  throw new Error("Missing country param");
}

document.getElementById("country-title").textContent = countryName(countryCode);

const allLocations = Object.values(locations).flat();
const countryLocations = allLocations.filter((loc) => loc.country === countryCode);

if (!countryLocations.length) {
  document.body.innerHTML = "<h2>No locations found for this country</h2>";
  throw new Error("No locations for country");
}

const regions = new Map();
countryLocations.forEach((location) => {
  const region = location.region || "Other";
  if (!regions.has(region)) regions.set(region, []);
  regions.get(region).push(location);
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
      .forEach((location) => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.href = `location.html?id=${location.id}`;
        link.textContent = location.name;
        li.appendChild(link);
        regionList.appendChild(li);
      });

    section.appendChild(regionList);
    container.appendChild(section);
  });

const images = countryLocations.map((location) => location.img).filter(Boolean);
let currentIndex = 0;

const carouselImg = document.getElementById("carousel-image");
carouselImg.src = images[0] ?? IMAGE_FALLBACK;
carouselImg.onerror = () => {
  carouselImg.src = IMAGE_FALLBACK;
};

function renderImage() {
  carouselImg.src = images[currentIndex] ?? IMAGE_FALLBACK;
}

document.querySelector(".carousel-btn.next").onclick = () => {
  if (!images.length) return;
  currentIndex = (currentIndex + 1) % images.length;
  renderImage();
};

document.querySelector(".carousel-btn.prev").onclick = () => {
  if (!images.length) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  renderImage();
};
