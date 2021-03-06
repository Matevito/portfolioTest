const express = require("express");
const cors = require("cors");

require("dotenv").config();

// routes
const apiRouterV1 = require("./routes/router.js")

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// conect mongodb
require("./mongoConfig");

// routes handler
app.use("/apiv1", apiRouterV1);

app.use((err, req, res) => {
    console.log(err);
    if (!res.headersSent) {
        res.status(err.httpStatusCode || 500).render('UnknownError');
    };
});


module.exports = app;