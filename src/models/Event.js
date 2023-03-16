import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    pubId: {
      type: String,
      default: () => uuidv4(),
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

export default mongoose.model('Event', eventSchema);
