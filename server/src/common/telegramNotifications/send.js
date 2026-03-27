const https = require('https');
const querystring = require('querystring');

const tgBotToken = process.env.TELEGRAM_BOT_TOKEN;
const adminUserTgId = process.env.ADMIN_USER_TELEGRAM_ID;

const baseUrl = `https://api.telegram.org/bot${tgBotToken}`;

function send(message) {
  const urlParams = querystring.stringify({
    chat_id: adminUserTgId,
    text: message,
    parse_mode: 'Markdown',
  });

  const url = `${baseUrl}/sendMessage?${urlParams}`;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => (res.statusCode === 200 ? resolve(res) : reject(res)))
      .on('error', reject);
  });
}

module.exports = send;
