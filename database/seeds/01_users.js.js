const bcrypt = require('bcryptjs')

const password = bcrypt.hashSync('password', 8)
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'John Rossi', password},
   
  ])
};