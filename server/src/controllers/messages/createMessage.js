const Message = require('../../models/message');
const Chat = require('../../models/chat');
const User = require('../../models/user');

const createAiResponse = require('./ai/createResponse');
const telegramNotifications = require('../../common/telegramNotifications');

const createMessage = (wss, socket) => async (chatId, content, contentType = 'text') => {
  const {
    userId,
  } = socket;

  const message = new Message({
    content,
    contentType,
    chatId,
    userId,
  });

  try {
    const newMessage = await message.save();

    let chat = await Chat.findById(chatId, 'userIds type _aiPrompt');

    chat.lastMessage = newMessage.id;

    const shouldBeHandledByAi = chat.type === 'ai' && contentType === 'text';

    const dataToSend = {
      type: 'new message',
      chatId,
      pauseChat: shouldBeHandledByAi,
      data: {
        id: newMessage.id,
        content,
        contentType: newMessage.contentType,
        userId,
        createdAt: newMessage.createdAt,
      },
    };

    const chatClients = [];

    wss.clients.forEach((client) => {
      if (chat.userIds.includes(client.userId)) {
        chatClients.push(client);
        client.send(JSON.stringify(dataToSend));
      }
    });

    chat = await chat.save();

    // create Ai response
    if (shouldBeHandledByAi) {
      createAiResponse(newMessage.content, chat, chatClients);
    }

    // send a message to admin's Telegram if the message is for them
    const adminUser = await User.findOne({ role: 'admin' });
    const messageFromAdmin = adminUser.id === userId;
    if (messageFromAdmin) {
      return;
    }
    const hasAdminInChat = chat.userIds.includes(adminUser.id);

    if (hasAdminInChat) {
      telegramNotifications.newChatMessage(userId, chatId, newMessage);
    }
    //
  } catch (err) {
    console.error(err);
  }
};

module.exports = createMessage;
