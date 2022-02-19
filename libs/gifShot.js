// import required packages.
import puppeteer from 'puppeteer'
import fs from 'fs'
import { makeGif } from "../utils/index.js";


export async function recordGif(url, filename, device, frameCount = 20) {
  const workDir = './temp/'

  // check for if temp dir exist if if doesn't exist
  // create a temp dir
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir)
  }


  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: device.screen_width, height: device.screen_height })

  await page.goto(url)

  for (let index = 0; index < frameCount; index++) {
    await page.screenshot({ path: workDir + index + '.png' })
  }
  // after all screenshots took we will need to create an array and send them to addToGif function to generate gif.
  let listOfPNGs = fs
    .readdirSync(workDir)
    .map(a => a.substr(0, a.length - 4) + '')
    .sort((a, b) => {
      return a - b
    })
    .map(a => a.substr(0, a.length) + '.png')

  makeGif(listOfPNGs, workDir, filename, device)
  await browser.close()

}

