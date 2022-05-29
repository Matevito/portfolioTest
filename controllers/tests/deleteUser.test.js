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

describe("DELETE /portfolio router", () => {
    let user1;
    beforeAll(async() => {
        // setup db
        await testDB();
        const usersObjs = getData();
        user1 = usersObjs[0];
    });
    test("handles if no users are on db", async() => {
        const res = await request(app)
            .delete("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(400);
        expect(res.body.error).toBe("There are no users stored on db, create one first");

    });
    test("handles if only one user is on db", async() => {
        user1.save()

        const res = await request(app)
            .delete("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body.error).toBe(null);
        expect(res.body.msg).toBe("user deleted successfully!");

        // check if user is no longer on db
        const db = await User.find({});
        expect(db.length).toBe(0)
    });
});