import puppeteer from 'puppeteer'

export async function takeSS(url, filename, device) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: device.screen_width, height: device.screen_height })
  await page.goto(url, {
    waitUntil: 'networkidle0'
  })
  await page.screenshot({ path: `${filename}.png` })
  await browser.close()
}
