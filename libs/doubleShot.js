import { mockupScreenshot as screenShot } from "./index.js";
import { laptop, mobile, listOfFiles } from "../utils/index.js";
import fs from "fs";
import jimp from "jimp";

const devices = [laptop, mobile];

export async function doubleShot(url, filename) {
  const workDir = "./temp/";
  const canvas = new jimp(2462, 1081);
  // let images = [];
  if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir);
  }

  const images = await Promise.all(
    devices.map(async (device) => {
      // console.log(device);
      // filename = `${filename}_${device}`;
      const list = [];
      const shotName = `banner_${device.type}`;
      console.log("shooting");
      return await screenShot(url, shotName, device, workDir);
      // return list;
    })
  );
  // console.log(images);
  // images.forEach(async (image) => {
  //   const img = await jimp.read(image);
  //   console.log(img);
  // });

  canvas.composite(images[0], -35, 0);
  canvas.composite(images[1], 1900, 0);
  canvas.resize(1241, 541);
  canvas.write(`${filename}.png`);
  fs.rmdirSync(workDir, { recursive: true, force: true });
}
