import locations from "./Locations.js";
import { initCarousel } from "./js/carousel.js";


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const location = Object.values(locations)
  .flat()
  .find(loc => loc.id === id);

if (!location) {
  document.body.innerHTML = "<h1>Location not found</h1>";
  throw new Error("Invalid location ID");
}

document.getElementById("location-title").textContent = location.name;
document.getElementById("hero-image").src = location.img;
document.getElementById("description").textContent =
  location.description || "More details coming soon.";

const itineraryEl = document.getElementById("itinerary");
(location.itinerary || []).forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  itineraryEl.appendChild(li);
});

initCarousel("location-carousel", location.gallery);
