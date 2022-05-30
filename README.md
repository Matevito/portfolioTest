#  USER PORTFOLIO TEST
This app consist on a basic api deployed on aws. The api can send user information stored on a database and his last 5 tweets and another route to change its values stored on a db. It also contains two more reates to create a user on db and to delete it. The most characteristic atribute of the app consist in that only let one user to be stored on db.

Is built using Nodejs (Express framework) and uses Mongodb(non-relational db) as a database.

You can give it a look to the portfolio on this [link](/) or use directly the api with postman or the curl command to: "url"

## 1. Technologies
Javascript

Express.js
mongoose

express-validator
twitter-api-v2
claudia

jest
msw
supertest
mongodb-memory-server

cors
helmet
compression

## 2. Set up
### 2.1 requirements
The app requires you to have on your pc Nodejs to have access to npm. You need also to have git to get to clone more easily this folder. It requires also to have installed the aws cli on your terminal. It also requries you to have a user and a set-up database on the atlas mongodb service. To have access to the twitter api you are required too to have a developer twitter account with its corresponding developer credentials.
### 2.2 installation

**2.2.1** Clone the repo

    git clone <this folder url>
    
**2.2.2** Enter the app folder

    cd portfolioTest/

**2.2.3** Install the npm packages

    npm install

**2.2.4** Create an .env file on the root of the proyect and set-up the following config values

**2.2.5** Run the app locally. Chose the first option for development pourposes and the second to just run the api.

    npm run dev
    npm node

**2.2.6** Check the test suite before deploying the app! On the console introduce 'a' to run all the test of the app.

    npm run test

**2.2.7** 

**2.2.8**

**2.2.9**

**2.2.10**

**2.2.11**

    vaars...<!--  -->
    set up aws steps
    send the app

## 3. Usage
The usage of the rest api is quite straigthforward. This principally because it only contains one type of data on the database. The api can handle 4 routes that represent the crud most basic operations. However, beware that the api is built in a way that can only handle no user stored (for the create a user object on db) to at most one user on the database at the time. This is done with a middleware that checks previously the controller of the routes wich data is in db to decide to continue or not. With this clear, lets continue with the explanation.

All the following routes take for granted that you are making a call to the url where your app is deployed(be it locally or in aws). Also, all the following routes are stored on a router called '/apiv1'. Because of this, when we refer to to the '*root*' component on the routes, we are refering to the compination of the api url + apiv1 (URL/apiv1).

**3.1** Create user

    POST <root>/portfolio {
        firstName,
        secondName,
        title,
        description,
        imageURL
    }

**3.2** Get user data

    GET <root>/portfolio 

**3.3** Edit user data

    PUT <root>/portfolio {
        firstName,
        secondName,
        title,
        description,
        imageURL
    }

**3.4** Delete user from db

    DELETE <root>/portfolio 



## 4. Time taken to solve the test 
Technically it took me two days to complete the task. But building the api took me 7 hours with its corresponding test. The next day I spent it trying to solve how to deploy the app, writting the documentation and building a basic front-end using the api.

The first day I spent it searching on how to use aws services cause I haven't done it before this test. The next day I decided to use serverless as a framework cause it gaved me the utility to use a serverless architecture on the app and I considered the test was easy to done to worry about working for the first time with a technology I haven't used before. But I was wrong: I spent an importan part of the day trying to solve a bugg I haven't looked before and haven't event started with the development of the test-suite. Because of this I decided on building an api using Express cause i had more experience using it and Mongodb as a database.

The third day I built the api, as I explained before, but was having problems deploying the api for a aws cli problem. The next day I finally got the api deployed and built the documentation you are currently reading.
## 5. Contact
If you want to contact me you can get links to my email, linkedIn on my [portfolio](www.mateodiazdev.com).