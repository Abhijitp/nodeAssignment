const mongoose = require('mongoose');

const { Schema } = mongoose;
const { v4: uuid } = require('uuid');

const eventSchema = new Schema(
  {
    pubId: {
      type: String,
      default: () => uuid(),
      index: { unique: true },
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Event', eventSchema);
