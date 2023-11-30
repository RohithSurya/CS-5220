// 1. run: npm install
// 2. use: the thunder client JSON file and import into Thunder Client collections
// 3. run: npm run start

const express = require("express");

const logger = require("./api/middleware/logging.middleware");

// call the express function which create the express application
// this allows us to use the full functionality of our express application
const app = express();

const PORT = 8080;

// parses JSON body in POST and/or PUT request
app.use(express.json());
app.use(logger.logger);

app;

// require in our resource routes
const quizzes = require("./api/routes/quizzes.js");
const questions = require("./api/routes/questions.js");
const professors = require("./api/routes/professors.js");

// mount the resource routes to our express app
app.use("/quizzes", quizzes);
app.use("/questions", questions);
app.use("/professors", professors);

// start the express server

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
