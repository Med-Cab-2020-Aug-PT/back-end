const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
const token = req.headers.authorization;

if (token) {
  const secret = process.env.JWT_SECRET;

  jwt.verify(token, secret, (error, decodedToken) => {
    if (error) {
      console.log(error);
      res.status(401).json({ message: "Token validation error" });
    } else {
      req.decodedToken = decodedToken;
      next();
  }
  });
}

else {
  res.status(400).json({ message: "A authorization header token is required" });
}

};