const auth = require('./auth');
const chats = require('./chats');
const users = require('./users');

module.exports = {
  auth,
  api: [
    chats,
    users,
  ],
};
