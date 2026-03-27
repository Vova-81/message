/* eslint-disable no-param-reassign */
const url = require('url');

const verifyToken = require('../middlewares/verifyChatSocketToken');
const {
  get,
  create,
  read,
  readAll,
} = require('../controllers/messages');

const messageTypesHandlers = {
  'get old': get,
  message: create,
  read: read, // eslint-disable-line object-shorthand
  'read all': readAll,
};

const connectSocket = (wss) => wss.on('connection', async (socket, request) => {
  console.info('New socket connection');

  socket.isAlive = true;

  const {
    token,
  } = url.parse(request.url, true).query;

  const userId = await verifyToken(token);
  if (!userId) {
    socket.terminate();
    return;
  }

  socket.on('pong', () => {
    socket.isAlive = true;
  });

  socket.userId = userId;

  socket.on('message', async (message) => {
    const {
      chatId,
      type,
      content,
      contentType,
    } = JSON.parse(message);

    const canAccessChat = await verifyToken(token, chatId);

    if (!canAccessChat) {
      return;
    }

    const handler = messageTypesHandlers[type];

    if (handler) {
      handler(wss, socket)(chatId, content, contentType);
    }
  });
});

module.exports = connectSocket;
