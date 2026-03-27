const sendNotification = require('./send');

const newUser = async (user) => {
  try {
    const messageToSend = 'New user signed up\n\n'
      + `*User:* ${user.firstName} ${user.lastName} (${user.username})\n`
      + `*User id:* ${user.id}\n`
      + `*Created at:* ${user.createdAt}`;

    await sendNotification(messageToSend);
  } catch (err) {
    console.error(err);
  }
};

module.exports = newUser;
