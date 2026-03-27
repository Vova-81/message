const User = require('../../models/user');

const {
  uploadImage,
  getResizedImage,
} = require('../../common/uploads');

const uploadAvatar = async (req, res) => {
  const {
    user,
    file,
  } = req;

  try {
    const currentUser = await User.findById(user.id);

    const imageStream = file.buffer;
    const imageName = new Date().getTime().toString();

    const uploadResult = await uploadImage(
      imageStream,
      imageName,
      {
        tags: 'profile_image',
        context: `uploaded_by_user_id=${user.id}|caption=Profile image`,
      },
    );

    const originalUrl = uploadResult.url;
    const minUrl = getResizedImage(imageName, 'thumbnail');

    currentUser._avatarOriginal = originalUrl;
    currentUser.avatar = minUrl;

    await currentUser.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = uploadAvatar;
