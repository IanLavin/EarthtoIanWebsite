import locations from "./Locations.js";

const params = new URLSearchParams(window.location.search);
const countryCode = params.get("country");

if (!countryCode) {
  document.body.innerHTML = "<h2>Country not found</h2>";
  throw new Error("Missing country param");
}

document.getElementById("country-title").textContent = countryCode;

// Flatten locations
const allLocations = Object.values(locations).flat();

// Filter by country
const countryLocations = allLocations.filter(
  loc => loc.country === countryCode
);

if (!countryLocations.length) {
  document.body.innerHTML = "<h2>No locations found for this country</h2>";
  throw new Error("No locations for country");
}

// Populate list
const list = document.getElementById("country-locations");

// ---------- GROUP BY REGION ----------
const regions = {};

countryLocations.forEach(loc => {
  if (!regions[loc.region]) {
    regions[loc.region] = [];
  }
  regions[loc.region].push(loc);
});

const container = document.getElementById("country-locations");
container.innerHTML = "";

// Render regions
Object.keys(regions).forEach(region => {
  const section = document.createElement("li");
  section.innerHTML = `<h3>${region}</h3>`;

  const ul = document.createElement("ul");

  regions[region].forEach(loc => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="location.html?id=${loc.id}">
        ${loc.name}
      </a>
    `;
    ul.appendChild(li);
  });

  section.appendChild(ul);
  container.appendChild(section);
});

// ---------- IMAGE CAROUSEL ----------
const images = countryLocations.map(loc => loc.img);
let currentIndex = 0;

const carouselImg = document.getElementById("carousel-image");
carouselImg.src = images[0];

document.querySelector(".carousel-btn.next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  carouselImg.src = images[currentIndex];
};

document.querySelector(".carousel-btn.prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  carouselImg.src = images[currentIndex];
};

