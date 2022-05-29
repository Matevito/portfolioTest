const express = require("express");
const api = require("../../routes/router");
const User = require("../../models/User");

const request = require("supertest");
const testDB = require("../../mongoConfigTesting");
const getData = require("./getData");

jest.setTimeout(30000);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", api);

describe("PUT /portfolio router", () => {
    let user1;
    beforeAll(async() => {
        // setup db
        await testDB();
        const usersObjs = getData();
        user1 = usersObjs[0];
        await user1.save();
    });

    test("handles incorrect parsed body data", async() => {
        const res = await request(app)
            .put("/portfolio")
            .type("form")
            .send({})
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        expect(res.status).toEqual(400);
        expect(res.body.error).not.toBe(null);
        expect(res.body.msg).toBe("Error with parsed data");
        expect(res.body.error.length).toEqual(5);
    });

    test("edits user in db", async() => {
        // editedUser;
        const editedUser = {
            firstName: "second user",
            secondName: "SecondName",
            title: "testing title for second user",
            description: "here comes a description of the portfolio of the second user",
            imageURL: "TEST.COM.CO.seconduser.jpeg"
        };

        // test
        const res = await request(app)
            .put("/portfolio")
            .type("form")
            .send(editedUser)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body.error).toBe(null);
        expect(res.body.msg).toBe("User successfully edited!");
        
        // check if user data was changed
        const userOnDb = await User.findOne();
        expect(userOnDb.firstName).toBe("second user")
    });
})