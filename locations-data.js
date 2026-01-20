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

            //carousel images
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
            img: "Pictures/Wyoming/Grand_Teton/IMG_2769.jpg",

            //carousel images
            gallery: [
            "IMG_2504.jpg",
            "IMG_2720.jpg",
            "IMG_2735.jpg",
            "IMG_2769.jpg",
            "IMG_2831.jpg",
            "IMG_2833.jpg",
            "IMG_2837.jpg",
            "IMG_2842.jpg",
            "IMG_2845.jpg"          
            ].map(f => `Pictures/Wyoming/Grand_Teton/${f}`)
        },
        { 
            name: "Crater Lake National Park",
            country: "US",
            region: "West Coast", 
            lat: 42.94, 
            lng: -122.10, 
            url: "https://en.wikipedia.org/wiki/Crater_Lake_National_Park",
            img: "Pictures/Oregon/IMG_5284.jpg",

            //carousel images
            gallery: [
            "IMG_0117.jpg",
            "IMG_5284.jpg"          
            ].map(f => `Pictures/Oregon/${f}`)
        },
        { 
            name: "Redwood National Park", 
            country: "US",
            region: "West Coast",
            lat: 41.4, 
            lng: -124.04, 
            url: "https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks",
            img: "Pictures/California/Redwoods/IMG_0033.JPG",

            //carousel images
            gallery: [
            "IMG_0033.jpg",
            "IMG_0374.jpg",
            "IMG_5260.jpg"          
            ].map(f => `Pictures/California/Redwoods/${f}`)
        },
        { 
            name: "Pinnacles National Park", 
            country: "US",
            region: "West Coast",
            lat: 36.49, 
            lng: -121.48, 
            url: "https://en.wikipedia.org/wiki/Pinnacles_National_Park",
            img: "Pictures/California/Pinnacles/IMG_7520.jpg",

            //carousel images
            gallery: [
            "IMG_7520.jpg",
            "IMG_7542.jpg",
            "IMG_7550.jpg",
            "IMG_7559.jpg"        
            ].map(f => `Pictures/California/Pinnacles/${f}`)
        },
        { 
            name: "Death Valley National Park", 
            country: "US",
            region: "Southwest",
            lat: 36.5, 
            lng: -117.05, 
            url: "https://en.wikipedia.org/wiki/Death_Valley_National_Park",
            img: "Pictures/California/Death_Valley/IMG_2337.jpg",

            //carousel images
            gallery: [
            "IMG_2337.jpg",
            "IMG_2356.jpg",
            "IMG_2381.jpg",
            "IMG_2386.jpg"        
            ].map(f => `Pictures/California/Death_Valley/${f}`)
        },
        { 
            name: "Channel Islands National Park", 
            country: "US",
            region: "West Coast",
            lat: 34.0, 
            lng: -119.69, 
            url: "https://en.wikipedia.org/wiki/Channel_Islands_National_Park",
            img: "Pictures/California/Channel_Islands/IMG_0669.jpg",

            //carousel images
            gallery: [
            "IMG_0659.jpg",
            "IMG_0669.jpg",
            "IMG_0702.jpg",
            "IMG_4206.jpg"        
            ].map(f => `Pictures/California/Channel_Islands/${f}`)
        },
        { 
            name: "Joshua Tree National Park", 
            country: "US",
            region: "Southwest",
            lat: 33.87, 
            lng: -115.9, 
            url: "https://en.wikipedia.org/wiki/Joshua_Tree_National_Park",
            img: "Pictures/California/Joshua_Tree/IMG_8823.jpg",

            //carousel images
            gallery: [
            "IMG_8823.jpg",
            "IMG_8837.jpg",
            "IMG_8850.jpg",
            "IMG_4231.jpg",
            "IMG_4234.jpg",
            "IMG_4242.jpg",
            "IMG_4277.jpg"       
            ].map(f => `Pictures/California/Joshua_Tree/${f}`)
        },
        { 
            name: "Grand Canyon National Park", 
            country: "US",
            region: "Southwest",
            lat: 36.05, 
            lng: -112.14, 
            url: "https://en.wikipedia.org/wiki/Grand_Canyon",
            img: "Pictures/Arizona/Grand_Canyon/Grand_Canyon.jpg",

            //carousel images
            gallery: [
            "Grand_Canyon.jpg",
            "IMG_0726.jpg",
            "IMG_0743.jpg",
            "IMG_0744.jpg",
            "IMG_0745.jpg",
            "IMG_0765.jpg",
            "IMG_0797.jpg",
            "IMG_7904.jpg",
            "IMG_7953.jpg",
            "IMG_9774.jpg"        
            ].map(f => `Pictures/Arizona/Grand_Canyon/${f}`)
        },
        { 
            name: "Great Basin National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.98, 
            lng: -114.31, 
            url: "https://en.wikipedia.org/wiki/Great_Basin_National_Park",
            img: "Pictures/Nevada/Great Basin/IMG_1194.jpg",

            //carousel images
            gallery: [
            "IMG_1194.jpg",
            "IMG_1196.jpg",
            "IMG_1200.jpg",
            "IMG_1209.jpg",
            "IMG_1220.jpg"       
            ].map(f => `Pictures/Nevada/Great Basin/${f}`)
        },
        { 
            name: "Saguaro National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.27, 
            lng: -111.19, 
            url: "https://en.wikipedia.org/wiki/Saguaro_National_Park",
            img: "Pictures/Arizona/Saguaro/IMG_8402.jpg",

            //carousel images
            gallery: [
            "IMG_8402.jpg"     
            ].map(f => `Pictures/Arizona/Saguaro/${f}`)
        },
        { 
            name: "Canyonlands National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.3, 
            lng: -109.86, 
            url: "https://en.wikipedia.org/wiki/Canyonlands_National_Park",
            img: "Pictures/Utah/Canyonlands/IMG_1847.jpg",

            //carousel images
            gallery: [
            "IMG_1836.jpg",
            "IMG_1847.jpg"       
            ].map(f => `Pictures/Utah/Canyonlands/${f}`)
        },
        { 
            name: "Arches National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.73, 
            lng: -109.57, 
            url: "https://en.wikipedia.org/wiki/Arches_National_Park",
            img: "Pictures/Utah/Arches/IMG_1782.jpg",

            //carousel images
            gallery: [
            "IMG_1664.jpg",
            "IMG_1669.jpg",
            "IMG_1690.jpg",
            "IMG_1782.jpg",
            "IMG_2127.jpg"       
            ].map(f => `Pictures/Utah/Arches/${f}`)
        },
        { 
            name: "Capitol Reef National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.08, 
            lng: -111.13, 
            url: "https://en.wikipedia.org/wiki/Capitol_Reef_National_Park",
            img: "Pictures/Utah/Capitol_Reef/IMG_3702.jpg",

            //carousel images
            gallery: [
            "IMG_3702.jpg"       
            ].map(f => `Pictures/Utah/Capitol_Reef/${f}`)
        },
        { 
            name: "Bryce Canyon National Park", 
            country: "US",
            region: "Southwest",
            lat: 37.61, 
            lng: -112.16, 
            url: "https://en.wikipedia.org/wiki/Bryce_Canyon_National_Park",
            img: "Pictures/Utah/Bryce/IMG_1915.jpg",

            //carousel images
            gallery: [
            "IMG_1915.jpg",
            "IMG_1916.jpg",
            "IMG_1926.jpg",
            "IMG_1981.jpg"       
            ].map(f => `Pictures/Utah/Bryce/${f}`)
        },
        { 
            name: "Zion National Park", 
            country: "US",
            region: "Southwest",
            lat: 37.22, 
            lng: -112.96, 
            url: "https://en.wikipedia.org/wiki/Zion_National_Park",
            img: "Pictures/Utah/Zion/IMG_2019.jpg",

            //carousel images
            gallery: [
            "IMG_2019.jpg",
            "GOPR4345.jpg",
            "IMG_4011.jpg",
            "IMG_3982.jpg",
            "IMG_3986.jpg"       
            ].map(f => `Pictures/Utah/Zion/${f}`)
        },
        { 
            name: "White Sands National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.78, 
            lng: -106.32, 
            url: "https://en.wikipedia.org/wiki/White_Sands_National_Park",
            img: "Pictures/New Mexico/White_Sands/IMG_8276.jpg",

            //carousel images
            gallery: [
            "IMG_8276.jpg"    
            ].map(f => `Pictures/New Mexico/White_Sands/${f}`)
        },
        { 
            name: "Guadalupe Mountains National Park", 
            country: "US",
            region: "Southwest",
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/Guadalupe/IMG_7818.jpg",

            //carousel images
            gallery: [
            "IMG_7818.jpg",
            "IMG_8216.jpg"       
            ].map(f => `Pictures/Texas/Guadalupe/${f}`)
        },
        { 
            name: "Great Sand Dunes National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.74, 
            lng: -105.52, 
            url: "https://en.wikipedia.org/wiki/Great_Sand_Dunes_National_Park_and_Preserve",
            img: "Pictures/Colorado/Great_Dunes/IMG_0979.jpg",

            //carousel images
            gallery: [
            "IMG_0975.jpg",
            "IMG_0979.jpg",
            "IMG_3844.jpg"       
            ].map(f => `Pictures/Colorado/Great_Dunes/${f}`)
        },
        { 
            name: "Rocky Mountain National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 40.30, 
            lng: -105.66, 
            url: "https://en.wikipedia.org/wiki/Rocky_Mountain_National_Park",
            img: "Pictures/Colorado/Rocky_Mountain/IMG_9406.jpg",

            //carousel images
            gallery: [
            "IMG_9005.jpg",
            "IMG_9387.jpg",
            "IMG_9406.jpg",
            "IMG_8950.jpg",      
            ].map(f => `Pictures/Colorado/Rocky_Mountain/${f}`)
        },
        { 
            name: "Everglades National Park", 
            country: "US",
            region: "Southeast",
            lat: 25.76, 
            lng: -80.77, 
            url: "https://en.wikipedia.org/wiki/Everglades_National_Park",
            img: "Pictures/Florida/Everglades/IMG_3699.JPG",

            //carousel images
            gallery: [
            "IMG_3699.jpg"    
            ].map(f => `Pictures/Florida/Everglades/${f}`)
        },
        { 
            name: "Biscayne National Park", 
            country: "US",
            region: "Southeast",
            lat: 25.49, 
            lng: -80.18, 
            url: "https://en.wikipedia.org/wiki/Biscayne_National_Park",
            img: "Pictures/Florida/Biscayne/IMG_0501.jpg",

            //carousel images
            gallery: [
            "IMG_0501.jpg"    
            ].map(f => `Pictures/Florida/Biscayne/${f}`)
        },
        { 
            name: "Dry Tortugas National Park", 
            country: "US",
            region: "Southeast",
            lat: 24.63, 
            lng: -82.87, 
            url: "https://en.wikipedia.org/wiki/Dry_Tortugas_National_Park",
            img: "Pictures/Florida/Dry_Tortugas/IMG_0540.jpg",

            //carousel images
            gallery: [
            "IMG_0223.jpg",
            "IMG_0526.jpg",
            "IMG_0536.jpg",
            "IMG_0540.jpg",
            "IMG_0551.jpg",
            "IMG_3836.jpg"    
            ].map(f => `Pictures/Florida/Dry_Tortugas/${f}`)
        },
        { 
            name: "Carlsbad Caverns National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.17, 
            lng: -104.44, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/New Mexico/Carlsbad/IMG_7821.jpg",

            //carousel images
            gallery: [
            "IMG_7821.jpg",
            "IMG_8157.jpg"       
            ].map(f => `Pictures/New Mexico/Carlsbad/${f}`)
        },
        { 
            name: "Shenandoah National Park", 
            country: "US",
            region: "Appalachian",
            lat: 38.475, 
            lng: -78.453, 
            url: "https://en.wikipedia.org/wiki/Shenandoah_National_Park",
            img: "Pictures/Virginia/Shenandoah/IMG_4318.jpg",

            //carousel images
            gallery: [
            "IMG_4318.jpg",
            "IMG_4308.jpg",
            "IMG_4303.jpg",    
            ].map(f => `Pictures/Virginia/Shenandoah/${f}`)
        },
        { 
            name: "New River Gorge National Park", 
            country: "US",
            region: "Appalachian",
            lat: 38.068, 
            lng: -81.082, 
            url: "https://en.wikipedia.org/wiki/New_River_Gorge_National_Park",
            img: "Pictures/West Virginia/New_River/IMG_4323.jpg",

            //carousel images
            gallery: [
            "IMG_4323.jpg",
            "IMG_4331.jpg"    
            ].map(f => `Pictures/West Virginia/New_River/${f}`)
        },
        { 
            name: "Mesa Verde National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.183, 
            lng: -108.487, 
            url: "https://en.wikipedia.org/wiki/Mesa_Verde_National_Park",
            img: "Pictures/Colorado/Mesa_Verde/IMG_5322.jpg",

            //carousel images
            gallery: [
            "IMG_5322.jpg"
            ].map(f => `Pictures/Colorado/Mesa_Verde/${f}`)
        },
        { 
            name: "Black Canyon of the Gunnison National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 38.544, 
            lng: -107.686, 
            url: "https://en.wikipedia.org/wiki/Black_Canyon_of_the_Gunnison_National_Park",
            img: "Pictures/Colorado/Black_Canyon/IMG_5380.jpg",

            //carousel images
            gallery: [
            "IMG_5380.jpg"    
            ].map(f => `Pictures/Colorado/Black_Canyon/${f}`)
        },
        { 
            name: "Petrified Forest National Park", 
            country: "US",
            region: "Southwest",
            lat: 35.083, 
            lng: -109.787, 
            url: "https://en.wikipedia.org/wiki/Petrified_Forest_National_Park",
            img: "Pictures/Arizona/Petrified/IMG_5506.jpg",

            //carousel images
            gallery: [
            "IMG_5506.jpg"    
            ].map(f => `Pictures/Arizona/Petrified/${f}`)
        },
        { 
            name: "Olympic National Park", 
            country: "US",
            region: "West Coast",
            lat: 47.895, 
            lng: -123.934, 
            url: "https://en.wikipedia.org/wiki/Olympic_National_Park",
            img: "Pictures/Washington/Olympic/IMG_5671.jpg",

            //carousel images
            gallery: [
            "IMG_5671.jpg",
            "IMG_5683.jpg",
            "IMG_5729.jpg",
            "IMG_5765.jpg",
            "olympic1.jpg",
            "olympic2.jpg"    
            ].map(f => `Pictures/Washington/Olympic/${f}`)
        },
        { 
            name: "North Cascades National Park", 
            country: "US",
            region: "West Coast",
            lat: 48.713, 
            lng: -121.114, 
            url: "https://en.wikipedia.org/wiki/North_Cascades_National_Park",
            img: "Pictures/Washington/North_Cascades/IMG_5839.jpg",

            //carousel images
            gallery: [
            "IMG_5839.jpg",
            "IMG_5812.jpg",
            "cascades1.jpg",
            "cascades2.jpg",
            "cascades3.jpg",
            "cascades4.jpg"     
            ].map(f => `Pictures/Washington/North_Cascades/${f}`)
        },
        { 
            name: "Mount Rainier National Park", 
            country: "US",
            region: "West Coast",
            lat: 46.825, 
            lng: -121.760, 
            url: "https://en.wikipedia.org/wiki/Mount_Rainier_National_Park",
            img: "Pictures/Washington/Rainier/IMG_5862.jpg",

            //carousel images
            gallery: [
            "IMG_5862.jpg"     
            ].map(f => `Pictures/Washington/Rainier/${f}`)
        },
        { 
            name: "Cuyahoga Valley National Park", 
            country: "US",
            region: "Midwest",
            lat: 41.280, 
            lng: -81.565, 
            url: "https://en.wikipedia.org/wiki/Cuyahoga_Valley_National_Park",
            img: "Pictures/Ohio/Cuyahoga/IMG_6613.jpg",

            //carousel images
            gallery: [
            "IMG_6613.jpg",
            "IMG_6616.jpg",     
            ].map(f => `Pictures/Ohio/Cuyahoga/${f}`)
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
            img: "Pictures/California/Whitney/IMG_8933.jpg",

            //carousel images
            gallery: [
            "IMG_8933.jpg",
            "IMG_8989.jpg",
            "IMG_9003.jpg",
            "IMG_9040.jpg"    
            ].map(f => `Pictures/California/Whitney/${f}`)
        },
        { 
            name: "Mt. Elbert", 
            country: "US",
            region: "Rocky Mountain",
            lat: 39.117, 
            lng: -106.445, 
            url: "https://en.wikipedia.org/wiki/Mount_Elbert",
            img: "Pictures/Colorado/Elbert/IMG_9119.jpg",

            //carousel images
            gallery: [
            "IMG_9119.jpg"     
            ].map(f => `Pictures/Colorado/Elbert/${f}`)
        },
        { 
            name: "Humphreys Peak", 
            country: "US",
            region: "Southwest",
            lat: 35.346, 
            lng: -111.677, 
            url: "https://en.wikipedia.org/wiki/Humphreys_Peak",
            img: "Pictures/Arizona/Humphreys/IMG_6070.jpg",

            //carousel images
            gallery: [
            "IMG_6020.jpg",
            "IMG_6046.jpg",
            "IMG_6070.jpg"    
            ].map(f => `Pictures/Arizona/Humphreys/${f}`)
        },
        { 
            name: "Wheeler Peak", 
            country: "US",
            region: "Southwest",
            lat: 36.556, 
            lng: -105.416, 
            url: "https://en.wikipedia.org/wiki/Wheeler_Peak_(New_Mexico)",
            img: "Pictures/New Mexico/Wheeler/IMG_0960.jpg",

            //carousel images
            gallery: [
            "IMG_0955.jpg",
            "IMG_0960.jpg"       
            ].map(f => `Pictures/New Mexico/Wheeler/${f}`)
        },
        { 
            name: "Borah Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.136, 
            lng: -113.78, 
            url: "https://en.wikipedia.org/wiki/Borah_Peak",
            img: "Pictures/Idaho/Borah/borah.JPG",

            //carousel images
            gallery: [
            "borah.JPG"     
            ].map(f => `Pictures/Idaho/Borah/${f}`)
        },
        { 
            name: "Black Mesa", 
            country: "US",
            region: "Midwest",
            lat: 36.932, 
            lng: -102.997, 
            url: "https://en.wikipedia.org/wiki/Black_Mesa_(Oklahoma,_Colorado,_New_Mexico)",
            img: "Pictures/Oklahoma/Black_Mesa/IMG_0921.jpg",

            //carousel images
            gallery: [
            "IMG_0921.jpg",
            "IMG_0934.jpg"       
            ].map(f => `Pictures/Oklahoma/Black_Mesa/${f}`)
        },
        { 
            name: "Mount Sunflower", 
            country: "US",
            region: "Midwest",
            lat: 39.022, 
            lng: -102.037, 
            url: "https://en.wikipedia.org/wiki/Mount_Sunflower",
            img: "Pictures/Kansas/Sunflower/IMG_9297.jpg",

            //carousel images
            gallery: [
            "IMG_9297.jpg"     
            ].map(f => `Pictures/Kansas/Sunflower/${f}`)
        },
        { 
            name: "Panorama Point", 
            country: "US",
            region: "Midwest",
            lat: 41.007, 
            lng: -104.031, 
            url: "https://en.wikipedia.org/wiki/Panorama_Point",
            img: "Pictures/Nebraska/Panorama/IMG_9312.jpg",

            //carousel images
            gallery: [
            "IMG_9312.jpg",
            "IMG_8931.jpg",      
            ].map(f => `Pictures/Nebraska/Panorama/${f}`)
        },
        { 
            name: "Guadalupe Mountains National Park", 
            country: "US",
            region: "Southwest",
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/Guadalupe/IMG_7818.jpg",

            //carousel images
            gallery: [
            "IMG_7818.jpg",
            "IMG_8216.jpg"       
            ].map(f => `Pictures/Texas/Guadalupe/${f}`)
        },
        { 
            name: "Mt. Rogers", 
            country: "US",
            region: "Appalachian",
            lat: 36.659, 
            lng: -81.154, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Virginia/Rogers/IMG_4354.jpg",

            //carousel images
            gallery: [
            "IMG_4354.jpg",
            "IMG_4363.jpg"     
            ].map(f => `Pictures/Virginia/Rogers/${f}`)
        },
        { 
            name: "Black Mountain", 
            country: "US",
            region: "Appalachian",
            lat: 36.914, 
            lng: -82.893, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Kentucky/Black/IMG_4335.jpg",

            //carousel images
            gallery: [
            "IMG_4335.jpg",
            "IMG_4346.jpg"     
            ].map(f => `Pictures/Kentucky/Black/${f}`)
        },
        { 
            name: "Spruce Knob", 
            country: "US",
            region: "Appalachian",
            lat: 38.699, 
            lng: -79.532, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/West Virginia/Spruce_Knob/IMG_4372.jpg",

            //carousel images
            gallery: [
            "IMG_4372.jpg"     
            ].map(f => `Pictures/West Virginia/Spruce_Knob/${f}`)
        },
        { 
            name: "Backbone Mountain", 
            country: "US",
            region: "Appalachian",
            lat: 39.237, 
            lng: -79.485, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Maryland/Backbone/IMG_4378.jpg",

            //carousel images
            gallery: [
            "IMG_4378.jpg",
            "IMG_4383.jpg"      
            ].map(f => `Pictures/Maryland/Backbone/${f}`)
        },
        { 
            name: "Mt. Davis", 
            country: "US",
            region: "Appalachian",
            lat: 39.786, 
            lng: -79.177, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Pennsylvania/Davis/IMG_4390.jpg",

            //carousel images
            gallery: [
            "IMG_4390.jpg",
            "IMG_4385.jpg",
            "IMG_4388.jpg",
            "IMG_4396.jpg",       
            ].map(f => `Pictures/Pennsylvania/Davis/${f}`)
        },
        { 
            name: "Ebright Azimuth", 
            country: "US",
            region: "Northeast",
            lat: 39.836, 
            lng: -75.52, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Delaware/Ebright/IMG_4402.jpg",

            //carousel images
            gallery: [
            "IMG_4402.jpg",
            "IMG_4405.jpg"       
            ].map(f => `Pictures/Delaware/Ebright/${f}`)
        },
        { 
            name: "High Point", 
            country: "US",
            region: "Northeast",
            lat: 41.321, 
            lng: -74.661, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/New Jersey/High_Point/IMG_6587.jpg",

            //carousel images
            gallery: [
            "IMG_6587.jpg",
            "IMG_6584.jpg",
            "IMG_6586.jpg",
            "IMG_6593.jpg"       
            ].map(f => `Pictures/New Jersey/High_Point/${f}`)
        },
        { 
            name: "Mt. Frissell", 
            country: "US",
            region: "Northeast",
            lat: 42.051, 
            lng: -73.482, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Connecticut/Frissell/IMG_6640.jpg",

            //carousel images
            gallery: [
            "IMG_6640.jpg"     
            ].map(f => `Pictures/Connecticut/Frissell/${f}`)
        },
        { 
            name: "Mt. Greylock", 
            country: "US",
            region: "Northeast",
            lat: 42.637, 
            lng: -73.166, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Massachusets/Greylock/IMG_6597.jpg",

            //carousel images
            gallery: [
            "IMG_6597.jpg"      
            ].map(f => `Pictures/Massachusets/Greylock/${f}`)
        },
        { 
            name: "Jerimoth Hill", 
            country: "US",
            region: "Northeast",
            lat: 41.849, 
            lng: -71.779, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Rhode Island/Jerimoth/IMG_6634.jpg",

            //carousel images
            gallery: [
            "IMG_6634.jpg",
            "IMG_6659.jpg"      
            ].map(f => `Pictures/Rhode Island/Jerimoth/${f}`)
        },
        { 
            name: "Campbell Hill", 
            country: "US",
            region: "Midwest",
            lat: 40.370, 
            lng: -83.720, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Ohio/Campbell/IMG_6628.jpg",

            //carousel images
            gallery: [
            "IMG_6628.jpg"      
            ].map(f => `Pictures/Ohio/Campbell/${f}`)
        },
        { 
            name: "Hoosier Hill", 
            country: "US",
            region: "Midwest",
            lat: 40.001, 
            lng: -84.848, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Indiana/Hoosier/IMG_6629.jpg",

            //carousel images
            gallery: [
            "IMG_6629.jpg"       
            ].map(f => `Pictures/Indiana/Hoosier/${f}`)
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
            img: "Pictures/Idaho/Rafting/CAN_0009.jpg",

            //carousel images
            gallery: [
            "CAN_0008.jpg",
            "CAN_0009.jpg",
            "CAN_0043.jpg",
            "CAN_0104.jpg"       
            ].map(f => `Pictures/Idaho/Rafting/${f}`)
        },
        { 
            name: "Antelope Canyon Kayak", 
            country: "US",
            region: "Southwest",
            lat: 36.939, 
            lng: -111.431, 
            url: "https://www.kayakpowell.com/",
            img: "Pictures/Arizona/Antelope/IMG_1167.jpg",

            //carousel images
            gallery: [
            "IMG_1120.jpg",
            "IMG_1130.jpg",
            "IMG_1167.jpg",
            "IMG_3842.jpg",
            "IMG_3843.jpg"       
            ].map(f => `Pictures/Arizona/Antelope/${f}`)
        },
        { 
            name: "Mt. Adams", 
            country: "US",
            region: "West Coast",
            lat: 46.202, 
            lng: -121.491, 
            url: "https://en.wikipedia.org/wiki/Mount_Adams_(Washington)",
            img: "Pictures/Washington/Adams/IMG_1551.jpg",

            //carousel images
            gallery: [
            "IMG_1523.jpg",
            "IMG_1551.jpg",
            "IMG_3840.jpg",
            "IMG_3841.jpg"      
            ].map(f => `Pictures/Washington/Adams/${f}`)
        },
        { 
            name: "Black Canyon of the Colorado River", 
            country: "US",
            region: "Rocky Mountain",
            lat: 35.993, 
            lng: -114.739, 
            url: "https://en.wikipedia.org/wiki/Black_Canyon_of_the_Colorado",
            img: "Pictures/Nevada/Black_Canyon/IMG_2313.jpg",

            //carousel images
            gallery: [
            "IMG_2291.jpg",
            "IMG_2313.jpg"       
            ].map(f => `Pictures/Nevada/Black_Canyon/${f}`)
        },
        { 
            name: "La Jolla Paragliding", 
            country: "US",
            region: "West Coast",
            lat: 32.980, 
            lng: -117.251, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/La_Jolla/GEO_0408.jpg",

            //carousel images
            gallery: [
            "GEO_0341.jpg",
            "GEO_0402.jpg",
            "GEO_0404.jpg",
            "GEO_0408.jpg",
            "GEO_0411.jpg",       
            ].map(f => `Pictures/California/La_Jolla/${f}`)
        },
        { 
            name: "Lower Calf Creek", 
            country: "US",
            region: "Southwest",
            lat: 37.829, 
            lng: -111.420, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Calf_Creek/IMG_2109.jpg",

            //carousel images
            gallery: [
            "IMG_2109.jpg"     
            ].map(f => `Pictures/Utah/Calf_Creek/${f}`)
        },
        { 
            name: "Sedona", 
            country: "US",
            region: "Southwest",
            lat: 34.869, 
            lng: -111.760, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Sedona/IMG_3131.jpg",

            //carousel images
            gallery: [
            "IMG_3131.jpg",
            "IMG_3141.jpg",
            "IMG_3188.jpg",
            "IMG_3202.jpg",
            "IMG_3585.jpg",
            "IMG_3590.jpg",
            "IMG_3614.jpg",
            "sedonastand.jpg",
            "DJI_0008.jpg"       
            ].map(f => `Pictures/Arizona/Sedona/${f}`)
        },
        { 
            name: "Pfeifferhorn", 
            country: "US",
            region: "Rocky Mountain",
            lat: 40.533, 
            lng: -111.706, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Pfeifferhorn/IMG_0087.JPG",

            //carousel images
            gallery: [
            "IMG_0087.JPG",
            "IMG_8670.jpg",
            "IMG_8680.jpg"       
            ].map(f => `Pictures/Utah/Pfeifferhorn/${f}`)
        },
        { 
            name: "Sawtooths", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.141, 
            lng: -115.010, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Thompson/IMG_9159.jpg",

            //carousel images
            gallery: [
            "IMG_9159.jpg",
            "IMG_9232.jpg"       
            ].map(f => `Pictures/Idaho/Thompson/${f}`)
        },
        { 
            name: "Goat Canyon Trestle", 
            country: "US",
            region: "Southwest",
            lat: 32.729, 
            lng: -116.183, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Goat_Canyon/GOPR4197.JPG",

            //carousel images
            gallery: [
            "GoatCanyonDown.jpg",
            "GoatCanyonDrone.jpg",
            "IMG_3832.jpg",
            "IMG_3833.jpg",
            "RailroadDown.jpg",
            "GOPR4197.JPG",
            "TunnelDrone.jpg",
            "goat1.jpg",       
            ].map(f => `Pictures/California/Goat_Canyon/${f}`)
        },
        { 
            name: "Salome Jug", 
            country: "US",
            region: "Southwest",
            lat: 33.770, 
            lng: -111.119, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Jug/IMG_3823.jpg",

            //carousel images
            gallery: [
            "IMG_3823.jpg"
            ].map(f => `Pictures/Arizona/Jug/${f}`)
        },
        { 
            name: "Buckskin Gulch", 
            country: "US",
            region: "Southwest",
            lat: 37.017, 
            lng: -112.001, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Buckskin/IMG_3949.jpg",

            //carousel images
            gallery: [
            "IMG_3949.jpg",
            "IMG_3943.jpg",
            "IMG_3955.jpg",
            "buckskin1.jpg",
            ].map(f => `Pictures/Utah/Buckskin/${f}`)
            
        },
        { 
            name: "Ausangate", 
            country: "PE",
            region: "Cusco",
            lat: -13.758, 
            lng: -71.218, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/Ausangate/IMG_4894.jpg",

            //carousel images
            gallery: [
            "IMG_4894.jpg",
            "DJI_0053.jpg",
            "IMG_5217.jpg",
            "IMG_5218.jpg"
            ].map(f => `Pictures/Peru/Ausangate/${f}`)
        },
        { 
            name: "Salkantay", 
            country: "PE",
            region: "Cusco",
            lat: -13.381, 
            lng: -72.584, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/Salkantay/IMG_4672.jpg",

            //carousel images
            gallery: [
            "IMG_4672.jpg",
            "IMG_4799.jpg",
            "IMG_4699.jpg",
            "salkantay1.jpg",
            "salkantay2.jpg",
            "salkantay3.jpg",
            "salkantay4.jpg",
            "salkantay5.jpg",
            "salkantay6.jpg",
            "salkantay7.jpg"
            ].map(f => `Pictures/Peru/Salkantay/${f}`)
        },
        { 
            name: "Ice Lake Basin", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.814, 
            lng: -107.808, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Colorado/Ice_Lake/IMG_5476.jpg",

            //carousel images
            gallery: [
            "IMG_5476.jpg",
            "IMG_5481.jpg",
            "dji_0037.jpg",
            "ice_lake.jpg",
            "icelake1.jpg",
            "icelake2.jpg",
            ].map(f => `Pictures/Colorado/Ice_Lake/${f}`)
        },
        { 
            name: "Great Barrier Reef", 
            country: "AU",
            region: "Queensland",
            lat: -16.73, 
            lng: 146.271, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/GBR/IMG_6500.jpg",

            //carousel images
            gallery: [
            "IMG_6500.jpg",
            "gbr1.jpg",
            "gbr2.jpg",
            "gbr3.jpg"
            ].map(f => `Pictures/Australia/GBR/${f}`)
        },
        { 
            name: "Wallaman Falls", 
            country: "AU",
            region: "Queensland",
            lat: -18.59, 
            lng: 145.802, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/Wallaman/wallamanfalls.jpg",

            //carousel images
            gallery: [
            "wallamanfalls.jpg",
            "IMG_6263.jpg"
            ].map(f => `Pictures/Australia/Wallaman/${f}`)
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
            img: "Pictures/Arizona/Superstitions/IMG_3812.jpg",

            //carousel images
            gallery: [
            "IMG_3522.jpg",
            "IMG_3812.jpg",
            "IMG_3813.jpg",
            "IMG_3831.jpg",
            "IMG_3834.jpg",
            "IMG_3839.jpg",
            "IMG_6730.jpg"
            ].map(f => `Pictures/Arizona/Superstitions/${f}`)
        },
        {
            name: "Kirkham Hot Springs",
            country: "US",
            region: "Rocky Mountain",
            lat: 44.072, 
            lng: -115.546, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Kirkham/IMG_3497.jpg",

            //carousel images
            gallery: [
            "IMG_3497.jpg",
            "dji_0012.jpg",
            ].map(f => `Pictures/Idaho/Kirkham/${f}`)
        },
        {
            name: "Fossil Creek",
            country: "US",
            region: "Southwest",
            lat: 34.145, 
            lng: -111.605, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Fossil/IMG_3822.jpg",
            
            //carousel images
            gallery: [
            "IMG_3822.jpg"
            ].map(f => `Pictures/Arizona/Fossil/${f}`)
        },
        { 
            name: "Pikes Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 38.840, 
            lng: -105.042, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Colorado/Pikes/IMG_0909.jpg",

            //carousel images
            gallery: [
            "IMG_0888.jpg",
            "IMG_0898.jpg",
            "IMG_0904.jpg",
            "IMG_0909.jpg"
            ].map(f => `Pictures/Colorado/Pikes/${f}`)
        },
        {
            name: "Coal Mine Canyon",
            country: "US",
            region: "Southwest",
            lat: 36.012, 
            lng: -110.989, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Coal_Mine/IMG_0825.jpg",

            //carousel images
            gallery: [
            "IMG_0825.jpg",
            "IMG_5296.jpg",
            ].map(f => `Pictures/Arizona/Coal_Mine/${f}`)
        },
        {
            name: "Panther Creek Falls",
            country: "US",
            region: "West Coast",
            lat: 45.867, 
            lng: -121.828, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Washington/Panther/IMG_1502.jpg",

            //carousel images
            gallery: [
            "IMG_1498.jpg",
            "IMG_1502.jpg",
            "IMG_1508.jpg"
            ].map(f => `Pictures/Washington/Panther/${f}`)
        },
        {
            name: "Blue Heart Springs",
            country: "US",
            region: "Rocky Mountain",
            lat: 42.170, 
            lng: -114.829, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Idaho/Blue_Heart/IMG_1605.jpg",

            //carousel images
            gallery: [
            "IMG_1605.jpg"
            ].map(f => `Pictures/Idaho/Blue_Heart/${f}`)
        },
        {
            name: "Donut Falls",
            country: "US",
            region: "Rocky Mountain",
            lat: 40.613, 
            lng: -111.654, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Donut/IMG_1650.jpg",

            //carousel images
            gallery: [
            "IMG_1647.jpg",
            "IMG_1650.jpg"
            ].map(f => `Pictures/Utah/Donut/${f}`)
        },
        {
            name: "Imperial Sand Dunes",
            country: "US",
            region: "Southwest",
            lat: 32.982, 
            lng: -115.132, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Imperial/IMG_3759.jpg",

            //carousel images
            gallery: [
            "IMG_3759.jpg",
            "imperial1.jpg"
            ].map(f => `Pictures/California/Imperial/${f}`)
        },
        {
            name: "Black Sands Beach",
            country: "US",
            region: "West Coast",
            lat: 37.824, 
            lng: -122.508, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/California/Black_Sand/IMG_7640.jpg",
            
            gallery: [
            "IMG_7640.jpg"
            ].map(f => `Pictures/California/Black_Sand/${f}`)
        },
        {
            name: "Four Peaks",
            country: "US",
            region: "Southwest",
            lat: 33.684, 
            lng: -111.325, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Four_Peaks/IMG_7751.jpg",

            gallery: [
            "IMG_7751.jpg"
            ].map(f => `Pictures/Arizona/Four_Peaks/${f}`)
        },
        {
            name: "Chiricahua National Monument",
            country: "US",
            region: "Southwest",
            lat: 32.008, 
            lng: -109.319, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Chiricahua/IMG_8082.jpg",

            gallery: [
            "IMG_8082.jpg"
            ].map(f => `Pictures/Arizona/Chiricahua/${f}`)
        },
        {
            name: "Valley of Fire",
            country: "US",
            region: "Southwest",
            lat: 36.482, 
            lng: -114.552, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Nevada/Valley_of_Fire/IMG_4058.jpg",

            gallery: [
            "IMG_4058.jpg",
            "IMG_4055.jpg",
            ].map(f => `Pictures/Nevada/Valley_of_Fire/${f}`)
        },
        {
            name: "Grand Staircase Escalante",
            country: "US",
            region: "Southwest",
            lat: 37.460, 
            lng: -111.594, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Utah/Grand_Staircase/Grand_Staircase.jpg",

            gallery: [
            "Grand_Staircase.jpg",
            "IMG_3922.jpg",
            "escalante1.jpg",
            ].map(f => `Pictures/Utah/Grand_Staircase/${f}`)
        },
        { 
            name: "Machu Picchu", 
            country: "PE",
            region: "Cusco",
            lat: -13.163, 
            lng: -72.545, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/Salkantay/IMG_4832.jpg",

            gallery: [
            "IMG_4832.jpg",
            "IMG_4841.jpg"
            ].map(f => `Pictures/Peru/Salkantay/${f}`)
        },
        { 
            name: "Pallay Punchu", 
            country: "PE",
            region: "Cusco",
            lat: -14.463, 
            lng: -71.136, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Peru/Pallay_Punchu/pallay_punchu.jpg",

            gallery: [
            "pallay_punchu.jpg",
            "2.7.1.jpg",
            "IMG_5003.jpg",
            "pallay1.jpg",
            "pallay2.jpg",
            "pallay3.jpg"
            ].map(f => `Pictures/Peru/Pallay_Punchu/${f}`)
        },
        { 
            name: "Monument Valley", 
            country: "US",
            region: "Southwest",
            lat: 36.951, 
            lng: -110.082, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Arizona/Monument/IMG_5606.jpg",

            gallery: [
            "IMG_5606.jpg"
            ].map(f => `Pictures/Arizona/Monument/${f}`)
        },
        { 
            name: "Whitehaven Beach", 
            country: "AU",
            region: "Queensland",
            lat: -20.251, 
            lng: 149.021, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/Whitehaven/IMG_6216.jpg",

            gallery: [
            "IMG_6216.jpg",
            "whitehaven1.jpg",
            ].map(f => `Pictures/Australia/Whitehaven/${f}`)
        },
        { 
            name: "Daintree Rainforest", 
            country: "AU",
            region: "Queensland",
            lat: -16.075, 
            lng: 145.469, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/Daintree/IMG_6107.jpg",

            gallery: [
            "IMG_6107.jpg",
            "dji_0006.jpg",
            "daintree1.jpg",
            "daintree2.jpg",
            "daintree3.jpg"
            ].map(f => `Pictures/Australia/Daintree/${f}`)
        },
        { 
            name: "Sydney Opera House", 
            country: "AU",
            region: "New South Wales",
            lat: -33.857, 
            lng: 151.215, 
            url: "https://en.wikipedia.org/wiki/La_Jolla",
            img: "Pictures/Australia/Sydney/IMG_6367.jpg",

            gallery: [
            "IMG_6367.jpg"
            ].map(f => `Pictures/Australia/Sydney/${f}`)
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

