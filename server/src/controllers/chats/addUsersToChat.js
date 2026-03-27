const mongoose = require('mongoose');
const Chat = require('../../models/chat');
const User = require('../../models/user');
const ensureArray = require('../../common/ensureArray');

const addUsersToChat = async (req, res) => {
  const {
    body: {
      users,
    },
    params: {
      chatId,
    },
  } = req;

  const newUsers = ensureArray(users);

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404).send({ message: 'Chat not found' });
    }

    newUsers.forEach((userId) => {
      if (!chat.userIds.includes(userId)) {
        chat.userIds.push(mongoose.Types.ObjectId(userId));
      }
    });

    if (chat.type !== 'ai') {
      const aiBot = await User.findOne({ _id: { $in: newUsers }, role: 'ai-friend-bot' });

      if (aiBot) {
        chat.type = 'ai';
      }
    }

    await chat.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = addUsersToChat;
