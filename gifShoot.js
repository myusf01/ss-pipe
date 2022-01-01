// import required packages.
import puppeteer from 'puppeteer'
import GIFEncoder from 'gif-encoder'
import getPixels from 'get-pixels'
import fs from 'fs'
const [width, height] = [1920, 1080]

const encoder = new GIFEncoder(width, height)
// create a temp folder to work on screenshots
const workDir = './temp/'
const filename = process.argv[2]
const url = process.argv[3]

const file = fs.createWriteStream(`${filename}.gif`)

// check for if temp dir exist if if doesn't exist
// create a temp dir
if (!fs.existsSync(workDir)) {
  fs.mkdirSync(workDir)
}

// configure encoder
encoder.setFrameRate(60) // set frame rate for gif
encoder.pipe(file) // pipe encoded pics to file we created
encoder.setQuality(30) // the quality of gif
encoder.setDelay(100) // ms between frames
encoder.writeHeader()
encoder.setRepeat(0)

// this function will take our array of images and will encode them to gif file.
function addToGif(images, counter = 0) {
  // getPixels will extract pixels from each screenshot we took.
  // callback func will expect pixels we extracted and errors if occurred during process

  getPixels(images[counter], function(err, pixels) {
    // encode data from pixels to our gif file
    encoder.addFrame(pixels.data)
    encoder.read()

    // check if our counter has same size of length of our array
    if (counter === images.length - 1) {
      // if they are equal then finish encoding
      encoder.finish()
      // call cleanup function
      cleanUp(images, function(err) {
        if (err) {
          // if any error received log error
          console.log(err)
        } else {
          // if any error didn't ocurred remove temp dir and log gif created then exit.
          fs.rmdirSync(workDir)
          console.log('Gif created')
          process.exit[0]
        }
      })
    } else {
      // if they are not same repeat process again
      addToGif(images, ++counter)
    }
  })
}
// will take an array of files and callback
// func will delete each file exists in array
// when no files left then delete working directory
function cleanUp(listOfPNGs, callback) {
  let i = listOfPNGs.length

  listOfPNGs.forEach(filepath => {
    // unlink method to remove files exists in array

    fs.unlink(filepath, function(err) {
      // decrease one from length
      i--
      if (err) {
        callback(err)
        return
      } else if (i <= 0) {
        callback(null)
      }
    })
  })
}

async function takeSS() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width, height })
  // await page.goto(url, {
  //   waitUntil: 'networkidle0'
  // })
  // await page.screenshot({ path: `${filename}.png` })

  await page.goto(url)
  for (let index = 0; index < 45; index++) {
    await page.screenshot({ path: workDir + index + '.png' })
  }
  // after all screenshots took we will need to create an array and send them to addToGif function to generate gif.
  let listOfPNGs = fs
    .readdirSync(workDir)
    .map(a => a.substr(0, a.length - 4) + '')
    .sort((a, b) => {
      return a - b
    })
    .map(a => workDir + a.substr(0, a.length) + '.png')

  addToGif(listOfPNGs)
  await browser.close()
}

takeSS()
