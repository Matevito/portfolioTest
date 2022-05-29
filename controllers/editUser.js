const User = require("../models/User");

const editUser = async(req, res) => {
    const userOnDB = await User.findOne();
    if (!userOnDB){
        res.satus(500).json({
            error: "Error fetching user data"
        });
    };

    const editedUser = {
        _id: userOnDB._id,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL
    }
    
    try {
        await User.findByIdAndUpdate(userOnDB._id, editedUser)
        return res.json({
            error: null,
            msg: "User successfully edited!",
        })
    } catch(err) {
        res.status(500).json({
            error: "Error saving data on db"
        })
    }
    
};

module.exports = editUser