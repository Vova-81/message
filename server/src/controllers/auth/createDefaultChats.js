const User = require('../../models/user');
const Chat = require('../../models/chat');
const Message = require('../../models/message');

const createDefaultChats = async (newUser) => {
  try {
    const adminUser = await User.findOne({ role: 'admin' });
    const aiFriendBot = await User.findOne({ role: 'ai-friend-bot' });

    //
    const adminChat = new Chat({
      name: `${adminUser.firstName} ${adminUser.lastName}`,
      userIds: [adminUser.id, newUser.id],
      chatInitiator: adminUser.id,
      type: 'normal',
    });

    const aiFriendChat = new Chat({
      name: `${aiFriendBot.firstName} ${aiFriendBot.lastName}`,
      userIds: [aiFriendBot.id, newUser.id],
      chatInitiator: aiFriendBot.id,
      type: 'ai',
    });

    const newUserFullName = `${newUser.firstName} ${newUser.lastName || ''}`.trim();

    //
    const adminMessage = new Message({
      content: `Hey ${newUserFullName}, welcome!${process.env.SIGNUP_GREETINGS_MESSAGE || ''}`,
      chatId: adminChat.id,
      userId: adminUser.id,
    });

    const aiFriendMessage = new Message({
      content: `Hi ${newUserFullName}! I'm an AI developed by OpenAI. Send me a message, let's start chatting about anything!`,
      chatId: aiFriendChat.id,
      userId: aiFriendBot.id,
    });

    //
    adminChat.lastMessage = adminMessage.id;
    aiFriendChat.lastMessage = aiFriendMessage.id;

    const newDocs = [aiFriendChat, aiFriendMessage, adminChat, adminMessage];

    await Promise.all(newDocs.map(async (doc) => doc.save()));
  } catch (err) {
    console.error(err);
  }
};

module.exports = createDefaultChats;
