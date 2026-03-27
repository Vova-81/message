const User = require('../../models/user');

const updateUser = async (req, res) => {
  const {
    user,
    body,
  } = req;

  const updateValuesKeys = ['firstName', 'lastName', 'username', 'email', 'phone'];

  try {
    const currentUser = await User.findById(user.id);

    updateValuesKeys.forEach((key) => {
      const updateValue = body[key];
      if (updateValue) {
        currentUser[key] = updateValue;
      }
    });

    await currentUser.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = updateUser;
