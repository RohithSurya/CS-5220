const router = require("express").Router();
const bookmarks = require("../../../mock-database/bookmarks.json");

router.post("/", (req, res) => {
  const { body } = req;
  const ids = bookmarks.map((bookmark) => bookmark.id);
  const id = Math.max(...ids) + 1;
  const bookmark = { ...body, id };
  bookmarks.push(bookmark);
  res.json(bookmark);
});

router.delete("/:id", (req, res) => {
  const { params } = req;
  const id = parseInt(params.id);
  const index = bookmarks.findIndex((bookmark) => bookmark.id === id);
  if (index > -1) {
    bookmarks.splice(index, 1);
    res.json(id);
  } else {
    res.status(404).json({ error: `No bookmark found with id: ${id}` });
  }
});

router.get("/", (req, res) => {
  res.json(bookmarks);
});

module.exports = router;
