const User = require("../models/User");

const deleteUser = async(req, res) => {
    const userOnDB = await User.find({});
    if (userOnDB.length < 1 || userOnDB.length > 1) {
        return res.status(400).json({
            error: "There are no users stored on db, create one first"
        })
    }
    
    try {
        await User.findByIdAndRemove(userOnDB[0]._id);
        res.json({
            error: null,
            msg: "user deleted successfully!"
        })
    } catch(err) {
        res.status(500).json({
            error: "error deleting data on db"
        })
    }
};

module.exports = deleteUser;