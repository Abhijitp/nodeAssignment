import express from 'express';
import connectDatabase from '../dbConnection/database.js';

import eventRouter from '../routes/EventRoute.js';
import AppError from '../utils/AppError.js';

import userRouter from '../routes/UserRoute.js';

connectDatabase();

const app = express();

// middleware
app.use(express.json());

app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).json({ error: err.message });
  next();
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

export default app;
