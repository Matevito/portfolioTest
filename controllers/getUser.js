const User = require("../models/User");
const TwitterClient = require("../dependencies/twitterApi");

const getUser = async(req, res) => {
    // attempt to get user data
    let dbData;
    let tweetsData;
    try {
        dbData = await User.findOne();
        // get user timeline twitter data
        tweetsData = await TwitterClient.v1.userTimeline();
    } catch (err) {
        return res.status(500).json({
            error: "Error fetching user data"
        });
    };
    // structure data and send a response
    tweetsData = tweetsData._realData.map(tweet => {
        return {
            created_at: tweet.created_at,
            id: tweet._id,
            full_text: tweet.full_text,
            source: tweet.source,
            user: tweet.user,
            lang: tweet.lang
        }
    });
    if (tweetsData.length > 5 ) {
        // response only sends the last 5 tweets of the acount
        tweetsData = tweetsData.slice(1).slice(-5).reverse();
    };

    const responseObj = {
        tweets: tweetsData,
        user: dbData
    }
    res.json({
        error:null,
        msg: "send portfolio user data",
        data: responseObj
    })
};


module.exports = getUser;