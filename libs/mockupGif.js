// import required packages.
import puppeteer from 'puppeteer'
import jimp from 'jimp'
import fs from 'fs'
import { makeGif } from "../utils/index.js";


export async function mockupGif(url, filename, device, frameCount = 20) {
  const workDir = './temp/'

  // check for if temp dir exist if if doesn't exist
  // create a temp dir
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir)
  }


  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: device.width, height: device.height })

  const canvas = await jimp.read(device.bg)
  // const bg = new jimp(canvas.bitmap.width, canvas.bitmap.height, '#f7efe8', (err, image) => {
  //   if (err) throw err

  // })
  const mockup = await jimp.read(device.mockup)
  // canvas.opaque()
  // canvas.background(0x00FFFFFF)
  await page.goto(url)

  console.log("Taking shots");
  for (let index = 0; index < frameCount; index++) {
    await page.screenshot({ type: 'jpeg' })
      .then(async res => {
        const image = await jimp.read(res)
        canvas
          .blit(image, device.x, device.y)
          .blit(mockup, 0, 0)
          .writeAsync(workDir + index + '.jpeg')
      })
  }

  // after all screenshots took we will need to create an array and send them to addToGif function to generate gif.
  let listOfPNGs = fs
    .readdirSync(workDir)
    .map(a => a.substr(0, a.length - 5) + '')
    .sort((a, b) => {
      return a - b
    })
    .map(a => workDir + a.substr(0, a.length) + '.jpeg')

  makeGif(listOfPNGs, workDir, filename, device)
  await browser.close()

}