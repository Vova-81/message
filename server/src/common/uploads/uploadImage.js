const config = require('../../config/config');

// wrap into promise to use with async/await
const uploadStream = (cloudinary) => (
  fileStream,
  name,
  options = {},
) => new Promise((resolve, reject) => {
  cloudinary.uploader.upload_stream({
    ...options,
    public_id: name,
    folder: config.storageFolder,
  }, (error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  }).end(fileStream);
});

const uploadImage = (cloudinary) => async (fileStream, fileName, options = {}) => {
  const result = await uploadStream(cloudinary)(fileStream, fileName, options);
  return result;
};

module.exports = uploadImage;
