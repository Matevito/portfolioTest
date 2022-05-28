const User = require("../models/User");

const createUser = async (req, res) => {
    // build user obj
    const newUser = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL
    });

    // attemp to save user obj
    try {
        const savedUser = await newUser.save()
        res.json({
            error: null,
            msg: "user saved successfully!",
            data: savedUser
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            error: "Error saving data on db",
        })
    }
    
};

module.exports = createUser