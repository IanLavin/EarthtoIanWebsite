// locations-data.js

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove punctuation
    .replace(/\s+/g, "-");    // spaces -> hyphens
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
            descriptionMd: "descriptions/parks/yellowstone.md",
            logisticsMd: "descriptions/logistics/yellowstone.md",
            notesMd: "descriptions/notes/yellowstone.md",
            video: {
                provider: "youtube",
                id: "geZ6cnGRJ5Y",
                title: "Yellowstone National Park"
            },
            

            //carousel images
            galleryDir: "Pictures/Wyoming/Yellowstone/"
            
        },
        { 
            name: "Grand Teton National Park",
            country: "US",
            region: "Rocky Mountain",
            lat: 43.74, 
            lng: -110.8, 
            url: "https://en.wikipedia.org/wiki/Grand_Teton_National_Park",
            img: "Pictures/Wyoming/Grand_Teton/IMG_2769.jpg",
            descriptionMd: "descriptions/parks/grand-teton.md",
            logisticsMd: "descriptions/logistics/grand-teton.md",
            notesMd: "descriptions/notes/grand-teton.md",
            video: {
                provider: "youtube",
                id: "Lh5fXupAQ_Q",
                title: "Grand Teton National Park"
            },

            //carousel images
            galleryDir: "Pictures/Wyoming/Grand_Teton/"
        },
        { 
            name: "Crater Lake National Park",
            country: "US",
            region: "West Coast", 
            lat: 42.94, 
            lng: -122.10, 
            url: "https://en.wikipedia.org/wiki/Crater_Lake_National_Park",
            img: "Pictures/Oregon/IMG_5284.jpg",
            descriptionMd: "descriptions/parks/crater-lake.md",
            logisticsMd: "descriptions/logistics/crater-lake.md",
            notesMd: "descriptions/notes/crater-lake.md",

            //carousel images
            galleryDir: "Pictures/Oregon/"
        },
        { 
            name: "Redwood National Park", 
            country: "US",
            region: "West Coast",
            lat: 41.4, 
            lng: -124.04, 
            url: "https://en.wikipedia.org/wiki/Redwood_National_and_State_Parks",
            img: "Pictures/California/Redwoods/IMG_0033.JPG",
            descriptionMd: "descriptions/parks/redwood.md",
            logisticsMd: "descriptions/logistics/redwood.md",
            notesMd: "descriptions/notes/redwood.md",

            //carousel images
            galleryDir: "Pictures/California/Redwoods/"
        },
        { 
            name: "Pinnacles National Park", 
            country: "US",
            region: "West Coast",
            lat: 36.49, 
            lng: -121.48, 
            url: "https://en.wikipedia.org/wiki/Pinnacles_National_Park",
            img: "Pictures/California/Pinnacles/IMG_7520.jpg",
            descriptionMd: "descriptions/parks/pinnacles.md",
            logisticsMd: "descriptions/logistics/pinnacles.md",
            notesMd: "descriptions/notes/pinnacles.md",

            //carousel images
            galleryDir: "Pictures/California/Pinnacles/"
        },
        { 
            name: "Death Valley National Park", 
            country: "US",
            region: "Southwest",
            lat: 36.5, 
            lng: -117.05, 
            url: "https://en.wikipedia.org/wiki/Death_Valley_National_Park",
            img: "Pictures/California/Death_Valley/IMG_2337.jpg",
            descriptionMd: "descriptions/parks/death-valley.md",
            logisticsMd: "descriptions/logistics/death-valley.md",
            notesMd: "descriptions/notes/death-valley.md",
            video: {
                provider: "youtube",
                id: "TCg3fATvpNc",
                title: "Death Valley National Park"
            },

            //carousel images
            galleryDir: "Pictures/California/Death_Valley/"
        },
        { 
            name: "Channel Islands National Park", 
            country: "US",
            region: "West Coast",
            lat: 34.0, 
            lng: -119.69, 
            url: "https://en.wikipedia.org/wiki/Channel_Islands_National_Park",
            img: "Pictures/California/Channel_Islands/IMG_0669.jpg",
            descriptionMd: "descriptions/parks/channel-islands.md",
            logisticsMd: "descriptions/logistics/channel-islands.md",
            notesMd: "descriptions/notes/channel-islands.md",
            video: {
                provider: "youtube",
                id: "5v8PHOO0CC4",
                title: "Channel Islands National Park"
            },

            //carousel images
            galleryDir: "Pictures/California/Channel_Islands/"
        },
        { 
            name: "Joshua Tree National Park", 
            country: "US",
            region: "Southwest",
            lat: 33.87, 
            lng: -115.9, 
            url: "https://en.wikipedia.org/wiki/Joshua_Tree_National_Park",
            img: "Pictures/California/Joshua_Tree/IMG_8823.jpg",
            descriptionMd: "descriptions/parks/joshua-tree.md",
            logisticsMd: "descriptions/logistics/joshua-tree.md",
            notesMd: "descriptions/notes/joshua-tree.md",
            video: {
                provider: "vimeo",
                id: "1165548842",
                title: "Joshua Tree National Park"
            },

            //carousel images
            galleryDir: "Pictures/California/Joshua_Tree/"
        },
        { 
            name: "Grand Canyon National Park", 
            country: "US",
            region: "Southwest",
            lat: 36.05, 
            lng: -112.14, 
            url: "https://en.wikipedia.org/wiki/Grand_Canyon",
            img: "Pictures/Arizona/Grand_Canyon/Grand_Canyon.jpg",
            descriptionMd: "descriptions/parks/grand-canyon.md",
            logisticsMd: "descriptions/logistics/grand-canyon.md",
            notesMd: "descriptions/notes/grand-canyon.md",
            video: {
                provider: "youtube",
                id: "gDmYIRtXbOk",
                title: "Grand Canyon National Park"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Grand_Canyon/"
        },
        { 
            name: "Great Basin National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.98, 
            lng: -114.31, 
            url: "https://en.wikipedia.org/wiki/Great_Basin_National_Park",
            img: "Pictures/Nevada/Great Basin/IMG_1194.jpg",
            descriptionMd: "descriptions/parks/great-basin.md",
            logisticsMd: "descriptions/logistics/great-basin.md",
            notesMd: "descriptions/notes/great-basin.md",
            video: {
                provider: "youtube",
                id: "--QMBKcCAyY",
                title: "Great Basin National Park"
            },

            //carousel images
            galleryDir: "Pictures/Nevada/Great Basin/"
        },
        { 
            name: "Saguaro National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.27, 
            lng: -111.19, 
            url: "https://en.wikipedia.org/wiki/Saguaro_National_Park",
            img: "Pictures/Arizona/Saguaro/IMG_8402.jpg",
            descriptionMd: "descriptions/parks/saguaro.md",
            logisticsMd: "descriptions/logistics/saguaro.md",
            notesMd: "descriptions/notes/saguaro.md",
            video: {
                provider: "youtube",
                id: "GRCy2U0L0GU",
                title: "Saguaro National Park"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Saguaro/"
        },
        { 
            name: "Canyonlands National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.3, 
            lng: -109.86, 
            url: "https://en.wikipedia.org/wiki/Canyonlands_National_Park",
            img: "Pictures/Utah/Canyonlands/IMG_1847.jpg",
            descriptionMd: "descriptions/parks/canyonlands.md",
            logisticsMd: "descriptions/logistics/canyonlands.md",
            notesMd: "descriptions/notes/canyonlands.md",
            video: {
                provider: "youtube",
                id: "dLRhdqfoVQU",
                title: "Canyonlands National Park"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Canyonlands/"
        },
        { 
            name: "Arches National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.73, 
            lng: -109.57, 
            url: "https://en.wikipedia.org/wiki/Arches_National_Park",
            img: "Pictures/Utah/Arches/IMG_1782.jpg",
            descriptionMd: "descriptions/parks/arches.md",
            logisticsMd: "descriptions/logistics/arches.md",
            notesMd: "descriptions/notes/arches.md",
            video: {
                provider: "youtube",
                id: "dLRhdqfoVQU",
                title: "Arches National Park"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Arches/"
        },
        { 
            name: "Capitol Reef National Park", 
            country: "US",
            region: "Southwest",
            lat: 38.08, 
            lng: -111.13, 
            url: "https://en.wikipedia.org/wiki/Capitol_Reef_National_Park",
            img: "Pictures/Utah/Capitol_Reef/IMG_3702.jpg",
            descriptionMd: "descriptions/parks/capitol-reef.md",
            logisticsMd: "descriptions/logistics/capitol-reef.md",
            notesMd: "descriptions/notes/capitol-reef.md",
            video: {
                provider: "youtube",
                id: "dLRhdqfoVQU",
                title: "Capitol Reef National Park"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Capitol_Reef/"
        },
        { 
            name: "Bryce Canyon National Park", 
            country: "US",
            region: "Southwest",
            lat: 37.61, 
            lng: -112.16, 
            url: "https://en.wikipedia.org/wiki/Bryce_Canyon_National_Park",
            img: "Pictures/Utah/Bryce/IMG_1915.jpg",
            descriptionMd: "descriptions/parks/bryce.md",
            logisticsMd: "descriptions/logistics/bryce.md",
            notesMd: "descriptions/notes/bryce.md",
            video: {
                provider: "youtube",
                id: "dLRhdqfoVQU",
                title: "Bryce Canyon National Park"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Bryce/"
        },
        { 
            name: "Zion National Park", 
            country: "US",
            region: "Southwest",
            lat: 37.22, 
            lng: -112.96, 
            url: "https://en.wikipedia.org/wiki/Zion_National_Park",
            img: "Pictures/Utah/Zion/IMG_2019.jpg",
            descriptionMd: "descriptions/parks/zion.md",
            logisticsMd: "descriptions/logistics/zion.md",
            notesMd: "descriptions/notes/zion.md",
            video: {
                provider: "youtube",
                id: "8RfgPvu8Nwo",
                title: "Zion National Park"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Zion/"
        },
        { 
            name: "White Sands National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.78, 
            lng: -106.32, 
            url: "https://en.wikipedia.org/wiki/White_Sands_National_Park",
            img: "Pictures/New Mexico/White_Sands/IMG_8276.jpg",
            descriptionMd: "descriptions/parks/white-sands.md",
            logisticsMd: "descriptions/logistics/white-sands.md",
            notesMd: "descriptions/notes/white-sands.md",
            video: {
                provider: "youtube",
                id: "_ltXpHNJNdE",
                title: "White Sands National Park"
            },

            //carousel images
            galleryDir: "Pictures/New Mexico/White_Sands/"
        },
        { 
            name: "Guadalupe Mountains National Park", 
            country: "US",
            region: "Southwest",
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/Guadalupe/IMG_7818.jpg",
            descriptionMd: "descriptions/parks/guadalupe.md",
            logisticsMd: "descriptions/logistics/guadalupe.md",
            notesMd: "descriptions/notes/guadalupe.md",
            video: {
                provider: "youtube",
                id: "_ltXpHNJNdE",
                title: "Guadalupe Mountains National Park"
            },

            //carousel images
            galleryDir: "Pictures/Texas/Guadalupe/"
        },
        { 
            name: "Great Sand Dunes National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.74, 
            lng: -105.52, 
            url: "https://en.wikipedia.org/wiki/Great_Sand_Dunes_National_Park_and_Preserve",
            img: "Pictures/Colorado/Great_Dunes/IMG_0979.jpg",
            descriptionMd: "descriptions/parks/great-sands.md",
            logisticsMd: "descriptions/logistics/great-sands.md",
            notesMd: "descriptions/notes/great-sands.md",
            video: {
                provider: "youtube",
                id: "3i2FexVpfUM",
                title: "Great Sand Dunes National Park"
            },

            //carousel images
            galleryDir: "Pictures/Colorado/Great_Dunes/"
        },
        { 
            name: "Rocky Mountain National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 40.30, 
            lng: -105.66, 
            url: "https://en.wikipedia.org/wiki/Rocky_Mountain_National_Park",
            img: "Pictures/Colorado/Rocky_Mountain/IMG_9406.jpg",
            descriptionMd: "descriptions/parks/rocky-mountain.md",
            logisticsMd: "descriptions/logistics/rocky-mountain.md",
            notesMd: "descriptions/notes/rocky-mountain.md",
            video: {
                provider: "youtube",
                id: "gFtNhW_NI7Y",
                title: "Rocky Mountain National Park"
            },

            //carousel images
            galleryDir: "Pictures/Colorado/Rocky_Mountain/"
        },
        { 
            name: "Everglades National Park", 
            country: "US",
            region: "Southeast",
            lat: 25.76, 
            lng: -80.77, 
            url: "https://en.wikipedia.org/wiki/Everglades_National_Park",
            img: "Pictures/Florida/Everglades/IMG_3699.JPG",
            descriptionMd: "descriptions/parks/everglades.md",
            logisticsMd: "descriptions/logistics/everglades.md",
            notesMd: "descriptions/notes/everglades.md",
            video: {
                provider: "youtube",
                id: "YkKwDmb07H4",
                title: "Everglades National Park"
            },

            //carousel images
            galleryDir: "Pictures/Florida/Everglades/"
        },
        { 
            name: "Biscayne National Park", 
            country: "US",
            region: "Southeast",
            lat: 25.49, 
            lng: -80.18, 
            url: "https://en.wikipedia.org/wiki/Biscayne_National_Park",
            img: "Pictures/Florida/Biscayne/IMG_0501.jpg",
            descriptionMd: "descriptions/parks/biscayne.md",
            logisticsMd: "descriptions/logistics/biscayne.md",
            notesMd: "descriptions/notes/biscayne.md",
            video: {
                provider: "youtube",
                id: "vqrTiSpibi4",
                title: "Biscayne National Park"
            },

            //carousel images
            galleryDir: "Pictures/Florida/Biscayne/"
        },
        { 
            name: "Dry Tortugas National Park", 
            country: "US",
            region: "Southeast",
            lat: 24.63, 
            lng: -82.87, 
            url: "https://en.wikipedia.org/wiki/Dry_Tortugas_National_Park",
            img: "Pictures/Florida/Dry_Tortugas/IMG_0540.jpg",
            descriptionMd: "descriptions/parks/dry-tortugas.md",
            logisticsMd: "descriptions/logistics/dry-tortugas.md",
            notesMd: "descriptions/notes/dry-tortugas.md",
            video: {
                provider: "youtube",
                id: "vqrTiSpibi4",
                title: "Dry Tortugas National Park"
            },

            //carousel images
            galleryDir: "Pictures/Florida/Dry_Tortugas/"
        },
        { 
            name: "Carlsbad Caverns National Park", 
            country: "US",
            region: "Southwest",
            lat: 32.17, 
            lng: -104.44, 
            url: "https://en.wikipedia.org/wiki/Carlsbad_Caverns_National_Park",
            img: "Pictures/New Mexico/Carlsbad/IMG_7821.jpg",
            descriptionMd: "descriptions/parks/carlsbad.md",
            logisticsMd: "descriptions/logistics/carlsbad.md",
            notesMd: "descriptions/notes/carlsbad.md",
            video: {
                provider: "youtube",
                id: "_ltXpHNJNdE",
                title: "Carlsbad Caverns National Park"
            },

            //carousel images
            galleryDir: "Pictures/New Mexico/Carlsbad/"
        },
        { 
            name: "Shenandoah National Park", 
            country: "US",
            region: "Appalachian",
            lat: 38.475, 
            lng: -78.453, 
            url: "https://en.wikipedia.org/wiki/Shenandoah_National_Park",
            img: "Pictures/Virginia/Shenandoah/IMG_4318.jpg",
            descriptionMd: "descriptions/parks/shenandoah.md",
            logisticsMd: "descriptions/logistics/shenandoah.md",
            notesMd: "descriptions/notes/shenandoah.md",

            //carousel images
            galleryDir: "Pictures/Virginia/Shenandoah/"
        },
        { 
            name: "New River Gorge National Park", 
            country: "US",
            region: "Appalachian",
            lat: 38.068, 
            lng: -81.082, 
            url: "https://en.wikipedia.org/wiki/New_River_Gorge_National_Park",
            img: "Pictures/West Virginia/New_River/IMG_4323.jpg",
            descriptionMd: "descriptions/parks/new-river.md",
            logisticsMd: "descriptions/logistics/new-river.md",
            notesMd: "descriptions/notes/new-river.md",

            //carousel images
            galleryDir: "Pictures/West Virginia/New_River/"
        },
        { 
            name: "Mesa Verde National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.183, 
            lng: -108.487, 
            url: "https://en.wikipedia.org/wiki/Mesa_Verde_National_Park",
            img: "Pictures/Colorado/Mesa_Verde/IMG_5322.jpg",
            descriptionMd: "descriptions/parks/mesa-verde.md",
            logisticsMd: "descriptions/logistics/mesa-verde.md",
            notesMd: "descriptions/notes/mesa-verde.md",
            video: {
                provider: "youtube",
                id: "K0A16jg1hIg",
                title: "Mesa Verde National Park"
            },

            //carousel images
            galleryDir: "Pictures/Colorado/Mesa_Verde/"
        },
        { 
            name: "Black Canyon of the Gunnison National Park", 
            country: "US",
            region: "Rocky Mountain",
            lat: 38.544, 
            lng: -107.686, 
            url: "https://en.wikipedia.org/wiki/Black_Canyon_of_the_Gunnison_National_Park",
            img: "Pictures/Colorado/Black_Canyon/IMG_5380.jpg",
            descriptionMd: "descriptions/parks/black-canyon.md",
            logisticsMd: "descriptions/logistics/black-canyon.md",
            notesMd: "descriptions/notes/black-canyon.md",
            video: {
                provider: "youtube",
                id: "K0A16jg1hIg",
                title: "Black Canyon of the Gunnison National Park"
            },

            //carousel images
            galleryDir: "Pictures/Colorado/Black_Canyon/"
        },
        { 
            name: "Petrified Forest National Park", 
            country: "US",
            region: "Southwest",
            lat: 35.083, 
            lng: -109.787, 
            url: "https://en.wikipedia.org/wiki/Petrified_Forest_National_Park",
            img: "Pictures/Arizona/Petrified/IMG_5506.jpg",
            descriptionMd: "descriptions/parks/petrified-forest.md",
            logisticsMd: "descriptions/logistics/petrified-forest.md",
            notesMd: "descriptions/notes/petrified-forest.md",

            //carousel images
            galleryDir: "Pictures/Arizona/Petrified/"
        },
        { 
            name: "Olympic National Park", 
            country: "US",
            region: "West Coast",
            lat: 47.895, 
            lng: -123.934, 
            url: "https://en.wikipedia.org/wiki/Olympic_National_Park",
            img: "Pictures/Washington/Olympic/IMG_5671.jpg",
            descriptionMd: "descriptions/parks/olympic.md",
            logisticsMd: "descriptions/logistics/olympic.md",
            notesMd: "descriptions/notes/olympic.md",
            video: {
                provider: "youtube",
                id: "r0Eurg3WRIg",
                title: "Olympic National Park"
            },

            //carousel images
            galleryDir: "Pictures/Washington/Olympic/"
        },
        { 
            name: "North Cascades National Park", 
            country: "US",
            region: "West Coast",
            lat: 48.713, 
            lng: -121.114, 
            url: "https://en.wikipedia.org/wiki/North_Cascades_National_Park",
            img: "Pictures/Washington/North_Cascades/IMG_5839.jpg",
            descriptionMd: "descriptions/parks/north-cascades.md",
            logisticsMd: "descriptions/logistics/north-cascades.md",
            notesMd: "descriptions/notes/north-cascades.md",
            video: {
                provider: "youtube",
                id: "H6KO-betylg",
                title: "North Cascades National Park"
            },

            //carousel images
            galleryDir: "Pictures/Washington/North_Cascades/"
        },
        { 
            name: "Mount Rainier National Park", 
            country: "US",
            region: "West Coast",
            lat: 46.825, 
            lng: -121.760, 
            url: "https://en.wikipedia.org/wiki/Mount_Rainier_National_Park",
            img: "Pictures/Washington/Rainier/IMG_5862.jpg",
            descriptionMd: "descriptions/parks/rainier.md",
            logisticsMd: "descriptions/logistics/rainier.md",
            notesMd: "descriptions/notes/rainier.md",
            video: {
                provider: "youtube",
                id: "r0Eurg3WRIg",
                title: "Rainier National Park"
            },

            //carousel images
            galleryDir: "Pictures/Washington/Rainier/"
        },
        { 
            name: "Cuyahoga Valley National Park", 
            country: "US",
            region: "Midwest",
            lat: 41.280, 
            lng: -81.565, 
            url: "https://en.wikipedia.org/wiki/Cuyahoga_Valley_National_Park",
            img: "Pictures/Ohio/Cuyahoga/IMG_6613.jpg",
            descriptionMd: "descriptions/parks/cuyahoga.md",
            logisticsMd: "descriptions/logistics/cuyahoga.md",
            notesMd: "descriptions/notes/cuyahoga.md",

            //carousel images
            galleryDir: "Pictures/Ohio/Cuyahoga/"
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
            descriptionMd: "descriptions/highpoints/mt-whitney.md",
            logisticsMd: "descriptions/logistics/mt-whitney.md",
            notesMd: "descriptions/notes/mt-whitney.md",
            video: {
                provider: "vimeo",
                id: "1165548842",
                title: "Mt. Whitney"
            },

            //carousel images
            galleryDir: "Pictures/California/Whitney/"
        },
        { 
            name: "Mt. Elbert", 
            country: "US",
            region: "Rocky Mountain",
            lat: 39.117, 
            lng: -106.445, 
            url: "https://en.wikipedia.org/wiki/Mount_Elbert",
            img: "Pictures/Colorado/Elbert/IMG_9119.JPG",
            descriptionMd: "descriptions/highpoints/mt-elbert.md",
            logisticsMd: "descriptions/logistics/mt-elbert.md",
            notesMd: "descriptions/notes/mt-elbert.md",
            video: {
                provider: "youtube",
                id: "CLewVnWePh4",
                title: "Mt. Elbert"
            },


            //carousel images
            galleryDir: "Pictures/Colorado/Elbert/"
        },
        { 
            name: "Humphreys Peak", 
            country: "US",
            region: "Southwest",
            lat: 35.346, 
            lng: -111.677, 
            url: "https://en.wikipedia.org/wiki/Humphreys_Peak",
            img: "Pictures/Arizona/Humphreys/IMG_6070.jpg",
            descriptionMd: "descriptions/highpoints/humphreys-peak.md",
            logisticsMd: "descriptions/logistics/humphreys-peak.md",
            notesMd: "descriptions/notes/humphreys-peak.md",
            video: {
                provider: "youtube",
                id: "6jPaJobwN1s",
                title: "Mt. Elbert"
            },


            //carousel images
            galleryDir: "Pictures/Arizona/Humphreys/"
        },
        { 
            name: "Wheeler Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 36.556, 
            lng: -105.416, 
            url: "https://en.wikipedia.org/wiki/Wheeler_Peak_(New_Mexico)",
            img: "Pictures/New Mexico/Wheeler/IMG_0960.jpg",
            descriptionMd: "descriptions/highpoints/wheeler-peak.md",
            logisticsMd: "descriptions/logistics/wheeler-peak.md",
            notesMd: "descriptions/notes/wheeler-peak.md",
            video: {
                provider: "youtube",
                id: "3i2FexVpfUM",
                title: "Wheeler Peak"
            },


            //carousel images
            galleryDir: "Pictures/New Mexico/Wheeler/"
        },
        { 
            name: "Borah Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.136, 
            lng: -113.78, 
            url: "https://en.wikipedia.org/wiki/Borah_Peak",
            img: "Pictures/Idaho/Borah/borah.JPG",
            descriptionMd: "descriptions/highpoints/borah-peak.md",
            logisticsMd: "descriptions/logistics/borah-peak.md",
            notesMd: "descriptions/notes/borah-peak.md",

            //carousel images
            galleryDir: "Pictures/Idaho/Borah/"
        },
        { 
            name: "Black Mesa", 
            country: "US",
            region: "Midwest",
            lat: 36.932, 
            lng: -102.997, 
            url: "https://en.wikipedia.org/wiki/Black_Mesa_(Oklahoma,_Colorado,_New_Mexico)",
            img: "Pictures/Oklahoma/Black_Mesa/IMG_0921.jpg",
            descriptionMd: "descriptions/highpoints/black-mesa.md",
            logisticsMd: "descriptions/logistics/black-mesa.md",
            notesMd: "descriptions/notes/black-mesa.md",
            video: {
                provider: "youtube",
                id: "3i2FexVpfUM",
                title: "Black Mesa"
            },

            //carousel images
            galleryDir: "Pictures/Oklahoma/Black_Mesa/"
        },
        { 
            name: "Mount Sunflower", 
            country: "US",
            region: "Midwest",
            lat: 39.022, 
            lng: -102.037, 
            url: "https://en.wikipedia.org/wiki/Mount_Sunflower",
            img: "Pictures/Kansas/Sunflower/IMG_9297.jpg",
            descriptionMd: "descriptions/highpoints/mt-sunflower.md",
            logisticsMd: "descriptions/logistics/mt-sunflower.md",
            notesMd: "descriptions/notes/mt-sunflower.md",
            video: {
                provider: "youtube",
                id: "gFtNhW_NI7Y",
                title: "Mount Sunflower"
            },

            //carousel images
            galleryDir: "Pictures/Kansas/Sunflower/"
        },
        { 
            name: "Panorama Point", 
            country: "US",
            region: "Midwest",
            lat: 41.007, 
            lng: -104.031, 
            url: "https://en.wikipedia.org/wiki/Panorama_Point",
            img: "Pictures/Nebraska/Panorama/IMG_9312.jpg",
            descriptionMd: "descriptions/highpoints/panorama-point.md",
            logisticsMd: "descriptions/logistics/panorama-point.md",
            notesMd: "descriptions/notes/panorama-point.md",
            video: {
                provider: "youtube",
                id: "gFtNhW_NI7Y",
                title: "Panorama Point"
            },

            //carousel images
            galleryDir: "Pictures/Nebraska/Panorama/"
        },
        { 
            name: "Guadalupe Peak", 
            country: "US",
            region: "Southwest",
            lat: 31.89, 
            lng: -104.86, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Texas/Guadalupe/IMG_7818.jpg",
            descriptionMd: "descriptions/highpoints/guadalupe-peak.md",
            logisticsMd: "descriptions/logistics/guadalupe-peak.md",
            notesMd: "descriptions/notes/guadalupe-peak.md",
            video: {
                provider: "youtube",
                id: "_ltXpHNJNdE",
                title: "Guadalupe Peak"
            },

            //carousel images
            galleryDir: "Pictures/Texas/Guadalupe/"
        },
        { 
            name: "Mt. Rogers", 
            country: "US",
            region: "Appalachian",
            lat: 36.659, 
            lng: -81.154, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Virginia/Rogers/IMG_4354.jpg",
            descriptionMd: "descriptions/highpoints/mt-rogers.md",
            logisticsMd: "descriptions/logistics/mt-rogers.md",
            notesMd: "descriptions/notes/mt-rogers.md",

            //carousel images
            galleryDir: "Pictures/Virginia/Rogers/"
        },
        { 
            name: "Black Mountain", 
            country: "US",
            region: "Appalachian",
            lat: 36.914, 
            lng: -82.893, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Kentucky/Black/IMG_4335.jpg",
            descriptionMd: "descriptions/highpoints/black-mountain.md",
            logisticsMd: "descriptions/logistics/black-mountain.md",
            notesMd: "descriptions/notes/black-mountain.md",

            //carousel images
            galleryDir: "Pictures/Kentucky/Black/"
        },
        { 
            name: "Spruce Knob", 
            country: "US",
            region: "Appalachian",
            lat: 38.699, 
            lng: -79.532, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/West Virginia/Spruce_Knob/IMG_4372.jpg",
            descriptionMd: "descriptions/highpoints/spruce-knob.md",
            logisticsMd: "descriptions/logistics/spruce-knob.md",
            notesMd: "descriptions/notes/spruce-knob.md",

            //carousel images
            galleryDir: "Pictures/West Virginia/Spruce_Knob/"
        },
        { 
            name: "Backbone Mountain", 
            country: "US",
            region: "Appalachian",
            lat: 39.237, 
            lng: -79.485, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Maryland/Backbone/IMG_4378.jpg",
            descriptionMd: "descriptions/highpoints/backbone-mountain.md",
            logisticsMd: "descriptions/logistics/backbone-mountain.md",
            notesMd: "descriptions/notes/backbone-mountain.md",

            //carousel images
            galleryDir: "Pictures/Maryland/Backbone/"
        },
        { 
            name: "Mt. Davis", 
            country: "US",
            region: "Appalachian",
            lat: 39.786, 
            lng: -79.177, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Pennsylvania/Davis/IMG_4390.jpg",
            descriptionMd: "descriptions/highpoints/mt-davis.md",
            logisticsMd: "descriptions/logistics/mt-davis.md",
            notesMd: "descriptions/notes/mt-davis.md",

            //carousel images
            galleryDir: "Pictures/Pennsylvania/Davis/"
        },
        { 
            name: "Ebright Azimuth", 
            country: "US",
            region: "Northeast",
            lat: 39.836, 
            lng: -75.52, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Delaware/Ebright/IMG_4402.jpg",
            descriptionMd: "descriptions/highpoints/ebright-azimuth.md",
            logisticsMd: "descriptions/logistics/ebright-azimuth.md",
            notesMd: "descriptions/notes/ebright-azimuth.md",

            //carousel images
            galleryDir: "Pictures/Delaware/Ebright/"
        },
        { 
            name: "High Point", 
            country: "US",
            region: "Northeast",
            lat: 41.321, 
            lng: -74.661, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/New Jersey/High_Point/IMG_6587.jpg",
            descriptionMd: "descriptions/highpoints/high-point.md",
            logisticsMd: "descriptions/logistics/high-point.md",
            notesMd: "descriptions/notes/high-point.md",

            //carousel images
            galleryDir: "Pictures/New Jersey/High_Point/"
        },
        { 
            name: "Mt. Frissell", 
            country: "US",
            region: "Northeast",
            lat: 42.051, 
            lng: -73.482, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Connecticut/Frissell/IMG_6640.jpg",
            descriptionMd: "descriptions/highpoints/mt-frissell.md",
            logisticsMd: "descriptions/logistics/mt-frissell.md",
            notesMd: "descriptions/notes/mt-frissell.md",

            //carousel images
            galleryDir: "Pictures/Connecticut/Frissell/"
        },
        { 
            name: "Mt. Greylock", 
            country: "US",
            region: "Northeast",
            lat: 42.637, 
            lng: -73.166, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Massachusets/Greylock/IMG_6597.jpg",
            descriptionMd: "descriptions/highpoints/mt-greylock.md",
            logisticsMd: "descriptions/logistics/mt-greylock.md",
            notesMd: "descriptions/notes/mt-greylock.md",

            //carousel images
            galleryDir: "Pictures/Massachusets/Greylock/"
        },
        { 
            name: "Jerimoth Hill", 
            country: "US",
            region: "Northeast",
            lat: 41.849, 
            lng: -71.779, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Rhode Island/Jerimoth/IMG_6634.jpg",
            descriptionMd: "descriptions/highpoints/jerimoth-hill.md",
            logisticsMd: "descriptions/logistics/jerimoth-hill.md",
            notesMd: "descriptions/notes/jerimoth-hill.md",

            //carousel images
            galleryDir: "Pictures/Rhode Island/Jerimoth/"
        },
        { 
            name: "Campbell Hill", 
            country: "US",
            region: "Midwest",
            lat: 40.370, 
            lng: -83.720, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Ohio/Campbell/IMG_6628.jpg",
            descriptionMd: "descriptions/highpoints/campbell-hill.md",
            logisticsMd: "descriptions/logistics/campbell-hill.md",
            notesMd: "descriptions/notes/campbell-hill.md",

            //carousel images
            galleryDir: "Pictures/Ohio/Campbell/"
        },
        { 
            name: "Hoosier Hill", 
            country: "US",
            region: "Midwest",
            lat: 40.001, 
            lng: -84.848, 
            url: "https://en.wikipedia.org/wiki/Guadalupe_Mountains_National_Park",
            img: "Pictures/Indiana/Hoosier/IMG_6629.jpg",
            descriptionMd: "descriptions/highpoints/hoosier-hill.md",
            logisticsMd: "descriptions/logistics/hoosier-hill.md",
            notesMd: "descriptions/notes/hoosier-hill.md",

            //carousel images
            galleryDir: "Pictures/Indiana/Hoosier/"
        },
        { 
            name: "Britton Hill", 
            country: "US",
            region: "Southeast",
            lat: 30.986, 
            lng: -86.281, 
            url: "https://en.wikipedia.org/wiki/Britton_Hill",
            img: "Pictures/Florida/Britton/IMG_6907.jpg",
            descriptionMd: "descriptions/highpoints/britton-hill.md",
            logisticsMd: "descriptions/logistics/britton-hill.md",
            notesMd: "descriptions/notes/britton-hill.md",

            //carousel images
            galleryDir: "Pictures/Florida/Britton/"
        },
            
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
            descriptionMd: "descriptions/adventures/south_fork.md",
            logisticsMd: "descriptions/logistics/south_fork.md",
            notesMd: "descriptions/notes/south_fork.md",
            video: {
                provider: "youtube",
                id: "ck5EwiccYbw",
                title: "Whitewater Rafting"
            },

            //carousel images
            galleryDir: "Pictures/Idaho/Rafting/"
        },
        { 
            name: "Antelope Canyon Kayak", 
            country: "US",
            region: "Southwest",
            lat: 36.939, 
            lng: -111.431, 
            url: "https://www.kayakpowell.com/",
            img: "Pictures/Arizona/Antelope/IMG_1167.jpg",
            descriptionMd: "descriptions/adventures/antelope.md",
            logisticsMd: "descriptions/logistics/antelope.md",
            notesMd: "descriptions/notes/antelope.md",
            video: {
                provider: "youtube",
                id: "--QMBKcCAyY",
                title: "Antelope Canyon Kayak"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Antelope/"
        },
        { 
            name: "Mt. Adams", 
            country: "US",
            region: "West Coast",
            lat: 46.202, 
            lng: -121.491, 
            url: "https://en.wikipedia.org/wiki/Mount_Adams_(Washington)",
            img: "Pictures/Washington/Adams/IMG_1551.jpg",
            descriptionMd: "descriptions/adventures/adams.md",
            logisticsMd: "descriptions/logistics/adams.md",
            notesMd: "descriptions/notes/adams.md",
            video: {
                provider: "youtube",
                id: "ck5EwiccYbw",
                title: "Mt. Adams"
            },

            //carousel images
            galleryDir: "Pictures/Washington/Adams/"
        },
        { 
            name: "Black Canyon of the Colorado River", 
            country: "US",
            region: "Southwest",
            lat: 35.993, 
            lng: -114.739, 
            url: "https://en.wikipedia.org/wiki/Black_Canyon_of_the_Colorado",
            img: "Pictures/Nevada/Black_Canyon/IMG_2313.jpg",
            descriptionMd: "descriptions/adventures/black_canyon_colorado.md",
            logisticsMd: "descriptions/logistics/black_canyon_colorado.md",
            notesMd: "descriptions/notes/black_canyon_colorado.md",
            video: {
                provider: "youtube",
                id: "TCg3fATvpNc",
                title: "Black Canyon of the Colorado River"
            },

            //carousel images
            galleryDir: "Pictures/Nevada/Black_Canyon/"
        },
        { 
            name: "La Jolla Paragliding", 
            country: "US",
            region: "West Coast",
            lat: 32.980, 
            lng: -117.251, 
            url: "https://en.wikipedia.org/wiki/Torrey_Pines_Gliderport",
            img: "Pictures/California/La_Jolla/GEO_0408.jpg",
            descriptionMd: "descriptions/adventures/torrey_pines_paragliding.md",
            logisticsMd: "descriptions/logistics/torrey_pines_paragliding.md",
            notesMd: "descriptions/notes/torrey_pines_paragliding.md",
            video: {
                provider: "youtube",
                id: "E1dSGvSlN7k",
                title: "La Jolla Paragliding"
            },

            //carousel images
            galleryDir: "Pictures/California/La_Jolla/"
        },
        { 
            name: "Lower Calf Creek", 
            country: "US",
            region: "Southwest",
            lat: 37.829, 
            lng: -111.420, 
            url: "https://en.wikipedia.org/wiki/Lower_Calf_Creek_Falls",
            img: "Pictures/Utah/Calf_Creek/IMG_2109.jpg",
            descriptionMd: "descriptions/adventures/calf_creek.md",
            logisticsMd: "descriptions/logistics/calf_creek.md",
            notesMd: "descriptions/notes/calf_creek.md",
            video: {
                provider: "youtube",
                id: "dLRhdqfoVQU",
                title: "Lower Calf Creek"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Calf_Creek/"
        },
        { 
            name: "Sedona", 
            country: "US",
            region: "Southwest",
            lat: 34.869, 
            lng: -111.760, 
            url: "https://en.wikipedia.org/wiki/Sedona,_Arizona",
            img: "Pictures/Arizona/Sedona/IMG_3131.jpg",
            descriptionMd: "descriptions/adventures/sedona.md",
            logisticsMd: "descriptions/logistics/sedona.md",
            notesMd: "descriptions/notes/sedona.md",
            video: {
                provider: "youtube",
                id: "V4teaEamomE",
                title: "Sedona"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Sedona/"
        },
        { 
            name: "Pfeifferhorn", 
            country: "US",
            region: "Rocky Mountain",
            lat: 40.533, 
            lng: -111.706, 
            url: "https://en.wikipedia.org/wiki/Pfeifferhorn",
            img: "Pictures/Utah/Pfeifferhorn/IMG_0087.JPG",
            descriptionMd: "descriptions/adventures/pfeifferhorn.md",
            logisticsMd: "descriptions/logistics/pfeifferhorn.md",
            notesMd: "descriptions/notes/pfeifferhorn.md",
            video: {
                provider: "vimeo",
                id: "1165862465",
                title: "Pfeifferhorn"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Pfeifferhorn/"
        },
        { 
            name: "Sawtooths", 
            country: "US",
            region: "Rocky Mountain",
            lat: 44.141, 
            lng: -115.010, 
            url: "https://en.wikipedia.org/wiki/Sawtooth_Range_(Idaho)",
            img: "Pictures/Idaho/Thompson/IMG_9159.jpg",
            descriptionMd: "descriptions/adventures/sawtooth.md",
            logisticsMd: "descriptions/logistics/sawtooth.md",
            notesMd: "descriptions/notes/sawtooth.md",
            video: {
                provider: "youtube",
                id: "y8mbyq_AgH4",
                title: "Sawtooths"
            },

            //carousel images
            galleryDir: "Pictures/Idaho/Thompson/"
        },
        { 
            name: "Goat Canyon Trestle", 
            country: "US",
            region: "Southwest",
            lat: 32.729, 
            lng: -116.183, 
            url: "https://en.wikipedia.org/wiki/Goat_Canyon_Trestle",
            img: "Pictures/California/Goat_Canyon/GOPR4197.JPG",
            descriptionMd: "descriptions/adventures/goat_canyon.md",
            logisticsMd: "descriptions/logistics/goat_canyon.md",
            notesMd: "descriptions/notes/goat_canyon.md",
            video: {
                provider: "youtube",
                id: "SDrLnDs12EI",
                title: "Goat Canyon Trestle"
            },

            //carousel images
            galleryDir: "Pictures/California/Goat_Canyon/"
        },
        { 
            name: "Salome Jug", 
            country: "US",
            region: "Southwest",
            lat: 33.770, 
            lng: -111.119, 
            url: "https://www.fs.usda.gov/recarea/tonto/recarea/?recid=35517",
            img: "Pictures/Arizona/Jug/IMG_3823.jpg",
            descriptionMd: "descriptions/adventures/jug.md",
            logisticsMd: "descriptions/logistics/jug.md",
            notesMd: "descriptions/notes/jug.md",
            video: {
                provider: "youtube",
                id: "miEzLRUMHD8",
                title: "Salome Jug"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Jug/"
        },
        { 
            name: "Buckskin Gulch", 
            country: "US",
            region: "Southwest",
            lat: 37.017, 
            lng: -112.001, 
            url: "https://en.wikipedia.org/wiki/Buckskin_Gulch",
            img: "Pictures/Utah/Buckskin/IMG_3949.jpg",
            descriptionMd: "descriptions/adventures/buckskin.md",
            logisticsMd: "descriptions/logistics/buckskin.md",
            notesMd: "descriptions/notes/buckskin.md",
            video: {
                provider: "youtube",
                id: "y22yx8XXa14",
                title: "Buckskin Gulch"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Buckskin/"
            
        },
        { 
            name: "Ausangate", 
            country: "PE",
            region: "Cusco",
            lat: -13.758, 
            lng: -71.218, 
            url: "https://en.wikipedia.org/wiki/Ausangate",
            img: "Pictures/Peru/Ausangate/IMG_4894.jpg",
            descriptionMd: "descriptions/adventures/ausangate.md",
            logisticsMd: "descriptions/logistics/ausangate.md",
            notesMd: "descriptions/notes/ausangate.md",
            video: {
                provider: "youtube",
                id: "rIGaGZw_XeI",
                title: "Ausangate"
            },

            //carousel images
            galleryDir: "Pictures/Peru/Ausangate/"
        },
        { 
            name: "Salkantay", 
            country: "PE",
            region: "Cusco",
            lat: -13.381, 
            lng: -72.584, 
            url: "https://en.wikipedia.org/wiki/Salkantay",
            img: "Pictures/Peru/Salkantay/IMG_4672.jpg",
            descriptionMd: "descriptions/adventures/salkantay.md",
            logisticsMd: "descriptions/logistics/salkantay.md",
            notesMd: "descriptions/notes/salkantay.md",
            video: {
                provider: "youtube",
                id: "ZqSTk2njJH8",
                title: "Salkantay"
            },

            //carousel images
            galleryDir: "Pictures/Peru/Salkantay/"
        },
        { 
            name: "San Juan Mountains", 
            country: "US",
            region: "Rocky Mountain",
            lat: 37.814, 
            lng: -107.808, 
            url: "https://www.fs.usda.gov/recarea/sanjuan/recarea/?recid=43014",
            img: "Pictures/Colorado/Ice_Lake/IMG_5476.jpg",
            descriptionMd: "descriptions/adventures/ice_lake.md",
            logisticsMd: "descriptions/logistics/ice_lake.md",
            notesMd: "descriptions/notes/ice_lake.md",
            video: {
                provider: "youtube",
                id: "K0A16jg1hIg",
                title: "Ice Lake Basin"
            },

            //carousel images
            galleryDir: "Pictures/Colorado/Ice_Lake/"
        },
        { 
            name: "Great Barrier Reef", 
            country: "AU",
            region: "Queensland",
            lat: -16.73, 
            lng: 146.271, 
            url: "https://en.wikipedia.org/wiki/Great_Barrier_Reef",
            img: "Pictures/Australia/GBR/IMG_6500.jpg",
            descriptionMd: "descriptions/adventures/gbr.md",
            logisticsMd: "descriptions/logistics/gbr.md",
            notesMd: "descriptions/notes/gbr.md",
            video: {
                provider: "youtube",
                id: "_zcbBXvOS9E",
                title: "Great Barrier Reef"
            },

            //carousel images
            galleryDir: "Pictures/Australia/GBR/"
        },
        { 
            name: "Wallaman Falls", 
            country: "AU",
            region: "Queensland",
            lat: -18.59, 
            lng: 145.802, 
            url: "https://en.wikipedia.org/wiki/Wallaman_Falls",
            img: "Pictures/Australia/Wallaman/wallamanfalls.jpg",
            descriptionMd: "descriptions/adventures/wallaman.md",
            logisticsMd: "descriptions/logistics/wallaman.md",
            notesMd: "descriptions/notes/wallaman.md",
            video: {
                provider: "youtube",
                id: "2TUXGEB_C_o",
                title: "Wallaman Falls"
            },

            //carousel images
            galleryDir: "Pictures/Australia/Wallaman/"
        }
    ],

    sightseeing: [
        {
            name: "Superstitions",
            country: "US",
            region: "Southwest",
            lat: 33.438, 
            lng: -111.454, 
            url: "https://en.wikipedia.org/wiki/Superstition_Mountains",
            img: "Pictures/Arizona/Superstitions/IMG_3812.jpg",
            descriptionMd: "descriptions/sightseeing/superstitions.md",
            logisticsMd: "descriptions/logistics/superstitions.md",
            notesMd: "descriptions/notes/superstitions.md",
            video: {
                provider: "youtube",
                id: "XTLuTiATB3M",
                title: "Superstitions"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Superstitions/"
        },
        {
            name: "Kirkham Hot Springs",
            country: "US",
            region: "Rocky Mountain",
            lat: 44.072, 
            lng: -115.546, 
            url: "https://www.fs.usda.gov/recarea/boise/recarea/?recid=5199",
            img: "Pictures/Idaho/Kirkham/IMG_3497.jpg",
            descriptionMd: "descriptions/sightseeing/kirkham_hot_springs.md",
            logisticsMd: "descriptions/logistics/kirkham_hot_springs.md",
            notesMd: "descriptions/notes/kirkham_hot_springs.md",

            //carousel images
            galleryDir: "Pictures/Idaho/Kirkham/"
        },
        {
            name: "Fossil Creek",
            country: "US",
            region: "Southwest",
            lat: 34.145, 
            lng: -111.605, 
            url: "https://en.wikipedia.org/wiki/Fossil_Creek",
            img: "Pictures/Arizona/Fossil/IMG_3822.jpg",
            descriptionMd: "descriptions/sightseeing/fossil_creek.md",
            logisticsMd: "descriptions/logistics/fossil_creek.md",
            notesMd: "descriptions/notes/fossil_creek.md",
            video: {
                provider: "youtube",
                id: "fxspDquRst0",
                title: "Fossil Springs"
            },

            //carousel images
            galleryDir: "Pictures/Arizona/Fossil/"
        },
        { 
            name: "Pikes Peak", 
            country: "US",
            region: "Rocky Mountain",
            lat: 38.840, 
            lng: -105.042, 
            url: "https://en.wikipedia.org/wiki/Pikes_Peak",
            img: "Pictures/Colorado/Pikes/IMG_0909.jpg",
            descriptionMd: "descriptions/sightseeing/pikes.md",
            logisticsMd: "descriptions/logistics/pikes.md",
            notesMd: "descriptions/notes/pikes.md",
            video: {
                provider: "youtube",
                id: "3i2FexVpfUM",
                title: "Pikes Peak"
            },

            //carousel images
            galleryDir: "Pictures/Colorado/Pikes/"
        },
        {
            name: "Coal Mine Canyon",
            country: "US",
            region: "Southwest",
            lat: 36.012, 
            lng: -110.989, 
            url: "https://en.wikipedia.org/wiki/Coal_Mine_Canyon",
            img: "Pictures/Arizona/Coal_Mine/IMG_0825.jpg",
            descriptionMd: "descriptions/sightseeing/coal_mine.md",
            logisticsMd: "descriptions/logistics/coal_mine.md",
            notesMd: "descriptions/notes/coal_mine.md",

            //carousel images
            galleryDir: "Pictures/Arizona/Coal_Mine/"
        },
        {
            name: "Panther Creek Falls",
            country: "US",
            region: "West Coast",
            lat: 45.867, 
            lng: -121.828, 
            url: "https://en.wikipedia.org/wiki/Panther_Creek_Falls",
            img: "Pictures/Washington/Panther/IMG_1502.jpg",
            descriptionMd: "descriptions/sightseeing/panther_creek.md",
            logisticsMd: "descriptions/logistics/panther_creek.md",
            notesMd: "descriptions/notes/panther_creek.md",
            video: {
                provider: "youtube",
                id: "ck5EwiccYbw",
                title: "Panther Creek Falls"
            },

            //carousel images
            galleryDir: "Pictures/Washington/Panther/"
        },
        {
            name: "Blue Heart Springs",
            country: "US",
            region: "Rocky Mountain",
            lat: 42.710, 
            lng: -114.829, 
            url: "https://www.visitidaho.org/things-to-do/kayaking-paddle-boarding/blue-heart-springs/",
            img: "Pictures/Idaho/Blue_Heart/IMG_1605.jpg",
            descriptionMd: "descriptions/sightseeing/blue_heart.md",
            logisticsMd: "descriptions/logistics/blue_heart.md",
            notesMd: "descriptions/notes/blue_heart.md",
            video: {
                provider: "youtube",
                id: "IztlBA11xus",
                title: "Blue Heart Springs"
            },

            //carousel images
            galleryDir: "Pictures/Idaho/Blue_Heart/"
        },
        {
            name: "Donut Falls",
            country: "US",
            region: "Rocky Mountain",
            lat: 40.613, 
            lng: -111.654, 
            url: "https://en.wikipedia.org/wiki/Donut_Falls",
            img: "Pictures/Utah/Donut/IMG_1650.jpg",
            descriptionMd: "descriptions/sightseeing/donut_falls.md",
            logisticsMd: "descriptions/logistics/donut_falls.md",
            notesMd: "descriptions/notes/donut_falls.md",
            video: {
                provider: "youtube",
                id: "IztlBA11xus",
                title: "Donut Falls"
            },

            //carousel images
            galleryDir: "Pictures/Utah/Donut/"
        },
        {
            name: "Imperial Sand Dunes",
            country: "US",
            region: "Southwest",
            lat: 32.982, 
            lng: -115.132, 
            url: "https://en.wikipedia.org/wiki/Algodones_Dunes",
            img: "Pictures/California/Imperial/IMG_3759.jpg",
            descriptionMd: "descriptions/sightseeing/imperial_sand.md",
            logisticsMd: "descriptions/logistics/imperial_sand.md",
            notesMd: "descriptions/notes/imperial_sand.md",
            video: {
                provider: "youtube",
                id: "E1dSGvSlN7k",
                title: "Imperial Sand Dunes"
            },

            //carousel images
            galleryDir: "Pictures/California/Imperial/"
        },
        {
            name: "Black Sands Beach",
            country: "US",
            region: "West Coast",
            lat: 37.824, 
            lng: -122.508, 
            url: "https://en.wikipedia.org/wiki/Black_sand",
            img: "Pictures/California/Black_Sand/IMG_7640.jpg",
            descriptionMd: "descriptions/sightseeing/black_sand_beach.md",
            logisticsMd: "descriptions/logistics/black_sand_beach.md",
            notesMd: "descriptions/notes/black_sand_beach.md",

            galleryDir: "Pictures/California/Black_Sand/"
        },
        {
            name: "Four Peaks",
            country: "US",
            region: "Southwest",
            lat: 33.684, 
            lng: -111.325, 
            url: "https://en.wikipedia.org/wiki/Four_Peaks",
            img: "Pictures/Arizona/Four_Peaks/IMG_7751.jpg",
            descriptionMd: "descriptions/sightseeing/four_peaks.md",
            logisticsMd: "descriptions/logistics/four_peaks.md",
            notesMd: "descriptions/notes/four_peaks.md",

            galleryDir: "Pictures/Arizona/Four_Peaks/"
        },
        {
            name: "Chiricahua National Monument",
            country: "US",
            region: "Southwest",
            lat: 32.008, 
            lng: -109.319, 
            url: "https://en.wikipedia.org/wiki/Chiricahua_National_Monument",
            img: "Pictures/Arizona/Chiricahua/IMG_8082.jpg",
            descriptionMd: "descriptions/sightseeing/chiricahua.md",
            logisticsMd: "descriptions/logistics/chiricahua.md",
            notesMd: "descriptions/notes/chiricahua.md",
            video: {
                provider: "youtube",
                id: "_ltXpHNJNdE",
                title: "Chiricahua National Monument"
            },

            galleryDir: "Pictures/Arizona/Chiricahua/"
        },
        {
            name: "Valley of Fire",
            country: "US",
            region: "Southwest",
            lat: 36.482, 
            lng: -114.552, 
            url: "https://en.wikipedia.org/wiki/Valley_of_Fire_State_Park",
            img: "Pictures/Nevada/Valley_of_Fire/IMG_4058.jpg",
            descriptionMd: "descriptions/sightseeing/valley_fire.md",
            logisticsMd: "descriptions/logistics/valley_fire.md",
            notesMd: "descriptions/notes/valley_fire.md",
            video: {
                provider: "youtube",
                id: "y22yx8XXa14",
                title: "Valley of Fire"
            },

            galleryDir: "Pictures/Nevada/Valley_of_Fire/"
        },
        {
            name: "Grand Staircase Escalante",
            country: "US",
            region: "Southwest",
            lat: 37.460, 
            lng: -111.594, 
            url: "https://en.wikipedia.org/wiki/Grand_Staircase%E2%80%93Escalante_National_Monument",
            img: "Pictures/Utah/Grand_Staircase/Grand_Staircase.jpg",
            descriptionMd: "descriptions/sightseeing/grand_staircase.md",
            logisticsMd: "descriptions/logistics/antelope.md",
            notesMd: "descriptions/notes/antelope.md",

            galleryDir: "Pictures/Utah/Grand_Staircase/"
        },
        { 
            name: "Machu Picchu", 
            country: "PE",
            region: "Cusco",
            lat: -13.163, 
            lng: -72.545, 
            url: "https://en.wikipedia.org/wiki/Machu_Picchu",
            img: "Pictures/Peru/Salkantay/IMG_4832.jpg",
            descriptionMd: "descriptions/sightseeing/machu.md",
            logisticsMd: "descriptions/logistics/machu.md",
            notesMd: "descriptions/notes/machu.md",
            video: {
                provider: "youtube",
                id: "ZqSTk2njJH8",
                title: "Machu Picchu"
            },

            galleryDir: "Pictures/Peru/Salkantay/"
        },
        { 
            name: "Pallay Punchu", 
            country: "PE",
            region: "Cusco",
            lat: -14.463, 
            lng: -71.136, 
            url: "https://www.peruhop.com/pallay-punchu-mountain/",
            img: "Pictures/Peru/Pallay_Punchu/pallay_punchu.jpg",
            descriptionMd: "descriptions/sightseeing/pallay.md",
            logisticsMd: "descriptions/logistics/pallay.md",
            notesMd: "descriptions/notes/pallay.md",
            video: {
                provider: "youtube",
                id: "rIGaGZw_XeI",
                title: "Pallay Punchu"
            },

            galleryDir: "Pictures/Peru/Pallay_Punchu/"
        },
        { 
            name: "Monument Valley", 
            country: "US",
            region: "Southwest",
            lat: 36.951, 
            lng: -110.082, 
            url: "https://en.wikipedia.org/wiki/Monument_Valley",
            img: "Pictures/Arizona/Monument/IMG_5606.jpg",
            descriptionMd: "descriptions/sightseeing/monument_valley.md",
            logisticsMd: "descriptions/logistics/monument_valley.md",
            notesMd: "descriptions/notes/monument_valley.md",
            video: {
                provider: "youtube",
                id: "K0A16jg1hIg",
                title: "Monument Valley"
            },

            galleryDir: "Pictures/Arizona/Monument/"
        },
        { 
            name: "Whitehaven Beach", 
            country: "AU",
            region: "Queensland",
            lat: -20.251, 
            lng: 149.021, 
            url: "https://en.wikipedia.org/wiki/Whitehaven_Beach",
            img: "Pictures/Australia/Whitehaven/IMG_6216.jpg",
            descriptionMd: "descriptions/sightseeing/whitehaven.md",
            logisticsMd: "descriptions/logistics/whitehaven.md",
            notesMd: "descriptions/notes/whitehaven.md",
            video: {
                provider: "youtube",
                id: "2TUXGEB_C_o",
                title: "Whitehaven Beach"
            },

            galleryDir: "Pictures/Australia/Whitehaven/"
        },
        { 
            name: "Daintree Rainforest", 
            country: "AU",
            region: "Queensland",
            lat: -16.075, 
            lng: 145.469, 
            url: "https://en.wikipedia.org/wiki/Daintree_Rainforest",
            img: "Pictures/Australia/Daintree/IMG_6107.jpg",
            descriptionMd: "descriptions/sightseeing/daintree.md",
            logisticsMd: "descriptions/logistics/daintree.md",
            notesMd: "descriptions/notes/daintree.md",
            video: {
                provider: "youtube",
                id: "2TUXGEB_C_o",
                title: "Daintree Rainforest"
            },

            galleryDir: "Pictures/Australia/Daintree/"
        },
        { 
            name: "Sydney Opera House", 
            country: "AU",
            region: "New South Wales",
            lat: -33.857, 
            lng: 151.215, 
            url: "https://en.wikipedia.org/wiki/Sydney_Opera_House",
            img: "Pictures/Australia/Sydney/IMG_6367.jpg",
            descriptionMd: "descriptions/sightseeing/opera_house.md",
            logisticsMd: "descriptions/logistics/opera_house.md",
            notesMd: "descriptions/notes/opera_house.md",

            galleryDir: "Pictures/Australia/Sydney/"
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




