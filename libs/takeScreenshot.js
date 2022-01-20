import puppeteer from 'puppeteer'


// const url = process.argv[3]
// const filename = process.argv[2]

export async function takeSS(url, filename, device) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: device.width, height: device.height })
  await page.goto(url, {
    waitUntil: 'networkidle0'
  })
  await page.screenshot({ path: `${filename}.png` })
  await browser.close()
}
