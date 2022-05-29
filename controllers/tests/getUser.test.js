const express = require("express");
const api = require("../../routes/router");
const User = require("../../models/User");

const request = require("supertest");
const testDB = require("../../mongoConfigTesting");
const getData = require("./getData");

jest.setTimeout(30000);

// set up mock api
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", api);

// mock twitter
const { rest } = require("msw");
const { setupServer } = require("msw/node");
const twitterRoot = "https://api.twitter.com/1.1/statuses/user_timeline.json"
const server = setupServer(
    rest.get(twitterRoot, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([
            {
                created_at: "a date",
                _id: "tweetid",
                full_text: "sixth",
                source: "/source...",
                user: {},
                lang: "es"
            },
            {
                created_at: "a date",
                _id: "tweetid",
                full_text: "fifth",
                source: "/source...",
                user: {},
                lang: "es"
            },
            {
                created_at: "a date",
                _id: "tweetid",
                full_text: "fourth",
                source: "/source...",
                user: {},
                lang: "es"
            },
            {
                created_at: "a date",
                _id: "tweetid",
                full_text: "third",
                source: "/source...",
                user: {},
                lang: "es"
            },
            {
                created_at: "a date",
                _id: "second",
                full_text: "this is the tweet",
                source: "/source...",
                user: {},
                lang: "es"
            },
            {
                created_at: "a date",
                _id: "tweetid",
                full_text: "first",
                source: "/source...",
                user: {},
                lang: "es"
            }
        ] 
        ))
    })
)
describe("GET /portfolio router", () => {
    let user1;
    let user2;
    beforeAll(async() => {
        // setup db
        await testDB();
        // run mock twitter server
        server.listen({onUnhandledRequest: 'bypass'})

        const usersObjs = getData();
        user1 = usersObjs[0];
        user2 = usersObjs[1];
    });
    afterEach(async() => {
        // clean db after each test
        const dbData = await User.find({});
        if (dbData.length > 0) {
            dbData.forEach(async(userStored) => {
                await User.findByIdAndRemove(userStored._id);
            });
        };
        const usersObjs = getData();
        user1 = usersObjs[0];
        user2 = usersObjs[1];

        // for twitter mock server
        server.resetHandlers()
    });
    afterAll(() => server.close())
    test("handles no user on db", async() => {
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Error with data on db")
    });
    test("handles more than one user on db", async() => {
        // setup test requisites
        await user1.save()
        await user2.save();

        // test
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
        
        expect(res.status).toBe(401);
        expect(res.body.error).toBe("Error with data on db")
    });
    
    test("handles error fetching twitter data", async() => {
        // set up mock twitter resp
        await user1.save();
        server.use(
            rest.get(twitterRoot, (req, res, ctx) => {
                return res(ctx.status(400), ctx.json({ error: "error fetching"}))
            })
        )
        // test // default twitter resp is negative
        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(500);
        expect(res.body.error).toBe("Error fetching user data")
    });
    test("returns user obj response", async() => {
        await user2.save();
        // mock twitter res on top of document*

        const res = await request(app)
            .get("/portfolio")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')

        expect(res.status).toBe(200);
        expect(res.body.error).toBe(null);
        expect(res.body.msg).toBe("send portfolio user data");
        expect(res.body.data.user.firstName).toBe("second user")

        // res only sends last 5 tweets
        expect(res.body.data.tweets.length).toBe(5);
        // check tweets list order
        expect(res.body.data.tweets[0].full_text).toBe("first")
    });
})