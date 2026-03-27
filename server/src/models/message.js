const mongoose = require('mongoose');

const { Schema } = mongoose;

const messageSchema = new Schema({
  content: {
    type: String,
    trim: true,
    required: true,
  },
  chatId: {
    type: mongoose.ObjectId,
    ref: 'Chat',
  },
  userId: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  readByUsers: {
    type: [mongoose.ObjectId],
    ref: 'User',
  },
  contentType: {
    type: String,
    enum: ['text', 'image'],
    default: 'text',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.set('toJSON', {
  virtuals: true,
  transform: (_, converted) => {
    delete converted.__v; // eslint-disable-line no-param-reassign, no-underscore-dangle
    delete converted._id; // eslint-disable-line no-param-reassign, no-underscore-dangle
  },
});

module.exports = mongoose.model('Message', messageSchema);
