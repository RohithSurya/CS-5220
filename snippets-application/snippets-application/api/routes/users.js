const router = require("express").Router();

const users = require("../../../mock-database/users.json");
const bookmarks = require("../../../mock-database/bookmarks.json");
const snippets = require("../../../mock-database/snippets.json");

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
  let user = users.find((user) => user.id === id);
  if (user) {
    const { query } = req;
    if (query.bookmarks === "true") {
      const queryBookmarks = bookmarks.filter(
        (bookmark) => bookmark.user_id === id
      );
      user = { ...user, bookmarks: queryBookmarks };
    }
    if (query.snippets === "true") {
      const querySnippets = snippets.filter(
        (snippets) => snippets.user_id === id
      );
      user = { ...user, snippets: querySnippets };
    }
    res.json(user);
  } else {
    res.status(404).json({ error: `No user found with id: ${id}` });
  }
});

router.put("/:id", (req, res) => {
  const { params, body } = req;
  const id = parseInt(params.id);
  const user = users.find((user) => user.id === id);
  if (user) {
    const updatedUser = { ...user, ...body, id };
    return res.json(updatedUser);
  } else {
    res.status(404).json({ error: `No user found with id: ${id}` });
  }
});

module.exports = router;
