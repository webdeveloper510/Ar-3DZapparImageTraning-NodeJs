const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
var cors = require('cors'); 
//zappar imports
const { train } = require("@zappar/imagetraining");
app.use(cors());
// storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
const Zpturl = "http://13.232.225.65:5000/upload/images/"
//API Calls
app.use("/upload", express.static(__dirname + "/upload"));
app.get("/ping", (req, res)=>{
  console.log("hello server")
    return res.send("hello client")
})
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("before");
  train(`./upload/images/${req.file.filename}`)
    .then((file) => {
      //removing the image
      fs.unlink(`./upload/images/${req.file.filename}`, function (err) {
        if (err) {
          throw err;  
        } else {
          console.log("Successfully deleted the file.");
          //writing to file to make sure binary data is right
          fs.writeFileSync(`./upload/images/fileZpt.zpt`, file);
          res.send({path:`${Zpturl}fileZpt.zpt`})
        }
      });
    })
    .catch((error) => console.error(error));
});

//error handling
function errHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message,
    });
  }
}
//404 error handler
app.use(errHandler);
app.listen(process.env.PORT || 5000, () => {
  console.log("server up and running");
});
