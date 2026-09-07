#!/usr/bin/env node
/**
 * Checks every local href/src in the built site actually resolves.
 *
 *   npm run build && node scripts/check-links.mjs
 *
 * Exists because the /history archive is ~500 static files of hand-written
 * 2016-2020 HTML whose relative paths break easily, and because post image
 * paths are plain strings that nothing else validates. External URLs are
 * listed but not fetched — they rot on their own schedule and a failing
 * third-party host shouldn't fail the build.
 *
 * No dependencies. Exits 1 if anything is missing.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, resolve, dirname, normalize, extname, relative, sep } from 'node:path'

const ROOT = resolve(process.argv[2] ?? 'dist')

if (!existsSync(ROOT)) {
  console.error(`✗ ${ROOT} does not exist — run \`npm run build\` first.`)
  process.exit(1)
}

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })

const REF = /(?:href|src)\s*=\s*["']([^"']+)["']/gi
const SKIP = /^(#|mailto:|javascript:|data:|tel:|blob:)/i
const ABSOLUTE = /^(https?:)?\/\//i

const pages = walk(ROOT).filter((p) => /\.html?$/i.test(p))
const missing = new Map()
const external = new Set()
let checked = 0

for (const page of pages) {
  const html = readFileSync(page, 'utf8')
  for (const [, raw] of html.matchAll(REF)) {
    const url = raw.trim()
    if (!url || SKIP.test(url)) continue
    if (ABSOLUTE.test(url)) {
      external.add(url.split('?')[0])
      continue
    }

    let path
    try {
      path = decodeURIComponent(url.split('#')[0].split('?')[0])
    } catch {
      path = url.split('#')[0].split('?')[0]
    }
    if (!path) continue

    const base = path.startsWith('/') ? ROOT : dirname(page)
    const target = normalize(join(base, path.replace(/^\//, '')))
    checked++

    // a directory URL is served by its index.html
    const ok =
      existsSync(target) &&
      (extname(target) !== '' || !statSync(target).isDirectory() || existsSync(join(target, 'index.html')))

    if (!ok && !existsSync(join(target, 'index.html'))) {
      const key = relative(ROOT, page).split(sep).join('/')
      if (!missing.has(key)) missing.set(key, new Set())
      missing.get(key).add(url)
    }
  }
}

console.log(`checked ${checked} local refs across ${pages.length} pages in ${relative(process.cwd(), ROOT) || ROOT}`)

if (missing.size === 0) {
  console.log(`✓ no broken local links  (${external.size} external URLs not fetched)`)
  process.exit(0)
}

console.error(`\n✗ ${missing.size} file(s) with broken local refs:\n`)
for (const [page, urls] of [...missing].sort()) {
  console.error(`  ${page}`)
  for (const u of [...urls].sort()) console.error(`      → ${u}`)
}
process.exit(1)
