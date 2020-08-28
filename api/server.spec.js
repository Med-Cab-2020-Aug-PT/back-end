const supertest = require("supertest")
const server = require("./server")
const db = require("../database/db_config");




//deletes data made by testing

afterAll(async () => {
    return db('users').truncate();
});


describe("server", function () {
    it("The test runs", function () {
        expect(true).toBe(true);
    })
    describe('Get /', () => {
        it("returns 200", async () => {
            const res = await supertest(server).get('/')
            expect(res.status).toBe(200)
        })
        it('returns 404', async () => {
            const res = await supertest(server).get('/api')
            expect(res.status).toBe(404)
        })
    })
})

