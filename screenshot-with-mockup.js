import puppeteer from 'puppeteer'
import jimp from 'jimp'

const url = process.argv[4]
const filename = process.argv[3]
const device = process.argv[2]

const canvas_laptop = './mockup/canvas-laptop.png'
const canvas_mobile = './mockup/canvas-mobile.png'
const laptop = './mockup/laptop.png'
// 463x963
const phone = './mockup/phone.png'

async function takeSS() {
  let canvas
  let screen
  let x
  let y
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  if (device === 'mobile') {
    await page.setViewport({ width: 463, height: 963 })
    x = 38
    y = 80

    screen = await jimp.read(phone)
    canvas = await jimp.read(canvas_mobile)

  } else {
    await page.setViewport({ width: 1505, height: 942 })
    x = 218
    y = 33
    canvas = await jimp.read(canvas_laptop)
    screen = await jimp.read(laptop)
  }

  await page.goto(url, {
    waitUntil: 'networkidle0'
  })

  await page.screenshot({ type: 'png' }).then(async res => {
    const image = await jimp.read(res)
    canvas.blit(image, x, y).blit(screen, 0, 0).writeAsync(`${filename}.png`)
  })
  await browser.close()
}

takeSS()

