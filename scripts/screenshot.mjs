import { chromium } from 'playwright'

const url = process.argv[2] || 'https://the-good-pixel.github.io/learn-agentic-working/en/part-1-foundations/chapter-02-how-does-an-agent-actually-work/'
const out = process.argv[3] || 'assets/site-preview.png'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 })
await page.goto(url)
const img = page.locator('img[src*="architecture"]')
await img.evaluate((el) => el.decode())
await img.scrollIntoViewIfNeeded()
await page.screenshot({ path: out })
await browser.close()
console.log('saved', out)
