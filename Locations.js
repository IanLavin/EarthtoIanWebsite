// locations.js

const locations = {
    park: [
        { 
            name: "Yellowstone National Park", 
            lat: 44.59, 
            lng: -110.55, 
            url: "https://www.nps.gov/yell/index.htm",
            img: "Pictures/Wyoming/Yellowstone/IMG_2651.jpg"
        },
        { 
            name: "Grand Teton National Park", 
            lat: 43.74, 
            lng: -110.8, 
            url: "https://en.wikipedia.org/wiki/Grand_Teton_National_Park",
            img: "Pictures/Wyoming/Grand Teton/IMG_2769.jpg"
        },
        { 
            name: "Crater Lake National Park", 
            lat: 42.94, 
            lng: -122.10, 
            url: "https://en.wikipedia.org/wiki/Crater_Lake_National_Park",
            img: "Pictures/Oregon/IMG_5284.jpg"
        },
        { 
            name: "Redwood National Park", 
            lat: 41.4, 
            lng: -124.04, 
            url: "https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks",
            img: "Pictures/California/Redwoods/IMG_0033.jpg"
        },
        { 
            name: "Pinnacles National Park", 
            lat: 36.49, 
            lng: -121.48, 
            url: "https://en.wikipedia.org/wiki/Pinnacles_National_Park",
            img: "Pictures/California/Pinnacles/IMG_7520.jpg"
        },
        { 
            name: "Death Valley National Park", 
            lat: 36.5, 
            lng: -117.05, 
            url: "https://en.wikipedia.org/wiki/Death_Valley_National_Park",
            img: "Pictures/California/Death Valley/IMG_2337.jpg"
        },
        { 
            name: "Channel Islands National Park", 
            lat: 34.0, 
            lng: -119.69, 
            url: "https://en.wikipedia.org/wiki/Channel_Islands_National_Park",
            img: "Pictures/California/Channel Islands/IMG_0669.jpg"
        },
        { 
            name: "Joshua Tree National Park", 
            lat: 33.87, 
            lng: -115.9, 
            url: "https://en.wikipedia.org/wiki/Joshua_Tree_National_Park",
            img: "Pictures/California/Joshua Tree/IMG_8823.jpg"
        },
        { 
            name: "Grand Canyon National Park", 
            lat: 36.05, 
            lng: -112.14, 
            url: "https://en.wikipedia.org/wiki/Grand_Canyon",
            img: "Pictures/Arizona/Grand Canyon/Grand_Canyon.jpg"
        },
        { 
            name: "Great Basin National Park", 
            lat: 38.98, 
            lng: -114.31, 
            url: "https://en.wikipedia.org/wiki/Great_Basin_National_Park",
            img: "Pictures/Nevada/Great Basin/IMG_1194.jpg"
        },
        { 
            name: "Saguaro National Park", 
            lat: 32.27, 
            lng: -111.19, 
            url: "https://en.wikipedia.org/wiki/Saguaro_National_Park",
            img: "Pictures/Arizona/IMG_8402.jpg"
        },
        { 
            name: "Canyonlands National Park", 
            lat: 38.3, 
            lng: -109.86, 
            url: "https://en.wikipedia.org/wiki/Canyonlands_National_Park",
            img: "Pictures/Utah/Canyonlands/IMG_1847.jpg"
        },
        { 
            name: "Arches National Park", 
            lat: 38.73, 
            lng: -109.57, 
            url: "https://en.wikipedia.org/wiki/Arches_National_Park",
            img: "Pictures/Utah/Arches/IMG_1782.jpg"
        },
        { 
            name: "Capitol Reef National Park", 
            lat: 38.08, 
            lng: -111.13, 
            url: "https://en.wikipedia.org/wiki/Capitol_Reef_National_Park",
            img: "Pictures/Utah/Capitol Reef/IMG_3702.jpg"
        },
        { 
            name: "Bryce Canyon National Park", 
            lat: 37.61, 
            lng: -112.16, 
            url: "https://en.wikipedia.org/wiki/Bryce_Canyon_National_Park",
            img: "Pictures/Utah/Bryce/IMG_1915.jpg"
        },
        { 
            name: "Zion National Park", 
            lat: 37.22, 
            lng: -112.96, 
            url: "https://en.wikipedia.org/wiki/Zion_National_Park",
            img: "Pictures/Utah/Zion/IMG_2019.jpg"
        },
        { 
            name: "White Sands National Park", 
            lat: 32.78, 
            lng: -106.32, 
            url: "https://en.wikipedia.org/wiki/White_Sands_National_Park",
            img: "Pictures/New Mexico/IMG_8276.jpg"
        },
        { 
            name: "Guadualupe Mountains National Park", 
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/IMG_7818.jpg"
        },
        { 
            name: "Great Sand Dunes National Park", 
            lat: 37.74, 
            lng: -105.52, 
            url: "https://en.wikipedia.org/wiki/Great_Sand_Dunes_National_Park_and_Preserve",
            img: "Pictures/Colorado/IMG_0979.jpg"
        },
        { 
            name: "Rocky Mountain National Park", 
            lat: 40.30, 
            lng: -105.66, 
            url: "https://en.wikipedia.org/wiki/Rocky_Mountain_National_Park",
            img: "Pictures/Colorado/Rocky Mountain/IMG_9406.jpg"
        },
        { 
            name: "Everglades National Park", 
            lat: 25.76, 
            lng: -80.77, 
            url: "https://en.wikipedia.org/wiki/Everglades_National_Park",
            img: "Pictures/Florida/IMG_3699.jpg"
        },
        { 
            name: "Biscayne National Park", 
            lat: 25.49, 
            lng: -80.18, 
            url: "https://en.wikipedia.org/wiki/Biscayne_National_Park",
            img: "Pictures/Florida/IMG_0501.jpg"
        },
        { 
            name: "Dry Tortugas National Park", 
            lat: 24.63, 
            lng: -82.87, 
            url: "https://en.wikipedia.org/wiki/Dry_Tortugas_National_Park",
            img: "Pictures/Florida/IMG_0540.jpg"
        },
        { 
            name: "Carlsbad Caverns National Park", 
            lat: 32.17, 
            lng: -104.44, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/New Mexico/IMG_7821.jpg"
        }
    ],
    mountain: [
        { 
            name: "Mt. Whitney", 
            lat: 36.578, 
            lng: -118.292, 
            url: "https://en.wikipedia.org/wiki/Mount_Whitney",
            img: "Pictures/California/Whitney/IMG_8933.jpg"
        },
        { 
            name: "Mt. Elbert", 
            lat: 39.117, 
            lng: -106.445, 
            url: "https://en.wikipedia.org/wiki/Mount_Elbert",
            img: "Pictures/Colorado/IMG_9119.jpg"
        },
        { 
            name: "Humphreys Peak", 
            lat: 35.346, 
            lng: -111.677, 
            url: "https://en.wikipedia.org/wiki/Humphreys_Peak",
            img: "Pictures/Arizona/Humphreys/IMG_6070.jpg"
        },
        { 
            name: "Wheeler Peak", 
            lat: 36.556, 
            lng: -105.416, 
            url: "https://en.wikipedia.org/wiki/Wheeler_Peak_(New_Mexico)",
            img: "Pictures/New Mexico/Wheeler/IMG_0960.jpg"
        },
        { 
            name: "Borah Peak", 
            lat: 44.136, 
            lng: -113.78, 
            url: "https://en.wikipedia.org/wiki/Borah_Peak",
            img: "Pictures/Idaho/Borah/borah.jpg"
        },
        { 
            name: "Black Mesa", 
            lat: 36.932, 
            lng: -102.997, 
            url: "https://en.wikipedia.org/wiki/Black_Mesa_(Oklahoma,_Colorado,_New_Mexico)",
            img: "Pictures/Oklahoma/IMG_0921.jpg"
        },
        { 
            name: "Mount Sunflower", 
            lat: 39.022, 
            lng: -102.037, 
            url: "https://en.wikipedia.org/wiki/Mount_Sunflower",
            img: "Pictures/Kansas/IMG_9297.jpg"
        },
        { 
            name: "Panorama Point", 
            lat: 41.007, 
            lng: -104.031, 
            url: "https://en.wikipedia.org/wiki/Panorama_Point",
            img: "Pictures/Nebraska/IMG_9312.jpg"
        },
        { 
            name: "Guadualupe Mountains National Park", 
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/IMG_7818.jpg"
        }
    ],
    adventure: [
        { 
            name: "Whitewater Rafting", 
            lat: 44.079, 
            lng: -115.658, 
            url: "https://en.wikipedia.org/wiki/Payette_River",
            img: "Pictures/Idaho/Rafting/CAN_0009.jpg"
        },
        { 
            name: "Antelope Canyon Kayak", 
            lat: 36.939, 
            lng: -111.431, 
            url: "https://www.kayakpowell.com/",
            img: "Pictures/Arizona/Antelope Canyon/IMG_1167.jpg"
        },
        { 
            name: "Mt. Adams", 
            lat: 46.202, 
            lng: -121.491, 
            url: "https://en.wikipedia.org/wiki/Mount_Adams_(Washington)",
            img: "Pictures/Washington/Adams/IMG_1551.jpg"
        },
        { 
            name: "Black Canyon of the Colorado River", 
            lat: 35.993, 
            lng: -114.739, 
            url: "https://en.wikipedia.org/wiki/Black_Canyon_of_the_Colorado",
            img: "Pictures/Nevada/Black Canyon/IMG_2313.jpg"
        },
        { 
            name: "La Jolla Paragliding", 
            lat: 32.980, 
            lng: -117.251, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/La Jolla/GEO_0408.jpg"
        },
        { 
            name: "Lower Calf Creek", 
            lat: 37.829, 
            lng: -111.420, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Grand Staircase/IMG_1885.jpg"
        },
        { 
            name: "Sedona", 
            lat: 34.869, 
            lng: -111.760, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sedona/IMG_3131.jpg"
        },
        { 
            name: "Pfeifferhorn", 
            lat: 40.533, 
            lng: -111.706, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Pfeifferhorn/IMG_0087.jpg"
        },
        { 
            name: "Sawtooths", 
            lat: 44.141, 
            lng: -115.010, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Thompson Peak/IMG_9159.jpg"
        },
        { 
            name: "Goat Canyon Trestle", 
            lat: 32.729, 
            lng: -116.183, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/GOPR4197.jpg"
        },
        { 
            name: "Salome Jug", 
            lat: 33.770, 
            lng: -111.119, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_3823.jpg"
        }
    ],
    sightseeing: [
        {
            name: "Superstitions",
            lat: 33.438, 
            lng: -111.454, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Superstitions/IMG_3812.jpg"
        },
        {
            name: "Kirkham Hot Springs",
            lat: 44.072, 
            lng: -115.546, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Sightseeing/IMG_3497.jpg"
        },
        {
            name: "Fossil Creek",
            lat: 34.145, 
            lng: -111.605, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_3822.jpg"
        },
        { 
            name: "Pikes Peak", 
            lat: 38.840, 
            lng: -105.042, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Colorado/Pikes/IMG_0909.jpg"
        },
        {
            name: "Coal Mine Canyon",
            lat: 36.012, 
            lng: -110.989, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_0825.jpg"
        },
        {
            name: "Panther Creek Falls",
            lat: 45.867, 
            lng: -121.828, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Washington/Sightseeing/IMG_1502.jpg"
        },
        {
            name: "Blue Heart Springs",
            lat: 42.170, 
            lng: -114.829, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Sightseeing/IMG_1605.jpg"
        },
        {
            name: "Donut Falls",
            lat: 40.613, 
            lng: -111.654, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Sightseeing/IMG_1650.jpg"
        },
        {
            name: "Imperial Sand Dunes",
            lat: 32.982, 
            lng: -115.132, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Sightseeing/IMG_3759.jpg"
        },
        {
            name: "Black Sands Beach",
            lat: 37.824, 
            lng: -122.508, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Sightseeing/IMG_7640.jpg"
        },
        {
            name: "Four Peaks",
            lat: 33.684, 
            lng: -111.325, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_7751.jpg"
        },
        {
            name: "Chiricahua National Monument",
            lat: 32.008, 
            lng: -109.319, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sightseeing/IMG_8082.jpg"
        }
        
    ]
};

// Export locations
export default locations;