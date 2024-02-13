import ffmpeg from 'fluent-ffmpeg';
import {
  AudioConvertHistoryType,
  AudioConvertOptions,
} from 'renderer/utils/types';
import { mainWindow } from '../main';
import { calculateProgress } from './utils';

const ffmpegPath = require('ffmpeg-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);
const ffprobePath = require('ffprobe-static-electron').path.replace(
  'app.asar',
  'app.asar.unpacked'
);

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export default function audioConvert(options: AudioConvertOptions) {
  const destinationpath = options.destinationPath
    .split('/')
    .pop()
    ?.endsWith(`.${options.format}`)
    ? options.destinationPath
    : `${options.destinationPath}.${options.format}`;

  const command = ffmpeg(options.inputPath);
  if (options.format) command.format(options.format);
  if (options.audiobitrate) command.audioBitrate(options.audiobitrate);
  else {
    command.addOption('-qscale 1');
  }
  let seconds = 0;

  const intervalId = setInterval(() => {
    seconds += 1;
  }, 1000);

  command
    .on('progress', async (progress) => {
      mainWindow?.webContents.send(
        'audio-convert',
        await calculateProgress(options.inputPath, progress, seconds)
      );
    })
    .on('end', () => {
      mainWindow?.webContents.send('audio-convert', [
        true,
        'Finished converting',
      ]);
      const history: AudioConvertHistoryType = {
        inputAudio: options.inputPath,
        format: options.format,
        outputAudio: destinationpath,
        timestamp: new Date(),
      };
      mainWindow?.webContents.send('history', 'AudioConvert', history);
      clearInterval(intervalId);
    })
    .on('error', (error) => {
      console.log(error.message);
      mainWindow?.webContents.send('audio-convert', [
        false,
        `Failed with Error: ${error.message}`,
      ]);
      clearInterval(intervalId);
    })
    .save(destinationpath);
}
