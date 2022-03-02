# ss-pipe 📸 Generate screenshots for your projects

ss-pipe is a command line app and a CI/CD workflow to produce screenshots for my projects.
You can take screenshots or record gifs of any url and add your recordings to a laptop or mobile mockup for more stylized content.
ss-pipe uses Github Actions to record shots and then store to a AWS S3 bucket. Also you can run in your local to do recordings.

## 🧱 Tech used

Built with NodeJS, AWS & Github Actions

## **Usage**

### To use ss-pipe in local

> **Requirements**
>
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

> 📌
>
> **Don't forget to add two dashes before adding options. See below for examples**

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

### Setting up AWS and Github Actions

> Most of this part is from this documentation [link](https://github.com/claudiacachayosorio/demo-gifs#installation)

#### AWS Setup

1. First create an S3 bucket with "Block Public Access" setting disabled. In IAM console create a new policy using this [template](https://gist.github.com/myusf01/3146258b08fc2ad8ab33bc6cd7e48d60). Be sure change `BUCKET_NAME` to your S3 bucket's name.
2. Then create a new user by your new policy assigned.
3. Then you should create a AWS S3 bucket with sth....

#### Generator Setup

1. Fork this repository.
2. In repository settings create two secrets names as `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` by assigning IAM credentials to them.
3. Then change these lines in workflows.
4. > `aws-region: eu-central-1` to your S3 bucket region
5. > `[...] s3://mysf-sspipe --acl public-read --cache-control no-cache` change name to your buckets name.

#### Project Setup

This settings are for the project you want to take screenshot or record GIF.

1. Get any dispatcher template from `/template-workflow` folder and add file to your `/.github/workflows` folder.
2. Then create a personal access token in GitHub Developer settings with repo and workflow permissions.
3. Create a secret for your project named FLOW_TOKEN and add your token.

> 📌
>
> You should set Cache-Control to no-cache in metadata otherwise Github will use cached image.
> So that linked image will not be updated in README file.

> 📌
>
> Be sure to your `package.json` have `name` and `homepage` fields filled.
> Workflow will use `name` to name the file and `homepage` to get link totake shot.

## Credits

✨ Thanks to [Claudia Cachay-Osorio](https://github.com/claudiacachayosorio/demo-gifs) and [Aimeri Baddouh](https://dev.to/aimerib/using-puppeteer-to-make-animated-gifs-of-page-scrolls-1lko) for their great works.
