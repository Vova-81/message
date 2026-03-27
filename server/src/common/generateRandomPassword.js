const crypto = require('crypto');

const generateRandomPassword = () => crypto.randomBytes(5).toString('hex');

module.exports = generateRandomPassword;
