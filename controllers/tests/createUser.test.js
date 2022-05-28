const express = require("express");
const api = require("../../routes/router");
const User = require("../../models/User");

const request = require("supertest");
const testDB = require("../../mongoConfigTesting");


jest.setTimeout(30000);

// set up mock api
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", api);

describe("POST /user router", () => {
    let userTest;

    beforeAll(async() => {
        // setup db
        await testDB();
        userTest = {
            firstName: "new Name",
            secondName: "new SecondName",
            title: "testing title",
            description: "here comes a description of the portfolio",
            imageURL: "TEST.COM.CO"
        }
    });
    afterEach(async() => {
        // clean db after each test
        const dbData = await User.find({});
        dbData.forEach(async(userStored) => {
            await User.findByIdAndRemove(userStored._id);
        });
    });

    test("rejects req if there's a user in db", async() => {
        // setup requirements;
        const userInDB = new User({
            firstName: "testName",
            secondName: "testSecondName",
            title: "a basic title...",
            description: "here comes a description of the portfolio",
            imageURL: "TEST.COM.CO"
        });
        await userInDB.save();
        
        // test
        const res = await request(app)
            .post("/portfolio")
            .type("form")
            .send(userTest)
        
        expect(res.status).toEqual(401);
        expect(res.body.error).toEqual("User already stored on db");
    });

    test.todo("handles incorrect parsed body data");

    test.todo("handles missing body data");

    test.todo("creates user in db");
})