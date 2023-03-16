/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { userSchema } from '../middleware/schemas.js';
import AppError from '../utils/AppError.js';

const register = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      const msg = error.details.map((el) => el.message).join(',');
      throw new AppError(msg, 400);
    }
    // Get user input
    const {
      firstName, lastName, email, password,
    } = req.body;

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { pubId: user.pubId, email },
      process.env.TOKEN_KEY || 'mysecret',
      {
        expiresIn: '2h',
      },
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All input is required');
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { pubId: user.pubId, email },
        process.env.TOKEN_KEY || 'mysecret',
        {
          expiresIn: '10h',
        },
      );
      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { login, register };
