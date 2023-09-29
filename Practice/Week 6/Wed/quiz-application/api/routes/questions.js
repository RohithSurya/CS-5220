const router = require("express").Router();

const questions = require("../../../mock-database/questions.json");

router.post("/", (req, res) => {
  const { body } = req;
  const ids = questions.map((question) => question.id);
  const id = Math.max(...ids) + 1;
  const question = { ...body, id };
  questions.push(question);
  res.json(question);
});

module.exports = router;
