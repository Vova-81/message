const mongoose = require('mongoose');

const Chat = require('../models/chat');

const verifyChatAccess = (req, res, next) => {
  const {
    user,
  } = req;

  if (!user) {
    const err = new Error('Missing user data!');
    err.status = 401;
    next(err);
    return;
  }

  const chatId = req.body?.chatId || req.params?.chatId || req.query?.chatId;

  if (!chatId) {
    res.status(400).send();
    return;
  }

  Chat.findOne({
    _id: mongoose.Types.ObjectId(chatId),
    userIds: mongoose.Types.ObjectId(user.id),
  }).exec((err, chat) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (chat) {
      next();
    } else {
      res.status(403).send();
    }
  });
};

module.exports = verifyChatAccess;
