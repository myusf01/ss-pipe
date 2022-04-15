import { Command as Commander } from "commander";
import { laptop, mobile } from "./utils/index.js";
import {
  takeScreenshot,
  takeGif,
  mockupScreenshot,
  mockupGif,
  doubleShot,
} from "./libs/index.js";

const command = new Commander();

command
  .version("1.0.9", "-v, --version", "Print version")
  .usage("[OPTIONS]...")
  .option("-n, --name <filename>", "Sets filename that will be exported")
  .option(
    "-t, --type <type>",
    `Defines type of screenshot will be taken,
                                 > screenshot - will take single shot,
                                 > banner - will take a shot for both devices and then export as single file,
                                 > gif        - will record gif
                            `,
    "screenshot"
  )
  .option("-m, --mockup", "Adds mockup to result.")
  //   .option(
  //     "-b, --banner",
  //     "Take screenshots for both devices and then export as single png"
  //   )
  .option(
    "-d, --device <device_type>",
    "Sets device type mobile or laptop",
    "laptop"
  )
  .option(
    "-u, --url <url>",
    "Sets url that will be recorded",
    "https://myusuf.net/"
  )
  // .option('-c, --custom <value>', 'Overwriting value.', 'Default')
  .parse(process.argv);

const options = command.opts();

const device = options.device === "mobile" ? mobile : laptop;
// console.log(options);

if (!options.name) {
  const hostname = new URL(options.url).hostname.split(".").join("");
  options.name = hostname;
}

if (options.type === "screenshot") {
  if (options.mockup) {
    mockupScreenshot(options.url, options.name, device);
  } else {
    takeScreenshot(options.url, options.name, device);
  }
} else if (options.type === "banner") {
  doubleShot(options.url, options.name);
} else if (options.type === "gif") {
  if (options.mockup) {
    mockupGif(options.url, options.name, device);
  } else {
    takeGif(options.url, options.name, device);
  }
}
