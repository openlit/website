#!/usr/bin/env node
/**
 * Capture real OpenLIT UI screenshots for a blog post.
 *
 *   npm i --no-save puppeteer-core          # once; uses your installed Chrome
 *   node scripts/blog-screenshots.mjs scripts/blog-shots/<slug>.json
 *
 * Shot list JSON:
 * {
 *   "slug": "my-post",
 *   "baseUrl": "http://localhost:3000",            // optional
 *   "login": { "email": "user@openlit.io", "password": "openlituser" },
 *   "shots": [
 *     {
 *       "name": "01-traces",                        // -> public/static/images/blogs/<slug>/01-traces.webp
 *       "path": "/telemetry?tab=traces",
 *       "clickText": "run_support_agent",           // optional: click the first element with this text
 *       "clicks": ["Evaluations@1", "css:button[aria-label=\"Chat\"]"],  // optional: several clicks, in order.
 *                                                   //   "text@n" clicks the nth match, "css:<selector>" a selector
 *                                                   //   (e.g. "css:::-p-text(Span Attributes)" for tabs that need a real mouse click)
 *       "type": [["input[placeholder=\"my_prompt\"]", "support_reply"]],  // optional: click a field, then type
 *                                                   //   (runs before clicks; "\n" presses Enter)
 *       "waitMs": 2500,                             // optional settle time
 *       "selector": "main",                         // optional: crop to this element
 *       "crop": { "x": 0, "y": 0, "width": 1440, "height": 900 }   // optional: crop in CSS px
 *     }
 *   ]
 * }
 *
 * Captured at 1440x900, 2x device scale, light theme, then saved as WebP under 300 KB.
 */
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : '/usr/bin/google-chrome')

// Hide promo cards and toasts that should never appear in blog screenshots.
const HIDE_CSS = `
  [data-sonner-toaster], .Toastify { display: none !important; }
`

async function loadPuppeteer() {
  try {
    // PUPPETEER_CORE_PATH lets you point at an install outside this repo.
    const spec = process.env.PUPPETEER_CORE_PATH
      ? new URL(`file://${path.resolve(process.env.PUPPETEER_CORE_PATH)}`).href
      : 'puppeteer-core'
    return (await import(spec)).default
  } catch {
    console.error(
      'puppeteer-core not found. Run `npm i --no-save puppeteer-core`, or set PUPPETEER_CORE_PATH to its lib/esm/puppeteer/puppeteer-core.js'
    )
    process.exit(1)
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function toWebp(png, out) {
  // Step quality down until the file is under 300 KB.
  for (const quality of [88, 80, 72, 64, 56]) {
    const buf = await sharp(png).webp({ quality }).toBuffer()
    if (buf.length < 300 * 1024 || quality === 56) {
      fs.writeFileSync(out, buf)
      return buf.length
    }
  }
}

async function main() {
  const file = process.argv[2]
  if (!file) {
    console.error('Usage: node scripts/blog-screenshots.mjs scripts/blog-shots/<slug>.json')
    process.exit(1)
  }
  const cfg = JSON.parse(fs.readFileSync(file, 'utf8'))
  const base = cfg.baseUrl || 'http://localhost:3000'
  const outDir = path.join(process.cwd(), 'public/static/images/blogs', cfg.slug)
  fs.mkdirSync(outDir, { recursive: true })

  const puppeteer = await loadPuppeteer()
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])

  if (cfg.login) {
    await page.goto(`${base}/login`, { waitUntil: 'networkidle2' })
    await page.type('#email', cfg.login.email)
    await page.type('#password', cfg.login.password)
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {}),
      page.keyboard.press('Enter'),
    ])
  }

  // Dismiss in-app promo cards (e.g. `[aria-label="Dismiss founder call card"]`) once; they stay dismissed.
  if (cfg.dismiss?.length) {
    await page.goto(`${base}/home`, { waitUntil: 'networkidle2' }).catch(() => {})
    await sleep(1500)
    for (const sel of cfg.dismiss) await (await page.$(sel))?.click()
  }

  for (const shot of cfg.shots) {
    await page.goto(base + shot.path, { waitUntil: 'networkidle2' }).catch(() => {})
    await page.addStyleTag({ content: HIDE_CSS + (cfg.extraCss || '') })
    await sleep(shot.waitMs ?? 2500)
    for (const [selector, text] of shot.type || []) {
      await (await page.$(selector))?.click()
      for (const [i, line] of text.split('\n').entries()) {
        if (i) await page.keyboard.press('Enter')
        if (line) await page.keyboard.type(line)
      }
    }
    for (const spec of [shot.clickText, ...(shot.clicks || [])].filter(Boolean)) {
      if (spec.startsWith('css:')) {
        await (await page.$(spec.slice(4)))?.click()
      } else {
        await page.evaluate((spec) => {
          // Innermost element whose text is exactly `t` (works for buttons with icons too).
          const [t, n] = spec.split('@')
          const matches = [...document.querySelectorAll('body *')].filter(
            (el) => el.textContent.trim() === t
          )
          const leaves = matches.filter((el) => !matches.some((m) => m !== el && el.contains(m)))
          const el = leaves[Number(n || 0)]
          ;(el?.closest('button,a,[role="button"],[role="tab"]') || el)?.click()
        }, spec)
      }
      await sleep(shot.afterClickMs ?? 2500)
    }
    let clip = shot.crop
    if (shot.selector) {
      const box = await (await page.$(shot.selector))?.boundingBox()
      if (box) clip = box
    }
    const png = await page.screenshot(clip ? { clip } : {})
    const out = path.join(outDir, `${shot.name}.webp`)
    const bytes = await toWebp(png, out)
    console.log(`${path.relative(process.cwd(), out)}  ${(bytes / 1024).toFixed(0)} KB`)
  }
  await browser.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
