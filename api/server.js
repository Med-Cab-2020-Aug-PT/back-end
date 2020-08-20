const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Auth = require('../auth/auth-router')

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api", Auth)

server.get('/', (req, res) => {
  
    res.send(`
    <div style = 
   "
      display: flex;
      flex-direction: column;
      align-items: center;
      
      "
    >
    <div>
<h1>Hello World!</h1>
<div>
<p>
<br>"I was gonna clean my room until I got high
<br>I was gonna get up and find the broom but then I got high
<br>My room is still messed up and I know why (why, man?)
<br>Yeah, hey
<br>'Cause I got high
<br>Because I got high
<br>Because I got high"
<br>
<br> -Afroman- "Because I Got High"

</p>
</div>
    </div>
    `);
    console.log('from /')
  });

  module.exports = server;