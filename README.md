# EarthtoIanWebsite
A website for showing all of the Earth to Ian Adventures

## Data validation
Run the location data validator from the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate-locations.ps1
```

The script checks:
- Missing image and markdown paths
- Duplicate names and ID slug collisions
- Placeholder URLs
- `galleryDir` folder and manifest consistency
- Video provider/id consistency
