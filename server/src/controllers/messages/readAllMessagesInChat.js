const Message = require('../../models/message');

const readAllMessagesInChat = (_, socket) => async (chatId) => {
  const {
    userId,
  } = socket;

  try {
    await Message.updateMany(
      {
        chatId,
        readByUsers: { $nin: [userId] },
      },
      {
        $push: { readByUsers: userId },
      },
    );
  } catch (err) {
    console.error(err);
  }
};

module.exports = readAllMessagesInChat;
