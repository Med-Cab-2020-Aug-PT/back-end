const { table } = require("../db_config");

exports.up = function(knex) {
  return knex.schema
    .createTable('cannabis', tbl => {
        tbl.increments('index')
        tbl.string('name', 125)
            .notNullable();
        tbl.string('type',125)
            .notNullable();
        tbl.float('rating')
            .notNullable();
        tbl.string('effects', 125)
            .notNullable();
        tbl.string('flavors', 125)           
            .notNullable();
        tbl.string('description', 500)
            .notNullable();        
    })
    .createTable('users_cannabis', tbl => {
        tbl.increments()
        tbl.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.integer('cannabis_id')
            .notNullable()
            .unsigned()
            .references('index')
            .inTable('cannabis')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users_cannabis')
    .dropTableIfExists('flavors_db')
    .dropTableIfExists('cannabis')
};
