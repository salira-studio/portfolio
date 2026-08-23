# Downloads curated South Indian food photography from Wikimedia Commons.
# Resolves direct thumbnail URLs via the imageinfo API, paces requests, backs off on 429.
# Writes public/img/<slug>.jpg and tools/img_report.json
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
$outDir = Join-Path $PSScriptRoot '..\public\img'
New-Item -ItemType Directory -Force $outDir | Out-Null

function Invoke-Paced([string]$url, [string]$purpose) {
    for ($attempt = 1; $attempt -le 3; $attempt++) {
        try {
            return Invoke-WebRequest -UseBasicParsing -Uri $url -UserAgent $script:ua -TimeoutSec 45
        } catch {
            $msg = $_.Exception.Message
            if ($msg -match '429') { Write-Host "  429 on $purpose, backing off ($attempt/3)..."; Start-Sleep -Seconds (25 * $attempt) }
            else { Write-Host "  ERR on ${purpose}: $msg"; return $null }
        }
    }
    return $null
}

function Get-Candidates([string]$query) {
    Start-Sleep -Milliseconds 500
    $u = "https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=8&srsearch=" + [Uri]::EscapeDataString($query)
    $r = Invoke-Paced $u "search:$query"
    if (-not $r) { return @() }
    $json = $r.Content | ConvertFrom-Json
    return @($json.query.search | ForEach-Object { $_.title } |
        Where-Object { $_ -match '\.(jpe?g|png)$' -and $_ -notmatch '(?i)map|logo|diagram|label|poster|stamp|coin|banknote|chart' })
}

function Save-Thumb([string]$title, [string]$dest) {
    Start-Sleep -Milliseconds 1300
    $t = [Uri]::EscapeDataString($title)
    $u = "https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&iiurlwidth=1100&titles=$t"
    $r = Invoke-Paced $u "info:$title"
    if (-not $r) { return $false }
    try {
        $json = $r.Content | ConvertFrom-Json
        $thumb = @($json.query.pages.PSObject.Properties.Value)[0].imageinfo.thumburl
    } catch { return $false }
    if (-not $thumb) { return $false }
    Start-Sleep -Milliseconds 1300
    $dl = Invoke-Paced $thumb "dl:$title"
    if (-not $dl) { return $false }
    $bytes = $dl.Content
    if ($bytes.Length -lt 15000) { return $false }
    $b = $bytes[0..3]
    $isJpeg = ($b[0] -eq 0xFF -and $b[1] -eq 0xD8)
    $isPng  = ($b[0] -eq 0x89 -and $b[1] -eq 0x50)
    if (-not ($isJpeg -or $isPng)) { return $false }
    [IO.File]::WriteAllBytes($dest, $bytes)
    return $true
}

$targets = [ordered]@{
  'hero-dosa'             = @('ghee roast dosa', 'masala dosa chutney', 'masala dosa')
  'story-kitchen'         = @('indian restaurant kitchen chef cooking', 'indian chef cooking restaurant')
  'story-interior'        = @('restaurant interior warm wooden', 'indian restaurant interior')
  'ghee-roast-dosa'       = @('ghee roast dosa', 'plain dosa', 'masala dosa')
  'masala-dosa'           = @('masala dosa', 'masala dose')
  'paper-roast-dosa'      = @('paper dosa', 'dosa roll')
  'mysore-masala-dosa'    = @('mysore masala dosa', 'open masala dosa')
  'rava-dosa'             = @('rava dosa', 'semolina dosa')
  'podi-idli'             = @('podi idli', 'idli podi', 'button idli')
  'idli'                  = @('idli sambar', 'idli plate', 'idli')
  'medu-vada'             = @('medu vada', 'vada sambar')
  'upma-kichadi'          = @('upma', 'rava upma')
  'kongu-chicken-biryani' = @('chicken biryani india', 'hyderabadi chicken biryani')
  'veg-biryani'           = @('vegetable biryani', 'veg biryani')
  'curd-rice'             = @('curd rice', 'thayir sadam')
  'lemon-rice'            = @('lemon rice', 'chitranna')
  'puliyodarai'           = @('puliyodharai', 'tamarind rice', 'puli sadam')
  'south-indian-meals'    = @('south indian meals banana leaf', 'sadhya banana leaf')
  'nonveg-meals'          = @('indian non veg thali', 'chicken thali india')
  'chicken-65'            = @('chicken 65', 'chilli chicken indo chinese')
  'pepper-chicken'        = @('pepper chicken', 'chicken pepper fry')
  'paneer-ghee-roast'     = @('paneer butter masala', 'paneer tikka masala')
  'chicken-sukka'         = @('chicken sukka', 'chicken chettinad')
  'mutton-chukka'         = @('mutton chukka', 'mutton fry india')
  'gobi-65'               = @('gobi 65', 'gobi manchurian dry')
  'sambar'                = @('sambar bowl', 'sambhar dish')
  'rasam'                 = @('rasam bowl', 'rasam soup')
  'poriyal'               = @('cabbage poriyal', 'thoran cabbage')
  'boondi-raita'          = @('raita bowl', 'boondi raita')
  'appalam'               = @('papadum', 'papad')
  'oorga-pickle'          = @('mango pickle india jar', 'indian pickle')
  'filter-coffee'         = @('filter coffee india', 'south indian filter coffee')
  'masala-chai'           = @('masala chai glass', 'chai glass india')
  'neer-mor'              = @('chaas buttermilk glass', 'buttermilk india')
  'tender-coconut'        = @('tender coconut water', 'coconut water straw')
  'lime-soda'             = @('lime soda glass', 'nimbu soda')
  'rose-milk'             = @('rose milk glass', 'falooda glass')
  'tender-coconut-payasam'= @('payasam bowl', 'kheer bowl', 'palada pradhaman')
  'kesari'                = @('rava kesari', 'kesari bath')
  'gulab-jamun'           = @('gulab jamun bowl', 'gulab jamun')
  'mysore-pak'            = @('mysore pak', 'besan burfi')
}

$report = [ordered]@{}
foreach ($slug in $targets.Keys) {
    $dest = Join-Path $outDir "$slug.jpg"
    if (Test-Path $dest) { $report[$slug] = 'cached'; continue }
    $done = $false
    foreach ($q in $targets[$slug]) {
        foreach ($t in (Get-Candidates $q)) {
            if (Save-Thumb $t $dest) {
                Write-Host ("OK   {0,-24} <- {1}" -f $slug, $t)
                $report[$slug] = $t
                $done = $true
                break
            } else {
                Write-Host ("skip {0} candidate: {1}" -f $slug, $t)
            }
        }
        if ($done) { break }
    }
    if (-not $done) { Write-Host ("MISS {0}" -f $slug); $report[$slug] = $null }
}
$report | ConvertTo-Json | Set-Content (Join-Path $PSScriptRoot 'img_report.json')
$missing = @($report.Keys | Where-Object { -not $report[$_] })
Write-Host ("DONE. missing={0}/{1}: {2}" -f $missing.Count, $report.Count, ($missing -join ', '))
