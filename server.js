// Import required modules
const express = require('express');
const videoRoute = require("./routes/videoRoute")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path")
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger/swagger.yaml');

// Create an instance of Express
const app = express();
// Define a port for your server to listen on
const port = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(cors());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 5 }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/video", videoRoute)
app.get('/doc', (req, res) => {
  // Use the `path` module to construct the file path
  const filePath = path.join(__dirname,"html-client", 'index.html');
  
  // Send the HTML file as the response
  res.sendFile(filePath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
