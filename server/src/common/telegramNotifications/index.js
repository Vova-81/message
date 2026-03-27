const newChatMessage = require('./newChatMessage');
const newUser = require('./newUser');
const signupFail = require('./signupFail');

const telegramNotifications = {
  newChatMessage,
  newUser,
  signupFail,
};

module.exports = telegramNotifications;
