require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require('../config/secrets')
const router = require("express").Router();


const Users = require("../users/users-model.js");
const { isValid } = require("../config/users-service");


router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    // const rounds = process.env.BCRYPT_ROUNDS || 10;

    // hash the password
    const hash = bcryptjs.hashSync(credentials.password, 8);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
    .first()
      .then(user => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = generateToken(user);

          res.status(200).json({ message: `Welcome ${user.username}!`,
        jwt_token: token
        });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function generateToken(user) {

  const payload = {
    subject: user.id,
    username: user.username,
  };

 const secret = secrets.jwt_secret;

  const options = {
    expiresIn: '30 min'

  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;