const bcrypt = require('bcryptjs');

const User = require('../../models/user');

const changePassword = async (req, res) => {
  const {
    user,
    body: {
      oldPassword,
      newPassword,
    },
  } = req;

  if (!oldPassword || !newPassword) {
    res.status(400).send();
    return;
  }

  try {
    const currentUser = await User.findById(user.id);

    const passwordIsValid = bcrypt.compareSync(
      oldPassword,
      currentUser.password,
    );

    if (!passwordIsValid) {
      res.status(400).send({ message: 'Invalid old password!' });
      return;
    }

    currentUser.password = bcrypt.hashSync(newPassword, 8);

    await currentUser.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = changePassword;
