import puppeteer from "puppeteer";
import jimp from "jimp";

export async function takeSS(url, filename, device, workDir = "./") {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: device.screen_width,
    height: device.screen_height,
  });

  const canvas = await jimp.read(device.canvas);
  const mockup = await jimp.read(device.mockup);

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await page.screenshot({ type: "png" }).then(async (res) => {
    const image = await jimp.read(res);
    canvas
      .blit(image, device.x, device.y)
      .blit(mockup, 0, 0)
      .writeAsync(workDir + `${filename}.png`);
  });
  await browser.close();
  return canvas;
}
