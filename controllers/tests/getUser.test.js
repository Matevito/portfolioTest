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

describe("GET /portfolio router", () => {
    test.todo("handles more than one user on db")
    test.todo("handles error fetching twitter data");
    test.todo("handles no user on db");
    test.todo("returns user obj response");
})