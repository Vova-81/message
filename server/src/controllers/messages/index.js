const createMessage = require('./createMessage');
const getMessages = require('./getMessages');
const readMessage = require('./readMessage');
const readAllMessagesInChat = require('./readAllMessagesInChat');

const messagesController = {
  create: createMessage,
  get: getMessages,
  read: readMessage,
  readAll: readAllMessagesInChat,
};

module.exports = messagesController;
