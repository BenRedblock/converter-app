import ffmpeg from 'fluent-ffmpeg';
import { mainWindow } from '../main';
import fs from 'fs';
import path from 'path';
import { calculateProgress } from './utils';
const ffmpegPath = require('ffmpeg-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);



export default async function extractFrames(inputVideo: string) {
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath)

  const videoName = path.basename(inputVideo, path.extname(inputVideo));

  const videoDirectory = path.dirname(inputVideo);

  const framesDirectory = path.join(videoDirectory, `${videoName}-frames`);

  if (fs.existsSync(framesDirectory)) {
    fs.rmSync(framesDirectory, { recursive: true });
  }

  fs.mkdirSync(framesDirectory);
  let seconds = 0

  const intervalId = setInterval(() => {
    seconds++
  }, 1000)

  ffmpeg()
    .input(inputVideo)
    .addOption("-qscale 1")
    .on('progress', async (progress) => {
      mainWindow?.webContents.send("extractFrames", await calculateProgress(inputVideo, progress, seconds))
    })
    .on("error",(error)=> {
      console.log(error.message)
      mainWindow?.webContents.send("extractFrames", [false, `Failed with Error: ${error.message}`])
      clearInterval(intervalId)
    })
    .on("end", ()=> {
      mainWindow?.webContents.send("extractFrames", [true, "Extraction succeeded"])
      clearInterval(intervalId)
    })
    .saveToFile(path.join(framesDirectory, 'frame-%d.jpg'))
}
