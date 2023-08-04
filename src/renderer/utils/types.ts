export type ConfigData = {
  xboxClipsPath?: string;
};

export type SnachbarType = {
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
  format:
    | 'mp4'
    | 'mov'
    | 'avi'
    | 'webm'
    | 'gif'
    | 'mp3'
    | 'adts'
    | 'wav'
    | 'flac';
    videobitrate?: string
};


export enum VideoCondecs {
  VIDEO_H264 = 'libx264',
  VIDEO_H265 = 'libx265',
  VIDEO_VP8 = 'libvpx',
  VIDEO_VP9 = 'libvpx-vp9',
  VIDEO_THEORA = 'libtheora',
  VIDEO_XVID = 'libxvid',
  VIDEO_MJPEG = 'mjpeg',
  VIDEO_PRORES = 'prores',
  VIDEO_HAP = 'hap',
}

export enum AudioCondecs {
  AUDIO_AAC = 'aac',
  AUDIO_MP3 = 'mp3',
  AUDIO_VORBIS = 'libvorbis',
  AUDIO_OPUS = 'libopus',
  AUDIO_PCM_S16LE = 'pcm_s16le',
  AUDIO_PCM_S24LE = 'pcm_s24le',
}

enum Formats {
  // Video
  MP4 = 'mp4',
  MOV = 'mov',
  AVI = 'avi',
  MKV = 'mkv',
  WEBM = 'webm',
  GIF = 'gif',
  FLV = 'flv',

  // Audio
  MP3 = 'mp3',
  AAC = 'adts',
  OGG = 'ogg',
  WAV = 'wav',
  FLAC = 'flac',
}

enum ImageFormats {
  // Image
  JPG = 'jpg',
  PNG = 'png',
  TIF = 'tif',
}
