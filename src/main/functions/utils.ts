// import ffmpeg from "fluent-ffmpeg"
// const ffprobePath = require('ffprobe-static-electron').path.replace(
//   'app.asar',
//   'app.asar.unpacked'
// );


export async function calculateProgress(inputVid: string, progress: any, processedseconds: number) {

  // const duration = await getVideoDurationInSeconds(inputVid)

  // let duration: number | undefined
//   ffmpeg.setFfprobePath(ffprobePath)
//   ffmpeg.ffprobe(inputVid, (err, metadata) => {
//     // console.dir(metadata); // all metadata
//     if (metadata.format.duration) duration = metadata.format.duration
// });

// console.log(progress.percent)

// let seconds: number | undefined
  // if(!progress.percent) {
  // let splittedprog = progress.timemark.split(":");
  //                 seconds = 0;
  //                if (typeof(splittedprog) == "undefined") {
  //                seconds = progress.timemark;
  //                } else {
  //                if (typeof(splittedprog[3]) != "undefined") {
  //                seconds = parseInt(splittedprog[0]) * 24 * 60 * 60 + parseInt(splittedprog[1]) * 60 * 60 +
  //                parseInt(splittedprog[2]) * 60 + parseInt(splittedprog[3]);
  //                 } else if (typeof(splittedprog[2]) != "undefined") {
  //                seconds = parseInt(splittedprog[0]) * 60 * 60 + parseInt(splittedprog[1]) * 60 +
  //                parseInt(splittedprog[2]);
  //                 } else if (typeof(splittedprog[1]) != "undefined") {
  //                seconds = parseInt(splittedprog[0]) * 60 + parseInt(splittedprog[1]);
  //                 } else if (typeof(splittedprog[0]) != "undefined") {
  //                seconds = parseInt(splittedprog[0]);
  //                 }
  //                }
  //               }
// const percent = seconds && duration ? seconds / duration * 100 : progress.percent

                 const remainingminutes = Math.round(((processedseconds / (progress.percent / 100)) - processedseconds ) / 60)

                 let remainingstring
                 if(remainingminutes < 1) remainingstring =`less than a minute remaining`
                 else if (remainingminutes === 1) remainingstring =`about 1 minute remaining`
                 else remainingstring = `${remainingminutes} minutes remaining`



        return {percent: progress.percent, remaining: remainingstring}
}
