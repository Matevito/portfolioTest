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

// mock twitter
const { rest } = require("msw");
const { setupServer } = require("msw/node");

const server = setupServer(
    rest.get("*", (req, res, ctx) => {
        return res(ctx.status(400), ctx.json({ error: "error fetching data"}));
    })
)
describe("GET /portfolio router", () => {
    let user1;
    let user2;
    beforeAll(async() => {
        // setup db
        await testDB();

        const usersObjs = getData();
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
        const usersObjs = getData();
        user1 = usersObjs[0];
        user2 = usersObjs[1];
    });

    test("handles no user on db", async() => {
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Error with data on db")
    });
    test("handles more than one user on db", async() => {
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
    
    test("handles error fetching twitter data", async() => {
        //todo default twitter response is negative
        await user1.save();

        // test
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        //console.log(res.body)
    });
    test("returns user obj response", async() => {
        await user2.save();

        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body.error).toBe(null);
        expect(res.body.msg).toBe("send portfolio user data");
        expect(res.body.data.user.firstName).toBe("second user")
    });
    //todo
    test.todo("handles more than 5 tweets on twitterdb")
})