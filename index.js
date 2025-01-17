const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  const userExists = USERS.some((user) => user.email === email);
  if (!userExists) {
    USERS.push({ email, password });
  }

  // return back 200 status code to the client
  res.sendStatus(200);
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const { email, password } = req.body;

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same
  const user = USERS.find((user) => user.email === email);
  if (user && user.password === password) {
    // If the password is the same, return back 200 status code to the client
    // Also send back a token (any random string will do for now)
    const token = Math.random().toString(36).substring(7);
    res.status(200).json({ token });
  } else {
    // If the password is not the same, return back 401 status code to the client
    res.sendStatus(401);
  }
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.json(QUESTIONS);
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.json(SUBMISSION);
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSIONS array above
   const { problemIndex, solution } = req.body;

   // Randomly accept or reject the solution
   const isAccepted = Math.random() < 0.5;
 
   // Store the submission in the SUBMISSIONS array
   SUBMISSION.push({ problemIndex, solution, isAccepted });
 
   res.sendStatus(200);
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
const isAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === 'admin') {
    next();
  } else {
    res.sendStatus(401);
  }
};
// ensure that only admins can do that.


app.post('/problems', isAdmin, function(req, res) {
  const { title, description, testCases } = req.body;
  const newProblem = { title, description, testCases };
  QUESTIONS.push(newProblem);
  res.sendStatus(200);
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})