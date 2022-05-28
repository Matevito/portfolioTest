const User = require("../models/User");

const oneOnDB = async (req, res, next) => {
    const dbInfo = await User.find({});
    if (dbInfo.length > 0) {
        return res.status(401).json({
            error: "User already stored on db"
        })
    } else {
        next();
    }
};

module.exports = oneOnDB