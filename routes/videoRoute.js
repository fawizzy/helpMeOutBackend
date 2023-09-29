const { videoUpload } = require("../controllers/videoController")
const express = require("express")
const videoRoute = express.Router()

videoRoute.post("/", videoUpload)

module.exports = videoRoute