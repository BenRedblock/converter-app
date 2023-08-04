const ffmpegPath = require('ffmpeg-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);

import ffmpeg from "fluent-ffmpeg"
import { mainWindow } from "../main";
import { VideoConvertOptions } from "renderer/utils/types";
import { calculateProgress } from "./utils";

ffmpeg.setFfmpegPath(ffmpegPath)
ffmpeg.setFfprobePath(ffprobePath)
export default function videoConvert(options:VideoConvertOptions) {
  console.log(options.destinationPath)

  const destinationpath = options.destinationPath.split("/").pop()?.endsWith(`.${options.format}`) ? options.destinationPath : `${options.destinationPath}.${options.format}`

  const command = ffmpeg(options.inputPath)
  if(options.format) command.format(options.format);
  if(options.videobitrate) command.videoBitrate(options.videobitrate)
  else {
command.addOption("-qscale 1")
}
  let seconds = 0

  const intervalId = setInterval(() => {
    seconds++
  }, 1000)


  command.on("progress",async (progress)=> {
    console.log("progress")
    mainWindow?.webContents.send("video-convert", await calculateProgress(options.inputPath, progress, seconds))
  })
  .on("end",()=> {
    mainWindow?.webContents.send("video-convert", [true, 'Finished converting'])
    clearInterval(intervalId)
  })
  .on("error",(error)=> {
    console.log(error.message)
    mainWindow?.webContents.send("video-convert", [false, `Failed with Error: ${error.message}`])
    clearInterval(intervalId)
  })
  .save(destinationpath)

}