require("dotenv").config({ path: "./.env"})
const mongoose = require("mongoose");

const mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));