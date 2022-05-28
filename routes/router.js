const express = require("express");
const router = express.Router();

// controllers
const createUser = require("../controllers/createUser");
const getUser = require("../controllers/getUser");
const editUser = require("../controllers/editUser");
const deleteUser = require("../controllers/deleteUser");

// middlewares


// routes
router.post("/portfolio");
router.get("/portfolio");
router.put("/portfolio");
router.delete("/portfolio");

module.exports = router