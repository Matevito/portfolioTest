const User = require("../models/User");

const getUser = async(req, res) => {
    // get user data on db

    // get user data on twitter

    // structure and send a response
    res.json({
        error:null,
        msg: "send portfolio user data"
    })
};


module.exports = getUser;