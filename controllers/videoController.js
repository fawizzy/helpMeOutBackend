let formidable = require('formidable');
let fs = require('fs');
let path = require("path")

const videoUpload = (req, res) => {
    let form = new formidable.IncomingForm();

    //Process the file upload in Node
    form.parse(req, function (error, fields, file) {
      let filepath = file.fileupload[0].filepath;
      let uploadDestination = path.join(__dirname,"../uploads")
      let newpath =path.join(uploadDestination, file.fileupload[0].originalFilename);
      

      if (!fs.existsSync(uploadDestination)){
        fs.mkdirSync(uploadDestination)
      }
  
      //Copy the uploaded file to a custom folder
      fs.rename(filepath, newpath, function () {
        //Send a NodeJS file upload confirmation message
        res.write(newpath);
        res.end();
      });
    });
    try {

        
    } catch (error) {
        
    }
}

module.exports = {
    videoUpload
}