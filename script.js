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
var sidebar = document.getElementById("sidebar");
var locationList = document.getElementById("places");

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
                    <a href="${place.url}" target="_blank">Learn more</a>`);

            marker.on('click', function() {
                updateSidebar(place);
            });

            markers[category].push(marker);
        });
    });
}

// Function to update sidebar with location details
function updateSidebar(place) {
    sidebar.innerHTML = `
        <h2>${place.name}</h2>
        <img src="${place.img}" alt="${place.name}" width="100%">
        <p><a href="${place.url}" target="_blank">Learn more</a></p>
    `;
}

// Function to toggle markers on the map
function toggleMarkers(category, checked) {
    markers[category].forEach(marker => checked ? marker.addTo(map) : map.removeLayer(marker));
    updateLocationList(); // Update the list when toggling
}

// Function to update location list in the sidebar
function updateLocationList(filteredLocations = null) {
    locationList.innerHTML = ""; // Clear existing list

    Object.keys(checkboxes).forEach(category => {
        if (checkboxes[category].checked) {
            const categoryHeader = document.createElement("h4");
            categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            locationList.appendChild(categoryHeader);
            
            const ul = document.createElement("ul");

            const locationsToDisplay = filteredLocations && filteredLocations[category] ? filteredLocations[category] : locations[category];

            locationsToDisplay.forEach(place => {
                var listItem = document.createElement("li");
                listItem.textContent = place.name;
                listItem.classList.add("location-item");
                listItem.addEventListener("click", function() {
                    map.setView([place.lat, place.lng], 10); // Zoom into selected location
                });
                ul.appendChild(listItem);
            });
            locationList.appendChild(ul);
        }
    });
}

// Add event listeners to checkboxes dynamically
Object.keys(checkboxes).forEach(category => {
    checkboxes[category].addEventListener("change", function() {
        toggleMarkers(category, checkboxes[category].checked);
    });
});

// Add event listener to search box for real-time search
var searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", function() {
    const searchTerm = searchBox.value.toLowerCase();
    filterLocations(searchTerm);
});

// Function to filter locations by search term
function filterLocations(searchTerm) {
    const filteredLocations = {};

    Object.keys(locations).forEach(category => {
        filteredLocations[category] = locations[category].filter(place =>
            place.name.toLowerCase().includes(searchTerm)
        );
    });

    updateLocationList(filteredLocations);
}

// Load markers initially
loadMarkers();

// Set initial checkbox state
Object.keys(checkboxes).forEach(category => toggleMarkers(category, checkboxes[category].checked));

// Initialize the location list on page load
updateLocationList();
