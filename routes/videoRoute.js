const { videoUpload, getVideo, createVideo, endVideo } = require("../controllers/videoController");
const express = require("express");
const videoRoute = express.Router();

videoRoute.post("/", videoUpload);
videoRoute.get("/d/:foldername/:videoname", getVideo);
videoRoute.get("/c/createvideo", createVideo)
videoRoute.post("/c/endvideo", endVideo)

module.exports = videoRoute;
