import getVideoDurationInSeconds from "get-video-duration";

export async function calculateProgress(inputVid: string, progress: any, processedseconds: number) {

  const duration = await getVideoDurationInSeconds(inputVid)

  let splittedprog = progress.timemark.split(":");
                 let seconds = 0;
                 if (typeof(splittedprog) == "undefined") {
                 seconds = progress.timemark;
                 } else {
                 if (typeof(splittedprog[3]) != "undefined") {
                 seconds = parseInt(splittedprog[0]) * 24 * 60 * 60 + parseInt(splittedprog[1]) * 60 * 60 +
                 parseInt(splittedprog[2]) * 60 + parseInt(splittedprog[3]);
                  } else if (typeof(splittedprog[2]) != "undefined") {
                 seconds = parseInt(splittedprog[0]) * 60 * 60 + parseInt(splittedprog[1]) * 60 +
                 parseInt(splittedprog[2]);
                  } else if (typeof(splittedprog[1]) != "undefined") {
                 seconds = parseInt(splittedprog[0]) * 60 + parseInt(splittedprog[1]);
                  } else if (typeof(splittedprog[0]) != "undefined") {
                 seconds = parseInt(splittedprog[0]);
                  }
                 }
                 console.log(processedseconds)
                 const remainingminutes = Math.round(((processedseconds / (seconds / duration)) - processedseconds ) / 60)

                 let remainingstring
                 if(remainingminutes < 1) remainingstring =`less than a minute remaining`
                 else if (remainingminutes === 1) remainingstring =`about 1 minute remaining`
                 else remainingstring = `${remainingminutes} minutes remaining`



        return {percent: seconds / duration * 100, remaining: remainingstring}
}
