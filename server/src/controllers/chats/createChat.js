const Chat = require('../../models/chat');
const ensureArray = require('../../common/ensureArray');

const createChat = async (req, res) => {
  const {
    user,
    body: {
      name,
      userIds,
    },
  } = req;

  const userIdsArray = ensureArray(userIds);

  const newChat = new Chat({
    name,
    userIds: [...userIdsArray, user.id],
    chatInitiator: user.id,
  });

  try {
    const chatCreated = await newChat.save();
    res.status(201).send(chatCreated);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = createChat;
