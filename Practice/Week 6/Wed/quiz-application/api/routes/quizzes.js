const router = require("express").Router();

const quizzes = require("../../../mock-database/quizzes.json");

router.get("/", (req, res) => {
  res.json(quizzes);
});

router.get("/:id", (req, res) => {
  const { params } = req;
  const id = parseInt(params.id);
  const quiz = quizzes.find((quiz) => quiz.id === id);
  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404).json({ error: `Cant find quiz with id: ${id}` });
  }
});

module.exports = router;
