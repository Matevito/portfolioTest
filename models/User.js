const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String, required: true, minLength: 3, maxLength: 15
    },
    secondName: {
        type: String, required: true, minLength: 3, maxLength: 15
    }, 
    title: {
        type: String, required: true, minLenght: 3, maxLength: 50
    },
    description: {
        type: String, required: true, minLength: 15, maxLength: 1000
    },
    imageURL: {
        type: String, required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
