const Message = require('../../models/message');

// eslint-disable-next-line no-shadow
const readMessage = (_, socket) => async (_, messageId) => {
  const {
    userId,
  } = socket;

  try {
    const message = await Message.findById(messageId);

    if (!message.readByUsers.includes(userId)) {
      message.readByUsers.push(userId);
    }

    message.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = readMessage;
