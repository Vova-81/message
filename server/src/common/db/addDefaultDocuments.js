const bcrypt = require('bcryptjs');

const User = require('../../models/user');

const addDefaultDocuments = async () => {
  const adminUser = await User.findOne({ username: process.env.APP_ADMIN_LOGIN });
  const aiFriendBot = await User.findOne({ username: process.env.APP_FRIEND_BOT_LOGIN });

  if (!adminUser) {
    const newAdminUser = new User({
      username: process.env.APP_ADMIN_LOGIN,
      firstName: process.env.APP_ADMIN_FIRSTNAME,
      lastName: process.env.APP_ADMIN_LASTNAME,
      email: process.env.APP_ADMIN_EMAIL,
      role: 'admin',
      password: bcrypt.hashSync(process.env.APP_ADMIN_PASSWORD, 8),
    });

    await newAdminUser.save();
  }

  if (!aiFriendBot) {
    const newAiFriendBot = new User({
      username: process.env.APP_FRIEND_BOT_LOGIN,
      firstName: process.env.APP_FRIEND_BOT_FIRSTNAME,
      lastName: process.env.APP_FRIEND_BOT_LASTNAME,
      role: 'ai-friend-bot',
      password: bcrypt.hashSync(process.env.APP_FRIEND_BOT_PASSWORD, 8),
    });

    await newAiFriendBot.save();
  }
};

module.exports = addDefaultDocuments;
