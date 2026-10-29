# Minimal static file server for local preview (no Node/Python required).
# Serves the project root at http://localhost:4173/
$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$port = 4173

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$port/"

$mime = @{
  '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'
  '.js'='application/javascript; charset=utf-8'; '.svg'='image/svg+xml'
  '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.png'='image/png'; '.webp'='image/webp'
  '.xml'='application/xml'; '.txt'='text/plain; charset=utf-8'
  '.md'='text/plain; charset=utf-8'; '.ico'='image/x-icon'; '.woff2'='font/woff2'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $path = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
    if ([string]::IsNullOrEmpty($path)) { $path = 'index.html' }
    $full = [System.IO.Path]::GetFullPath((Join-Path $root $path))
    if (-not $full.StartsWith([System.IO.Path]::GetFullPath($root))) { throw 'forbidden' }
    if (Test-Path $full -PathType Container) { $full = Join-Path $full 'index.html' }
    if (Test-Path $full -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($full)
      $ext = [System.IO.Path]::GetExtension($full).ToLower()
      if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType = $mime[$ext] }
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ctx.Response.StatusCode = 404
      $b = [System.Text.Encoding]::UTF8.GetBytes('404 — not found')
      $ctx.Response.OutputStream.Write($b, 0, $b.Length)
    }
  } catch {
    try { $ctx.Response.StatusCode = 500 } catch {}
  } finally {
    try { $ctx.Response.OutputStream.Close() } catch {}
  }
}
