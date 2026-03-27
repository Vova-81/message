const cloudinary = require('cloudinary').v2;
const config = require('../../config/config');

const getResizedImage = require('./getResizedImage');
const uploadImage = require('./uploadImage');

cloudinary.config({
  cloud_name: config.storageCloudName,
  api_key: config.storageApiKey,
  api_secret: config.storageApiSecret,
});

const uploads = {
  getResizedImage: getResizedImage(cloudinary),
  uploadImage: uploadImage(cloudinary),
};

module.exports = uploads;
