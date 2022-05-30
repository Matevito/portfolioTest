if(process.env.NODE_ENV !== "deploy") require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
    appKey: process.env.API_key,
    appSecret: process.env.API_secret,
    accessToken: process.env.TOKEN_,
    accessSecret: process.env.TOKEN_secret,
});

module.exports = client