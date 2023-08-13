import { ipcMain, shell } from 'electron';
import extractFrames from './functions/extractFrames';
import sortVideosByFirstWord from './functions/sortVideosByFirstWord';
import { AudioConvertOptions, VideoConvertOptions, extractFramesInputType } from 'renderer/utils/types';
import videoConvert from './functions/video-convert';
import audioConvert from './functions/audio-convert';

export default function listeners() {
  console.log('Running Listeners');
  ipcMain.handle('xbox-clip-sorting', async (event, arg: string) => {
    return sortVideosByFirstWord(arg);
  });

  ipcMain.on('extractFrames', async (event, options: extractFramesInputType) => {
    extractFrames(options.inputFile, options.fps);
  });

  ipcMain.on(
    'video-convert',
    (
      event,
      options: VideoConvertOptions
    ) => {
      videoConvert(options)
    }
  );

  ipcMain.on('shell', (event, type, path) => {
    if(type === "openPath") shell.openPath(path)
    if(type === "showItemInFolder") shell.showItemInFolder(path)
  })

  ipcMain.on('audio-convert', (event, options: AudioConvertOptions) => {
    audioConvert(options)
  })
}
