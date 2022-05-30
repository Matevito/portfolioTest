#  USER PORTFOLIO TEST
This app consists on a basic API deployed on AWS (amazon web services). The API can send a user information stored on a database and its last 5 tweets, it can also change its values stored on a db and more (performs the basic CRUD operations). The most characteristic attribute of the app consist in that only let one user to be stored on db at a time.

It is built using NodeJS (Express framework) and MongoDB (non-relational db) as a database.

You can give it a look to the portfolio on this [link](/todo:) or use directly the API with postman or the curl command to "https://szdiypnx37.execute-api.us-east-1.amazonaws.com/latest/apiv1/".

## 1. Technologies
- [Javascript](https://www.javascript.com/) promamming lenguage principally used for the app.
- [Express.js (NodeJS)](https://expressjs.com/) framework the app is built with.
- [Mongodb](https://www.mongodb.com/) non relational database.
- [mongoose](https://mongoosejs.com/) library that handles the connection of the API with the MongoDB database.
---
- [express-validator](https://express-validator.github.io/docs/) validator library used to check the parsed bodies of the POST and PUT routes.
- [twitter-api-v2](https://www.npmjs.com/package/twitter-api-v2) library to handle calls to the twitter API.
- [claudia](https://claudiajs.com/tutorials/serverless-express.html) handles the process of deploying express apps on AWS.
---
-  [jest](https://jestjs.io/) JavaScript testing framework.
-  [msw](https://mswjs.io/) mock responses of the twitter API on the set suite.
-  [supertest](https://www.npmjs.com/package/supertest) library to make fake request to the api and test the results.
-  [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) builds a fake MongoDB database for testing.
---
- [React.js](https://reactjs.org/) frontend framework where the portfolio page is built with.
- [MaterialUI (MUI)](https://mui.com/) CSS libraries to style quickly the one-page portfolio.

## 2. Set up
### 2.1 *requirements*
The app requires you to have on your pc NodeJS to have access to npm. You need also to have git to get to clone more easily this folder. It requires too to have installed the AWS CLI on your terminal. It also requires you to have a user and a set-up database on the atlas MongoDB service. To have access to the twitter API you are required to have a developer twitter account with its corresponding developer credentials.
### 2.2 *installation*
Instructions to get the app rolling!

- **2.2.1** Clone the repo

        git clone <this folder url>
    
- **2.2.2** Enter the app folder

        cd portfolioTest/

- **2.2.3** Install the npm packages

        npm install

- **2.2.4** Create an .env file on the root of the project and set up the following config values

        # on deployment is required the 'deploy' value
        NODE_ENV=dev||deploy

        # db access url
        DB_URL=<Url obtained on the atlas webpage were your database is stored>

        # twitter keys. Obtained them on your dev twitter account
        API_key=<API key value>
        API_secret=<API secret key>
        TOKEN_=<Access token value>
        TOKEN_secret=<Access token secret>

- **2.2.5** Run the app locally. Chose the first option for development purposes and the second to just run the API.

        npm run dev
        npm node

- **2.2.6** Check the test suite before deploying the app! On the console introduce 'a' to run all the test of the app.

        npm run test

- **2.2.7** Create a user on AWS

    Go to the *AWS* web page and on the '*IAM console*' create a user. Be sure to select in the options 'Programmatic access'. The claudia library requires three policies to work so remember too to give your user *AmazonAPIGatewayAdministrator*, *AWSLambda_FullAccess* and *IAMFullAccess* on the 'Attach policies' option. Once this is done, you will receive a message telling that the process was successful and the user *Access key* and *secret key* values. Store these values in a safe place, because we will use them to configure the *AWS CLI* to deploy the API.

    You can get a more detailed explanation of this process [here](https://medium.com/@johndyer24/simple-steps-to-deploy-an-express-server-to-aws-lambda-with-claudia-js-26c25f8745b5).

- **2.2.8** Set the AWS user on the CLI

        aws configure
        <introduce the access key and secret you previously obtained. It will also ask for the server you want to store the app, so feel free to use the best located for your preferences.>    

    If you don't have the *AWS CLI* installed, you can learn it [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html).

- **2.2.9** Deploy the app using claudia

        npm run create-api --set-env <enviroment variables list>
    if the process is successful you will obtain a *claudia.json* file on the root of the project and the app deployed on AWS. The terminal will give you the URL where the API is placed, so you can use it. If you want to store the API on a server different to *us-east-2*, go to the package.json file and on the script '*create-api*' change the value where the location is placed for the one of your preference.

- **2.2.10** Update the api

        npm run update-api

    If you have made changes to the app store this changes on production using the following command

## 3. Usage
The usage of the rest API is quite straightforward. This principally because it only contains one type of data on the database. The API can handle 4 routes that represent the CRUD most basic operations. However, beware that the API is built in a way that can only handle one or no user stored (it will crash otherwise). This is done with a middleware that checks previously the controller of the routes which data is in db to decide to continue or not. With this clear, we can continue with the explanation.

All the following routes take for granted that you are making a call to the URL where your app is deployed (be it locally or in AWS). Also, all the following routes are stored on a router called '/apiv1'. Because of this, when we refer to the 'root' component on the routes, we are referring to the combination of the API URL + apiv1 (URL/apiv1).

**3.1** Create user

        POST <root>/portfolio {
            firstName,
            secondName,
            title,
            description,
            imageURL
        }

The route can only be called when there is no data stored on db. It will also handle errors and missing data of the request. You can give a look to some requirements of the stored data on the [USER MODEL](https://github.com/Matevito/portfolioTest/blob/main/models/User.js) file.

**3.2** Get user data

        GET <root>/portfolio 

It returns the user data stored on db and some twitter information of the account the env values are linked to. It will respond with a negative if no user is stored or if more than one user component is.

**3.3** Edit user data

        PUT <root>/portfolio {
            firstName,
            secondName,
            title,
            description,
            imageURL
        }

It changes the stored user object on db to the parsed user object. The ID of the old object remains, and no changes are made of the twitter account. So, if you want to change them, do it changing the env variables of the app. As the POST component, it handles incorrect and missing data of the request with the same middleware.

**3.4** Delete user from db

        DELETE <root>/portfolio 

It deletes the user stored in db. Cannot be called if in db is stored a user object different to 1 (no users or more than one).

## 4. Time taken to solve the test and some insights
Technically, it took me two days to complete the task. Building the API took me 7 hours with its corresponding test with some breaks. The next day I spent it trying to solve how to deploy the app, writing the documentation and building a basic front-end using the API.

The first day I spent it searching on how to use AWS services because I haven't done it before this test. The next day I decided to use serverless as a framework cause it gave me the utility to use a serverless architecture on the app and I considered the app was easy to done to worry about working for the first time with a technology I haven't used before. But I was wrong: I spent an important part of the day trying to solve a bug I haven't looked before and haven't even started with the development of the test-suite. Because of this, I decided on building an API using Express because I had more experience using it with MongoDB as a database.

The third day I built the API, as I explained before, but was having problems deploying the API for an AWS CLI problem. The next day, I finally got the API deployed and built the documentation you are currently reading.

## 5. Contact
If you want to contact me, you can get links to my email, LinkedIn on my [portfolio](www.mateodiazdev.com).