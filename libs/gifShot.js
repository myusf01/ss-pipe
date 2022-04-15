// import required packages.
import puppeteer from "puppeteer";
import fs from "fs";
import { makeGif, listOfFiles } from "../utils/index.js";

export async function recordGif(url, filename, device, frameCount = 20) {
  const workDir = "./temp/";
  const fileType = "png";

  // check for if temp dir exist if if doesn't exist
  // create a temp dir
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: device.screen_width,
    height: device.screen_height,
  });

  await page.goto(url);

  for (let index = 0; index < frameCount; index++) {
    await page.screenshot({ path: workDir + index + `.${fileType}` });
  }
  // after all screenshots took we will need to create an array and send them to addToGif function to generate gif.
  let listOfPNGs = listOfFiles(workDir, fileType);
  makeGif(listOfPNGs, workDir, filename, device);
  await browser.close();
}
