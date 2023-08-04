import ffmpeg from 'fluent-ffmpeg';
import { mainWindow } from '../main';
import fs from 'fs';
import path from 'path';
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

  const command = ffmpeg()
    .input(inputVideo)
    .saveToFile(path.join(framesDirectory, 'frame-%d.jpg'))
    .on('progress', (progress) => {
      mainWindow?.webContents.send("extractFrames", Math.round(progress.percent))
    })
    .on("error",(error)=> {
      console.log(error.message)
      mainWindow?.webContents.send("extractFrames", [false, `Failed with Error: ${error.message}`])
    })
    .on("end", ()=> {
      mainWindow?.webContents.send("extractFrames", [true, "Extraction succeeded"])
    })
}
