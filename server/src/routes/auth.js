const express = require('express');
const asyncHandler = require('express-async-handler');

const authController = require('../controllers/auth');
const verifyToken = require('../middlewares/verifyToken');
const addDemoData = require('../middlewares/addDemoData');

const router = express.Router();

router
  .route('/signup')
  .post(
    asyncHandler(authController.signup),
  );

router
  .route('/signin')
  .post(
    asyncHandler(authController.signin),
  );

router
  .route('/user')
  .get(
    verifyToken,
    asyncHandler(authController.getUser),
  );

router
  .route('/demo')
  .post(
    addDemoData,
    asyncHandler(authController.signup),
  );

module.exports = router;
