const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstname not provided '],
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    unique: [true, 'username already exists in database!'],
    lowercase: true,
    trim: true,
    required: [true, 'username not provided'],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  _avatarOriginal: {
    type: String,
  },
  role: {
    type: String,
    enum: ['normal', 'admin', 'ai-friend-bot'],
    default: 'normal',
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted.__v; // eslint-disable-line no-param-reassign, no-underscore-dangle
    delete converted._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
    delete converted._avatarOriginal; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('User', userSchema);
