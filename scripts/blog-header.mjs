#!/usr/bin/env node
/**
 * Generate a branded 1200x630 blog header (also used as the OG card).
 *
 *   node scripts/blog-header.mjs --slug my-post \
 *     --title "Short title, 8 words max" \
 *     --kicker "Series or category" \
 *     --chips "Prompt Hub,Rule Engine,Evaluations"
 *
 * Writes public/static/images/blogs/<slug>/header.webp
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const W = 1200
const H = 630
const BRAND = '#F36C06'
const BRAND_LIGHT = '#FFA337'

function args() {
  const out = {}
  const argv = process.argv.slice(2)
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1]
  }
  return out
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Greedy word wrap by an approximate character budget. */
function wrap(text, maxChars) {
  const lines = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxChars && line) {
      lines.push(line)
      line = word
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}

/** Decorative trace waterfall on the right: span bars with a loop arrow. */
function waterfall(x0, y0) {
  const spans = [
    [0, 360, 1],
    [24, 120, 0.75],
    [150, 90, 0.6],
    [48, 60, 0.45],
    [250, 110, 0.75],
    [270, 40, 0.45],
    [160, 70, 0.6],
    [320, 40, 0.9],
  ]
  const bars = spans
    .map(([dx, w, o], i) => {
      const y = y0 + i * 34
      const fill = i === spans.length - 1 ? BRAND : '#ffffff'
      const op = i === spans.length - 1 ? 1 : o * 0.32
      return `<rect x="${x0 + dx}" y="${y}" width="${w}" height="16" rx="8" fill="${fill}" fill-opacity="${op}"/>
      <circle cx="${x0 - 18}" cy="${y + 8}" r="4" fill="#ffffff" fill-opacity="${0.18 + o * 0.2}"/>`
    })
    .join('\n')
  const guides = [0, 90, 180, 270, 360]
    .map(
      (g) =>
        `<line x1="${x0 + g}" y1="${y0 - 18}" x2="${x0 + g}" y2="${y0 + spans.length * 34}" stroke="#ffffff" stroke-opacity="0.06"/>`
    )
    .join('\n')
  return `<g>${guides}${bars}</g>`
}

async function main() {
  const a = args()
  if (!a.slug || !a.title) {
    console.error('Usage: --slug <slug> --title "<title>" [--kicker "<kicker>"] [--chips "A,B,C"]')
    process.exit(1)
  }
  const chips = (a.chips || '').split(',').map((c) => c.trim()).filter(Boolean).slice(0, 5)
  const kicker = (a.kicker || 'OpenLIT Blog').toUpperCase()

  const titleLines = wrap(a.title, 24).slice(0, 3)
  const titleSize = titleLines.length > 2 ? 54 : 62
  const titleLead = titleSize * 1.12
  const titleTop = 200
  const titleSvg = titleLines
    .map(
      (l, i) =>
        `<text x="72" y="${titleTop + i * titleLead}" font-size="${titleSize}" font-weight="800" fill="#ffffff" letter-spacing="-1">${esc(l)}</text>`
    )
    .join('\n')

  let cx = 72
  const chipY = titleTop + (titleLines.length - 1) * titleLead + 58
  const chipSvg = chips
    .map((c) => {
      const w = Math.round(c.length * 10.2 + 36)
      const svg = `<g><rect x="${cx}" y="${chipY}" width="${w}" height="38" rx="19" fill="${BRAND}" fill-opacity="0.14" stroke="${BRAND}" stroke-opacity="0.7"/>
        <text x="${cx + w / 2}" y="${chipY + 25}" font-size="18" font-weight="600" fill="${BRAND_LIGHT}" text-anchor="middle">${esc(c)}</text></g>`
      cx += w + 12
      return svg
    })
    .join('\n')

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.75">
      <stop offset="0" stop-color="${BRAND}" stop-opacity="0.55"/>
      <stop offset="0.45" stop-color="${BRAND}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${BRAND}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.05" cy="1" r="0.6">
      <stop offset="0" stop-color="#7c3aed" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.045"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="#0B0B10"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>
  ${waterfall(790, 330)}
  <g font-family="Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif">
    <rect x="72" y="96" width="6" height="26" rx="3" fill="${BRAND}"/>
    <text x="90" y="117" font-size="20" font-weight="700" fill="${BRAND_LIGHT}" letter-spacing="3">${esc(kicker)}</text>
    ${titleSvg}
    ${chipSvg}
    <text x="134" y="566" font-size="24" font-weight="700" fill="#ffffff">OpenLIT</text>
    <text x="246" y="566" font-size="20" fill="#ffffff" fill-opacity="0.55">openlit.io</text>
  </g>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="${BRAND}"/>
</svg>`

  const logo = await sharp(path.join(process.cwd(), 'public/static/images/logo.png'))
    .resize(48, 48)
    .toBuffer()

  const outDir = path.join(process.cwd(), 'public/static/images/blogs', a.slug)
  fs.mkdirSync(outDir, { recursive: true })
  const out = path.join(outDir, 'header.webp')
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 72, top: 532 }])
    .webp({ quality: 90 })
    .toFile(out)
  console.log(`Wrote ${path.relative(process.cwd(), out)}`)
  console.log(`Frontmatter: images: ['/static/images/blogs/${a.slug}/header.webp']`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
