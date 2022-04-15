import puppeteer from "puppeteer";
import sharp from "sharp";

const url = process.argv[3];
const filename = process.argv[2];

const canvas = "./mockup/canvas.png";
const laptop = "./mockup/laptop-2.png";
const phone = "./mockup/phone.png";

const modes = [
  "clear",
  "source",
  "over",
  "in",
  "out",
  "atop",
  "dest",
  "dest-over",
  "dest-in",
  "dest-out",
  "dest-atop",
  "xor",
  "add",
  "saturate",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "colour-dodge",
  "color-dodge",
  "colour-burn",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
];

async function takeSS() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 938 });
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  // await Promise.all(modes.map(async mode => {
  //   await page.screenshot({ type: 'png' }).then(res => {
  //     sharp(laptop)
  //       .composite([{ input: res, left: 241, top: 43, blend: mode }])
  //       .toFile(`./modes/${mode}-${filename}.png`)
  //   }).catch(err => console.log(err))
  // }))
  await page.screenshot({ type: "png" }).then((res) => {
    sharp(laptop)
      .composite([{ input: res }])
      .toFile(`${filename}.png`);
  });
  await browser.close();
}

takeSS();
