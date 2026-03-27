const multer = require('multer');

const storage = multer.memoryStorage();

const uploadMiddleware = multer(
  {
    storage,
    // limiting file size by 5Mb
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, cb) { // eslint-disable-line consistent-return
      const fileRegex = /.(jpg|jpeg|png)$/;
      const fileName = file.originalname;

      if (!fileName.match(fileRegex)) {
        return cb(new Error('Invalid file type'));
      }
      cb(null, true);
    },
  },
).single('image');

module.exports = uploadMiddleware;
