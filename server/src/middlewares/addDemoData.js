const generateRandomPassword = require('../common/generateRandomPassword');

const DEMO_USER_FIRSTNAME = 'Demo';
const DEMO_USER_LASTNAME = 'User';

const addDemoData = (req, res, next) => {
  req.body.username = `demo-${Date.now()}`;
  req.body.firstName = DEMO_USER_FIRSTNAME;
  req.body.lastName = DEMO_USER_LASTNAME;
  req.body.password = generateRandomPassword();

  next();
};

module.exports = addDemoData;
