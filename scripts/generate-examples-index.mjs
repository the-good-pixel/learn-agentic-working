#!/usr/bin/env node
// Generates a tiny index.html for each subfolder of examples/ so
// /examples/<folder>/ URLs return a clickable file list instead of 404.
// Run automatically before `vitepress build`.

import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', 'examples')

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const fmtSize = (n) => {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / 1024 / 1024).toFixed(1)} MB`
}

const renderIndex = (folder, entries) => {
  const items = entries
    .map((e) => {
      const isDir = e.isDir ? '/' : ''
      const meta = e.isDir ? 'folder' : fmtSize(e.size)
      const download = e.isDir ? '' : ' download'
      return `  <li><a href="${escapeHtml(e.name)}${isDir}"${download}>${escapeHtml(e.name)}${isDir}</a> <span class="meta">${meta}</span></li>`
    })
    .join('\n')

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>examples/${escapeHtml(folder)}/ — Learn Agentic Working</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; color: #1f2937; }
    h1 { font-size: 1.25rem; font-weight: 600; }
    h1 code { background: #f3f4f6; padding: 0.1rem 0.4rem; border-radius: 4px; font-size: 0.95rem; }
    p { color: #6b7280; }
    ul { list-style: none; padding: 0; }
    li { padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
    a { color: #4f46e5; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .meta { color: #9ca3af; font-size: 0.85rem; margin-left: 0.5rem; }
    .nav { margin-top: 2rem; font-size: 0.9rem; }
  </style>
</head>
<body>
  <h1>Index of <code>examples/${escapeHtml(folder)}/</code></h1>
  <p>Files shipped with the book for this chapter's exercises. Click to download.</p>
  <ul>
${items}
  </ul>
  <div class="nav">← <a href="/learn-agentic-working/">Back to the book</a></div>
</body>
</html>
`
}

let count = 0
function walk(dir, relPath) {
  const entries = readdirSync(dir)
    .filter((n) => n !== 'index.html')
    .map((name) => {
      const st = statSync(join(dir, name))
      return { name, isDir: st.isDirectory(), size: st.size }
    })
    .sort((a, b) => (a.isDir === b.isDir ? a.name.localeCompare(b.name) : a.isDir ? -1 : 1))
  writeFileSync(join(dir, 'index.html'), renderIndex(relPath, entries))
  count++
  for (const e of entries) {
    if (e.isDir) walk(join(dir, e.name), relPath + '/' + e.name)
  }
}

for (const folder of readdirSync(root)) {
  const full = join(root, folder)
  if (!statSync(full).isDirectory()) continue
  walk(full, folder)
}
console.log(`Generated ${count} examples/.../index.html files.`)
