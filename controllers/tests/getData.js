const User = require("../../models/User");

const userList = [
    {
        firstName: "new Name",
        secondName: "new SecondName",
        title: "testing title",
        description: "here comes a description of the portfolio",
        imageURL: "TEST.COM.CO"
    },
    {
        firstName: "second user",
        secondName: "SecondName",
        title: "testing title for second user",
        description: "here comes a description of the portfolio of the second user",
        imageURL: "TEST.COM.CO.seconduser.jpeg"
    },
];

const getData = () => {
    const resList = userList.map(userData => {
        return new User(userData)
    })
    return resList
};

module.exports = getData