param(
    [string]$Root = "c:\Users\Ian Lavin\Documents\Code\EarthtoIanWebsite\Pictures",
    [int]$MaxWidth = 1200,
    [int]$Quality = 82
)

$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$images = Get-ChildItem $Root -Recurse | Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' }
$total = $images.Count
$converted = 0
$skipped = 0
$failed = 0

Write-Host "Found $total images to process..."

foreach ($img in $images) {
    $outPath = [System.IO.Path]::ChangeExtension($img.FullName, ".webp")

    if (Test-Path $outPath) {
        $skipped++
        continue
    }

    $result = magick $img.FullName -auto-orient -resize "${MaxWidth}x>" -quality $Quality $outPath 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $($img.FullName)" -ForegroundColor Red
        Write-Host $result
        $failed++
    } else {
        $converted++
        $origKB  = [math]::Round($img.Length / 1KB, 0)
        $newKB   = [math]::Round((Get-Item $outPath).Length / 1KB, 0)
        $pct     = [math]::Round((1 - $newKB/$origKB) * 100, 0)
        if ($converted % 25 -eq 0 -or $converted -le 5) {
            Write-Host "[$converted/$total] $($img.Name) -> ${origKB}KB => ${newKB}KB (-${pct}%)"
        }
    }
}

Write-Host ""
Write-Host "Done! Converted: $converted | Skipped (already existed): $skipped | Failed: $failed" -ForegroundColor Green

# Summary: before/after sizes
$origTotal  = ($images | Measure-Object Length -Sum).Sum
$webpFiles  = Get-ChildItem $Root -Recurse -Filter "*.webp"
$webpTotal  = ($webpFiles | Measure-Object Length -Sum).Sum
$origMB     = [math]::Round($origTotal / 1MB, 1)
$webpMB     = [math]::Round($webpTotal / 1MB, 1)
$savedMB    = [math]::Round(($origTotal - $webpTotal) / 1MB, 1)
$savedPct   = [math]::Round((1 - $webpTotal/$origTotal) * 100, 0)
Write-Host "Originals: ${origMB} MB  |  WebP: ${webpMB} MB  |  Saved: ${savedMB} MB (-${savedPct}%)" -ForegroundColor Cyan
