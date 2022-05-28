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
    test.todo("rejects req if there's a user in db");

    test.todo("handles incorrect parsed body data");

    test.todo("handles missing body data");

    test.todo("creates user in db");
})