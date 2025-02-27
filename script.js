import locations from './Locations.js';
import icons from './icons.js';

// Default map center (USA)
var defaultLocation = [37.0902, -95.7129];

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
    adventure: document.getElementById("adventures-list")
};

// Checkboxes for toggling
var checkboxes = {
    park: document.getElementById("toggleParks"),
    mountain: document.getElementById("toggleHighpoints"),
    adventure: document.getElementById("toggleAdventures")
};

// Marker layers
var markers = { park: [], mountain: [], adventure: [] };

// Function to create and load markers dynamically
function loadMarkers() {
    Object.keys(locations).forEach(category => {
        locations[category].forEach(place => {
            var marker = L.marker([place.lat, place.lng], { icon: icons[category] })
                .bindPopup(`<b>${place.name}</b><br>
                    <img src="${place.img}" alt="${place.name}" width="200" onerror="this.onerror=null; this.src='fallback.jpg';"><br>
                    <i>${place.type}</i><br>`);
            
            marker.addTo(map);
            markers[category].push(marker);

            // Add to corresponding list
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

// Toggle visibility based on checkboxes
function toggleLocations() {
    Object.keys(markers).forEach(category => {
        markers[category].forEach(marker => {
            if (checkboxes[category].checked) {
                marker.addTo(map);
            } else {
                map.removeLayer(marker);
            }
        });
    });
}

// Search filter logic
document.getElementById('searchBox').addEventListener('input', function(event) {
    var searchTerm = event.target.value.toLowerCase();
    
    Object.keys(locationList).forEach(category => {
        var items = locationList[category].getElementsByTagName('li');
        Array.from(items).forEach(item => {
            var text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });
});

// Initialize everything
loadMarkers();
toggleLocations();

// Listen for checkbox changes
Object.keys(checkboxes).forEach(category => {
    checkboxes[category].addEventListener('change', toggleLocations);
});

// Function to get a random location and display it
function showRandomLocation() {
    const allLocations = [];

    // Collect all locations into an array
    Object.keys(locations).forEach(category => {
        locations[category].forEach(place => {
            allLocations.push(place);
        });
    });

    // Pick a random location
    const randomIndex = Math.floor(Math.random() * allLocations.length);
    const randomLocation = allLocations[randomIndex];

    // Update the random location section with the location's name and image
    const randomLocationName = document.getElementById("random-location-name");
    const randomLocationImg = document.getElementById("random-location-img");

    randomLocationName.textContent = randomLocation.name;
    randomLocationImg.src = randomLocation.img;
}

// Call the function to display a random location every 5 seconds
setInterval(showRandomLocation, 10000); // Change interval (in ms) as needed

// Initialize by showing a random location immediately
showRandomLocation();
