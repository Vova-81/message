const Chat = require('../../models/chat');

const getChat = async (req, res) => {
  const {
    user,
  } = req;

  const {
    chatId,
  } = req.params;

  const userFieldsToSelect = 'id firstName lastName username avatar';

  try {
    const chat = await Chat.findById(chatId).populate('users', userFieldsToSelect);

    // temporary chat avatar solution
    const chatAvatar = chat?.users.find((chatUser) => chatUser.id !== user.id)?.avatar;

    res.status(200).send({
      ...chat.toJSON(),
      avatar: chatAvatar,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChat;
