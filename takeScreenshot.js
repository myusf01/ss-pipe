import puppeteer from 'puppeteer'


const url = process.argv[3]
const filename = process.argv[2]

async function takeSS() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1920, height: 1080 })
  await page.goto(url, {
    waitUntil: 'networkidle0'
  })
  await page.screenshot({ path: `${filename}.png` })
  await browser.close()
}

takeSS()