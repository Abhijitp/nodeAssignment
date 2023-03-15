const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    pubId: {
      type: String,
      default: () => uuid(),
      index: { unique: true },
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    token: {
      type: String,
    },
  },
);

module.exports = mongoose.model('User', userSchema);
