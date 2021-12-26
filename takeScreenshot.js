const puppeteer = require('puppeteer');
const url = 'https://color-palette.vercel.app/'

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(url, {
    waitUntil: 'networkidle0'
  })
  await page.screenshot({ path: 'ss.png' })
  await browser.close()
})()
