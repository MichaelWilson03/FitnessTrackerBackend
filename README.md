# fitnesstrackr

an API for our new fitness empire, FitnessTrac.kr, using node, express, and postgresql

## Getting Started

Install Packages

    npm i

Initialize Database

    createdb fitness-dev

Run Seed Script

    npm run seed:dev

## Automated Tests

**NOTE:** At first, there will be too many errors for the tests to even run. Start by running the seed:dev script above, until it is working.

Once you've resolved all errors in your console, we recommend running the DB tests first, and move to API next. When you open the test files, you'll notice that the `it()` blocks defining tests are all prefaced with an `x`. Adding and removing the `x` lets you decide to set some tests as _skipped_, meaning they won't run. To get the tests to run remove the `x`.

If you'd like to remove all of them in a file at once you can use the `CMD + f` on Mac or `CTRL + f` on Windows to begin a search. In the search bar type `xit` and select the drop down arrow at the left of the search bar. You'll see a placeholder in another bar that says replace. In this bar type `it`. Lastly, look to the right hand side and hover your cursor over the icons to find the one that will replace all. Typically this is the last one on the right. Then save the file. If you have run the test script below, you should see the tests begin running in the terminal.

If you only want to run one or two tests, you can add `.only` after `it` and `describe` to isolate that particular test. That is, to run only the tests in a particular `describe` block, use: the syntax `describe.only()`. To isolate one or more `it` blocks, use `it.only()`.

Make sure to read the tests and comments in this repo carefully, they offer some hints every now and again that could save you hours!

To run all the tests in watch mode (re-runs on code update), run

    npm run test:watch

### DB Methods

    npm run test:watch db

### API Routes (server must be running for these to pass)

    npm run test:watch api


Project Description
We are going to build an API for our new fitness empire, FitnessTrac.kr.

The example (that you'll be reproducing) API is here: http://fitnesstrac-kr.herokuapp.com/

docs for the example are at http://fitnesstrac-kr.herokuapp.com/docs (this is mostly for front-end consumption, but you may use it to guide building your project, as well)
api endpoints for the example are at http://fitnesstrac-kr.herokuapp.com/api/some-endpoint
In general we will use what we saw in JuiceBox as a model for what we'll do here, with occasional tweaks.

We want users to be able to log in and build fitness routines from a list of activities. We want to be able to add new activities if they don't currently exist.

Users should have control over the public/private nature of their routines, be able to see publicly available routines, and be able to see which routines exist for a given activity.


Grading Rubric
FitnessTrac.kr Rubric
NOTE: There are automated tests included in the starter repo later on. In order to get full credit, you must pass the automated tests.

Grading
Common Requirements account for 30% of your grade, where Project Specific Requirements account for 70%.

For each listed requirement or story you can score as follows:

Common Requirement (Instructor/Eng Stories)	Game Requirement (User Stories)
2 Points	Student shows mastery of material	Student has completely fulfilled story requrement
1 Point	Student has partially incorrect understanding of material	Student has partially fulfilled story requirement, with some progress
0 Points	Student has deep misunderstandings of material	Student has not attempted to fulfill the story requirement, or has done so with very little progress
Stories where a user is delighted are used as bonus requirements. Bonuses can add up to 5% to your total grade.

Common Requirements (30%)
As an instructor I want to see you demonstrate mastery (when appropriate) of:

NodeJS Concepts
the require & module.exports module system as organization
usage of process.env when necessary
asynchronous coding
try / catch blocks
appropriate use of async and await
correctly returning data from an async function
correctly throwing and catching errors from an async function
database concepts (SQL Focused):
table creation
inserting data
removing data
updating data
querying single tables
querying joined tables
database adapter concepts (functions which interact with the DB)
correct translation of passed data (to function) to form database queries
correct return from function of data types
express concepts
using middleware correctly
setting up routes correctly
building the server from a collection of routes
using modules like bodyParser correctly
incorporating JSON Web Tokens to authenticate users when necessary
setting up an error handling middleware to alert API users of potential errors
routing concepts
using the correct verbs on routes (e.g. GET vs PUT vs. PATCH)
using sub-routes for collections of data (e.g. /users vs. /activities)
deployment
correctly setting environment variables
correctly deploying the repo by following the Full Stack Deployment Guide so the API is up and running for instructor testing
As an engineering manager I want to see code that:

is cleanly written, in separate files with a singular goal when possible
has no unused functions or variables
has expressive variable, function, and class names
is organized into a coherent flow
has a well-developed seed file which will rebuild the appropriate tables, and populate some initial data
FitnessTrac.kr Specific Requirements (70%)
NOTE: As stated above, there are automated tests included in the starter repo. In order to get full credit, you must pass the automated tests. If all tests are passing, you pass this App-specific section (assuming you didn't "cheat" the tests). 😁

As a consumer of your API I want to:

be able to register for an account with a username and password such that
no duplicate username can be registered
no password under 8 characters in length can be used
be secure knowing that my password will not be returned in any response when I hit any API endpoint
be able to login with my correct username/password combination and to be returned a JSON Web Token for future requests
be able to retrieve a list of all activities (exercises) from the database
be able to retrieve a list of all routines (collections of activities) from the database, and each routine should have an array of the activities that it contains
be able to retrieve a list of all routines that a specific user has created
be able to retrieve a list of all routines that feature a specific activity
be able to create a new activity, only if I am logged in
be able to update an activity, only if I am logged in (even if I was not the creator)
be able to create a new routine, only if I am logged in
be able to update or delete a routine, only if I am logged in _as_ the routine creator
be able to add an activity to a routine, only if it does not currently contain it and only if I am logged in _as_ the routine creator
be able to update the number of times or duration that an activity has in a certain routine, only if I am logged in _as_ the routine creator
be able to remove an activity from a routine, only if I am logged in _as_ the routine creator
be able to receive descriptive errors when I have made a mistake
EXTRA CREDIT: be secure knowing that my password is not stored as plain-text, but rather it is hashed before being stored


Tests
There are tests included in the repo. The tests will tell you if you have written code that works, per what we have requested. Write your code to pass the tests, and that will satisfy this workshop's requirements. Pretty cool, right? This is called Test-Driven Development (developing, according to tests). These tests are stored in tests/api.spec.js and tests/db.spec.js. We won't change these files.

If you have written no code yet, running the tests will be just a bunch of errors. So...

Start with npm run seed:dev first, as you write your database adapters.
Once finished with a few functions, move on to npm run test:watch db to run the db-only tests
Then run npm run test:watch api to run the api-only tests while writing the API endpoints


A Bit of Advice
This document will likely feel overwhelming at times, but it defines each thing you need to build to be successful in this project. It tries to offer advice when it can, and otherwise relies on your ability to replicate steps you've completed in the past.

You should look at this document as a series of definitions. We define the database constraints, possible methods for the database adapter, and finally the API routes. The document is not a prescription on "how to build", but rather "what to build".

There are two main ways you could build this:

First build out the database and the database connections using psql, node, and node-psql. Then start building out your API. This is the way we just did it, which was largely for instructional purposes (keep it to one new technology at a time). It creates "horizontal slices", and requires the developer to keep a whole layer in their head at one time.

Build out your API (express routes), and build each database function necessary for that route. Think of your application in terms of functionality: you could build out the registration & login functions. What would be needed for the API? And for the database? Build those, test them, then move on to Activities, then to Routines, etc. This creates "vertical slices", and allows you to focus on a feature at a time.



Setting Up
Follow these instructions to get started:

Creating the repo:

Clone this repo to your local computer.
Navigate into the project and open it in VScode
Navigate to your GitHub page and create a new repository called "FitnessTrackerBackend"
Copy the SSH from the top of the GitHub page, it will look similar to this: git@github.com:studentName/FitnessTrackerBackend.git
Navigate back to your open VScode and confirm that your terminal is at the correct location, which should be inside of the cloned repo
In your terminal type in git remote -v - you should see something similar to this: origin git@github.com:FullstackAcademy/UNIV_FitnessTrackr_Starter.git (fetch)
Next, we are going to switch the origin from Fullstack's GitHub to your own GitHub by running the following command in your terminal:
git remote set-url origin (paste the SSH that we copied in step 4)
ex: git remote set-url origin git@github.com:studentName/FitnessTrackerBackend.git
Since we have updated the origin of the code to be the GitHub repo that we created on our personal accounts. We now want to push the code up to GitHub with the git push command. (if you refresh your GitHub, you should now see the starter code in the GitHub repo that you just created)
Adding our partner:

Now we want to add our partner to the repo that we just created. First, navigate back to the repo that we just created above. Then go to the Settings tab.
On the left side of your screen you should see a list of options, one of which is called Collaborators and Teams, click on this option. Github may prompt you to input your password.
Next scroll down, and near the center of your page you should see a button that says add people. Click on this button and then type in your partner's GitHub name and click on the correct user. This should send an email and GitHub notification to your partner with instructors for joining the repo.
The partner should now check their email (that is connected to GitHub) and accept the invitation to the repo.
Installing the dependencies

Use the command npm install in your terminal to install all of the node modules.
createdb fitness-dev
npm run seed:dev
Take a moment to review the starting point with your partner:

The database consists of two parts: (1) the actual database and tables, and (2) the JavaScript adapter that we write. First, let's create and connect our database.

db/client.js
This is where we're establishing our connection to the database we created above (fitness-dev). This file will be used everywhere else you need access to the database (db/seed.js, db/seedData.js, db/index.js, etc.)

Since our database client is already set up, run npm run seed:dev. There will be a few errors, starting with something like ReferenceError: createUser is not defined. First, we need to get the table definitions set up, then we'll work through the functions as directed later on, in "The Database Adapter" section.

db/seedData.js
This is where we will write our table definitions. The function rebuilDB is run by db/seed.js when we run npm run seed:dev

Write the DROP TABLE IF EXISTS mytablename statements inside the dropTables function.

Write the CREATE TABLE mytablename statements inside the createTables function.

Other than requiring the database adapters at the top of the file (more on that later), the rest of this seedData file is written for us. Its purpose is to add initial data and run initial tests on our database.

MAKE SURE YOU RESOLVE ALL ERRORS IN YOUR seedData.js FILE OR YOU WILL NOT PASS MANY DB TESTS! ( Define and import all db adapters that the file requires to run!!!!)




Users
Users are our bread and butter since every piece of data that is created will be crated by them. We will only require username and password for this application.

users	
id	SERIAL	PRIMARY KEY
username	VARCHAR(255)	UNIQUE NOT NULL
password	VARCHAR(255)	NOT NULL
HASHING PASSWORDS
EXTRA CREDIT: (NOT to be written in table definitions. To be done in The Database Adapter section) As an added challenge, it would be useful to hash our users passwords.

Much like our JWT do some magic to protect the Front End from attacks, we can use a package named bcrypt (docs here) to encode and verify passwords.

// inside of createUser({ username, password})

const SALT_COUNT = 10;

const hashedPassword = await bcrypt.hash(password, SALT_COUNT)

// inside of getUser({username, password})

const user = await getUserByUserName(username);
const hashedPassword = user.password;
// isValid will be a boolean based on wether the password matches the hashed password
const isValid = await bcrypt.compare(password, hashedPassword)


Activities
An activity is any form of exercise. It could be a dumbbell lift, a bike ride, or whatever. These are ownerless, we won't keep track of who creates them. We will only require a user to be "logged in" to make new ones.

activities	
id	SERIAL	PRIMARY KEY
name	VARCHAR(255)	UNIQUE NOT NULL
description	TEXT	NOT NULL
HELPING WITH UNIQUENESS
You might want to think up a way to prevent too many of the same or similar entries when you get to the database adapter. Should "biking" and "Biking" be the same thing? To help keep names unique, we could lowercase them before putting them into the database.

You can never prevent every failure, but we can at least try a little.




Routines
A routine is a container for activities. We might want to build a "Leg Day" routine, it might be public or private, and it should have a stated goal.

routines	
id	SERIAL	PRIMARY KEY
"creatorId"	INTEGER	REFERENCES users(id)
"isPublic"	BOOLEAN	DEFAULT false
name	VARCHAR(255)	UNIQUE NOT NULL
goal	TEXT	NOT NULL
PRIVACY FIRST
Part of our defaulting to false is the idea that we should automatically assume a user prefers privacy whenever we have the ability to. We can imagine adding a "publish routine" button to the page which shows a routine, which would toggle the routine to public.


RoutineActivities
This is how we fill a routine with activities. Here we want it to be possible for a user to build something like this:

5x Leg Lifts
10x 100m Dash
2x Jog (10min)
And so duration is in minutes. Count is number of reps.

routine_activities	
id	SERIAL	PRIMARY KEY
"routineId"	INTEGER	REFERENCES routines ( id )
"activityId"	INTEGER	REFERENCES activities ( id )
duration	INTEGER	
count	INTEGER
Also add a UNIQUE clause that prevents duplication on ("routineId", "activityId")

JOIN, WITH ITS OWN DATA
We saw joins before, but these now have additional information attached to them. This is a great use of a join table, and you can see immediately the type of use we get out of it.



The Methods
We should build out a simple database adapter with helper functions. We could be a little more organized than we were during JuiceBox, as a good start to being organized in the future.

NOTE:
For the following database adapter functions, we will have to first create the functions in this order for our seed file (and tests) to work! createUser, createActivity, createRoutine, getRoutinesWithoutActivities, getAllActivities, addActivityToRoutine While writing these functions, we should be running the npm run seed:dev script, to test the functions as we go. As we build these functions, also require them into db/seedData.js so the seed script will be able to use them. It's always best to test our functions as we go!

Once we have some of our adapters (functions) working, we should stop using the seed script, and start running the npm run test:watch db script to run automated tests to verify we have created them correctly. In order to get full credit, we must pass the automated tests.

db/users.js
createUser

createUser({ username, password })
make sure to hash the password before storing it to the database
getUser

getUser({ username, password })
this should be able to verify the password against the hashed password
getUserById

getUserById(id)
select a user using the user's ID. Return the user object.
do NOT return the password
getUserByUsername
getUserByUsername(username)
select a user using the user's username. Return the user object.
db/activities.js
getActivityById
getActivityById(id)
return the activity
getAllActivities
select and return an array of all activities
createActivity
createActivity({ name, description })
return the new activity
updateActivity
updateActivity({ id, name, description })
don't try to update the id
do update the name and description
return the updated activity
db/routines.js
getRoutineById
getRoutineById(id)
return the routine
getRoutinesWithoutActivities
select and return an array of all routines
getAllRoutines
select and return an array of all routines, include their activities
getAllPublicRoutines
select and return an array of public routines, include their activities
getAllRoutinesByUser
getAllRoutinesByUser({ username })
select and return an array of all routines made by user, include their activities
getPublicRoutinesByUser
getPublicRoutinesByUser({ username })
select and return an array of public routines made by user, include their activities
getPublicRoutinesByActivity
getPublicRoutinesByActivity({ id })
select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
createRoutine
createRoutine({ creatorId, isPublic, name, goal })
create and return the new routine
updateRoutine
updateRoutine({ id, isPublic, name, goal })
Find the routine with id equal to the passed in id
Don't update the routine id, but do update the isPublic status, name, or goal, as necessary
Return the updated routine
destroyRoutine
destroyRoutine(id)
remove routine from database
Make sure to delete all the routine_activities whose routine is the one being deleted.
db/routine_activities.js
getRoutineActivityById

getRoutineActivityById(id)
return the routine_activity
addActivityToRoutine

addActivityToRoutine({ routineId, activityId, count, duration })
create a new routine_activity, and return it
updateRoutineActivity

updateRoutineActivity({ id, count, duration })
Find the routine_activity with id equal to the passed in id
Update the count or duration as necessary
destroyRoutineActivity

destroyRoutineActivity(id)
remove routine_activity from database
getRoutineActivitiesByRoutine

getRoutineActivitiesByRoutine({ id })
select and return an array of all routine_activity records
db/index.js
This is a place to create and export the client, as well as to import and re-export the functions from our other files above.

If your module.exports from each of the other files is built as an object with keys equal to the function names, then when you require the file, we can use the spread operator (...) to both import and help build our export function simultaneously.

module.exports = {
  ...require('./users'), // adds key/values from users.js
  ...require('./activities'), // adds key/values from activites.js
  ...require('./routines'), // etc
  ...require('./routine_activities') // etc
}
Then we can just import into our server/API using require('./db'), etc, rather than importing from the separate files.

db/seed.js
This file is written for us. It imports the client from db/client.js, connects, and runs rebuildDB from db/seedData.js.

db/seedData.js
This file does the following

To be written: imports any necessary db adapter functions at the top of the file, requiring them from db/index.js
Should be done already, in the table definitions step: drops and rebuilds the db
Already done for us: Adds a few users, a handful of activities, and builds a few populated routines from them. Lastly it closes out the connection so it doesn't stall.
HASHING PASSWORDS
EXTRA CREDIT: As an added challenge, it would be useful to hash our users passwords.

Much like our JWT do some magic to protect the Front End from attacks, we can use a package named bcrypt (docs here) to encode and verify passwords.

// inside of createUser({ username, password})
const SALT_COUNT = 10;
const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

// inside of getUser({username, password})
const user = await getUserByUsername(username);
const hashedPassword = user.password;
const passwordsMatch = await bcrypt.compare(password, hashedPassword);
if (passwordsMatch) {
  // return the user object (without the password)
} else {
  throw SomeError;
}



Using BCrypt
As an added challenge, it would be useful to hash our users passwords. Generally, it is not secure to store raw passwords in the database, so hashing them is preferred to obfuscate the password in case of security leaks.

Much like our JWT do some magic to protect the Front End from attacks, we can use a package named bcrypt. You can check out the (bcrypt documentation) to get a sense of how to use it to encode and verify passwords. The documentation has a lot of references to promise chaining (.then) but it is fully compatible if used with async/await.

Typically, bcrypt is used for the following two functions:

When a new user is created, bcrypt will hash the password before storing it in the database
When an existing user attempts to log in, bcrypt will compare the input password to the hashed password from the database.
// import bcrypt at the top and provide a salt count
const bcrypt = require('bcrypt')
const SALT_COUNT = 10;

// inside of createUser({ username, password}) use the bcrypt hash function to generate a hashed password
const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
let userToAdd = {username, hashedPassword }
// run the insert statement but use the hashedPassword instead of the plain text password

// inside of getUser({username, password})
const user = await getUserByUserName(username);
const hashedPassword = user.password;

let passwordsMatch = await bcrypt.compare(password, hashedPassword) 
  if (passwordsMatch) {
    // return the user object (without the password)
  } else {
    throw SomeError;
}


The Routes
All routes should be preceded by /api. If a route has a (*) next to it, it means that it should require a logged in user to be present, if a route has a (**) next to it, the logged in user should be the owner of the modified object.

IMPORTANT: While writing these routes, have one terminal open, running the server using npm run start:dev and the other terminal running the npm run test:watch api script to run automated tests to verify we have created the routes correctly. All database adapters still need to be imported into db/seedData.js for the tests to pass.

To begin with, we'll need to create our server at the root app.js. We'll also need to enable cors (follow these instructions under simple usage) to give our tests access to the server.

health check
GET /health
A common need is to see if our server is up (not completely crashed). We can create a route to send back a message, just a string saying all is well.

users
POST /users/register
Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.

Throw errors for duplicate username, or password-too-short.

POST /users/login
Log in the user. Require username and password, and verify that plaintext login password matches the saved hashed password before returning a JSON Web Token.

Keep the id and username in the token.

GET /users/me (*)
Send back the logged-in user's data if a valid token is supplied in the header.

GET /users/:username/routines (*)
Get a list of public routines for a particular user.

activities
GET /activities
Just return a list of all activities in the database

POST /activities (*)
Create a new activity

PATCH /activities/:activityId (*)
Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)

GET /activities/:activityId/routines
Get a list of all public routines which feature that activity

routines
GET /routines
Return a list of public routines, include the activities with them

POST /routines (*)
Create a new routine

PATCH /routines/:routineId (**)
Update a routine, notably change public/private, the name, or the goal

DELETE /routines/:routineId (**)
Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.

POST /routines/:routineId/activities
Attach a single activity to a routine. Prevent duplication on (routineId, activityId) pair.

routine_activities
PATCH /routine_activities/:routineActivityId (**)
Update the count or duration on the routine activity

DELETE /routine_activities/:routineActivityId (**)
Remove an activity from a routine, use hard delete




API Docs: FitnessTrackr API Documentation
Introduction
Here at FitnessTrackr we strive to provide you with an easy to consume API, so you can build out beautiful front end experiences and leave the Data management to us.

We have a small handful of endpoints, each documented below.

Authentication through JSON Web Tokens
When using the API, many calls are made in the context of a registered user. The API protects itself by requiring a token string passed in the Header for requests made in that context.

Bearer token variable will come from the function parameters and be inserted into the template literal. At runtime this will process as:

'Bearer eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9'
A sample request with an authorization token looks like this:


const someFunction = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/someEndPoint`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ /* whatever things you need to send to the API */ })
    });
      const result = await response.json();
      console.log(result);
      return result
  } catch (err) {
    console.error(err);
  }
}
        
It is crucial that the value for Authorization is a string starting with Bearer, followed by a space, and finished with the token you receive either by registering or logging in. Deviating from this format will cause the API to not recognize the token, and will result in an error.

If the token is malformed, missing, or has been revoked, you will get a response specific to that.

{
            "success": false,
            "error": {
                "type": "InvalidToken",
                "message": "Invalid token, please sign up or log in"
            },
            "data": null
        }
        
General Return Schema
Failed Request


  {
    success: false,
    error: 
    {
      name: "ErrorName",
      message: "This is an error message."
    }
    data: null
  }
      
- OR -
Successful Request


  {
    success: true,
    error: null,
    data: 
    {
      user: { username: "janesmyth" },
      message: "This is a data message."
    } 
  }
        
Since a success or error is present in each call, we will only discuss the data object returned from the calls described below.

User Endpoints
POST /users/register
This route is used to create a new user account. On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.

Fetch Options
Body:
user (object, required)
username (string, required): the desired username for the new user
password (string, required): the desired password for the new user
Returned Data
token (string): the JSON Web Token which is used to authenticate the user with any future calls
message (string): Thanks for signing up for our service.
Sample Call
const registerUser = async () => {
       try {
         const response = await fetch(
           `${BASE_URL}/users/register`, {
           method: "POST",
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             user: {
               username: 'superman27',
               password: 'krypt0n0rbust'
             }
           })
         });
         const result = await response.json();
         // As written below you can log your result
         // to check what data came back from the above code.
         console.log(result)
         return result
       } catch (err) {
         console.error(err);
       }
     }
Sample Result
If the API creates a new user, the following object will be returned:

{
       "success": true,
       "error": null,
       "data": {
         "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
         "message": "Thanks for signing up for our service."
       }
     }
     
POST /users/login
This route is used for a user to login when they already have an account. On success, you will be given a JSON Web Token to be passed to the server for requests requiring authentication.

Fetch Options
Body:
(object, required) contains the following key/value pairs:
username (string, required): the registered username for the user
password (string, required): the matching password for the user
Return Data
token (string): the JSON Web Token which is used to authenticate the user with any future calls
message (string): Thanks for logging in to our service.
user (object) which contains the following key/value pairs:
id (number): the database identifier of the user
username (string): the username of the user
Sample Call
const login = async () => {
      
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: 'superman27',
            password: 'krypt0n0rbust'
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}
      
Sample Result
This API route attempts to authenticate using the username and password, if successful, something similar to following object will be in the result:


{
  "user": 
    {
      "id": 5,
      "username": superman27,
    }
  "message": "you're logged in!"
  "token": "xyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MDY2ZGQ0MzkxNjAwTc1NTNlMDUiLCJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE1ODYwMzgzODF9.CTj4owBl0PB-G6G4E_1l6DS6_cVc0iKcMzBIWFUYM1p",
}
        
GET /users/me
This route is used to grab an already logged in user's relevant data. It is mostly helpful for verifying the user has a valid token (and is thus logged in). You must pass a valid token with this request, or it will be rejected.

Fetch Options
Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Return Data
(object)
id (string): the database identifier of the user
username (string): the username of the user
Sample Call
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STRING_HERE}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
      
Sample Result

{  
  "id": "5",
  "username": "superman27",
}
        
This route is used to grab an already logged in user's relevant data. It is mostly helpful for verifying the user has a valid token (and is thus logged in). You must pass a valid token with this request, or it will be rejected.

Request Parameters
No request parameters are necessary for this route.

Return Parameters
id (number): the database identifier of the user
username (string): the username of the user
Sample Call
fetch('http://fitnesstrac-kr.herokuapp.com/api/users/me', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer TOKEN_STRING_HERE'
  },
}).then(response => response.json())
  .then(result => {
    console.log(result);
  })
  .catch(console.error);
Sample Response
{
  "id": 5,
  "username": "superman27"
}
GET /users/:username/routines
This route returns a list of public routines for a particular user. If a token is sent in the Authorization header (and if this token's logged in user matches the user for which these routines are being requested), both public and private routines will be sent back for the requested user.

Fetch Options
Headers: (optional)
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Return Data
(array of objects): each object should contain the following key/value pairs:

id (number): This is the database identifier for the routine object.
creatorId (number): This is the database identifier for the user which created this routine
creatorName (string): This is the username for the user which created this routine
isPublic (boolean): Whether or not the routine should be visible to all users (will always be true for public routes)
name (string): This is the name (or title) of the routine.
goal (string): This is like the description of the routine.
activity (array of activity objects): An array of activities associated with this routine.
id (number): This is the database identifier for the activity
name (string): This is the name (or title) of the activity.
description (string): This is the description of the activity.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
count (number): This is the number of times (reps) this activity should be performed for this routine.
routineActivityId (number): This is the database identifier for the routine_activity
routineId (number): This is the database identifier for the routine
Sample Call
const myData = async () => {

    try {
      const response = await fetch(`${BASE_URL}/users/albert/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN_STRING_HERE}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
Sample Response

[
  {
    "id": 2,
    "creatorId": 1,
    "isPublic": true,
    "name": "Chest Day",
    "goal": "To beef up the Chest and Triceps!",
    "creatorName": "albert",
    "activities": 
    [
      {
        "id": 3,
        "name": "bench press",
        "description": "3 sets of 10. Lift a safe amount, but push yourself!",
        "duration": 8,
        "count": 10,
        "routineActivityId": 6,
        "routineId": 2
      },
      {
        "id": 32,
        "name": "skull crushers",
        "description": "don't drop the weight!",
        "duration": 8,
        "count": 10,
        "routineActivityId": 8,
        "routineId": 2
    },
    ]
  },
  {
    "id": 3,
    "creatorId": 1,
    "isPublic": false,
    "name": "Leg Day",
    "goal": "Leg day is best day!",
    "creatorName": "albert",
    "activities": 
    [
      {
        "id": 5,
        "name": "Squats",
        "description": "More weight!",
        "duration": 7,
        "count": 10,
        "routineActivityId": 8,
        "routineId": 2
      }, 
    ]
  },
  
]
Activities Endpoints
GET /activities
Returns a list of all activities in the database

Headers:
No token is necessary in the header for this route.

Return Data
(array of objects)
id (number): This is the database identifier for the activity
name (string): This is the name (or title) of the activity.
description (string): This is the description of the activity.
Sample Call
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
      
Sample Response
[
    {
        "id": 2,
        "name": "Incline Dumbbell Hammer Curl",
        "description": "Lie down face up on an incline bench and lift thee barbells slowly upward toward chest"
    },
    {
        "id": 3,
        "name": "bench press",
        "description": "Lift a safe amount, but push yourself!"
    },
    {
        "id": 4,
        "name": "Push Ups",
        "description": "Pretty sure you know what to do!"
    },
    {
        "id": 5,
        "name": "squats",
        "description": "Heavy lifting."
    },
    {
        "id": 6,
        "name": "treadmill",
        "description": "running"
    },
    {
        "id": 7,
        "name": "stairs",
        "description": "climb those stairs"
    },
    {
        "id": 8,
        "name": "elliptical",
        "description": "using the elliptical machine"
    },
    {
        "id": 1,
        "name": "standing barbell curl",
        "description": "Lift that barbell!"
    }
]
  
POST /activities
A request to this endpoint will attempt to create a new activity. You must pass a valid token with this request, or it will be rejected.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
(object literal, required)
name (string, required): the desired name for the new activity
description (string, required): the desired description for the new activity
Return Data:
(object literal)
id (number): This is the database identifier for the activity
name (string): This is the name (or title) of the activity.
description (string): This is the description of the activity.
Sample Call
const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Running',
          description: 'Keep on running!'
        }) 
      });
  
      const result = await response.json();
  
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
        
Sample Response
If the API creates a new activity, the following object will be returned:

{
  "id": 9,
  "name": "Running",
  "description": "Keep on running!"
}
PATCH /activities/:activityId
Anyone can update an activity (yes, this could lead to long term problems)

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
(object literal, required)
name (string, optional): the desired new name for the activity
description (string, optional): the desired new description for the activity
Return Data:
(object literal)
id (number): This is the database identifier for the activity
name (string): This is the name (or title) of the activity.
description (string): This is the description of the activity.
Sample Call
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities`, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN_STRING_HERE}`
      },
      method: "PATCH",
      body: JSON.stringify({
        name: 'Running',
        description: 'Keep on running, til you drop!'
      })
    });

      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
    console.error(err);
    }
}
    
Sample Response
If the API successfully edits the activity, the following object will be returned:

{
  "id": 9,
  "name": "Running",
  "description": "Keep on running, til you drop!"
}
  
GET /api/activities/:activityId/routines
This route returns a list of public routines which feature that activity

Headers:
no additional headers are necessary
Request Parameters:
no request parameters are required
Return Data
an array of objects; each object should have the following layout:
id (number): This is the database identifier for the routine object.
creatorId (number): This is the database identifier for the user which created this routine
creatorName (string): This is the username for the user which created this routine
isPublic (boolean): Whether or not the routine should be visible to all users (will always be true for public routes)
name (string): This is the name (or title) of the routine.
goal (string): This is like the description of the routine.
activity (array of activity objects): An array of activities associated with this routine.
id (number): This is the database identifier for the activity
name (string): This is the name (or title) of the activity.
description (string): This is the description of the activity.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
count (number): This is the number of times (reps) this activity should be performed for this routine.
routineActivityId (number): This is the database identifier for the routine_activity
routineId (number): This is the database identifier for the routine
Sample Call
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/activities/3/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
    
Sample Response
[
  {
    "id": 2,
    "creatorId": 1,
    "isPublic": true,
    "name": "Chest Day",
    "goal": "To beef up the Chest and Triceps!",
    "creatorName": "albert",
    "activities": [
        {
          "id": 3,
          "name": "bench press",
          "description": "Lift a safe amount, but push yourself!",
          "duration": 8,
          "count": 10,
          "routineActivityId": 6,
          "routineId": 2
        },
        {
          "id": 4,
          "name": "Push Ups",
          "description": "Pretty sure you know what to do!",
          "duration": 7,
          "count": 10,
          "routineActivityId": 7,
          "routineId": 2
        },
    ]
  }
]
Routines Endpoints
GET /routines
This route returns a list of all public routines

Headers:
no additional headers are necessary
Request Parameters:
no request parameters are required
Return Data
array of objects each object should have the following layout:
id (number): This is the database identifier for the routine object.
creatorId (number): This is the database identifier for the user which created this routine
creatorName (string): This is the username for the user which created this routine
isPublic (boolean): Whether or not the routine should be visible to all users (will always be true for public routes)
name (string): This is the name (or title) of the routine.
goal (string): This is like the description of the routine.
activity (array of activity objects): An array of activities associated with this routine.
id (number): This is the database identifier for the activity
name (string): This is the name (or title) of the activity.
description (string): This is the description of the activity.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
count (number): This is the number of times (reps) this activity should be performed for this routine.
routineActivityId (number): This is the database identifier for the routine_activity
routineId (number): This is the database identifier for the routine
Sample Call
const myData = async () => {
try {
const response = await fetch(`${BASE_URL}/routines`, {
  headers: {
  'Content-Type': 'application/json',
  },
});

const result = await response.json();
console.log(result);
return result
} catch (err) {
console.error(err);
}
}
    
Sample Response
[
{
"id": 2,
"creatorId": 1,
"isPublic": true,
"name": "Chest Day",
"goal": "To beef up the Chest and Triceps!",
"creatorName": "albert",
"activities": [
    {
        "id": 3,
        "name": "bench press",
        "description": "Lift a safe amount, but push yourself!",
        "duration": 8,
        "count": 10,
        "routineActivityId": 6,
        "routineId": 2
    },
    {
        "id": 4,
        "name": "Push Ups",
        "description": "Pretty sure you know what to do!",
        "duration": 7,
        "count": 10,
        "routineActivityId": 7,
        "routineId": 2
    }
]
},
{
"id": 4,
"creatorId": 2,
"isPublic": true,
"name": "Cardio Day",
"goal": "Running, stairs. Stuff that gets your heart pumping!",
"creatorName": "sandra",
"activities": [
    {
        "id": 6,
        "name": "treadmill",
        "description": "running",
        "duration": 10,
        "count": 10
    },
    {
        "id": 7,
        "name": "stairs",
        "description": "climb those stairs",
        "duration": 15,
        "count": 10
    }
]
},
]
POST /routines
A request to this endpoint will attempt to create a new routine. You must pass a valid token with this request, or it will be rejected.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
(object literal, required)
name (string, required): the desired name for the new routine
goal (string, required): the desired goal description of the routine.
isPublic (boolean, optional): Whether or not the routine should be visible to all users. null by default
Return Data:
(an array containing objects)
id (number): This is the database identifier for the routine
name (string): This is the name (or title) of the routine.
goal (string): This is like the description of the routine.
creatorId (number): This is the database identifier for the user which created this routine
isPublic (boolean): Whether or not the routine should be visible to all users. null by default
Sample Call
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN_STRING_HERE}`
      },
      body: JSON.stringify({
        name: 'Long Cardio Routine',
        goal: 'To get your heart pumping!',
        isPublic: true
      })
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
    
Sample Response
If the API successfully creates a new routine, it should return an object that looks similar to the following:

{
  "id": 8,
  "creatorId": 2,
  "isPublic": true,
  "name": "Long Cardio Routine",
  "goal": "To get your heart pumping!"
}
PATCH /routines/:routineId
Update a routine, notably change public/private, the name, or the goal. A token needs to be sent in the header in order for this request to be successful.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
(object literal, required)
name (string, optional): the desired new name for the routine
goal (string, optional): the desired new goal description of the routine.
isPublic (boolean, optional): Whether or not the routine should be visible to all users. null by default
Return Data
(object)
id (number): This is the database identifier for the routine
name (string): This is the name (or title) of the routine.
goal (string): This is like the description of the routine.
creatorId (number): This is the database identifier for the user which created this routine
isPublic (boolean): Whether or not the routine should be visible to all users. null by default
Sample Call
const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines/6`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STRING_HERE}`
        },
        body: JSON.stringify({
          name: 'Long Cardio Day',
          goal: 'To get your heart pumping!'
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
      
Sample Response
If the API successfully edits the routine, it should return an object that looks similar to the following:

{
  "id": 6,
  "creatorId": 2,
  "isPublic": true,
  "name": "Long Cardio Day",
  "goal": "To get your heart pumping!"
}
DELETE /routines/:routineId
Hard delete a routine. Make sure to delete all the routineActivities whose routine is the one being deleted.

This endpoint will hard delete a routine whose id is equal to routineId. Will also delete all the routineActivities whose routine is the one being deleted. The request will be rejected if it is either missing a valid token, or if the user represented by the token is not the user that created the original routine.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
There are no request parameters.

Return Data
(object)
success (boolean): Will be true if the routine was deleted
id (number): This is the database identifier for the routine
name (string): This is the name (or title) of the routine.
goal (string): This is like the description of the routine.
creatorId (number): This is the database identifier for the user which created this routine
isPublic (boolean): Whether or not the routine should be visible to all users. null by default
Sample Call
const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines/6`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STRING_HERE}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}
      
Sample Response
If the API successfully deletes routine, then it should return an object that is similar to the following:

{
  "success": true,
  "id": 6,
  "creatorId": 2,
  "isPublic": true,
  "name": "Long Cardio Day",
  "goal": "To get your heart pumping!"
}
POST /routines/:routineId/activities
Attaches a single activity to a routine. Prevents duplication on (routineId, activityId) pair. This route does NOT require a token to be sent in the headers.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Request Parameters:
(object literal, required)
activityId (number): This is the database identifier for the activity
count (number): This is the number of times (reps) this activity should be performed for this routine.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
Return Data
(object)
id (number): This is the database identifier for the routine_activity
routineId (number): This is the database identifier for the routine
activityId (number): This is the database identifier for the activity
count (number): This is the number of times (reps) this activity should be performed for this routine.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
Sample Call
const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines/6/activities`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId: 7,
          count: 1, 
          duration: 20
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
      
Sample Response
If the API associates the activity with the routine, then it should return an object that is similar to the following:

{
  "id": 11,
  "routineId": 6,
  "activityId": 7,
  "duration": 20,
  "count": 1
}
Routine_activities Endpoints
PATCH /routine_activities/:routineActivityId
Update the count or duration on the routine activity. A token needs to be sent in the header in order for this request to be successful.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
(object literal, required)
count (number, optional): This is the number of times (reps) this activity should be performed for this routine.
duration (number, optional): This is how long (in minutes) this activity should be performed for this routine.
Return Data
(object)
id (number): This is the database identifier for the routine_activity
routineId (number): This is the database identifier for the routine
activityId (number): This is the database identifier for the activity
count (number): This is the number of times (reps) this activity should be performed for this routine.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
Sample Call
const myData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/11`, {
        method: "PATCH",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN_STRING_HERE}`
        },
        body: JSON.stringify({
          count: 2,
          duration: 30
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }
      
Sample Response
If the API successfully edits the routine, an object will be returned that is similar to the following:

{
  "id": 11,
  "routineId": 6,
  "activityId": 7,
  "duration": 30,
  "count": 2
}
  
DELETE /routine_activities/:routineActivityId
Remove an activity from a routine (hard deleting routine_activity), dissociating an activity from a routine. A token needs to be sent in the header in order for this request to be successful.

Headers:
(object literal, required)
Content-Type (string, required): application/json
Authorization (template literal, required): Bearer ${TOKEN_STRING_HERE}
Request Parameters:
(None are required)
Return Data
(object)
success (boolean): Will be true if the routine_activity was deleted
id (number): This is the database identifier for the routine_activity
routineId (number): This is the database identifier for the routine
activityId (number): This is the database identifier for the activity
count (number): This is the number of times (reps) this activity should be performed for this routine.
duration (number): This is how long (in minutes) this activity should be performed for this routine.
Sample Call
const myData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routine_activities/11`, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN_STRING_HERE}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}
      
Sample Response
If the API successfully deletes the routine_activity, an object will be returned that is similar to the following:

{
  "success": true,
  "id": 11,
  "routineId": 6,
  "activityId": 7,
  "duration": 25,
  "count": 1
}
