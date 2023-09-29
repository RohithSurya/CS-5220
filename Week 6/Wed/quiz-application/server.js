const express = require("express");
const app = express();
const quizzes = require("./api/routes/quizzes.js");
const questions = require("./api/routes/questions.js");

const PORT = 8080;

app.use(express.json());

app.use("/quizzes", quizzes);

app.use("/questions", questions);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
