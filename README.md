# Earth to Ian — Adventure Atlas

A personal travel atlas built with vanilla JavaScript, HTML, and CSS. No build tools or framework required — open `index.html` in a browser or serve with any static file server.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Map | Leaflet.js (CDN) |
| Fonts | Google Fonts — Lora (location pages) |
| Scripting | Vanilla ES modules (no bundler) |
| Styles | Plain CSS with custom properties |
| Markdown | Custom renderer in `js/utils.js` |

---

## Key Files

```
index.html              Home page (interactive map)
location.html           Individual location detail page
country.html            Per-country location listing
countries.html          All countries overview
highpoints.html         State highpoints tracker (50 states)
national-parks.html     National parks tracker (63 parks)
about.html              About page with stats
year-in-review.html     Year in review page

script.js               Home page map logic
location.js             Location detail page logic
country.js              Country page logic
countries.js            Countries page logic
highpoints.js           Highpoints tracker logic
national-parks.js       National parks tracker logic
about.js                About page logic

locations-data.js       Master list of all locations (parks, mountains, adventures, sightseeing)
highpoints-data.js      All 50 US state highpoints with visited status
national-parks-data.js  All 63 US national parks with visited status
hike-stats-data.js      Difficulty ratings for hikes, keyed by location ID
routes-data.js          Standalone map routes not tied to any location marker
country-names.js        ISO 3166-1 alpha-2 → full country name lookup
icons.js                Leaflet marker icon definitions per category
gallery-manifest.js     Auto-generated image lists per gallery folder (see scripts/)

js/carousel.js          Shared carousel component (with lightbox)
js/lightbox.js          Shared full-screen image lightbox
js/menu.js              Hamburger nav menu
js/utils.js             Shared utilities (setPageMeta, escapeHtml, loadMarkdown, markdownToHtml)

journals/               One JS file per location that has a journal entry
journals/index.js       Imports and re-exports all journals keyed by location ID

descriptions/           Markdown content files
  parks/                Park overview descriptions
  highpoints/           Highpoint overview descriptions
  adventures/           Adventure overview descriptions
  sightseeing/          Sightseeing overview descriptions
  logistics/            How-to-get-there / trip logistics per location
  notes/                Personal notes per location
  about/                About page sections (who-i-am.md, why-this-exists.md, etc.)

routes/                 GeoJSON route files for map overlays
Pictures/               All site images, organized by country then location name

scripts/
  generate-gallery-manifest.ps1   Regenerates gallery-manifest.js from the Pictures folder
  validate-locations.ps1          Checks locations-data.js for common issues
```

---

## Location ID Format

Every location gets a unique ID derived from its name automatically:

```
id = name.toLowerCase()
         .replace(/[^a-z0-9]+/g, "-")
         .replace(/(^-|-$)/g, "")
```

Examples:
- `"Yellowstone National Park"` → `yellowstone-national-park`
- `"Mt. Whitney"` → `mt-whitney`
- `"Brasstown Bald"` → `brasstown-bald`

This same ID is used as the URL parameter, the journal key, the hike stats key, and the route association key.

---

## Scripts

**Regenerate the gallery manifest** after adding images to `Pictures/`:
```powershell
.\scripts\generate-gallery-manifest.ps1
```

**Validate location data** for missing files, duplicate IDs, bad URLs:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate-locations.ps1
```

---

## Content Guide

See **[CONTENT_GUIDE.md](CONTENT_GUIDE.md)** for step-by-step instructions on adding every type of content.
