const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(helmet());

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
    </div>
    `);
    console.log('from /')
  });

  module.exports = server;