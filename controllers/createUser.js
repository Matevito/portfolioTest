const User = require("../models/user");

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