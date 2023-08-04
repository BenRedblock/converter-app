import { ipcMain } from 'electron';
import extractFrames from './functions/extractFrames';
import sortVideosByFirstWord from './functions/sortVideosByFirstWord';
import { VideoConvertOptions } from 'renderer/utils/types';
import videoConvert from './functions/video-convert';

export default function listeners() {
  console.log('Running Listeners');
  ipcMain.handle('xbox-clip-sorting', async (event, arg: string) => {
    return sortVideosByFirstWord(arg);
  });

  ipcMain.on('extractFrames', async (event, pathtoVid: string) => {
    if (typeof pathtoVid === 'string') extractFrames(pathtoVid);
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
}
