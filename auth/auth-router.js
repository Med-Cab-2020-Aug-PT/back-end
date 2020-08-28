require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require('../config/secrets')
const router = require("express").Router();
const restrict = require('../config/restric-mid')

const Users = require("../users/users-model.js");
const { isValid } = require("../config/users-service");


router.post("/register", async (req, res) => {
  try { 
  const credentials = await req.body;

  if (isValid(credentials)) {
    // const rounds = process.env.BCRYPT_ROUNDS || 10;

    // hash the password
    const hash = await bcryptjs.hashSync(credentials.password, 8);

    credentials.password = hash;

    // save the user to the database
    Users.add(credentials)
      .then(users => {
        res.status(201).json({ data: users.username });
      })
    
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    });
  }
} catch (e) {
  res.status(500).json({ message: error.message });
}
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body
  try {
      const users = await Users.findBy({username}).first()
      if (isValid(req.body)) {
        if (users && bcryptjs.compareSync(password, users.password)) {
          const token = await generateToken(users)
          const tokenAdded = await Users.addToken(users.id, token)
          if (tokenAdded > 0) { 
              return res.status(200).json({ username: users.username, token })
          }
        }
      }
      res.status(401).json({ message: 'wrong credentials' })
  } catch(e) {
      res.status(500).json({message: e.message })
  }
})

router.post('/logout', restrict, async (req, res) => {
  
  try {
    const username = await req.decodedToken.username
      console.log(req.decodedToken)
      const users = await Users.removeToken(req.token)
      if (users > 0) { return res.status(200).json({ message: `${username} successfully logged out.` })}
      res.status(404).json({ message: 'user not found' })
  } catch(e) {
      res.status(500).json({ message: 'request error' })
  }
})



function generateToken(users) {

  const payload = {
    id: users.id,
    username: users.username,
  };

 const secret = secrets.jwt_secret;

  const options = {
    expiresIn: '60 min'

  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;