// Difficulty data for hikes/adventures. Keyed by location ID.
// Scores are 1–10. Weighted formula: (length*0.6 + elevationGain*0.8 + technicality*0.7 + externalFactors*0.5) / 4
// Max weighted score: 6.5

export function computeWeightedScore({ length, elevationGain, technicality, externalFactors }) {
  return (length * 0.6 + elevationGain * 0.8 + technicality * 0.7 + externalFactors * 0.5) / 4;
}

export function getDifficultyLabel(score) {
  if (score < 2.0) return "Very Easy";
  if (score < 3.0) return "Easy";
  if (score < 3.8) return "Moderate";
  if (score < 4.5) return "Hard";
  if (score < 5.5) return "Very Hard";
  return "Extreme";
}

export default {
  "mt-whitney": {
    hike: "Mt. Whitney",
    length: 9, elevationGain: 9, technicality: 7, externalFactors: 8, enjoyment: 9,
  },
  "mt-adams": {
    hike: "Mt. Adams",
    length: 7, elevationGain: 9, technicality: 7, externalFactors: 8, enjoyment: 9,
  },
  "borah-peak": {
    hike: "Mt. Borah",
    length: 7, elevationGain: 8, technicality: 7, externalFactors: 8, enjoyment: 9,
  },
  "pfeifferhorn": {
    hike: "Pfeifferhorn",
    length: 7, elevationGain: 8, technicality: 7, externalFactors: 7, enjoyment: 8,
  },
  "sawtooths": {
    hike: "Thompson Peak",
    length: 8, elevationGain: 8, technicality: 6, externalFactors: 6, enjoyment: 8,
  },
  "mt-elbert": {
    hike: "Mt. Elbert",
    length: 8, elevationGain: 8, technicality: 4, externalFactors: 7, enjoyment: 8,
  },
  "grand-canyon-national-park": {
    hike: "Rim to River",
    length: 9, elevationGain: 8, technicality: 4, externalFactors: 7, enjoyment: 9,
  },
  "salkantay": {
    hike: "Salkantay Trek",
    length: 10, elevationGain: 6, technicality: 5, externalFactors: 7, enjoyment: 9,
  },
  "acatenango-and-fuego-volcanoes": {
    hike: "Acatenango + Fuego",
    length: 7, elevationGain: 8, technicality: 5, externalFactors: 7, enjoyment: 9,
  },
  "wheeler-peak": {
    hike: "Wheeler Peak (NM)",
    length: 7, elevationGain: 7, technicality: 6, externalFactors: 7, enjoyment: 8,
  },
  "humphreys-peak": {
    hike: "Humphreys Peak",
    length: 8, elevationGain: 7, technicality: 5, externalFactors: 7, enjoyment: 8,
  },
  "great-basin-national-park": {
    hike: "Wheeler Peak (NV)",
    length: 7, elevationGain: 7, technicality: 5, externalFactors: 7, enjoyment: 7,
  },
  "grand-teton-national-park": {
    hike: "Delta Lake Trio",
    length: 7, elevationGain: 7, technicality: 5, externalFactors: 6, enjoyment: 8,
  },
  "san-juan-mountains": {
    hike: "Ice Lake Basin",
    length: 7, elevationGain: 7, technicality: 4, externalFactors: 7, enjoyment: 9,
  },
  "mount-rainier-national-park": {
    hike: "Camp Muir Climb",
    length: 5, elevationGain: 7, technicality: 6, externalFactors: 6, enjoyment: 7,
  },
  "guadalupe-peak": {
    hike: "Guadalupe Peak",
    length: 7, elevationGain: 7, technicality: 4, externalFactors: 5, enjoyment: 7,
  },
  "four-peaks": {
    hike: "Browns Peak",
    length: 5, elevationGain: 6, technicality: 7, externalFactors: 7, enjoyment: 7,
  },
  "ausangate": {
    hike: "Ausangate Lakes",
    length: 6, elevationGain: 4, technicality: 4, externalFactors: 8, enjoyment: 8,
  },
  "pinnacles-national-park": {
    hike: "High Peaks Trail",
    length: 7, elevationGain: 6, technicality: 4, externalFactors: 3, enjoyment: 7,
  },
  "bryce-canyon-national-park": {
    hike: "Fairyland Loop",
    length: 7, elevationGain: 5, technicality: 4, externalFactors: 4, enjoyment: 7,
  },
  "salome-jug": {
    hike: "The Jug",
    length: 5, elevationGain: 4, technicality: 7, externalFactors: 6, enjoyment: 7,
  },
  "mt-rogers": {
    hike: "Mt. Rogers",
    length: 7, elevationGain: 6, technicality: 3, externalFactors: 3, enjoyment: 6,
  },
  "lower-calf-creek": {
    hike: "Lower Calf Creek Falls",
    length: 6, elevationGain: 5, technicality: 3, externalFactors: 3, enjoyment: 8,
  },
  "buckskin-gulch": {
    hike: "Buckskin Gulch",
    length: 5, elevationGain: 2, technicality: 4, externalFactors: 3, enjoyment: 7,
  },
  "black-mesa": {
    hike: "Black Mesa",
    length: 7, elevationGain: 2, technicality: 2, externalFactors: 2, enjoyment: 3,
  },
  "arches-national-park": {
    hike: "Delicate Arch",
    length: 3, elevationGain: 2, technicality: 4, externalFactors: 4, enjoyment: 7,
  },
  "goat-canyon-trestle": {
    hike: "Goat Canyon Trestle",
    length: 7, elevationGain: 1, technicality: 2, externalFactors: 3, enjoyment: 6,
  },
  "channel-islands-national-park": {
    hike: "Smugglers Cove",
    length: 6, elevationGain: 4, technicality: 3, externalFactors: 3, enjoyment: 6,
  },
  "donut-falls": {
    hike: "Donut Falls",
    length: 3, elevationGain: 2, technicality: 3, externalFactors: 3, enjoyment: 5,
  },
  "tenorio-national-park": {
    hike: "Rio Celeste Trail",
    length: 2, elevationGain: 2, technicality: 3, externalFactors: 2, enjoyment: 8,
  },
  "mt-frissell": {
    hike: "Mt Frissell South Slope",
    length: 2, elevationGain: 3, technicality: 3, externalFactors: 3, enjoyment: 5,
  },
  "brasstown-bald": {
    hike: "Brasstown Bald",
    length: 2, elevationGain: 3, technicality: 2, externalFactors: 2, enjoyment: 4,
  },
  "wallaman-falls": {
    hike: "Wallaman Falls",
    length: 2, elevationGain: 3, technicality: 2, externalFactors: 3, enjoyment: 7,
  },
  "havasupai": {
    hike: "Havasupai",
    length: 7, elevationGain: 5, technicality: 4, externalFactors: 5, enjoyment: 8,
  },
  "panther-creek-falls": {
    hike: "Panther Creek Falls",
    length: 1, elevationGain: 1, technicality: 2, externalFactors: 2, enjoyment: 6,
  },
  "north-cascades-national-park": {
    hike: "Wing Lake",
    length: 5, elevationGain: 5, technicality: 5, externalFactors: 4, enjoyment: 7,
  },
  "rocky-mountain-national-park": {
    hike: "Lake Haiyaha",
    length: 3, elevationGain: 3, technicality: 3, externalFactors: 3, enjoyment: 6,
  },
  "south-sister": {
    hike: "South Sister Climb",
    length: 1, elevationGain: 1, technicality: 1, externalFactors: 1, enjoyment: 1,
  },
  "lassen-volcanic-national-park": {
    hike: "Lassen Peak",
    length: 1, elevationGain: 1, technicality: 1, externalFactors: 1, enjoyment: 1,
  },

  
  "superstitions": [
  {
    hike: "Flatiron",
    length: 6, elevationGain: 7, technicality: 7, externalFactors: 5, enjoyment: 7,
  },
  {
    hike: "Superstition Peak",
    length: 7, elevationGain: 7, technicality: 7, externalFactors: 5, enjoyment: 7,
  },
  {
    hike: "La Barge Battleship",
    length: 8, elevationGain: 7, technicality: 6, externalFactors: 4, enjoyment: 7,
  },
  ],
  "zion-national-park": [
  {
    hike: "Angels Landing",
    length: 5, elevationGain: 6, technicality: 6, externalFactors: 6, enjoyment: 8,
  },
  {
    hike: "The Narrows to Big Springs",
    length: 7, elevationGain: 3, technicality: 6, externalFactors: 4, enjoyment: 8,
  },
  ],
  "sedona": [
  {
    hike: "West Fork Oak Creek",
    length: 5, elevationGain: 3, technicality: 4, externalFactors: 4, enjoyment: 6,
  },
  {
    hike: "Bear Mountain",
    length: 6, elevationGain: 6, technicality: 6, externalFactors: 5, enjoyment: 5,
  },
  {
    hike: "Boynton Canyon to Subway",
    length: 6, elevationGain: 3, technicality: 3, externalFactors: 2, enjoyment: 6,
  },
  {
    hike: "Devil's Bridge",
    length: 4, elevationGain: 2, technicality: 3, externalFactors: 4, enjoyment: 5,
  },
  ],
  "fossil-creek": [
  {
    hike: "Fossil Creek",
    length: 2, elevationGain: 2, technicality: 2, externalFactors: 3, enjoyment: 7,
  },
  {
    hike: "Bob Bear to Fossil Springs",
    length: 7, elevationGain: 5, technicality: 4, externalFactors: 4, enjoyment: 8,
  },
  ],
  
};
