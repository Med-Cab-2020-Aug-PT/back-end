const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets');

const db = require('../database/db_config')

module.exports = (req, res, next) => {

try {
  const token = req.headers.authorization.split(" ")[1];
  console.log("The token is", token)
  if (token) {
  // const secret = process.env.JWT_SECRET;

  jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
    if (err) {
      throw new Error(err)
      // res.status(401).json({ message: "Token validation error" });
    } else {
      req.decodedToken = decodedToken;
      console.log("Decoded Token", decodedToken)
      next();
  }
  });
}

else {
  // res.status(400).json({ message: "A authorization header token is required" });
  throw new Error('bad auth')
}

}
catch (err) {
  res.status(401).json({message: "I can't let you do that Dave!"})
}
};