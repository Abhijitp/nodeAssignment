// configure mongoose
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/CRUD';
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
