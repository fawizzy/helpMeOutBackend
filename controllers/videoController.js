const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const uuid = require("uuid");
const { randomUUID } = require("crypto");
const { consume } = require("../utils/consumer");
const { publish } = require("../utils/publisher");
const ffmpeg = require("fluent-ffmpeg");

// const response = await openai.listEngines();

const BASE_URL = "https://helpmeout-dod8.onrender.com";
//const BASE_URL = "localhost:3000";

const videoUpload = (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    const session_id = req.headers.session_id;
    form.parse(req, function (error, fields, file) {
      const mimetype = file.fileupload[0].mimetype;
      const filepath = file.fileupload[0].filepath;
      const uploadDestination = path.join(__dirname, "../uploads", session_id);

      if (!mimetype.startsWith("video")) {
        res.status(403).json({ error: "file is not a video" });
        return;
      }

      if (!fs.existsSync(uploadDestination)) {
        fs.mkdir(uploadDestination, { recursive: true }, () => {});
      }

      let fileBuffer = fs.readFileSync(filepath);
      let fileStream = fs.createWriteStream(
        path.join(uploadDestination, `${session_id}.webm`),
        { flags: "a" }
      );
      fileStream.write(fileBuffer);

      res.status(200).json({ message: "file successfully uploaded" });
      return;
    });
  } catch (error) {}
};

const createVideo = (req, res) => {
  try {
    const session_id = randomUUID();
    const uploadDestination = path.join(__dirname, "../uploads", session_id);
    if (!fs.existsSync(uploadDestination)) {
      fs.mkdir(uploadDestination, { recursive: true }, () => {});
    }
    // res.cookie("session_id", session_id);
    res.status(200).json({ session_id });
    return;
  } catch (error) {}
};

const getVideo = (req, res) => {
  try {
    const foldername = req.params.foldername;
    const videoname = req.params.videoname;
    const videopath = path.join(
      __dirname,
      "../uploads/",
      foldername,
      videoname
    );

    fs.access(videopath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).json({ error: "The file does not exist" });
        return;
      } else {
        res.status(200).download(videopath);
        return;
      }
    });
  } catch (error) {}
};

const endVideo = async (req, res) => {
  try {
    const axios = require("axios");
    const session_id = req.headers.session_id;

    const videopath = path.join(
      __dirname,
      "../uploads/",
      session_id,
      `${session_id}.webm`
    );
    const transcriptPath = path.join(
      __dirname,
      "../uploads",
      session_id,
      `${session_id}.txt`
    );

    publish(session_id, videopath);
    const transcript = await consume(session_id);
    let transcript_link;
    if (transcript) {
      var transcriptWriteStream = fs.createWriteStream(transcriptPath);
      transcriptWriteStream.write(transcript);
      transcriptWriteStream.end();
      transcript_link = `${BASE_URL}/api/video/d/${session_id}/${session_id}.txt`;
    }else{
      transcript_link= "error transcribing"
    }

    const video_link = `${BASE_URL}/api/video/d/${session_id}/${session_id}.webm`;

    res.status(200).json({ video_link, transcript_link });
  } catch (error) {}
};

module.exports = {
  videoUpload,
  getVideo,
  createVideo,
  endVideo,
};
