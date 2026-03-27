const Chat = require('../../models/chat');

const resetChatPrompt = async (req, res) => {
  const {
    params: {
      chatId,
    },
  } = req;

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404).send({ message: 'Chat not found' });
    }

    chat._aiPrompt = '';

    await chat.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = resetChatPrompt;
