const mongoose = require('mongoose');
const Chat = require('../../models/chat');
const User = require('../../models/user');
const ensureArray = require('../../common/ensureArray');

const removeUsersFromChat = async (req, res) => {
  const {
    body: {
      users,
    },
    params: {
      chatId,
    },
  } = req;

  const usersToRemove = ensureArray(users);

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404).send({ message: 'Chat not found' });
    }

    usersToRemove.forEach((userId) => {
      if (chat.userIds.includes(userId)) {
        chat.userIds.pull(mongoose.Types.ObjectId(userId));
      }
    });

    if (chat.type === 'ai') {
      const aiBot = await User.findOne({ _id: { $in: chat.userIds }, role: 'ai-friend-bot' });

      if (!aiBot) {
        chat.type = 'normal';
      }
    }

    await chat.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = removeUsersFromChat;
