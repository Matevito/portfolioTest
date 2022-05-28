const express = require("express");
const router = express.Router();

// controllers
const createUser = require("../controllers/createUser");
const getUser = require("../controllers/getUser");
const editUser = require("../controllers/editUser");
const deleteUser = require("../controllers/deleteUser");

// middlewares
const oneOnDB = require("../middlewares/oneOnDB");

// routes
router.post("/portfolio", oneOnDB, createUser);
router.get("/portfolio");
router.put("/portfolio");
router.delete("/portfolio/:id");

module.exports = router