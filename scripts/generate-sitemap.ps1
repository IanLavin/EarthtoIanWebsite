# generate-sitemap.ps1
# Generates sitemap.xml from locations-data.js and static pages.
# Run from the repo root: .\scripts\generate-sitemap.ps1

param(
    [string]$BaseUrl = "https://earthtoian.com"  # <-- update this to your actual domain
)

$BaseUrl = $BaseUrl.TrimEnd("/")
$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$locationsFile = Join-Path $repoRoot "locations-data.js"
$outputFile = Join-Path $repoRoot "sitemap.xml"

function Get-LocationId([string]$name) {
    $id = $name.ToLower() -replace '[^a-z0-9]+', '-'
    $id = $id.Trim('-')
    return $id
}

$content = Get-Content $locationsFile -Raw

# Extract location names (skip commented-out lines)
$locationNames = [System.Collections.Generic.List[string]]::new()
$content -split "`n" | ForEach-Object {
    $line = $_.Trim()
    if ($line -match '^\s*//' -or $line -match '^\s*/\*') { return }
    if ($line -match 'name:\s*"([^"]+)"') {
        $locationNames.Add($Matches[1])
    }
}

# Extract unique country codes
$countryCodes = [System.Collections.Generic.HashSet[string]]::new()
$content -split "`n" | ForEach-Object {
    $line = $_.Trim()
    if ($line -match '^\s*//' -or $line -match '^\s*/\*') { return }
    if ($line -match 'country:\s*"([^"]+)"') {
        $countryCodes.Add($Matches[1]) | Out-Null
    }
}

$today = Get-Date -Format "yyyy-MM-dd"

$urls = [System.Collections.Generic.List[string]]::new()

# Static pages
$staticPages = @(
    "",
    "countries.html",
    "highpoints.html",
    "national-parks.html",
    "year-in-review.html",
    "about.html"
)
foreach ($page in $staticPages) {
    $loc = if ($page -eq "") { $BaseUrl } else { "$BaseUrl/$page" }
    $urls.Add("  <url><loc>$loc</loc><lastmod>$today</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>")
}

# Country pages
foreach ($code in ($countryCodes | Sort-Object)) {
    $loc = "$BaseUrl/country.html?country=$code"
    $urls.Add("  <url><loc>$loc</loc><lastmod>$today</lastmod><changefreq>weekly</changefreq><priority>0.7</priority></url>")
}

# Location pages
foreach ($name in $locationNames) {
    $id = Get-LocationId $name
    $loc = "$BaseUrl/location.html?id=$id"
    $urls.Add("  <url><loc>$loc</loc><lastmod>$today</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>")
}

$xml = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$($urls -join "`n")
</urlset>
"@

$xml | Set-Content -Path $outputFile -Encoding utf8
Write-Host "Sitemap written to $outputFile ($($urls.Count) URLs)"
