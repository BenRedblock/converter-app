import { ProgressType } from 'renderer/utils/types';

/**
 *
 * @param inputVid path to a Video
 * @param progress
 * @param processedseconds The seconds that passed
 */
// eslint-disable-next-line import/prefer-default-export
export async function calculateProgress(
  inputVid: string,
  progress: any,
  processedseconds: number
) {
  const remainingminutes = Math.round(
    (processedseconds / (progress.percent / 100) - processedseconds) / 60
  );

  let remainingstring;
  if (remainingminutes < 1) remainingstring = `less than a minute remaining`;
  else if (remainingminutes === 1) remainingstring = `about 1 minute remaining`;
  else remainingstring = `${remainingminutes} minutes remaining`;

  const output: ProgressType = {
    percent: progress.percent,
    remaining: remainingstring,
    text: inputVid,
  };
  return output;
}
