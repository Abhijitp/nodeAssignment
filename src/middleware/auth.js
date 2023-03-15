const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken =  (req, res, next) => {
  if (process.env.NODE_ENV === 'testing') {
    return next();
  }
  const token = 
    req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token,  process.env.TOKEN_KEY || "mysecret",);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;