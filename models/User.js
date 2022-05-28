const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String, required: true, minLength: 3, maxLength: 15
    },
    secondName: {
        type: String, required: true, minLength: 3, maxLength: 15
    }, 
    title: {
        type: String, required: true, minLenght: 3, maxLength: 25
    },
    description: {
        type: String, required: true, minLength: 15, maxLength: 400
    },
    imageURL: {
        type: String, required: true
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
