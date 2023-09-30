const router = require("express").Router();

const users = require("../../../mock-database/users.json");

router.post("/", (req, res) => {
  const { body } = req;
  const username = body.username;
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    res.status(400).json({ error: `user name: ${username} already exists` });
  }
  const ids = users.map((user) => user.id);
  const id = Math.max(...ids) + 1;
  const user = { ...body, id };
  users.push(user);
  res.json(user);
});

router.get("/:id", (req, res) => {
  const { params } = req;
  const id = parseInt(params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: `Cant find user ${id}` });
  }
});

module.exports = router;
