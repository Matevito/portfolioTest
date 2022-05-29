const express = require("express");
const router = express.Router();

// controllers
const createUser = require("../controllers/createUser");
const getUser = require("../controllers/getUser");
const editUser = require("../controllers/editUser");
const deleteUser = require("../controllers/deleteUser");

// middlewares
const oneOnDB = require("../middlewares/oneOnDB");
const diffThanOneOnDB = require("../middlewares/diffThanOneOnDB");
const userValidator = require("../middlewares/userValidator");

// routes
router.post("/portfolio", oneOnDB, userValidator, createUser);
router.get("/portfolio", diffThanOneOnDB, getUser);
router.put("/portfolio", diffThanOneOnDB, userValidator, editUser);
router.delete("/portfolio", deleteUser);

module.exports = router