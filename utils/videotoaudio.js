const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

function convertVideoToAudio(videoPath, audioPath, callback) {
  try {
    ffmpeg()
    .input(videoPath)
    .audioCodec('libmp3lame') // You can choose a different audio codec if needed
    .toFormat('mp3') // Output format (e.g., mp3)
    .on('end', () => {
      console.log('Conversion finished');
      if (typeof callback === 'function') {
        callback(null, audioPath);
      }
    })
    .on('error', (err) => {
      console.error('Error converting video to audio:', err);
      if (typeof callback === 'function') {
        callback(err, null);
      }
    })
    .save(audioPath);
  } catch (error) {
    console.error("Error:", error);
    if (typeof callback === "function") {
      callback(error, null);
    }
  }
}

// Example usage:
// const videoPath = "path/to/your/video.mp4";
// const audioPath = "path/to/your/output/audio.mp3";

// convertVideoToAudio(videoPath, audioPath, (err, result) => {
//   if (!err) {
//     console.log("Audio file saved at:", result);
//   } else {
//     console.error("Error:", err);
//   }
// });

module.exports = { convertVideoToAudio };
