# update.ps1 — Run after adding new locations, images, or routes.
# Refreshes WebP images, gallery manifest, sitemap, and validates location data.
# Usage: .\scripts\update.ps1

$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$steps = @(
    @{ name = "Convert images to WebP";   script = "scripts\convert-to-webp.ps1" },
    @{ name = "Regenerate gallery manifest"; script = "scripts\generate-gallery-manifest.ps1" },
    @{ name = "Validate locations";        script = "scripts\validate-locations.ps1" },
    @{ name = "Regenerate sitemap";        script = "scripts\generate-sitemap.ps1" }
)

$passed = 0
$failed = 0

foreach ($step in $steps) {
    Write-Host ""
    Write-Host "── $($step.name)" -ForegroundColor Cyan

    try {
        & powershell -ExecutionPolicy Bypass -File $step.script
        if ($LASTEXITCODE -ne 0) { throw "Exit code $LASTEXITCODE" }
        Write-Host "   OK" -ForegroundColor Green
        $passed++
    } catch {
        Write-Host "   FAILED: $_" -ForegroundColor Red
        $failed++
    }
}

Write-Host ""
if ($failed -eq 0) {
    Write-Host "All $passed steps completed successfully." -ForegroundColor Green
} else {
    Write-Host "$passed steps passed, $failed failed." -ForegroundColor Yellow
}
