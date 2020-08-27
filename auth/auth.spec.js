require("dotenv").config();
const st = require("supertest");
const db = require("../database/db_config");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');
const Auth = require("../users/users-model.js");

const server = require('../api/server');

const testUser = { username: "testUser", password: "password", token: ""}
const testStrain = {
    name: 'Sweet Tooth', 
    type: 'Indaca', flavors: `"Sweet", "Flowery", "Berry"`, 
    effects: `'Relaxed', 'Happy', 'Euphoric', 'Uplifted', 'Sleepy'`, 
    description: "Sweet Tooth was awarded 1st place at the High Times Cannabis Cup in 2001, and as you could probably guess from the name, it has a sweet smell of flowers and berries that accompanies it. The potent colas of this balanced hybrid are candy-coated with trichomes, providing uplifted and euphoric effects that are great for combating stress and headaches. Bred by Barney's Farm, Sweet Tooth's genetics sprout from mixing landrace strains from Afghanistan, Hawaii, and Nepal.", 
    rating: "3.18"
}

let token = {token: ""}
describe("server", function () {
    it("The test runs", function () {
        expect(true).toBe(true);
    })

    describe('Auth testing', function () {
        
        it("Return error when no username or password is given", async () => {
            const res = await st(server)
                                .post('/api/register')
                                .send({})
                expect(res.status).toBe(400)
    })
        it("returns 201", async () => {
            const res = await st(server)
                                .post('/api/register')
                                .send(testUser)
                    expect(res.status).toBe(201)
        })
        it("returns n error", async () => { 
            const res = await st(server)
                                .post('/api/login')
                                .send({})
                    expect(res.status).toBe(500)
        })
        it("returns 200", async () => {
            const res = await st(server)
                                .post('/api/login')
                                .send(testUser)
                    expect(res.status).toBe(200)
                   token.token = res.body.token

        })
        it("return 200", async () => {
            // console.log(token.token)
            const res = await st(server)
                            .get('/api/cannabis')
                            .set({'Authorization': `Bearer ${token.token}`})
                    expect(res.status).toBe(200)

        })
        it("returns error", async () => {
            const res = await st(server)
                                .get('/api/cannabis')
                    expect(res.status).toBe(401)
        })
        it("returns 201", async () => {
            const res = await st(server)
                                .post('/api/cannabis/save')
                                .set({'Authorization': `Bearer ${token.token}`})
                                .send(testStrain)
                    expect(res.status).toBe(200)
        })
        it('logout', async () => {
            const res = await st(server)
            .post('/api/logout')
            .set({'Authorization': `Bearer ${token.token}`})
            expect(res.status).toBe(200) 
        })
    })

    afterAll(async () => {
        return db('users').truncate();
    });

});

