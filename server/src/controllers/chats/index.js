const createChat = require('./createChat');
const getChats = require('./getChats');
const getChat = require('./getChat');
const addUsersToChat = require('./addUsersToChat');
const getChatUsers = require('./getChatUsers');
const removeUsersFromChat = require('./removeUsersFromChat');
const uploadImage = require('./uploadImage');
const resetChatPrompt = require('./resetChatPrompt');

const chatsController = {
  create: createChat,
  get: getChats,
  getById: getChat,
  addToChat: addUsersToChat,
  getUsers: getChatUsers,
  removeUsers: removeUsersFromChat,
  uploadImage,
  resetChatPrompt,
};

module.exports = chatsController;
