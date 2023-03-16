// configure mongoose
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import config from '../config/config.js';

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const dbUrl = config.mongo.url || 'mongodb://localhost/CRUD';

const connectDatabase = () => {
  // Connecting to the database
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};

export default connectDatabase;
