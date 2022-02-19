import GIFEncoder from 'gif-encoder-2'
import pkg from 'canvas';
const { createCanvas, Image } = pkg;
import { createWriteStream, readdir } from "fs";
import { promisify } from "util";
import * as path from 'path';

import { cleanUp } from './index.js'


const readdirAsync = promisify(readdir)
// const imagesFolder = path.join(__dirname, 'input')
// import getPixels from 'get-pixels'
// import fs from 'fs'
// import jimp from 'jimp'

export async function newGif(workDir, filename, device) {
    return new Promise(async resolve1 => {
        const files = await readdirAsync(workDir)
        const [width, height] = [device.canvas_width, device.canvas_height]

        // const [width, height] = await new Promise(resolve2 => {
        //     const image = new Image()
        //     image.onload = () => resolve2([image.width, image.height])
        //     image.src = path.join(workDir, files[0])
        // }).catch(console.log)
        // console.log([width, height]);

        const dstPath = path.join(`${filename}.gif`)
        const writeStream = createWriteStream(dstPath)

        writeStream.on('close', () => {
            resolve1()
        })

        const encoder = new GIFEncoder(width, height)
        encoder.createReadStream().pipe(writeStream)
        encoder.start()
        encoder.setDelay(200)

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
    })
}
