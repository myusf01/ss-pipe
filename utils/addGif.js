import GIFEncoder from "gif-encoder";
import getPixels from "get-pixels";
import fs from "fs";
import { cleanUp } from "./index.js";

export function makeGif(listOfFrames, workDir, filename, device) {
  const encoder = new GIFEncoder(device.screen_width, device.screen_height);
  // create a temp folder to work on screenshots
  const file = fs.createWriteStream(`${filename}.gif`);

  // configure encoder
  encoder.setFrameRate(60); // set frame rate for gif
  encoder.pipe(file); // pipe encoded pics to file we created
  encoder.setQuality(30); // the quality of gif
  encoder.setDelay(100); // ms between frames
  encoder.writeHeader();
  encoder.setRepeat(0);

  // this function will take our array of images and will encode them to gif file.
  function addToGif(images, counter = 0) {
    // getPixels will extract pixels from each screenshot we took.
    // callback func will expect pixels we extracted and errors if occurred during process
    getPixels(images[counter], function (err, pixels) {
      // encode data from pixels to our gif file

      encoder.addFrame(pixels.data);
      encoder.read();

      // check if our counter has same size of length of our array
      if (counter === images.length - 1) {
        // if they are equal then finish encoding
        encoder.finish();
        // call cleanup function
        cleanUp(images, function (err) {
          if (err) {
            // if any error received log error
            console.log(err);
          } else {
            // if any error didn't ocurred remove temp dir and log gif created then exit.
            fs.rmdirSync(workDir);
            console.log("Gif created");
            process.exit[0];
          }
        });
      } else {
        // if they are not same repeat process again
        addToGif(images, ++counter);
      }

      if (err) {
        console.log(err);
      }
    });
  }

  return addToGif(listOfFrames);
}
