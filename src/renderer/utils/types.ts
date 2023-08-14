export type ConfigData = {
  xboxClipsPath?: string;
};

export type SnackbarType = {
  open: boolean;
  message: string;
  type: 'error' | 'warning' | 'info' | 'success';
};

export type ipcMainresponse = {
  completed: true;
  message: string;
};

export type VideoConvertOptions = {
  destinationPath: string;
  inputPath: string;
  format: string;
  videobitrate?: string;
};

export type AudioConvertOptions = {
  destinationPath: string;
  inputPath: string;
  format: string;
  audiobitrate?: string;
}

export type ProgressType = {
  percent: number;
  remaining?: string;
  text?: string;
};

export type extractFramesHistroyType = {
  outputdir: string;
  timestamp: Date;
};

export type VideoConvertHistoryType = {
  outputVideo: string;
  inputVideo: string;
  format: string;
  timestamp: Date;
};

export type CompressHistoryType = {
  inputPath: string;
  outputPath: string;
  timestamp: Date;
};

export type AudioConvertHistoryType = {
  outputAudio: string;
  inputAudio: string;
  format: string;
  timestamp: Date;
};

export type HistoryType = {
  extractFrames: extractFramesHistroyType[];
  VideoConvert: VideoConvertHistoryType[];
  AudioConvert: AudioConvertHistoryType[];
  Compress: CompressHistoryType[];
};

export type extractFramesInputType = {
  inputFile: string;
  fps?: string;
};

export const AudioFormats = ['mp3', 'ac3', 'eac3', 'wav', 'flac', 'ogg']

export const VideoFormats = ['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv'];
