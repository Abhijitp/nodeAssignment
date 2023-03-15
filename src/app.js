const express = require("express");
const app = express();
require("./config/database").connectDatabase();
const AppError = require('../src/utils/AppError');

//middleware
app.use(express.json());

const eventRouter = require("./routes/EventRoute");
const userRouter = require("./routes/UserRoute");
 
app.use("/api/events", eventRouter);
app.use("/api/users", userRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).json({ error: err.message });
})
 
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

module.exports = app;

