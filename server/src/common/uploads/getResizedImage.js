const config = require('../../config/config');

const variants = {
  thumbnail: {
    height: 200,
    width: 200,
    crop: 'fit',
  },
  medium: {
    height: 400,
    width: 400,
    crop: 'fit',
  },
};

const getResizedImage = (cloudinary) => (imageName, variant = 'medium') => {
  const options = variants[variant];

  return cloudinary.url(`${config.storageFolder}/${imageName}`, options);
};

module.exports = getResizedImage;
