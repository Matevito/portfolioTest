const User = require("../models/User");

exports.default = async (req, res) => {
    // build user obj

    // attemp to save user obj

    res.json({
        error: null,
        msg: "user saved successfully!",
        data: {
            // here goes the user obj
        }
    })
};