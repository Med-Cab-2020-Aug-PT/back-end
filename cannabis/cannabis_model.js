const db = require('../database/db_config');

module.exports = {
    getPreferrences,
    find,
    add,
    addPreferrences,
    checkPrefs,
    remove
}

function getPreferrences(id) {
    return db('users')
    .from('users')
    .join('users_cannabis as uc', 'users.id', 'uc.user_id')
    .join('cannabis as c', 'uc.cannabis_id', 'c.index')
    .where('users.id', id)
    .select('users.id', 'c.index', 'c.name', 'c.type', 'c.flavors ', 'c.effects', 'c.description', 'c.rating')
            
}

function checkPrefs(id) {
    return db('users')
        // .from('users')
        .join('users_cannabis as uc', 'users.id', 'uc.user_id')
        .join('cannabis as c', 'uc.cannabis_id', 'c.index')
        .where('c.index', id)
}

function addPreferrences(user_id, cannabis_id) {
    return db('users_cannabis').insert({ user_id, cannabis_id })
}

function find(name){
    return db('cannabis').where({name})
}

function add(cannabis) {
    return db('cannabis').insert(cannabis).returning('id')
}

function remove( cannabis_id, user_id) {
    return db('users_cannabis').where({ cannabis_id, user_id }).delete()
}