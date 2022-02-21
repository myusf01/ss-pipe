// import required packages.
import puppeteer from 'puppeteer'
import jimp from 'jimp'
import fs from 'fs'
import { makeGifV2, makeGif, listOfFiles } from "../utils/index.js";


export async function mockupGif(url, filename, device, frameCount = 20) {
  const workDir = './temp/'

  const fileType = 'png'

  // check for if temp dir exist if if doesn't exist
  // create a temp dir
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir)
  }

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: device.screen_width, height: device.screen_height })

  const bg = new jimp(device.canvas_width, device.canvas_height, '#f7efe8', (err, image) => {
    if (err) throw err

  })
  bg.rgba(true)
  const mockup = await jimp.read(device.mockup)

  await page.goto(url)

  console.log("Taking shots");
  for (let index = 0; index < frameCount; index++) {
    const screenshot = await page.screenshot({ type: fileType, path: workDir + index + `.${fileType}` })
    await jimp.read(screenshot).then(image => {
      bg
        .blit(image, device.x, device.y)
        .blit(mockup, 0, 0)
        .writeAsync(workDir + index + `.${fileType}`)
    }).catch(console.log)

  }

  let listOfPNGs = listOfFiles(workDir, fileType)
  // console.log(listOfPNGs);
  
  // makeGif(listOfPNGs, workDir, filename, device)
  makeGifV2(workDir, filename, device)
  await browser.close()

}