const express = require("express");

require("dotenv").config();

let port = process.env.PORT || 3000;

// routes
const apiRouterV1 = require("./routes/router.js")

const app = express();


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


app.listen(port, () => {
    console.log(`api listening on port ${port}`);
});