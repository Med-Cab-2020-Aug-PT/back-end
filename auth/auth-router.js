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
      .then(users => {
        res.status(201).json({ data: users });
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
      .then(users => {
        // compare the password the hash stored in the database
        if (users && bcryptjs.compareSync(password, users.password)) {
            const token = generateToken(users);

          res.status(200).json({ message: `Welcome ${users.username}!`,
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

function generateToken(users) {

  const payload = {
    id: users.id,
    username: users.username,
  };

 const secret = secrets.jwt_secret;

  const options = {
    expiresIn: '30 min'

  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;