import { Command as Commander } from "commander";
import { laptop, mobile } from './utils/index.js'
import {
    takeScreenshot,
    takeGif,
    mockupScreenshot
} from "./libs/index.js";

const command = new Commander()

command.version('1.0.0', '-v, --version', "Print version")
    .usage('[OPTIONS]...')
    .option('-n, --name <filename>', 'Sets filename that will be exported', "file")
    .option('-t, --type <type>', `Defines type of screenshot will be taken,
                                 > screenshot - will take single shot,
                                 > gif        - will record gif
                            `,
        'screenshot')
    .option('-m, --mockup', 'Adds mockup to result.', 'Default')
    .option('-d, --device <device_type>', 'Sets device type mobile or laptop', "laptop")
    .option('-u, --url <url>', 'Sets url that will be recorded', 'https://myusuf.net/')
    // .option('-c, --custom <value>', 'Overwriting value.', 'Default')
    .parse(process.argv);

const options = command.opts()

const device = (options.device === 'mobile') ? mobile : laptop
console.log(options);

if (options.type === 'screenshot') {
    if (options.mockup) {
        mockupScreenshot(options.url, options.name, device)
    } else {

        takeScreenshot(options.url, options.name, device)
    }
} else if (options.type === 'gif') {
    takeGif(options.url, options.name, device)
}