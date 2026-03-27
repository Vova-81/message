const Chat = require('../../models/chat');

const {
  uploadImage: upload,
  getResizedImage,
} = require('../../common/uploads');

const uploadImage = async (req, res) => {
  const {
    params: {
      chatId,
    },
    user,
    file,
  } = req;

  try {
    const chat = await Chat.findById(chatId);
    if (!chat) {
      res.status(404).send('Chat not found');
    }

    const imageStream = file.buffer;
    const imageName = new Date().getTime().toString();

    await upload(
      imageStream,
      imageName,
      {
        tags: 'image_message',
        context: `uploaded_by_user_id=${user.id}|uploaded_to_chat_id=${chatId}`,
      },
    );

    const minUrl = getResizedImage(imageName, 'medium');

    res.status(200).send({ url: minUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = uploadImage;
