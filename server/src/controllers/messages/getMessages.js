const mongoose = require('mongoose');
const Message = require('../../models/message');

const getMessages = (_, socket) => async (chatId) => {
  try {
    const messages = await Message.find({
      chatId: mongoose.Types.ObjectId(chatId),
    }, '-readByUsers').sort({ createdAt: 'desc' });

    socket.send(JSON.stringify({
      type: 'old messages',
      chatId,
      data: messages,
    }));
  } catch (error) {
    console.error(error);
  }
};

module.exports = getMessages;
