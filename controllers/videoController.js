let formidable = require('formidable');
let fs = require('fs');

const videoUpload = (req, res) => {
    let form = new formidable.IncomingForm();

    //Process the file upload in Node
    form.parse(req, function (error, fields, file) {
      let filepath = file.fileupload[0].filepath;
      let newpath = 'C:/upload-example/';
      newpath += file.fileupload[0].originalFilename;
  
      //Copy the uploaded file to a custom folder
      fs.rename(filepath, newpath, function () {
        //Send a NodeJS file upload confirmation message
        res.write('NodeJS File Upload Success!');
        res.end();
        console.log(newpath)
      });
    });
    try {

        
    } catch (error) {
        
    }
}

module.exports = {
    videoUpload
}