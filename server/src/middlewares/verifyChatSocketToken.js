const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('../config/config');

const User = require('../models/user');
const Chat = require('../models/chat');

const verifyToken = async (token, chatId) => {
  if (!token || token === 'null') {
    return false;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findById(decoded.id).exec();
    if (!user) {
      return false;
    }

    if (!chatId) {
      return user.id;
    }

    const chat = await Chat.findOne({
      _id: mongoose.Types.ObjectId(chatId),
      userIds: mongoose.Types.ObjectId(user.id),
    });

    if (chat) {
      return user.id;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = verifyToken;
