


const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets');

// const db = require('../database/db_config')

const Users = require('../users/users-model');


module.exports = async (req, res, next) => {
  // token must be included in the header as Authorization
  const [token] = await req.headers.authorization.split(" ")[1]

  if (token) {
      jwt.verify(token, secrets, async (err, decodedToken) => {
          if (err) {
              return res.status(401).json({ message: 'invalid token' })
          }
          const user = await Users.findByToken(token)
          if (user.length < 1) { return res.status(401).json({ message: 'invalid token' }) }
          req.token = token
          req.decodedToken = decodedToken
          next()
      })
  } else {
      res.status(401).json({ message: 'No token found' })
  }
}

module.exports = async (req, res, next) => {

try {
  const token = req.headers.authorization.split(" ")[1];
  // console.log("The token is", token)
  if (token) {
  // const secret = process.env.JWT_SECRET;

  jwt.verify(token, secrets.jwt_secret, (err, decodedToken) => {
    if (err) {
      throw new Error(err)
      // res.status(401).json({ message: "Token validation error" });
    } else {
      const users = Users.findByToken(token)
      if(users.length < 1) {
        return restart.status(401).json({message: "Homey don't play that1"})
      }
      req.token = token
      req.decodedToken = decodedToken;
      // console.log("Decoded Token", decodedToken)
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