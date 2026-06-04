# Content Guide

Step-by-step instructions for adding and updating every type of content on the site.

---

## Table of Contents

1. [Adding a New Location](#1-adding-a-new-location)
2. [Adding a Journal Entry](#2-adding-a-journal-entry)
3. [Adding a Map Route](#3-adding-a-map-route)
4. [Adding Hike Difficulty Stats](#4-adding-hike-difficulty-stats)
5. [Updating the Highpoints Tracker](#5-updating-the-highpoints-tracker)
6. [Updating the National Parks Tracker](#6-updating-the-national-parks-tracker)
7. [Adding Gallery Images](#7-adding-gallery-images)
8. [Adding a New Country](#8-adding-a-new-country)

---

## 1. Adding a New Location

### Step 1 — Add the entry to `locations-data.js`

Open `locations-data.js` and add an object to the appropriate category array:

| Category | Used for |
|---|---|
| `park` | National/state parks |
| `mountain` | State highpoints and major peaks |
| `adventure` | Hikes, multi-day treks, water activities, climbs |
| `sightseeing` | Landmarks, scenic viewpoints, day trips |

**Minimum required fields:**
```js
{
  name: "Rocky Mountain National Park",
  country: "US",           // ISO 3166-1 alpha-2 code (see country-names.js)
  region: "Rocky Mountain",
  lat: 40.3428,
  lng: -105.6836,
  url: "https://en.wikipedia.org/wiki/Rocky_Mountain_National_Park",
  img: "Pictures/Colorado/RMNP/IMG_0001.jpg",  // hero image shown in popup + page
}
```

**Optional fields:**
```js
{
  // Date the location was visited — shown on the location page as "Visited July 2024 · 1 year ago"
  // Supports three levels of precision:
  dateVisited: "2024-07-15",   // full date
  dateVisited: "2024-07",      // month only (displays as "July 2024")
  dateVisited: "2024",         // year only

  // Markdown content files (paths relative to site root)
  descriptionMd: "descriptions/parks/rmnp.md",
  logisticsMd:   "descriptions/logistics/rmnp.md",
  notesMd:       "descriptions/notes/rmnp.md",

  // Gallery — choose ONE of these:
  galleryDir: "Pictures/Colorado/RMNP/",  // auto-loads all images in that folder
  gallery: ["Pictures/Colorado/RMNP/IMG_0001.jpg", ...],  // explicit list

  // Map route overlay (GeoJSON file path)
  routeGeoJson: "routes/rmnp-trail.geojson",

  // Embedded video
  video: {
    provider: "youtube",   // or "vimeo"
    id: "VIDEO_ID_HERE",
    title: "Rocky Mountain National Park",
    aspect: "landscape",   // or "portrait" (default)
  },
}
```

> **The location ID** is auto-derived from the name:
> `"Rocky Mountain National Park"` → `rocky-mountain-national-park`
> This ID is used everywhere — URLs, journals, stats, routes.

---

### Step 2 — Create the markdown files

Create each file referenced in `descriptionMd`, `logisticsMd`, and `notesMd`. These are plain markdown files with basic formatting support (`#` headings, `**bold**`, `*italic*`, `- lists`).

**File locations by category:**
```
descriptions/parks/[slug].md
descriptions/highpoints/[slug].md
descriptions/adventures/[slug].md
descriptions/sightseeing/[slug].md
descriptions/logistics/[slug].md    ← all categories share this folder
descriptions/notes/[slug].md        ← all categories share this folder
```

Slug is typically the location ID or a short version of it. It just needs to match the path you put in `locations-data.js`.

---

### Step 3 — Add images

Put images in `Pictures/[Country]/[LocationName]/`. Use consistent folder names.

Run the gallery manifest script to register new images:
```powershell
.\scripts\generate-gallery-manifest.ps1
```

This regenerates `gallery-manifest.js`. If you're using `galleryDir`, this step is required for images to appear in the carousel.

---

### Step 4 — (Highpoints only) Mark as visited in the tracker

If the new location is a state highpoint, find its entry in `highpoints-data.js` and add the `locationId`:
```js
{ state: "Colorado", name: "Mt. Elbert", elevation: 14440, locationId: "mt-elbert" },
```

---

### Step 5 — (National parks only) Mark as visited in the tracker

Find the park entry in `national-parks-data.js` and add the `locationId`:
```js
{ name: "Rocky Mountain", state: "Colorado", locationId: "rocky-mountain-national-park" },
```

---

## 2. Adding a Journal Entry

Journals appear on `mountain` category location pages only.

### Step 1 — Create the journal file

Create `journals/[location-id].js`. The ID must exactly match the location's ID in `locations-data.js`.

```js
// journals/mt-elbert.js
export default {
  id: "mt-elbert",
  title: "Mt. Elbert Summit Day",
  date: "2024-07-04",     // displayed as-is; leave empty string if not set yet
  content: `
    <p>Your journal text here. Raw HTML is supported.</p>
    <p>Add as many paragraphs as needed.</p>
  `
};
```

### Step 2 — Register it in `journals/index.js`

Add an import and an entry to the exported object:

```js
// At the top with other imports:
import mtElbert from "./mt-elbert.js";

// In the export default object:
[mtElbert.id]: mtElbert,
```

---

## 3. Adding a Map Route

Routes appear as orange dashed lines on the map. They can be tied to a location marker (shown when the popup opens) or standalone (shown when the Routes toggle is on).

### Getting a GeoJSON file

1. Export a GPX from Strava, Garmin Connect, or AllTrails
2. Convert at [gpx.studio](https://gpx.studio) → open GPX → export as GeoJSON
3. Or draw a route manually at [geojson.io](https://geojson.io)

GeoJSON coordinates are **[longitude, latitude]** — the reverse of Leaflet's usual order.

**For multiple trails at one location**, use a FeatureCollection in a single file:
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Trail One" },
      "geometry": { "type": "LineString", "coordinates": [[lng, lat], ...] }
    },
    {
      "type": "Feature",
      "properties": { "name": "Trail Two" },
      "geometry": { "type": "LineString", "coordinates": [[lng, lat], ...] }
    }
  ]
}
```

### Option A — Route tied to a location marker

Save the file to `routes/[name].geojson`, then add `routeGeoJson` to the location entry in `locations-data.js`:
```js
routeGeoJson: "routes/rmnp-trail.geojson",
```
The route appears when the marker popup is opened, and when the Routes toggle is on.

### Option B — Standalone route (no marker)

Save the file to `routes/[name].geojson`, then add an entry to `routes-data.js`:
```js
export default [
  { file: "routes/misc.geojson" },
  { file: "routes/your-new-route.geojson" },  // ← add here
];
```
The route only appears when the Routes toggle is on.

---

## 4. Adding Hike Difficulty Stats

Difficulty stats appear on location pages as a scored breakdown with a difficulty badge and progress bars.

### Scoring system

Each hike gets four scores (1–10):

| Component | Weight |
|---|---|
| Length | 0.6 |
| Elevation Gain | 0.8 |
| Technicality | 0.7 |
| External Factors | 0.5 |

Formula: `(length×0.6 + elevationGain×0.8 + technicality×0.7 + externalFactors×0.5) / 4`

Difficulty labels: Easy (<2.0) · Moderate (<2.75) · Hard (<3.75) · Very Hard (<5.5) · Extreme (5.5+)

### Adding an entry

Add to `hike-stats-data.js`, keyed by location ID:

```js
"rocky-mountain-national-park": {
  hike: "Sky Pond Trail",      // name of the specific trail
  length: 6,
  elevationGain: 7,
  technicality: 4,
  externalFactors: 5,
  enjoyment: 9,
},
```

The stats section will automatically appear on that location's page.

---

## 5. Updating the Highpoints Tracker

`highpoints-data.js` contains all 50 state highpoints. When a highpoint has been visited and has a location page, add its `locationId`:

```js
// Before:
{ state: "Montana", name: "Granite Peak", elevation: 12807, locationId: null },

// After visiting:
{ state: "Montana", name: "Granite Peak", elevation: 12807, locationId: "granite-peak" },
```

The tracker will automatically show it as completed and link to the location page.

---

## 6. Updating the National Parks Tracker

`national-parks-data.js` contains all 63 US national parks. Same pattern as highpoints:

```js
// Before:
{ name: "Acadia", state: "Maine", locationId: null },

// After visiting:
{ name: "Acadia", state: "Maine", locationId: "acadia-national-park" },
```

---

## 7. Adding Gallery Images

1. Add images to `Pictures/[Country]/[LocationName]/`
2. Run the manifest generator:
   ```powershell
   .\scripts\generate-gallery-manifest.ps1
   ```
3. If the location uses `galleryDir`, images appear automatically. If it uses an explicit `gallery` array, add the paths manually.

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`, `.svg`

---

## 8. Adding a New Country

`country-names.js` already contains all 249 ISO 3166-1 alpha-2 codes. If you visit a new country just add its code to a location entry in `locations-data.js` — the full name will resolve automatically.

If for any reason a code is missing, add it to the `COUNTRY_NAMES` object in `country-names.js`:
```js
XY: "Country Name",
```

---

## Quick Reference — Files to Update Per Task

| Task | Files to update |
|---|---|
| New location | `locations-data.js`, markdown files, `gallery-manifest.js` (run script) |
| New highpoint | Above + `highpoints-data.js` |
| New national park | Above + `national-parks-data.js` |
| New journal | `journals/[id].js` (create), `journals/index.js` (register) |
| New route (location-linked) | `routes/[name].geojson` (create), `locations-data.js` (add `routeGeoJson`) |
| New route (standalone) | `routes/[name].geojson` (create), `routes-data.js` (add entry) |
| New hike stats | `hike-stats-data.js` (add entry) |
| New images | `Pictures/` folder, then run `generate-gallery-manifest.ps1` |
