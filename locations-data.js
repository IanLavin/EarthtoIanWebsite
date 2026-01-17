// locations-data.js

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove punctuation
    .replace(/\s+/g, "-");    // spaces → hyphens
}

function generateId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}


const rawLocations = {
    park: [
        { 
            name: "Yellowstone National Park",
            country: "US",
            region: "Rocky Mountain",
            lat: 44.59, 
            lng: -110.55, 
            url: "https://www.nps.gov/yell/index.htm",
            img: "Pictures/Wyoming/Yellowstone/IMG_2651.jpg",

            // NEW: carousel images
            gallery: [
            "IMG_2521.jpg",
            "IMG_2532.jpg",
            "IMG_2542.jpg",
            "IMG_2561.jpg",
            "IMG_2592.jpg",
            "IMG_2614.jpg",
            "IMG_2651.jpg",
            "IMG_2669.jpg",
            "IMG_2677.jpg",
            "IMG_2704.jpg",
            "IMG_2707.jpg",
            "IMG_2838.jpg"          
            ].map(f => `Pictures/Wyoming/Yellowstone/${f}`)
        },
        { 
            name: "Grand Teton National Park",
            country: "US",
            region: "Rocky Mountain",
            lat: 43.74, 
            lng: -110.8, 
            url: "https://en.wikipedia.org/wiki/Grand_Teton_National_Park",
            img: "Pictures/Wyoming/Grand Teton/IMG_2769.jpg"
        },
        { 
            name: "Crater Lake National Park",
            country: "US",
            region: "West Coast", 
            lat: 42.94, 
            lng: -122.10, 
            url: "https://en.wikipedia.org/wiki/Crater_Lake_National_Park",
            img: "Pictures/Oregon/IMG_5284.jpg"
        },
        { 
            name: "Redwood National Park", 
            country: "US",
            region: "West Coast",
            lat: 41.4, 
            lng: -124.04, 
            url: "https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks",
            img: "Pictures/California/Redwoods/IMG_0033.JPG"
        },
        { 
            name: "Pinnacles National Park", 
            country: "US",
            region: "West Coast",
            lat: 36.49, 
            lng: -121.48, 
            url: "https://en.wikipedia.org/wiki/Pinnacles_National_Park",
            img: "Pictures/California/Pinnacles/IMG_7520.jpg"
        },
        { 
            name: "Death Valley National Park", 
            country: "US",
            region: "Southwest",
            lat: 36.5, 
            lng: -117.05, 
            url: "https://en.wikipedia.org/wiki/Death_Valley_National_Park",
            img: "Pictures/California/Death Valley/IMG_2337.jpg"
        },
        { 
            name: "Channel Islands National Park", 
            country: "US",
            region: "West Coast",
            lat: 34.0, 
            lng: -119.69, 
            url: "https://en.wikipedia.org/wiki/Channel_Islands_National_Park",
            img: "Pictures/California/Channel Islands/IMG_0669.jpg"
        },
        { 
            name: "Joshua Tree National Park", 
            country: "US",
            region: "Southwest",
            lat: 33.87, 
            lng: -115.9, 
            url: "https://en.wikipedia.org/wiki/Joshua_Tree_National_Park",
            img: "Pictures/California/Joshua Tree/IMG_8823.jpg"
        },
        { 
            name: "Grand Canyon National Park", 
            country: "US",
            region: "Southwest",
            lat: 36.05, 
            lng: -112.14, 
            url: "https://en.wikipedia.org/wiki/Grand_Canyon",
            img: "Pictures/Arizona/Grand Canyon/Grand_Canyon.jpg"
        },
        { 
            name: "Great Basin National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.98, 
            lng: -114.31, 
            url: "https://en.wikipedia.org/wiki/Great_Basin_National_Park",
            img: "Pictures/Nevada/Great Basin/IMG_1194.jpg"
        },
        { 
            name: "Saguaro National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.27, 
            lng: -111.19, 
            url: "https://en.wikipedia.org/wiki/Saguaro_National_Park",
            img: "Pictures/Arizona/IMG_8402.jpg"
        },
        { 
            name: "Canyonlands National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.3, 
            lng: -109.86, 
            url: "https://en.wikipedia.org/wiki/Canyonlands_National_Park",
            img: "Pictures/Utah/Canyonlands/IMG_1847.jpg"
        },
        { 
            name: "Arches National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.73, 
            lng: -109.57, 
            url: "https://en.wikipedia.org/wiki/Arches_National_Park",
            img: "Pictures/Utah/Arches/IMG_1782.jpg"
        },
        { 
            name: "Capitol Reef National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.08, 
            lng: -111.13, 
            url: "https://en.wikipedia.org/wiki/Capitol_Reef_National_Park",
            img: "Pictures/Utah/Capitol Reef/IMG_3702.jpg"
        },
        { 
            name: "Bryce Canyon National Park", 
            country: "US",
            region: "Southwest",
            lat: 37.61, 
            lng: -112.16, 
            url: "https://en.wikipedia.org/wiki/Bryce_Canyon_National_Park",
            img: "Pictures/Utah/Bryce/IMG_1915.jpg"
        },
        { 
            name: "Zion National Park", 
            country: "US",
            region: "Southwest",
            lat: 37.22, 
            lng: -112.96, 
            url: "https://en.wikipedia.org/wiki/Zion_National_Park",
            img: "Pictures/Utah/Zion/IMG_2019.jpg"
        },
        { 
            name: "White Sands National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.78, 
            lng: -106.32, 
            url: "https://en.wikipedia.org/wiki/White_Sands_National_Park",
            img: "Pictures/New Mexico/IMG_8276.jpg"
        },
        { 
            name: "Guadualupe Mountains National Park", 
            country: "US",
            region: "Southwest",
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/IMG_7818.jpg"
        },
        { 
            name: "Great Sand Dunes National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.74, 
            lng: -105.52, 
            url: "https://en.wikipedia.org/wiki/Great_Sand_Dunes_National_Park_and_Preserve",
            img: "Pictures/Colorado/IMG_0979.jpg"
        },
        { 
            name: "Rocky Mountain National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 40.30, 
            lng: -105.66, 
            url: "https://en.wikipedia.org/wiki/Rocky_Mountain_National_Park",
            img: "Pictures/Colorado/Rocky Mountain/IMG_9406.jpg"
        },
        { 
            name: "Everglades National Park", 
            country: "US",
            region: "Southeast",
            lat: 25.76, 
            lng: -80.77, 
            url: "https://en.wikipedia.org/wiki/Everglades_National_Park",
            img: "Pictures/Florida/IMG_3699.JPG"
        },
        { 
            name: "Biscayne National Park", 
            country: "US",
            region: "Southeast",
            lat: 25.49, 
            lng: -80.18, 
            url: "https://en.wikipedia.org/wiki/Biscayne_National_Park",
            img: "Pictures/Florida/IMG_0501.jpg"
        },
        { 
            name: "Dry Tortugas National Park", 
            country: "US",
            region: "Southeast",
            lat: 24.63, 
            lng: -82.87, 
            url: "https://en.wikipedia.org/wiki/Dry_Tortugas_National_Park",
            img: "Pictures/Florida/IMG_0540.jpg"
        },
        { 
            name: "Carlsbad Caverns National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.17, 
            lng: -104.44, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/New Mexico/IMG_7821.jpg"
        },
        { 
            name: "Shenandoah National Park", 
            country: "US",
            region: "Appalachian",
            lat: 38.475, 
            lng: -78.453, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/Virginia/IMG_4318.jpg"
        },
        { 
            name: "New River Gorge National Park", 
            country: "US",
            region: "Appalachian",
            lat: 38.068, 
            lng: -81.082, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/West Virginia/IMG_4323.jpg"
        },
        { 
            name: "Mesa Verde National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.183, 
            lng: -108.487, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/Colorado/IMG_5322.jpg"
        },
        { 
            name: "Black Canyon of the Gunnison National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 38.544, 
            lng: -107.686, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/Colorado/IMG_5380.jpg"
        },
        { 
            name: "Petrified Forest National Park", 
            country: "US",
            region: "Southwest",
            lat: 35.083, 
            lng: -109.787, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/Arizona/IMG_5506.jpg"
        },
        { 
            name: "Olympic National Park", 
            country: "US",
            region: "West Coast",
            lat: 47.895, 
            lng: -123.934, 
            url: "https://en.wikipedia.org/wiki/Olympic_National_Park",
            img: "Pictures/Washington/IMG_5671.jpg"
        },
        { 
            name: "North Cascades National Park", 
            country: "US",
            region: "West Coast",
            lat: 48.713, 
            lng: -121.114, 
            url: "https://en.wikipedia.org/wiki/North_Cascades_National_Park",
            img: "Pictures/Washington/IMG_5839.jpg"
        },
        { 
            name: "Mount Rainier National Park", 
            country: "US",
            region: "West Coast",
            lat: 46.825, 
            lng: -121.760, 
            url: "https://en.wikipedia.org/wiki/Mount_Rainier_National_Park",
            img: "Pictures/Washington/IMG_5862.jpg"
        },
        { 
            name: "Cuyahoga Valley National Park", 
            country: "US",
            region: "Midwest",
            lat: 41.280, 
            lng: -81.565, 
            url: "https://en.wikipedia.org/wiki/Cuyahoga_Valley_National_Park",
            img: "Pictures/Ohio/IMG_6613.jpg"
        }
            
    ],

    mountain: [
        { 
            name: "Mt. Whitney", 
            country: "US",
            region: "West Coast",
            lat: 36.578, 
            lng: -118.292, 
            url: "https://en.wikipedia.org/wiki/Mount_Whitney",
            img: "Pictures/California/Whitney/IMG_8933.jpg"
        },
        { 
            name: "Mt. Elbert", 
            country: "US",
            region: "Rocky Mountain",
            lat: 39.117, 
            lng: -106.445, 
            url: "https://en.wikipedia.org/wiki/Mount_Elbert",
            img: "Pictures/Colorado/IMG_9119.JPG"
        },
        { 
            name: "Humphreys Peak", 
            country: "US",
            region: "Southwest",
            lat: 35.346, 
            lng: -111.677, 
            url: "https://en.wikipedia.org/wiki/Humphreys_Peak",
            img: "Pictures/Arizona/Humphreys/IMG_6070.jpg"
        },
        { 
            name: "Wheeler Peak", 
            country: "US",
            region: "Southwest",
            lat: 36.556, 
            lng: -105.416, 
            url: "https://en.wikipedia.org/wiki/Wheeler_Peak_(New_Mexico)",
            img: "Pictures/New Mexico/Wheeler/IMG_0960.jpg"
        },
        { 
            name: "Borah Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.136, 
            lng: -113.78, 
            url: "https://en.wikipedia.org/wiki/Borah_Peak",
            img: "Pictures/Idaho/Borah/borah.JPG"
        },
        { 
            name: "Black Mesa", 
            country: "US",
            region: "Midwest",
            lat: 36.932, 
            lng: -102.997, 
            url: "https://en.wikipedia.org/wiki/Black_Mesa_(Oklahoma,_Colorado,_New_Mexico)",
            img: "Pictures/Oklahoma/IMG_0921.jpg"
        },
        { 
            name: "Mount Sunflower", 
            country: "US",
            region: "Midwest",
            lat: 39.022, 
            lng: -102.037, 
            url: "https://en.wikipedia.org/wiki/Mount_Sunflower",
            img: "Pictures/Kansas/IMG_9297.jpg"
        },
        { 
            name: "Panorama Point", 
            country: "US",
            region: "Midwest",
            lat: 41.007, 
            lng: -104.031, 
            url: "https://en.wikipedia.org/wiki/Panorama_Point",
            img: "Pictures/Nebraska/IMG_9312.jpg"
        },
        { 
            name: "Guadualupe Mountains National Park", 
            country: "US",
            region: "Southwest",
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/IMG_7818.jpg"
        },
        { 
            name: "Mt. Rogers", 
            country: "US",
            region: "Appalachian",
            lat: 36.659, 
            lng: -81.154, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Virginia/IMG_4354.jpg"
        },
        { 
            name: "Black Mountain", 
            country: "US",
            region: "Appalachian",
            lat: 36.914, 
            lng: -82.893, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Kentucky/IMG_4335.jpg"
        },
        { 
            name: "Spruce Knob", 
            country: "US",
            region: "Appalachian",
            lat: 38.699, 
            lng: -79.532, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/West Virginia/IMG_4372.jpg"
        },
        { 
            name: "Backbone Mountain", 
            country: "US",
            region: "Appalachian",
            lat: 39.237, 
            lng: -79.485, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Maryland/IMG_4378.jpg"
        },
        { 
            name: "Mt. Davis", 
            country: "US",
            region: "Appalachian",
            lat: 39.786, 
            lng: -79.177, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Pennsylvania/IMG_4390.jpg"
        },
        { 
            name: "Ebright Azimuth", 
            country: "US",
            region: "Northeast",
            lat: 39.836, 
            lng: -75.52, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Delaware/IMG_4402.jpg"
        },
        { 
            name: "High Point", 
            country: "US",
            region: "Northeast",
            lat: 41.321, 
            lng: -74.661, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/New Jersey/IMG_6587.jpg"
        },
        { 
            name: "Mt. Frissell", 
            country: "US",
            region: "Northeast",
            lat: 42.051, 
            lng: -73.482, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Connecticut/IMG_6640.jpg"
        },
        { 
            name: "Mt. Greylock", 
            country: "US",
            region: "Northeast",
            lat: 42.637, 
            lng: -73.166, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Massachusets/IMG_6597.jpg"
        },
        { 
            name: "Jerimoth Hill", 
            country: "US",
            region: "Northeast",
            lat: 41.849, 
            lng: -71.779, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Rhode Island/IMG_6634.jpg"
        },
        { 
            name: "Campbell Hill", 
            country: "US",
            region: "Midwest",
            lat: 40.370, 
            lng: -83.720, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Ohio/IMG_6628.jpg"
        },
        { 
            name: "Hoosier Hill", 
            country: "US",
            region: "Midwest",
            lat: 40.001, 
            lng: -84.848, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Indiana/IMG_6629.jpg"
        }
            
    ],

    adventure: [
        { 
            name: "Whitewater Rafting", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.079, 
            lng: -115.658, 
            url: "https://en.wikipedia.org/wiki/Payette_River",
            img: "Pictures/Idaho/Rafting/CAN_0009.jpg"
        },
        { 
            name: "Antelope Canyon Kayak", 
            country: "US",
            region: "Southwest",
            lat: 36.939, 
            lng: -111.431, 
            url: "https://www.kayakpowell.com/",
            img: "Pictures/Arizona/Antelope Canyon/IMG_1167.jpg"
        },
        { 
            name: "Mt. Adams", 
            country: "US",
            region: "West Coast",
            lat: 46.202, 
            lng: -121.491, 
            url: "https://en.wikipedia.org/wiki/Mount_Adams_(Washington)",
            img: "Pictures/Washington/Adams/IMG_1551.jpg"
        },
        { 
            name: "Black Canyon of the Colorado River", 
            country: "US",
            region: "Rocky Mountain",
            lat: 35.993, 
            lng: -114.739, 
            url: "https://en.wikipedia.org/wiki/Black_Canyon_of_the_Colorado",
            img: "Pictures/Nevada/Black Canyon/IMG_2313.jpg"
        },
        { 
            name: "La Jolla Paragliding", 
            country: "US",
            region: "West Coast",
            lat: 32.980, 
            lng: -117.251, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/La Jolla/GEO_0408.jpg"
        },
        { 
            name: "Lower Calf Creek", 
            country: "US",
            region: "Southwest",
            lat: 37.829, 
            lng: -111.420, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Grand Staircase/IMG_1885.jpg"
        },
        { 
            name: "Sedona", 
            country: "US",
            region: "Southwest",
            lat: 34.869, 
            lng: -111.760, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sedona/IMG_3131.jpg"
        },
        { 
            name: "Pfeifferhorn", 
            country: "US",
            region: "Rocky Mountain",
            lat: 40.533, 
            lng: -111.706, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Pfeifferhorn/IMG_0087.JPG"
        },
        { 
            name: "Sawtooths", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.141, 
            lng: -115.010, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Thompson Peak/IMG_9159.jpg"
        },
        { 
            name: "Goat Canyon Trestle", 
            country: "US",
            region: "Southwest",
            lat: 32.729, 
            lng: -116.183, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Goat Canyon/GOPR4197.JPG"
        },
        { 
            name: "Salome Jug", 
            country: "US",
            region: "Southwest",
            lat: 33.770, 
            lng: -111.119, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_3823.jpg"
        },
        { 
            name: "Buckskin Gulch", 
            country: "US",
            region: "Southwest",
            lat: 37.017, 
            lng: -112.001, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Buckskin/IMG_3949.jpg"
        },
        { 
            name: "Ausangate", 
            country: "PE",
            region: "Cusco",
            lat: -13.758, 
            lng: -71.218, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/IMG_4894.jpg"
        },
        { 
            name: "Salkantay", 
            country: "PE",
            region: "Cusco",
            lat: -13.381, 
            lng: -72.584, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/IMG_4672.jpg"
        },
        { 
            name: "Ice Lake Basin", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.814, 
            lng: -107.808, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Colorado/IMG_5476.jpg"
        },
        { 
            name: "Great Barrier Reef", 
            country: "AU",
            region: "Queensland",
            lat: -16.73, 
            lng: 146.271, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/IMG_6500.jpg"
        },
        { 
            name: "Wallaman Falls", 
            country: "AU",
            region: "Queensland",
            lat: -18.59, 
            lng: 145.802, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/wallamanfalls.jpg"
        }
    ],

    sightseeing: [
        {
            name: "Superstitions",
            country: "US",
            region: "Southwest",
            lat: 33.438, 
            lng: -111.454, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Superstitions/IMG_3812.jpg"
        },
        {
            name: "Kirkham Hot Springs",
            country: "US",
            region: "Rocky Mountain",
            lat: 44.072, 
            lng: -115.546, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Sightseeing/IMG_3497.jpg"
        },
        {
            name: "Fossil Creek",
            country: "US",
            region: "Southwest",
            lat: 34.145, 
            lng: -111.605, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_3822.jpg"
        },
        { 
            name: "Pikes Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 38.840, 
            lng: -105.042, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Colorado/Pikes/IMG_0909.jpg"
        },
        {
            name: "Coal Mine Canyon",
            country: "US",
            region: "Southwest",
            lat: 36.012, 
            lng: -110.989, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_0825.jpg"
        },
        {
            name: "Panther Creek Falls",
            country: "US",
            region: "West Coast",
            lat: 45.867, 
            lng: -121.828, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Washington/Sightseeing/IMG_1502.jpg"
        },
        {
            name: "Blue Heart Springs",
            country: "US",
            region: "Rocky Mountain",
            lat: 42.170, 
            lng: -114.829, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Sightseeing/IMG_1605.jpg"
        },
        {
            name: "Donut Falls",
            country: "US",
            region: "Rocky Mountain",
            lat: 40.613, 
            lng: -111.654, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Sightseeing/IMG_1650.jpg"
        },
        {
            name: "Imperial Sand Dunes",
            country: "US",
            region: "Southwest",
            lat: 32.982, 
            lng: -115.132, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Sightseeing/IMG_3759.jpg"
        },
        {
            name: "Black Sands Beach",
            country: "US",
            region: "West Coast",
            lat: 37.824, 
            lng: -122.508, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Sightseeing/IMG_7640.jpg"
        },
        {
            name: "Four Peaks",
            country: "US",
            region: "Southwest",
            lat: 33.684, 
            lng: -111.325, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_7751.jpg"
        },
        {
            name: "Chiricahua National Monument",
            country: "US",
            region: "Southwest",
            lat: 32.008, 
            lng: -109.319, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_8082.jpg"
        },
        {
            name: "Valley of Fire",
            country: "US",
            region: "Southwest",
            lat: 36.482, 
            lng: -114.552, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Nevada/Valley of Fire/IMG_4058.jpg"
        },
        {
            name: "Grand Staircase Escalante",
            country: "US",
            region: "Southwest",
            lat: 37.460, 
            lng: -111.594, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Grand Staircase/Grand Staircase.jpg"
        },
        { 
            name: "Machu Picchu", 
            country: "PE",
            region: "Cusco",
            lat: -13.163, 
            lng: -72.545, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/IMG_4832.jpg"
        },
        { 
            name: "Pallay Punchu", 
            country: "PE",
            region: "Cusco",
            lat: -14.463, 
            lng: -71.136, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/pallay_punchu.jpg"
        },
        { 
            name: "Monument Valley", 
            country: "US",
            region: "Southwest",
            lat: 36.951, 
            lng: -110.082, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/IMG_5606.jpg"
        },
        { 
            name: "Whitehaven Beach", 
            country: "AU",
            region: "Queensland",
            lat: -20.251, 
            lng: 149.021, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/IMG_6216.jpg"
        },
        { 
            name: "Daintree Rainforest", 
            country: "AU",
            region: "Queensland",
            lat: -16.075, 
            lng: 145.469, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/IMG_6107.jpg"
        },
        { 
            name: "Sydney Opera House", 
            country: "AU",
            region: "New South Wales",
            lat: -33.857, 
            lng: 151.215, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/IMG_6367.jpg"
        }
        
    ]
};

const locations = {};

Object.entries(rawLocations).forEach(([category, places]) => {
  locations[category] = places.map(place => ({
    ...place,
    category,          
    id: generateId(place.name)
  }));
});


export default locations;

