const {
  Configuration,
  OpenAIApi,
} = require('openai');

const User = require('../../../models/user');
const Message = require('../../../models/message');

const config = require('../../../config/config');

const configuration = new Configuration({
  apiKey: config.openAiApiKey,
});

const openai = new OpenAIApi(configuration);

const maxPromptLength = 5000;

const createPrompt = (prompt = '', addPart = '') => {
  const newPrompt = prompt + addPart;

  if (newPrompt.length < maxPromptLength) {
    return newPrompt;
  }

  const reducedPrompt = newPrompt.substring(addPart.length);

  const regex = /\[(friend|user)\]:/i;
  const indexToCutFrom = reducedPrompt.search(regex);

  return reducedPrompt.substring(indexToCutFrom);
};

const createResponse = async (userMessage, chat, clients) => {
  const newPrompt = createPrompt(chat._aiPrompt, `[USER]:${userMessage}[FRIEND]:`);

  try {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo-instruct',
      prompt: newPrompt,
      temperature: 0.8,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0.7,
      stop: ['[USER]:', '[FRIEND]:'],
    });

    if (response.status !== 200) {
      return;
    }

    const {
      data: {
        choices,
      },
    } = response;

    const responseMessage = choices[0]?.text;

    if (!responseMessage) {
      return;
    }

    const bot = await User.findOne({
      role: 'ai-friend-bot',
    });

    const message = new Message({
      content: responseMessage,
      chatId: chat.id,
      userId: bot.id,
    });

    const newMessage = await message.save();

    chat.lastMessage = newMessage.id; // eslint-disable-line no-param-reassign
    // eslint-disable-next-line no-param-reassign
    chat._aiPrompt = createPrompt(newPrompt, newMessage.content);

    const dataToSend = {
      type: 'new message',
      chatId: chat.id,
      continueChat: true,
      data: {
        id: newMessage.id,
        content: newMessage.content,
        userId: newMessage.userId,
        createdAt: newMessage.createdAt,
      },
    };

    clients.forEach((client) => {
      client.send(JSON.stringify(dataToSend));
    });

    await chat.save();
  } catch (err) {
    console.error(err);
  }
};

module.exports = createResponse;
