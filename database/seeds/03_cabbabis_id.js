
exports.seed = function(knex, Promise) {
  return knex('users_cannabis').insert([
    {user_id: 1, cannabis_id: 1 },
  ])
};
