const sendNotification = require('./send');

const signupFail = async (user, error) => {
  try {
    const messageToSend = 'Signup failed\n\n'
      + `*User:* ${user.firstName} ${user.lastName} (${user.username})\n`
      + `*Error:* ${error.code}`;

    await sendNotification(messageToSend);
  } catch (err) {
    console.error(err);
  }
};

module.exports = signupFail;
