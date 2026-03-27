const jwt = require('jsonwebtoken');
const config = require('../config/config');

const User = require('../models/user');

const verifyToken = (req, res, next) => {
  const token = req.query.auth || req.headers.authorization;

  if (!token || token === 'null') {
    const err = new Error('Missing auth token!');
    err.status = 401;
    next(err);
    return;
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    User.findById(decoded.id).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).send();
      }
    });
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = verifyToken;
