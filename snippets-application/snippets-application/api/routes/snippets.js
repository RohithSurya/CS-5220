const router = require("express").Router();

const snippets = require("../../../mock-database/snippets.json");

const bookmarks = require("../../../mock-database/bookmarks.json");

router.get("/", (req, res) => {
  const { query } = req;
  const { language: programmingLanguage } = query;
  let result = snippets;
  if (programmingLanguage) {
    result = snippets.filter(
      (snippet) =>
        snippet.programming_language.toLowerCase() ===
        programmingLanguage.toLocaleLowerCase()
    );
  }
  res.json(result);
});

router.get("/:id", (req, res) => {
  const { params, query } = req;
  const id = parseInt(params.id);
  const { includes } = query;
  let snippet = snippets.find((snippet) => snippet.id === id);
  if (snippet) {
    if (includes === "bookmark_count") {
      const bookmarkCount = bookmarks.filter(
        (bookmark) => bookmark.snippet_id === id
      ).length;
      snippet = { ...snippet, bookmarkCount };
    }
    res.json(snippet);
  } else {
    res.status(404).json({ error: `No snippet found with id: ${id}` });
  }
});

router.post("/", (req, res) => {
  const { body } = req;
  const ids = snippets.map((snippet) => snippet.id);
  const id = Math.max(...ids) + 1;
  const created = new Date().toJSON();
  const snippet = { ...body, id, created };
  snippets.push(snippet);
  res.json(snippet);
});

router.delete("/:id", (req, res) => {
  const { params } = req;
  const id = parseInt(params.id);
  const index = snippets.findIndex((snippet) => snippet.id === id);
  if (index !== -1) {
    snippets.splice(index, 1);
    while (true) {
      const bookmarkIndex = bookmarks.findIndex(
        (bookmark) => bookmark.snippet_id === id
      );
      if (bookmarkIndex === -1) break;
      bookmarks.splice(bookmarkIndex, 1);
    }
    res.json({ success: "removed", type: "snippets", id });
  } else {
    res.status(404).json({ error: `No snippet found with id: ${id}` });
  }
});

module.exports = router;
