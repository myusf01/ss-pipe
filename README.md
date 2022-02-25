# ss-pipe 📸 Generate screenshots for your projects

ss-pipe is a command line app and a CI/CD workflow to produce screenshots for my projects.
You can take screenshots or record gifs of any url and add your recordings to a laptop or mobile mockup for more stylized content.
ss-pipe uses Github Actions to record shots and then store to a AWS S3 bucket. Also you can run in your local to do recordings.

## 🧱 Tech used

Built with NodeJS, AWS & Github Actions

## **Usage**

### To use ss-pipe in local

> **Requirements**
> Node v14.16

After cloning ss-pipe to your machine project will be ready to use after installing.

```bash
npm install
```

You can use commands to take screenshots or just use npm scripts to  take screenshots.

#### Commands

```bash

npm run ss-pipe -- --help

Usage: index [OPTIONS]...

Options:
  -v, --version               Print version
  -n, --name <filename>       Sets filename that will be exported
  -t, --type <type>           Defines type of screenshot will be taken,
                                   > screenshot - will take single shot,
                                   > gif        - will record gif
                               (default: "screenshot")
  -m, --mockup                Adds mockup to result. (default: "Default")
  -d, --device <device_type>  Sets device type mobile or laptop (default: "laptop")
  -u, --url <url>             Sets url that will be recorded (default: "https://myusuf.net/")
  -h, --help                  display help for command

```

#### Scripts

> **📍 Don't forget to add two dashes before adding options. See below for examples**

```bash
npm run screenshot-mobile -- --name <filename> --url <url>
```

```bash
npm run screenshot-mobile
        screenshot-laptop
        screenshot-mockup-mobile
        screenshot-mockup-laptop
        gif-mobile
        gif-laptop
        gif-mockup-laptop
        gif-mockup-mobile

```

## To use ss-pipe with AWS and Github Actions

🔨 Processing documentation, will be here soon.
> 📌
>
> You should add Cache-Control to no-cache in metadata otherwise Github will use cached image.
> So that linked image will not be updated in README file.

## Credits

✨ Thanks to [Claudia Cachay-Osorio](https://github.com/claudiacachayosorio/demo-gifs) and [Aimeri Baddouh](https://dev.to/aimerib/using-puppeteer-to-make-animated-gifs-of-page-scrolls-1lko) for their great works.
