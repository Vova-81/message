const updateUser = require('./updateUser');
const changePassword = require('./changePassword');
const getByUsername = require('./getByUsername');
const uploadAvatar = require('./uploadAvatar');

const usersController = {
  update: updateUser,
  changePassword,
  getByUsername,
  uploadAvatar,
};

module.exports = usersController;
