const User = require("../models/User");

const diffThanOneOnDB = async(req, res, next) => {
    const dbInfo = await User.find({});

    if (dbInfo.length !== 1) {
        return res.status(401).json({
            error: "Error with data on db"
        })
    };

    next()
};

module.exports = diffThanOneOnDB;