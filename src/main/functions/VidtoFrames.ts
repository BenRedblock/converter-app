import pathToFfmpeg from 'ffmpeg-static';

import fs from 'fs';

import path from 'path';

export const extractFrames = async (inputVideo: string) => {

  const videoName = path.basename(inputVideo, path.extname(inputVideo));

  const videoDirectory = path.dirname(inputVideo);

  const framesDirectory = path.join(videoDirectory, `${videoName}-frames`);

  if (fs.existsSync(framesDirectory)) {

    fs.rmSync(framesDirectory, { recursive: true });

  }

  fs.mkdirSync(framesDirectory, { recursive: true });

  // Remove the fps filter to extract all frames
  const command = `${pathToFfmpeg} -i ${path.resolve(inputVideo)} -qscale:v 2 ${path.join(framesDirectory, '%d.jpg')}`;

  const { error } = await require('child_process').exec(command);

  if (error) {

    throw error;

  }

  return {completed: true, message: "Frames extraction completed."}
};
