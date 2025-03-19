import locations from './Locations.js';
import icons from './icons.js';

// Default map center (USA)
var defaultLocation = [37.0902, -95.7129];

// Define the default map view (center and zoom level)
const defaultView = {
    center: [35.8283, -95.5795], // Center of the USA (or your preferred location)
    zoom: 5
};

// Define the default map view (center and zoom level)
const worldView = {
    center: [10.8283, -9.5795], // Center of the USA (or your preferred location)
    zoom: 2
};

// Initialize the map
var map = L.map('map').setView(defaultLocation, 5);

// Load and display the satellite tile layer (Esri)
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics'
}).addTo(map);

// Sidebar reference
var locationList = {
    park: document.getElementById("parks-list"),
    mountain: document.getElementById("highpoints-list"),
    adventure: document.getElementById("adventures-list"),
    sightseeing: document.getElementById("sightseeing-list")
};

// Checkboxes for toggling
var checkboxes = {
    park: document.getElementById("toggleParks"),
    mountain: document.getElementById("toggleHighpoints"),
    adventure: document.getElementById("toggleAdventures"),
    sightseeing: document.getElementById("toggleSightseeing")
};

// Marker layers using LayerGroups
var markerLayers = { 
    park: L.layerGroup().addTo(map), 
    mountain: L.layerGroup().addTo(map), 
    adventure: L.layerGroup().addTo(map), 
    sightseeing: L.layerGroup().addTo(map) 

};

function loadMarkers() {
    Object.keys(locations).forEach(category => {
        locations[category].forEach(place => {
            var marker = L.marker([place.lat, place.lng], { icon: icons[category] })
                .bindPopup(`<b>${place.name}</b><br>
                    <img src="${place.img}" alt="${place.name}" width="200" onerror="this.onerror=null; this.src='fallback.jpg';"><br>
                    <i>${place.type}</i><br>`);

            markerLayers[category].addLayer(marker); // Add marker to LayerGroup

            var listItem = document.createElement('li');
            listItem.textContent = place.name;
            listItem.onclick = function () {
                map.setView([place.lat, place.lng], 12);
                marker.openPopup();
            };
            locationList[category].appendChild(listItem);
        });
    });
}

// Toggle visibility using LayerGroups (more efficient)
function toggleLocations() {
    Object.keys(markerLayers).forEach(category => {
        if (checkboxes[category].checked) {
            map.addLayer(markerLayers[category]);
        } else {
            map.removeLayer(markerLayers[category]);
        }
    });
}

// Add event listener to the home button
document.getElementById("homeButton").addEventListener("click", function () {
    map.setView(defaultView.center, defaultView.zoom);
});

// Add event listener to the home button
document.getElementById("worldButton").addEventListener("click", function () {
    map.setView(worldView.center, worldView.zoom);
});

// Debounced Search filter logic
function debounce(fn, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}

document.getElementById('searchBox').addEventListener('input', debounce(function(event) {
    var searchTerm = event.target.value.toLowerCase();
    
    Object.keys(locationList).forEach(category => {
        var items = locationList[category].getElementsByTagName('li');
        Array.from(items).forEach(item => {
            var text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
}, 300));  // 300ms debounce delay

// Initialize everything
loadMarkers();

document.getElementById("filter-container").addEventListener("change", (event) => {
    if (event.target.type === "checkbox") {
        toggleLocations();
    }
});


// Precompute all locations into a flat array
const allLocations = Object.values(locations).flat();

function showRandomLocation() {
    const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
    
    document.getElementById("random-location-name").textContent = randomLocation.name;
    const imgElement = document.getElementById("random-location-img");
    imgElement.src = randomLocation.img;
    imgElement.onerror = () => { imgElement.src = 'fallback.jpg'; };
}


// Call the function to display a random location every 10 seconds
setInterval(showRandomLocation, 10000);

// Initialize by showing a random location immediately
showRandomLocation();
