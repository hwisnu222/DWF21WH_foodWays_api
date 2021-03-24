const multer = require("multer");

exports.uploadFile = (image) => {
  // rename name and set directory upload
  const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "uploads");
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
    },
  });

  //   filter mimetype file
  const filterImage = function (req, file, callback) {
    if (file.fieldname === image) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "only image file are allowed",
        };

        return callback(new Error("only image file are allowed"), false);
      }
    }
  };

  // set maximum file upload
  // Mb x Kb x bit
  const maxSize = 5 * 1000 * 1000;

  //run multer for upload
  const upload = multer({
    storage,
    filterImage,
    limits: {
      fileSize: maxSize,
    },
  }).fields([
    {
      name: image,
      maxCount: 1,
    },
  ]);

  //   handler middleware
  return (req, res, next) => {
    upload(req, res, function (err) {
      //validation error
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      //handle error if user not upload
      if (!req.files && !err)
        return res.status(400).send({
          message: "choose a image",
        });

      //error if file above 5mb
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "file upload can't above 5mb",
          });
        }
        return res.status(400).send(err);
      }

      //   if you access file name or anything. you can use req.files
      //   next to controller route
      return next();
    });
  };
};
