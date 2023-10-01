// Import required modules
const express = require('express');
const videoRoute = require("./routes/videoRoute")
const cors = require("cors")
const cookieParser = require("cookie-parser")

// Create an instance of Express
const app = express();
// Define a port for your server to listen on
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 5 }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/video", videoRoute)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
