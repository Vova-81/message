const User = require('../../models/user');

const sendNotification = require('./send');

const newChatMessage = async (userId, chatId, message) => {
  try {
    const user = await User.findById(userId);

    const messageToSend = 'You got a new message\n\n'
      + `*From:* ${user.firstName} ${user.lastName} (${user.username})\n`
      + `*User id:* ${user.id}\n`
      + `*Chat id:* ${chatId}\n`
      + `*Message:* ${message.content}\n`
      + `*Received at:* ${message.createdAt}`;

    await sendNotification(messageToSend);
  } catch (err) {
    console.error(err);
  }
};

module.exports = newChatMessage;
