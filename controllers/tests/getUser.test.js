const express = require("express");
const api = require("../../routes/router");
const User = require("../../models/User");

const request = require("supertest");
const testDB = require("../../mongoConfigTesting");
const getData = require("./getData");

jest.setTimeout(30000);

// set up mock api
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", api);


describe("GET /portfolio router", () => {
    let user1;
    let user2;
    beforeAll(async() => {
        // setup db
        await testDB();

        const usersObjs = getData();
        console.log(usersObjs)
        user1 = usersObjs[0];
        user2 = usersObjs[1];
    });
    afterEach(async() => {
        // clean db after each test
        const dbData = await User.find({});
        if (dbData.length > 0) {
            dbData.forEach(async(userStored) => {
                await User.findByIdAndRemove(userStored._id);
            });
        };
        
    })
    test("handles no user on db", async() => {
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Error with data on db")
    });
    test.only("handles more than one user on db", async() => {
        // setup test requisites
        await user1.save()
        await user2.save();

        // test
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Error with data on db")
    });
    test.todo("handles error fetching twitter data");
    test.todo("returns user obj response");
})