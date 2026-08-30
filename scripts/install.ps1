# NoteWordy 1-Line Windows Installer
# Usage: irm https://raw.githubusercontent.com/tekibo/notewordy/main/scripts/install.ps1 | iex

$ErrorActionPreference = "Stop"

$Repo = "tekibo/notewordy"
$ZipName = "win-x64-NoteWordy-Setup.zip"
$DownloadUrl = "https://github.com/$Repo/releases/latest/download/$ZipName"

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "     Installing NoteWordy on Windows      " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

$TempDir = Join-Path $env:TEMP ("notewordy-install-" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

try {
    $ZipPath = Join-Path $TempDir $ZipName
    Write-Host "--> Downloading latest release..." -ForegroundColor Yellow
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $ZipPath -UseBasicParsing

    Write-Host "--> Extracting installer..." -ForegroundColor Yellow
    Expand-Archive -Path $ZipPath -DestinationPath $TempDir -Force

    $Installer = Get-ChildItem -Path $TempDir -Filter "*Setup.exe" -Recurse | Select-Object -First 1
    if (-not $Installer) {
        throw "Installer executable (*Setup.exe) was not found in the downloaded archive."
    }

    Write-Host "--> Running NoteWordy installer..." -ForegroundColor Yellow
    Start-Process -FilePath $Installer.FullName -Wait

    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host " NoteWordy was installed successfully!    " -ForegroundColor Green
    Write-Host " Launch it from your Start Menu.          " -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
}
finally {
    if (Test-Path $TempDir) {
        Remove-Item -Path $TempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}
