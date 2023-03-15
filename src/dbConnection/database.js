// configure mongoose
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('../config/config');

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });
const dbUrl = config.MONGO_URL || 'mongodb://localhost/CRUD';
exports.connectDatabase = () => {
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
