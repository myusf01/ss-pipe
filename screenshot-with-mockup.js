import puppeteer from 'puppeteer'
import jimp from 'jimp'
import { laptop, mobile } from './dimensions.js'


const url = process.argv[4]
const filename = process.argv[3]
const device_type = process.argv[2]
const device = (device_type === 'mobile') ? mobile : laptop



async function takeSS() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: device.width, height: device.height })

  const canvas = await jimp.read(device.canvas)
  const mockup = await jimp.read(device.mockup)


  await page.goto(url, {
    waitUntil: 'networkidle0'
  })

  await page.screenshot({ type: 'png' })
    .then(async res => {
      const image = await jimp.read(res)
      canvas
        .blit(image, device.x, device.y)
        .blit(mockup, 0, 0)
        .writeAsync(`${filename}.png`)
    })
  await browser.close()
}

takeSS()

