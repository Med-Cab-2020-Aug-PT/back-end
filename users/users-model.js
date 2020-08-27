const db = require("../database/db_config.js");

module.exports = {
    add,
    findBy,
    find,
    addToken,
    findByToken,
    removeToken
};

async function add(user) {
    const [id] = await db('users').insert(user, 'id')

    return findById(id)
}

function findBy(filter) {
    return db("users")
        .where(filter)
}

function find() {
    return db('users');
}

function findById(id) {
    return db('users')
            .where({id})
            .first()
}

function addToken(id, token) {
    return db('users').where({id}).update({ token })
}

function findByToken(token) {
    return db('users').where({token})
}

function removeToken(token) {
    return db('users').where({token}).update({ token: "" })
}