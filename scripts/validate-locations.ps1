$ErrorActionPreference = "Stop"

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $repoRoot

$dataPath = "locations-data.js"
$manifestPath = "gallery-manifest.js"

if (-not (Test-Path -LiteralPath $dataPath)) {
  throw "Missing $dataPath"
}

$data = Get-Content -Raw -LiteralPath $dataPath
$manifest = if (Test-Path -LiteralPath $manifestPath) {
  Get-Content -Raw -LiteralPath $manifestPath
} else {
  ""
}

$errors = New-Object System.Collections.Generic.List[string]
$warnings = New-Object System.Collections.Generic.List[string]

function Add-Error([string]$message) {
  $script:errors.Add($message)
}

function Add-Warning([string]$message) {
  $script:warnings.Add($message)
}

function Test-PathFromData([string]$field, [string]$pathValue, [int]$lineNumber) {
  if ([string]::IsNullOrWhiteSpace($pathValue)) {
    Add-Error("Line ${lineNumber}: $field is empty")
    return
  }
  $fsPath = $pathValue -replace "/", "\"
  if (-not (Test-Path -LiteralPath $fsPath)) {
    Add-Error("Line ${lineNumber}: Missing $field path: $pathValue")
  }
}

function Generate-Id([string]$name) {
  return (($name.ToLower() -replace "[^a-z0-9]+", "-") -replace "(^-|-$)", "")
}

# 1) Placeholder URLs
$placeholderMatches = Select-String -Path $dataPath -Pattern 'url:\s*"https://en\.wikipedia\.org/wiki/La_Jolla"'
foreach ($m in $placeholderMatches) {
  Add-Warning("Line $($m.LineNumber): Placeholder URL still present")
}

# 2) Names and duplicate ID collisions
$nameMatches = [regex]::Matches($data, 'name:\s*"([^"]+)"')
$nameCounts = @{}
$idCounts = @{}
foreach ($m in $nameMatches) {
  $name = $m.Groups[1].Value.Trim()
  if (-not $nameCounts.ContainsKey($name)) { $nameCounts[$name] = 0 }
  $nameCounts[$name]++

  $id = Generate-Id $name
  if (-not $idCounts.ContainsKey($id)) { $idCounts[$id] = 0 }
  $idCounts[$id]++
}

foreach ($key in $nameCounts.Keys) {
  if ($nameCounts[$key] -gt 1) {
    Add-Warning("Duplicate location name: '$key' appears $($nameCounts[$key]) times")
  }
}

foreach ($key in $idCounts.Keys) {
  if ($idCounts[$key] -gt 1) {
    Add-Error("ID collision after slugging: '$key' appears $($idCounts[$key]) times")
  }
}

# 3) Validate referenced file paths
$pathFields = @("img", "descriptionMd", "logisticsMd", "notesMd")
foreach ($field in $pathFields) {
  $matches = Select-String -Path $dataPath -Pattern ($field + ':\s*"([^"]+)"')
  foreach ($m in $matches) {
    if ($m.Matches.Count -lt 1) { continue }
    $value = $m.Matches[0].Groups[1].Value
    Test-PathFromData -field $field -pathValue $value -lineNumber $m.LineNumber
  }
}

# 4) Validate galleryDir + manifest mapping
$galleryDirMatches = Select-String -Path $dataPath -Pattern 'galleryDir:\s*"([^"]+)"'
$manifestKeys = @{}
if ($manifest) {
  $keyMatches = [regex]::Matches($manifest, '"(Pictures/[^"]+)":\s*\[')
  foreach ($m in $keyMatches) {
    $manifestKeys[$m.Groups[1].Value.TrimEnd("/")] = $true
  }
}

foreach ($m in $galleryDirMatches) {
  if ($m.Matches.Count -lt 1) { continue }
  $dir = $m.Matches[0].Groups[1].Value
  $normalized = $dir.TrimEnd("/")
  $fsPath = $normalized -replace "/", "\"

  if (-not (Test-Path -LiteralPath $fsPath)) {
    Add-Error("Line $($m.LineNumber): Missing galleryDir folder: $dir")
    continue
  }

  $images = Get-ChildItem -Path $fsPath -File | Where-Object {
    @(".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg") -contains $_.Extension.ToLower()
  }
  if ($images.Count -eq 0) {
    Add-Warning("Line $($m.LineNumber): galleryDir has no images: $dir")
  }

  if ($manifest -and -not $manifestKeys.ContainsKey($normalized)) {
    Add-Error("Line $($m.LineNumber): galleryDir missing from gallery-manifest.js: $dir")
  }
}

# 5) Validate video blocks (provider/id consistency)
$videoBlocks = [regex]::Matches($data, 'video:\s*\{[\s\S]*?\}')
foreach ($block in $videoBlocks) {
  $providerMatch = [regex]::Match($block.Value, 'provider:\s*"([^"]*)"')
  $idMatch = [regex]::Match($block.Value, 'id:\s*"([^"]*)"')
  $provider = if ($providerMatch.Success) { $providerMatch.Groups[1].Value } else { "" }
  $id = if ($idMatch.Success) { $idMatch.Groups[1].Value } else { "" }

  if ($provider -and @("vimeo", "youtube") -notcontains $provider) {
    Add-Error("Unknown video provider '$provider' in block: $($block.Value)")
  }

  if ($provider -and -not $id) {
    Add-Error("Video provider '$provider' is set but id is empty")
  }

  if (-not $provider -and $id) {
    Add-Warning("Video id '$id' is set but provider is empty")
  }
}

Write-Host ""
Write-Host "Location data validation report"
Write-Host "--------------------------------"
Write-Host "Errors:   $($errors.Count)"
Write-Host "Warnings: $($warnings.Count)"
Write-Host ""

if ($errors.Count -gt 0) {
  Write-Host "Errors:"
  foreach ($e in $errors) { Write-Host " - $e" }
  Write-Host ""
}

if ($warnings.Count -gt 0) {
  Write-Host "Warnings:"
  foreach ($w in $warnings) { Write-Host " - $w" }
  Write-Host ""
}

if ($errors.Count -gt 0) {
  exit 1
}

exit 0
