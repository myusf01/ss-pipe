import GIFEncoder from 'gif-encoder-2'
import pkg from 'canvas';
const { createCanvas, Image } = pkg;
import { createWriteStream, readdir, rmdirSync } from "fs";
import { promisify } from "util";
import * as path from 'path';
import { cleanUp } from './index.js'

const readdirAsync = promisify(readdir)

export async function newGif(workDir, filename, device) {
    return new Promise(async resolve1 => {
        const files = await readdirAsync(workDir)
        const [width, height] = [device.canvas_width, device.canvas_height]

        const dstPath = path.join(`${filename}.gif`)
        const writeStream = createWriteStream(dstPath)

        writeStream.on('close', () => {
            resolve1()
        })

        const encoder = new GIFEncoder(width, height)
        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(100)

        const canvas = createCanvas(width, height)
        const ctx = canvas.getContext('2d')

        for (const file of files) {
            await new Promise(resolve3 => {
                const image = new Image()
                image.onload = () => {
                    ctx.drawImage(image, 0, 0)
                    encoder.addFrame(ctx)
                    resolve3()
                }
                image.src = path.join(workDir, file)
            })
        }

        encoder.finish()
        cleanUp(files, function (err) {
            if (err) {
                // if any error received log error
                console.log(err)
            } else {
                // if any error didn't ocurred remove temp dir and log gif created then exit.
                rmdirSync(workDir)
                console.log('Gif created')
                process.exit[0]
            }
        })
    })
}
