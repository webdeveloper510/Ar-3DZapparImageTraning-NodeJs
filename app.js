const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
//zappar imports
const { train } = require("@zappar/imagetraining");

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

//API Calls
app.use("/profile", express.static("/var/node-api/zappar-on-fly-image-train/upload/images"));
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("before");
  //train is taking image as input at outputin target file
  train(`/var/node-api/zappar-on-fly-image-train/upload/images/${req.file.filename}`)
    .then((file) => {
      // res is a Buffer containing the target file data
      //removing the image
      fs.unlink(`./upload/images/${req.file.filename}`, function (err) {
        if (err) {
          throw err;
        } else {
          console.log("Successfully deleted the file.");
          //writing to file to make sure binary data is right
          // fs.writeFileSync("./upload/images/file.zpt", file);
        }
      });
      //seding the response
      res.write(file, "binary");
      res.end(null, "binary");
    })
    .catch((error) => console.error(error));
});

//API Testing purposes
// res.json({
//   success: 1,
//   image_url: `http://localhost:4000/profile/${req.file.filename}`,
// });

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
app.listen(5001, () => {
  console.log("server up and running");
});
