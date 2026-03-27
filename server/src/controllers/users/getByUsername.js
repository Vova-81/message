const User = require('../../models/user');

const getByUsername = async (req, res) => {
  const {
    body: {
      username,
    },
  } = req;

  if (!username) {
    res.status(400).send();
  }

  try {
    const users = await User.find({ username }, 'id firstName lastName username');
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getByUsername;
